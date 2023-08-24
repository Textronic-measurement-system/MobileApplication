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
        'https://appbackend.azurewebsites.net/measurementsText';
    const GetMeasurementsText = () => {
        axios
            .get(`${baseUrl_measurementText}`, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET',
                },
            })
            .then((response) => {
                console.log(response.data);
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
