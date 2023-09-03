import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Center, HStack, NativeBaseProvider, Text, View } from 'native-base';
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
    const [COM_SWEEP, setCOM_SWEEP] = useState('');

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

    const handleReadCOM_SWEEP = async () => {
        try {
            await manager.monitorCharacteristicForDevice(
                id,
                ServiceUUIDs.VSP,
                CharacteristicsUUIDs.COM_SWEEP,
                (error, characteristic) => {
                    if (error) {
                        console.log(error);
                    }
                    if (base64.decode(characteristic.value) === null) {
                        setCOM_SWEEP({
                            ...(COM_SWEEP as any),
                            value: 0,
                        });
                    } else {
                        setCOM_SWEEP({
                            ...(COM_SWEEP as any),
                            value: base64.decode(characteristic.value),
                        });
                    }
                },
                'COM_SWEEP',
            );
        } catch (e) {
            return false;
        }
    };

    const ReadCharacteristic = async () => {
        // await handleReadCOM_TEM();
        // await handleReadCOM_RES();
        // await handleReadCOM_IMP();
        // await handleReadCOM_FRE();
        await handleReadCOM_SWEEP();
        if ((COM_SWEEP as any).value !== 0) {
            globalThis.Measurement_T = (COM_SWEEP as any).value;
        }
    };

    /*useEffect(() => {
        const timerWrite = setTimeout(() => {
            ReadCharacteristic();
        }, 1);
        return () => clearTimeout(timerWrite);
    }, []);*/

    const DisplayTem = () => {
        if ((COM_SWEEP as any).value === undefined) {
            if (globalThis.Measurement_T !== undefined) {
                setCOM_SWEEP({
                    ...(COM_SWEEP as any),
                    value: globalThis.Measurement_T,
                });
            } else {
                setCOM_SWEEP({
                    ...(COM_SWEEP as any),
                    value: 0,
                });
            }
        }

        return '\n' + (COM_SWEEP as any).value;
    };

    const DisplayRes = () => {
        if ((COM_RES as any).value === undefined) {
            if (globalThis.Measurement_R !== undefined) {
                setCOM_RES({
                    ...(COM_RES as any),
                    value: globalThis.Measurement_R[
                        globalThis.Measurement_R.length - 1
                    ],
                });
            } else {
                setCOM_RES({
                    ...(COM_RES as any),
                    value: 0,
                });
            }
        }

        return '\n' + (COM_RES as any).value;
    };

    const DisplayImp = () => {
        if ((COM_IMP as any).value === undefined) {
            if (globalThis.Measurement_X !== undefined) {
                setCOM_IMP({
                    ...(COM_IMP as any),
                    value: globalThis.Measurement_X[
                    globalThis.Measurement_X.length - 1
                        ],
                });
            } else {
                setCOM_IMP({
                    ...(COM_IMP as any),
                    value: 0,
                });
            }
        }

        return '\n' + (COM_IMP as any).value;
    };

    const DisplayFre = () => {
        if ((COM_FRE as any).value === undefined) {
            if (globalThis.Measurement_F !== undefined) {
                setCOM_FRE({
                    ...(COM_FRE as any),
                    value: globalThis.Measurement_F[
                    globalThis.Measurement_F.length - 1
                        ],
                });
            } else {
                setCOM_FRE({
                    ...(COM_FRE as any),
                    value: 0,
                });
            }
        }

        return '\n' + (COM_FRE as any).value;
    };

    return (
        <NativeBaseProvider>
            <View>
                <Center>
                    <HStack style={displayDataComponent.column} space={'3%'}>
                        <Text style={displayDataComponent.text}>
                            {t('DataScreen.temperature')}
                            {DisplayTem()}
                        </Text>
                        <Text style={displayDataComponent.text}>
                            {t('DataScreen.resistance')}
                            {DisplayRes()}
                        </Text>
                        <Text style={displayDataComponent.text}>
                            {t('DataScreen.impedance')}
                            {DisplayImp()}
                        </Text>
                        <Text style={displayDataComponent.text}>
                            {t('DataScreen.frequency')}
                            {DisplayFre()}
                        </Text>
                    </HStack>
                </Center>
            </View>
        </NativeBaseProvider>
    );
};
