import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Center, HStack, NativeBaseProvider, Text, View } from 'native-base';
import { displayDataComponent } from './style/DisplayDataStyle';
import { manager, ServiceUUIDs } from '../../back-end/bluetooth/BLEService';
import { GetBLEMeasurementsText } from '../../back-end/GetBLEMeasurement';
import { GetMeasurementsText } from '../../back-end/GetMeasurements';
import { AddMeasurements } from '../../back-end/AddMeasurement';
import { DeviceId } from 'react-native-ble-plx';

export const DisplayData = function (): JSX.Element {
    const { t } = useTranslation();

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

    const Timer = () => {
        if (count >= 1000000) {
            setCount(0);
        } else {
            setCount(count + 1);
        }
    };

    const WriteDataToDB = () => {
        AddMeasurements(globalThis.BLE_Sweep);
        GetMeasurementsText();
        DisplayTem();
        DisplayRes();
        DisplayImp();
        DisplayFre();
        console.log('Measured');
        globalThis.connection_flag = 0;
    };

    const ReadBT = () => {
        GetBLEMeasurementsText();
        globalThis.connection_flag = 2;
    };

    const DeviceConnection = async (id: DeviceId) => {
        try {
            manager.stopDeviceScan();
            await manager.connectedDevices([ServiceUUIDs.VSP]);

            const connectedDevice = await manager.connectToDevice(id, {
                requestMTU: 517,
            });
            console.log(connectedDevice.mtu);
            if (connectedDevice.mtu !== 27) {
                console.log('request good');
            }

            await manager.requestConnectionPriorityForDevice(
                id,
                1,
                'COM_SWEEP',
            );

            await connectedDevice.discoverAllServicesAndCharacteristics();
            manager
                .characteristicsForDevice(connectedDevice.id, ServiceUUIDs.VSP)
                .then(() => {
                    manager.stopDeviceScan();
                    console.log('Connected');
                    globalThis.connection_flag = 1;
                })
                .catch((err) => {
                    console.log('There was an error:' + err);
                    return;
                });
        } catch (e) {
            console.log(e);
        }
    };

    const Reconnection = async () => {
        await DeviceConnection(globalThis.deviceID);
    };

    useEffect(() => {
        setTimeout(() => {
            Timer();
        }, 5000);
        if (globalThis.screen_used === 0 || globalThis.screen_used === 1) {
            setTimeout(() => {
                if (globalThis.connection_flag === 0) {
                    Reconnection();
                } else if (globalThis.connection_flag === 1) {
                    ReadBT();
                } else if (globalThis.connection_flag === 2) {
                    WriteDataToDB();
                }
            }, 5000);
        }
    }, [count]);

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
                            {t('DataScreen.temperature') + '\n'}
                            {(COM_TEM as any).value}
                        </Text>
                        <Text style={displayDataComponent.text}>
                            {t('DataScreen.resistance') + '\n'}
                            {(COM_RES as any).value}
                        </Text>
                        <Text style={displayDataComponent.text}>
                            {t('DataScreen.impedance') + '\n'}
                            {(COM_IMP as any).value}
                        </Text>
                        <Text style={displayDataComponent.text}>
                            {t('DataScreen.frequency') + '\n'}
                            {(COM_FRE as any).value}
                        </Text>
                    </HStack>
                </Center>
            </View>
        </NativeBaseProvider>
    );
};
