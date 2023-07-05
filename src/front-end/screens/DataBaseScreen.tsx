import React from 'react';
import { Box, Button, NativeBaseProvider, View } from 'native-base';
import { useTranslation } from 'react-i18next';
import { device_menuScreen } from './style/DeviceMenuStyle';
import { Header } from '../components/Header';
import axios from 'axios';

export const DataBase = function ({ navigation }: any): JSX.Element {
    const { t } = useTranslation();
    const baseUrl = 'https://appbackend.azurewebsites.net';
    const baseUrl1 = 'http://172.25.192.1:3000';

    const GetFunction = () => {
        axios
            .get(`${baseUrl1}/users`, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET',
                },
            })
            .then((response) => {
                console.log(response.data);
            });
    };

    const AddFunction = () => {
        axios
            .post(`${baseUrl}`, {
                ID_MEASUREMENTTYPE: 99,
                MEASUREMENT: 99.99,
                MEASUREMENTTIME: '9999-99-99 99:99:99',
            })
            .then((response) => {
                console.log(response.data);
            });
    };

    const ReplaceFunction = () => {
        axios
            .put(`${baseUrl}/measurements`, {
                id: 1,
                ID_MEASUREMENTTYPE: 1,
                MEASUREMENT: 36.6,
                MEASUREMENTTIME: '2023-06-30 21:37:00',
            })
            .then((response) => {
                console.log(response.data);
            });
    };

    return (
        <NativeBaseProvider>
            <View style={device_menuScreen.container}>
                <Header
                    navigation={navigation}
                    goto={'DeviceMenu'}
                    refreshing={'disable'}
                    title={'Data Base'}
                />
                <Box style={device_menuScreen.box}>
                    <Button title={'Get data'} onPress={() => GetFunction()}>
                        Get Data
                    </Button>
                    <Button title={'Add data'} onPress={() => AddFunction()}>
                        Add Data
                    </Button>
                    <Button
                        title={'Replace data'}
                        onPress={() => ReplaceFunction()}>
                        Replace Data
                    </Button>
                </Box>
            </View>
        </NativeBaseProvider>
    );
};
