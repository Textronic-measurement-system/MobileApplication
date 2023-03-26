import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
    manager,
    ServiceUUIDs,
    CharacteristicsUUIDs,
} from '../../back-end/bluetooth/BLEService';
import { Box, Button, NativeBaseProvider, Text, View } from 'native-base';
import { Header } from '../components/Header';
import { dataScreen } from './style/DataScreenStyle';

export const DataScreen = function ({ navigation }: any): JSX.Element {
    const { t } = useTranslation();

    const id = globalThis.deviceID;
    const base64 = require('base-64');
    const [COMX, setCOMX] = useState('');
    const [COMR, setCOMR] = useState('');
    const [COMZ, setCOMZ] = useState('');
    const [CONFIG, setCONFIG] = useState('');
    var test = 'null';

    const handleReadCOMX = async () => {
        try {
            await manager.monitorCharacteristicForDevice(
                id,
                ServiceUUIDs.VSP,
                CharacteristicsUUIDs.COM_X,
                (error, characteristic) => {
                    if (error) {
                        console.log(error);
                    }
                    setCOMX({
                        ...(COMX as any),
                        value: base64.decode(characteristic.value),
                    });
                },
                'COM_X',
            );
        } catch (e) {
            return false;
        }
    };

    const handleReadCOMR = async () => {
        try {
            await manager.monitorCharacteristicForDevice(
                id,
                ServiceUUIDs.VSP,
                CharacteristicsUUIDs.COM_R,
                (error, characteristic) => {
                    if (error) {
                        console.log(error);
                    }
                    setCOMR({
                        ...(COMR as any),
                        value: base64.decode(characteristic.value),
                    });
                },
                'COM_R',
            );
        } catch (e) {
            return false;
        }
    };

    const handleReadCOMZ = async () => {
        try {
            await manager.monitorCharacteristicForDevice(
                id,
                ServiceUUIDs.VSP,
                CharacteristicsUUIDs.COM_Z,
                (error, characteristic) => {
                    if (error) {
                        console.log(error);
                    }
                    setCOMZ({
                        ...(COMZ as any),
                        value: base64.decode(characteristic.value),
                    });
                },
                'COM_Z',
            );
        } catch (e) {
            return false;
        }
    };

    const handleReadCONFIG = async () => {
        try {
            await manager.monitorCharacteristicForDevice(
                id,
                ServiceUUIDs.VSP,
                CharacteristicsUUIDs.CONFIG,
                (error, characteristic) => {
                    if (error) {
                        console.log(error);
                    }
                    setCONFIG({
                        ...(CONFIG as any),
                        value: base64.decode(characteristic.value),
                    });
                },
                'CONFIG',
            );
        } catch (e) {
            return false;
        }
    };

    const ReadThreeCharacteristics = async () => {
        if (globalThis.valueType === '1') {
            await handleReadCOMX();
        } else if (globalThis.valueType === '2') {
            await handleReadCOMR();
        } else if (globalThis.valueType === '3') {
            await handleReadCOMZ();
        }
    };

    const DisplayValue = () => {
        if (globalThis.valueType === '1') {
            return COMX.value;
        } else if (globalThis.valueType === '2') {
            return COMR.value;
        } else if (globalThis.valueType === '3') {
            return COMZ.value;
        }
    };

    useEffect(() => {
        const timerWrite = setTimeout(() => {
            ReadThreeCharacteristics();
        }, 1);
        return () => clearTimeout(timerWrite);
    }, []);

    return (
        <NativeBaseProvider>
            <View style={dataScreen.container}>
                <Header
                    navigation={navigation}
                    goto={'DeviceMenu'}
                    refreshing={'disable'}
                    title={t('DataScreen.title')}
                />
                <Box style={dataScreen.box}>
                    <Text style={dataScreen.text1}>{DisplayValue}</Text>
                    <Button style={dataScreen.button}>
                        <Text style={dataScreen.text2}>
                            {t('DataScreen.button')}
                        </Text>
                    </Button>
                </Box>
            </View>
        </NativeBaseProvider>
    );
};
