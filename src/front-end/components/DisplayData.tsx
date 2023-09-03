import React, { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Center, HStack, NativeBaseProvider, Text, View } from 'native-base';
import { displayDataComponent } from './style/DisplayDataStyle';
import {
    manager,
    ServiceUUIDs,
    CharacteristicsUUIDs,
} from '../../back-end/bluetooth/BLEService';
import { GetBLEMeasurementsText } from '../../back-end/GetBLEMeasurement';
import { GetMeasurementsText } from '../../back-end/GetMeasurements';
import { AddMeasurements } from '../../back-end/AddMeasurement';

export const DisplayData = function (): JSX.Element {
    const { t } = useTranslation();
    const id = globalThis.deviceID;
    const base64 = require('base-64');

    const [count, setCount] = useState(0);

    const [COM_TEM, setCOM_TEM] = useState(
        globalThis.Measurement_T === undefined
            ? '0'
            : globalThis.Measurement_T[globalThis.Measurement_T.length - 1],
    );
    const [COM_RES, setCOM_RES] = useState(
        globalThis.Measurement_R === undefined
            ? '0'
            : globalThis.Measurement_R[globalThis.Measurement_R.length - 1],
    );
    const [COM_IMP, setCOM_IMP] = useState(
        globalThis.Measurement_X === undefined
            ? '0'
            : globalThis.Measurement_X[globalThis.Measurement_X.length - 1],
    );
    const [COM_FRE, setCOM_FRE] = useState(
        globalThis.Measurement_F === undefined
            ? '0'
            : globalThis.Measurement_F[globalThis.Measurement_F.length - 1],
    );
    const [COM_SWEEP, setCOM_SWEEP] = useState('');

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
                    setCOM_SWEEP({
                        ...(COM_SWEEP as any),
                        value: base64.decode(characteristic.value),
                    });
                },
                'COM_SWEEP',
            );
        } catch (e) {
            return false;
        }
    };

    const ReadCharacteristic = async () => {
        if (count >= 1000000) {
            setCount(0);
        } else {
            setCount(count + 1);
        }

        await handleReadCOM_SWEEP();
        console.log(COM_SWEEP);
        await manager.cancelDeviceConnection((globalThis as any).deviceID);
        GetMeasurementsText();
        console.log('Measured');
    };

    const Reconnection = async () => {
        await manager.connectToDevice(globalThis.deviceID, {
            requestMTU: 517,
        });
        console.log('Connected ' + globalThis.deviceID);
    };

    // useEffect(() => {
    //     setTimeout(() => {
    //         ReadCharacteristic();
    //     }, 10000);
    //     setTimeout(() => {
    //         Reconnection();
    //     }, 10000);
    // }, [count]);

    const DisplayTem = () => {
        if ((COM_TEM as any).value === undefined) {
            if (globalThis.Measurement_T !== undefined) {
                setCOM_TEM({
                    ...(COM_TEM as any),
                    value: globalThis.Measurement_T[
                        globalThis.Measurement_T.length - 1
                    ],
                });
            } else {
                setCOM_TEM({
                    ...(COM_TEM as any),
                    value: 0,
                });
            }
        }

        return '\n' + (COM_TEM as any).value;
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
