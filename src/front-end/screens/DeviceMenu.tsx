import React, { useState, useEffect } from 'react';
import { Button, NativeBaseProvider, Text, View } from 'native-base';

import {
    manager,
    ServiceUUIDs,
    CharacteristicsUUIDs,
} from '../../back-end/bluetooth/BLEService';

export const DeviceMenu = function ({ navigation }: any): JSX.Element {
    const id = globalThis.deviceID;
    const base64 = require('base-64');
    const [COMX, setCOMX] = useState('');
    const [COMR, setCOMR] = useState('');
    const [COMZ, setCOMZ] = useState('');
    const [CONFIG, setCONFIG] = useState('');

    const handleDisconnectDevice = async () => {
        await manager.cancelDeviceConnection((globalThis as any).deviceID);
        return navigation.navigate('DevicesList');
    };

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

    const ReadFourCharacteristics = async () => {
        await handleReadCOMX();
        await handleReadCOMR();
        await handleReadCOMZ();
        await handleReadCONFIG();
    };

    useEffect(() => {
        const timerWrite = setTimeout(() => {
            ReadFourCharacteristics();
        }, 1);
        return () => clearTimeout(timerWrite);
    }, []);

    return (
        <NativeBaseProvider>
            <View>
                <Text>{(COMX as any).value}</Text>
                <Text>{(COMR as any).value}</Text>
                <Text>{(COMZ as any).value}</Text>
                <Button onPress={handleDisconnectDevice}>Disconnected</Button>
            </View>
        </NativeBaseProvider>
    );
};
