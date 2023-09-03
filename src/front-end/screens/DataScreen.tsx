import React, {useEffect, useState} from 'react';
import { Switch } from 'react-native';
import {
    Box,
    CircleIcon,
    HStack,
    NativeBaseProvider,
    Text,
    View,
    VStack,
} from 'native-base';
import { dataScreen } from './style/DataScreenStyle';
import { DisplayData } from '../components/DisplayData';
import { Header } from '../components/Header';
import { useTranslation } from 'react-i18next';
import { ChartComponent } from '../components/ChartComponent';
import { BottomMenuComponent } from '../components/BottomMenuComponent';

export const DataScreen = function ({ navigation }: any): JSX.Element {
    const { t } = useTranslation();

    const [isEnabledTem, setIsEnabledTem] = useState(false);
    const toggleSwitchTem = () =>
        setIsEnabledTem((previousState) => !previousState);

    const [isEnabledRes, setIsEnabledRes] = useState(false);
    const toggleSwitchRes = () =>
        setIsEnabledRes((previousState) => !previousState);

    const [isEnabledImp, setIsEnabledImp] = useState(false);
    const toggleSwitchImp = () =>
        setIsEnabledImp((previousState) => !previousState);

    const [isEnabledFre, setIsEnabledFre] = useState(false);
    const toggleSwitchFre = () =>
        setIsEnabledFre((previousState) => !previousState);

    return (
        <NativeBaseProvider>
            <View style={dataScreen.container}>
                <Header title={t('ScreenNames.home')} />
                <Box style={dataScreen.box}>
                    <DisplayData />
                    <ChartComponent
                        isEnabledTem={isEnabledTem}
                        isEnabledRes={isEnabledRes}
                        isEnabledImp={isEnabledImp}
                        isEnabledFre={isEnabledFre}
                    />
                    <VStack space={'4%'} style={dataScreen.legend}>
                        <HStack space={'10%'}>
                            <CircleIcon size="5" color={'rgb(218,16,16)'} />
                            <Text style={dataScreen.legendTest}>
                                {t('DataScreen.temperature')}
                            </Text>
                            <Switch
                                trackColor={{
                                    false: '#767577',
                                    true: '#00a354',
                                }}
                                thumbColor={
                                    isEnabledTem ? '#ffffff' : '#ffffff'
                                }
                                onValueChange={toggleSwitchTem}
                                value={isEnabledTem}
                            />
                        </HStack>
                        <HStack space={'10%'}>
                            <CircleIcon size="5" color={'rgb(197,18,215)'} />
                            <Text style={dataScreen.legendTest}>
                                {t('DataScreen.resistance')}
                            </Text>
                            <Switch
                                trackColor={{
                                    false: '#767577',
                                    true: '#00a354',
                                }}
                                thumbColor={
                                    isEnabledRes ? '#ffffff' : '#ffffff'
                                }
                                onValueChange={toggleSwitchRes}
                                value={isEnabledRes}
                            />
                        </HStack>
                        <HStack space={'10%'}>
                            <CircleIcon size="5" color={'rgb(26,152,12)'} />
                            <Text style={dataScreen.legendTest}>
                                {t('DataScreen.impedance')}
                            </Text>
                            <Switch
                                trackColor={{
                                    false: '#767577',
                                    true: '#00a354',
                                }}
                                thumbColor={
                                    isEnabledImp ? '#ffffff' : '#ffffff'
                                }
                                onValueChange={toggleSwitchImp}
                                value={isEnabledImp}
                            />
                        </HStack>
                        <HStack space={'10%'}>
                            <CircleIcon size="5" color={'rgb(36,15,187)'} />
                            <Text style={dataScreen.legendTest}>
                                {t('DataScreen.frequency')}
                            </Text>
                            <Switch
                                trackColor={{
                                    false: '#767577',
                                    true: '#00a354',
                                }}
                                thumbColor={
                                    isEnabledFre ? '#ffffff' : '#ffffff'
                                }
                                onValueChange={toggleSwitchFre}
                                value={isEnabledFre}
                            />
                        </HStack>
                    </VStack>
                </Box>
                <BottomMenuComponent navigation={navigation} />
            </View>
        </NativeBaseProvider>
    );
};
