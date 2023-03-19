import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
    Box,
    NativeBaseProvider,
    Text,
    View,
    ScrollView,
    FlatList,
} from 'native-base';

import { Header } from '../components/Header';
import { DeviceButton } from '../components/DeviceButton';
import { devices_listScreen } from './style/DevicesListScreenStyle';

import { ConnectionPriority, Device, DeviceId } from 'react-native-ble-plx';
import { requestPermission } from '../../back-end/bluetooth/BLEFunctions';
import {
    CharacteristicsUUIDs,
    manager,
    ServiceUUIDs,
} from '../../back-end/bluetooth/BLEService';

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

    const handleDeviceConnection = async (id: DeviceId, name: Device) => {
        try {
            manager.stopDeviceScan();
            await manager.connectedDevices([ServiceUUIDs.VSP]);
            setDeviceCount(id);
            const connectedDevice = await manager.connectToDevice(id, {
                requestMTU: 247,
            });
            if (connectedDevice.mtu === 247) {
                console.log('request good');
            }
            await connectedDevice.discoverAllServicesAndCharacteristics();
            //check characteristics
            manager
                .characteristicsForDevice(connectedDevice.id, ServiceUUIDs.VSP)
                .then((characteristics) => {
                    console.log('characteristics:');
                    for (let i = 0; i < characteristics.length; i++) {
                        console.log(characteristics[i].uuid);

                        if (
                            characteristics[i].uuid ===
                            CharacteristicsUUIDs.COM_TX
                        ) {
                            manager.stopDeviceScan();
                            (globalThis as any).deviceID = id;
                            (globalThis as any).deviceName = name;
                            navigation.navigate('DataScreen');
                        }
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
                <Header
                    navigation={navigation}
                    goto={'Root'}
                    refreshing={'enable'}
                    title={t('DevicesListScreen.title')}
                />
                <Box style={devices_listScreen.box}>
                    <ScrollView style={devices_listScreen.scroll}>
                        <DeviceButton
                            navigation={navigation}
                            goto={''}
                            name={'abadsasdsadsadssdasdla'}
                            id={'tasat'}
                        />
                        <FlatList
                            data={Object.values(scannedDevices)}
                            renderItem={({ item }) => {
                                if (item.name != null) {
                                    return (
                                        <Text
                                            onPress={() =>
                                                handleDeviceConnection(
                                                    (item as any).id,
                                                    (item as any).name,
                                                )
                                            }>
                                            {`${item.name} (${item.id})`}
                                        </Text>
                                    );
                                }
                            }}
                        />
                    </ScrollView>
                </Box>
            </View>
        </NativeBaseProvider>
    );
};
