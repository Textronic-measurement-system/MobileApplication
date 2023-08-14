import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, NativeBaseProvider, View, FlatList, Center } from 'native-base';

import { DeviceButton } from '../components/DeviceButton';
import { devices_listScreen } from './style/DevicesListScreenStyle';

import { Device, DeviceId } from 'react-native-ble-plx';
import { requestPermission } from '../../back-end/bluetooth/BLEFunctions';
import {
    manager,
    ServiceUUIDs,
    CharacteristicsUUIDs,
} from '../../back-end/bluetooth/BLEService';
import { SearchHeader } from '../components/SearchHeader';

export const DevicesList = function ({ navigation }: any): JSX.Element {
    const { t } = useTranslation();

    const [logData, setLogData] = useState([]);
    const [, setLogCount] = useState(0);
    const [, setDeviceCount] = useState<DeviceId | string>('0');
    const [scannedDevices, setScannedDevices] = useState<Device[]>([]);

    useEffect(() => {
        manager.onStateChange(() => {
            const subscription = manager.onStateChange(async () => {
                const newLogData = logData;
                await setLogCount(newLogData.length);
                await setLogData(newLogData);
                subscription.remove();
            }, true);
            return () => subscription.remove();
        });
    }, []);

    async function BLE_Button() {
        const btState = await manager.state();
        if (btState !== 'PoweredOn') {
            return false;
        }
        const permission = await requestPermission();
        if (permission) {
            manager.startDeviceScan(
                null,
                { allowDuplicates: false },
                async (error, Device) => {
                    if (Device) {
                        const newScannedDevices = scannedDevices;
                        newScannedDevices[Device.id as any] = Device;
                        await setDeviceCount(
                            Object.keys(newScannedDevices).length as any,
                        );
                        await setScannedDevices(scannedDevices);
                    } else if (error) {
                        return;
                    }
                },
            );
        }
        globalThis.Search = 'disable';
        return true;
    }

    useEffect(() => {
        const timerWrite1 = setInterval(() => {
            if (globalThis.Search === 'enable') {
                BLE_Button();
            }
        }, 500);
        return () => {
            clearInterval(timerWrite1);
        };
    }, []);

    const handleDeviceConnection = async (id: DeviceId, name: Device) => {
        try {
            manager.stopDeviceScan();
            await manager.connectedDevices([ServiceUUIDs.VSP]);
            setDeviceCount(id);
            const connectedDevice = await manager.connectToDevice(id, {
                requestMTU: 247,
            });
            console.log(connectedDevice.mtu);
            if (connectedDevice.mtu === 247) {
                console.log('request good');
            }

            await manager.requestConnectionPriorityForDevice(id, 1, 'COM_TX');

            await connectedDevice.discoverAllServicesAndCharacteristics();
            //check characteristics
            manager
                .characteristicsForDevice(connectedDevice.id, ServiceUUIDs.VSP)
                .then((characteristics) => {
                    console.log('characteristics:');
                    for (let i = 0; i < characteristics.length; i++) {
                        console.log(characteristics[i].uuid);

                        manager.stopDeviceScan();
                        (globalThis as any).deviceID = id;
                        (globalThis as any).deviceName = name;
                        globalThis.screen_used = 0;
                        navigation.navigate('DataScreen');
                    }
                })
                .catch((err) => {
                    setDeviceCount('');
                    console.log('There was an error:' + err);
                    return;
                });
        } catch (e) {
            setDeviceCount('');
            console.log(e);
        }
    };

    return (
        <NativeBaseProvider>
            <View style={devices_listScreen.container}>
                <SearchHeader
                    navigation={navigation}
                    goto={'Root'}
                    refreshing={'enable'}
                    title={t('DevicesListScreen.title')}
                />
                <Box style={devices_listScreen.box}>
                    <FlatList
                        style={devices_listScreen.scroll}
                        data={Object.values(scannedDevices)}
                        renderItem={({ item }) => {
                            if (item.name != null) {
                                return (
                                    <Center>
                                        <DeviceButton
                                            name={`${item.name}`}
                                            id={`${item.id}`}
                                            onPress={() => {
                                                handleDeviceConnection(
                                                    (item as any).id,
                                                    (item as any).name,
                                                ).catch((err) => {
                                                    console.log(err);
                                                    return;
                                                });
                                            }}
                                        />
                                    </Center>
                                );
                            }
                        }}
                    />
                </Box>
            </View>
        </NativeBaseProvider>
    );
};
