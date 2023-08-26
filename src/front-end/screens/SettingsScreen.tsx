import React from 'react';
import { Box, Button, NativeBaseProvider, View } from 'native-base';
import axios from 'axios';
import { dataScreen } from './style/DataScreenStyle';
import { Header } from '../components/Header';
import { useTranslation } from 'react-i18next';
import { BottomMenuComponent } from '../components/BottomMenuComponent';

export const SettingsScreen = function ({ navigation }: any): JSX.Element {
    const { t } = useTranslation();
    const baseUrl_measurementText =
        'https://appbackend.azurewebsites.net/measurementsText_meas';

    const GetMeasurementsText = () => {
        axios
            .get(`${baseUrl_measurementText}`, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET',
                },
            })
            .then((response) => {
                const jsonData = JSON.parse(
                    JSON.parse(JSON.stringify(response.data[0])).MEASUREMENT,
                );
                globalThis.Measurement_F = jsonData.F;
                globalThis.Measurement_R = jsonData.R;
                globalThis.Measurement_X = jsonData.X;
            });
    };

    return (
        <NativeBaseProvider>
            <View style={dataScreen.container}>
                <Header title={t('ScreenNames.settings')} />
                <Box style={dataScreen.box}>
                    <Button onPress={GetMeasurementsText}>GET DATA</Button>
                </Box>
                <BottomMenuComponent navigation={navigation} />
            </View>
        </NativeBaseProvider>
    );
};
