import React, { useEffect, useState } from 'react';
import {
    Box,
    NativeBaseProvider,
    Slider,
    Stack,
    View,
    Text,
    HStack,
} from 'native-base';
import { Switch } from 'react-native';
import { dataScreen } from './style/DataScreenStyle';
import { Header } from '../components/Header';
import { useTranslation } from 'react-i18next';
import { BottomMenuComponent } from '../components/BottomMenuComponent';

export const SettingsScreen = function ({ navigation }: any): JSX.Element {
    const { t } = useTranslation();
    const [onChangeEndValue, setOnChangeEndValue] = React.useState();
    const [isEnabledZero, setIsEnabledZero] = useState(
        globalThis.chart_from_zero,
    );

    const toggleSwitchZero = () => {
        if (globalThis.chart_from_zero === true) {
            globalThis.chart_from_zero = false;
        } else {
            globalThis.chart_from_zero = true;
        }
        setIsEnabledZero((previousState) => !previousState);
    };

    const prepareSpeed = (number: number) => {
        if (number !== undefined) {
            globalThis.numbers_of_measurements = number;
        }
    };

    useEffect(() => {
        prepareSpeed(onChangeEndValue);
    }, [onChangeEndValue]);

    return (
        <NativeBaseProvider>
            <View style={dataScreen.container}>
                <Header title={t('ScreenNames.settings')} />
                <Box style={dataScreen.box}>
                    <HStack style={dataScreen.switch_stack} space={5}>
                        <Switch
                            trackColor={{
                                false: '#767577',
                                true: '#00a354',
                            }}
                            thumbColor={isEnabledZero ? '#ffffff' : '#ffffff'}
                            onValueChange={toggleSwitchZero}
                            value={globalThis.chart_from_zero}
                        />
                        <Text style={dataScreen.text}>
                            {t('SettingsScreen.setup_chart')}
                        </Text>
                    </HStack>
                    <Stack
                        space={1}
                        alignItems="center"
                        w="75%"
                        maxW="300"
                        marginTop={'5%'}>
                        <Text style={dataScreen.text}>
                            {t('SettingsScreen.number_measurement') +
                                ': ' +
                                globalThis.numbers_of_measurements}
                        </Text>
                        <Slider
                            defaultValue={globalThis.numbers_of_measurements}
                            maxValue={20}
                            minValue={1}
                            colorScheme="green"
                            onChange={(v) => {
                                prepareSpeed(v);
                            }}
                            onChangeEnd={(v) => {
                                v && setOnChangeEndValue(Math.floor(v));
                            }}>
                            <Slider.Track>
                                <Slider.FilledTrack />
                            </Slider.Track>
                            <Slider.Thumb />
                        </Slider>
                    </Stack>
                </Box>
                <BottomMenuComponent navigation={navigation} />
            </View>
        </NativeBaseProvider>
    );
};
