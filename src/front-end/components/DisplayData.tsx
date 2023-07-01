import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
    Center,
    HStack,
    NativeBaseProvider,
    Text,
    View,
} from 'native-base';
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
                    if (base64.decode(characteristic.value) === null) {
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
                    if (base64.decode(characteristic.value) === null) {
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
                    if (base64.decode(characteristic.value) === null) {
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
                    if (base64.decode(characteristic.value) === null) {
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

    const DisplayTem = () => {
        if ((COM_TEM as any).value === undefined) {
            setCOM_TEM({
                ...(COM_TEM as any),
                value: 0,
            });
        }

        return 'Temperature\n' + (COM_TEM as any).value;
    };

    const DisplayRes = () => {
        if ((COM_RES as any).value === undefined) {
            setCOM_RES({
                ...(COM_RES as any),
                value: 0,
            });
        }

        return 'Resistance\n' + (COM_RES as any).value;
    };

    const DisplayImp = () => {
        if ((COM_IMP as any).value === undefined) {
            setCOM_IMP({
                ...(COM_IMP as any),
                value: 0,
            });
        }

        return 'Impedance\n' + (COM_IMP as any).value;
    };

    const DisplayFre = () => {
        if ((COM_FRE as any).value === undefined) {
            setCOM_FRE({
                ...(COM_FRE as any),
                value: 0,
            });
        }

        return 'Frequency\n' + (COM_FRE as any).value;
    };

    return (
        <NativeBaseProvider>
            <View>
                <Center>
                    <HStack style={displayDataComponent.column} space={'3%'}>
                        <Text style={displayDataComponent.text}>
                            {DisplayTem()}
                        </Text>
                        <Text style={displayDataComponent.text}>
                            {DisplayRes()}
                        </Text>
                        <Text style={displayDataComponent.text}>
                            {DisplayImp()}
                        </Text>
                        <Text style={displayDataComponent.text}>
                            {DisplayFre()}
                        </Text>
                    </HStack>
                </Center>
            </View>
        </NativeBaseProvider>
    );
};
