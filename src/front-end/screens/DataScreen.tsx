import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
    manager,
    ServiceUUIDs,
    CharacteristicsUUIDs,
} from '../../back-end/bluetooth/BLEService';
import { Box, NativeBaseProvider, Text, View } from 'native-base';
import { Header } from '../components/Header';
export const DataScreen = function ({ navigation }: any): JSX.Element {
    const { t } = useTranslation();

    const id = globalThis.deviceID;
    const base64 = require('base-64');
    const [COMX, setCOMX] = useState('');
    const [COMR, setCOMR] = useState('');
    const [COMZ, setCOMZ] = useState('');
    const [CONFIG, setCONFIG] = useState('');

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
        await handleReadCOMX();
        await handleReadCOMR();
        await handleReadCOMZ();
    };

    useEffect(() => {
        const timerWrite = setTimeout(() => {
            ReadThreeCharacteristics();
        }, 1);
        return () => clearTimeout(timerWrite);
    }, []);

    return (
        <NativeBaseProvider>
            <View>
                <Header navigation={navigation} goto={''} refreshing={'disable'} title={'hello'} />
                <Box>
                    <Text>dasdhj</Text>
                </Box>
            </View>
        </NativeBaseProvider>
    );
};
