import React, { useState } from 'react';
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
import { FrequencyChart } from '../components/FrequencyChart';
import { Switch } from 'react-native';
import { BottomMenuComponent } from '../components/BottomMenuComponent';

export const FrequencyScreen = function ({ navigation }: any): JSX.Element {
    const { t } = useTranslation();

    const [isEnabledRes, setIsEnabledRes] = useState(false);
    const toggleSwitchRes = () =>
        setIsEnabledRes((previousState) => !previousState);

    const [isEnabledImp, setIsEnabledImp] = useState(false);
    const toggleSwitchImp = () =>
        setIsEnabledImp((previousState) => !previousState);

    return (
        <NativeBaseProvider>
            <View style={dataScreen.container}>
                <Header title={t('ScreenNames.frequency')} />
                <Box style={dataScreen.box}>
                    <DisplayData />
                    <FrequencyChart
                        isEnabledRes={isEnabledRes}
                        isEnabledImp={isEnabledImp}
                    />
                    <VStack space={'4%'} style={dataScreen.legend}>
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
                    </VStack>
                </Box>
                <BottomMenuComponent navigation={navigation} />
            </View>
        </NativeBaseProvider>
    );
};
