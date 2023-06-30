import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Center, NativeBaseProvider, Text, View } from 'native-base';
import { displayDataComponent } from './style/DisplayDataStyle';
import {
    manager,
    ServiceUUIDs,
    CharacteristicsUUIDs,
} from '../../back-end/bluetooth/BLEService';

export const DisplayData = function (): JSX.Element {
    const { t } = useTranslation();
    const id = globalThis.deviceID;
    const base64 = require('base-64');
    const [COM_TEM, setCOM_TEM] = useState('');
    const [COM_RES, setCOM_RES] = useState('');
    const [COM_IMP, setCOM_IMP] = useState('');
    const [COM_FRE, setCOM_FRE] = useState('');

    const handleWrite = async (sendData: any) => {
        try {
            await manager.writeCharacteristicWithoutResponseForDevice(
                id,
                ServiceUUIDs.VSP,
                CharacteristicsUUIDs.COM_RX,
                base64.encode(sendData),
            );
            await manager.readCharacteristicForDevice(
                id,
                ServiceUUIDs.VSP,
                CharacteristicsUUIDs.COM_RX,
            );
        } catch (e) {
            return false;
        }
    };

    const handleReadCOM_TEM = async () => {
        try {
            await manager.monitorCharacteristicForDevice(
                id,
                ServiceUUIDs.VSP,
                CharacteristicsUUIDs.COM_TEM,
                (error, characteristic) => {
                    if (error) {
                        console.log(error);
                    }
                    if (
                        base64.decode(characteristic.value) === null ||
                        base64.decode(characteristic.value) === undefined
                    ) {
                        setCOM_TEM({
                            ...(COM_TEM as any),
                            value: 0,
                        });
                    } else {
                        setCOM_TEM({
                            ...(COM_TEM as any),
                            value: base64.decode(characteristic.value),
                        });
                    }
                },
                'COM_TEM',
            );
        } catch (e) {
            return false;
        }
    };

    const handleReadCOM_RES = async () => {
        try {
            await manager.monitorCharacteristicForDevice(
                id,
                ServiceUUIDs.VSP,
                CharacteristicsUUIDs.COM_RES,
                (error, characteristic) => {
                    if (error) {
                        console.log(error);
                    }
                    if (
                        base64.decode(characteristic.value) === null ||
                        base64.decode(characteristic.value) === undefined
                    ) {
                        setCOM_RES({
                            ...(COM_RES as any),
                            value: 0,
                        });
                    } else {
                        setCOM_RES({
                            ...(COM_RES as any),
                            value: base64.decode(characteristic.value),
                        });
                    }
                },
                'COM_RES',
            );
        } catch (e) {
            return false;
        }
    };

    const handleReadCOM_IMP = async () => {
        try {
            await manager.monitorCharacteristicForDevice(
                id,
                ServiceUUIDs.VSP,
                CharacteristicsUUIDs.COM_IMP,
                (error, characteristic) => {
                    if (error) {
                        console.log(error);
                    }
                    if (
                        base64.decode(characteristic.value) === null ||
                        base64.decode(characteristic.value) === undefined
                    ) {
                        setCOM_IMP({
                            ...(COM_IMP as any),
                            value: 0,
                        });
                    } else {
                        setCOM_IMP({
                            ...(COM_IMP as any),
                            value: base64.decode(characteristic.value),
                        });
                    }
                },
                'COM_IMP',
            );
        } catch (e) {
            return false;
        }
    };

    const handleReadCOM_FRE = async () => {
        try {
            await manager.monitorCharacteristicForDevice(
                id,
                ServiceUUIDs.VSP,
                CharacteristicsUUIDs.COM_FRE,
                (error, characteristic) => {
                    if (error) {
                        console.log(error);
                    }
                    if (
                        base64.decode(characteristic.value) === null ||
                        base64.decode(characteristic.value) === undefined
                    ) {
                        setCOM_FRE({
                            ...(COM_FRE as any),
                            value: 0,
                        });
                    } else {
                        setCOM_FRE({
                            ...(COM_FRE as any),
                            value: base64.decode(characteristic.value),
                        });
                    }
                },
                'COM_FRE',
            );
        } catch (e) {
            return false;
        }
    };
    const ReadCharacteristic = async () => {
        await handleReadCOM_TEM();
        await handleReadCOM_RES();
        await handleReadCOM_IMP();
        await handleReadCOM_FRE();
    };

    useEffect(() => {
        const timerWrite = setTimeout(() => {
            ReadCharacteristic();
        }, 1);
        return () => clearTimeout(timerWrite);
    }, []);

    const DisplayValue = () => {
        if ((COM_TEM as any).value === undefined) {
            setCOM_TEM({
                ...(COM_TEM as any),
                value: 0,
            });
        } else if ((COM_RES as any).value === undefined) {
            setCOM_RES({
                ...(COM_RES as any),
                value: 0,
            });
        } else if ((COM_IMP as any).value === undefined) {
            setCOM_IMP({
                ...(COM_IMP as any),
                value: 0,
            });
        } else if ((COM_FRE as any).value === undefined) {
            setCOM_FRE({
                ...(COM_FRE as any),
                value: 0,
            });
        }

        return (
            'Temperature: ' +
            (COM_TEM as any).value +
            ',\n\n' +
            'Resistance: ' +
            (COM_RES as any).value +
            ',\n\n' +
            'Impedance: ' +
            (COM_IMP as any).value +
            ',\n\n' +
            'Frequency: ' +
            (COM_FRE as any).value +
            '\n'
        );
    };

    return (
        <NativeBaseProvider>
            <View>
                <Center>
                    <Text style={displayDataComponent.sliderText}>
                        {DisplayValue()}
                    </Text>
                    <Button colorScheme="green" onPress={handleWrite}>
                        Send Data
                    </Button>
                </Center>
            </View>
        </NativeBaseProvider>
    );
};
