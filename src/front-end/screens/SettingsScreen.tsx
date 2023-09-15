import React from 'react';
import { Box, Button, NativeBaseProvider, View, VStack } from 'native-base';
import { dataScreen } from './style/DataScreenStyle';
import { Header } from '../components/Header';
import { useTranslation } from 'react-i18next';
import { BottomMenuComponent } from '../components/BottomMenuComponent';
import { GetMeasurementsText } from '../../back-end/GetMeasurements';
import { GetBLEMeasurementsText } from '../../back-end/GetBLEMeasurement';
import { AddMeasurements } from '../../back-end/AddMeasurement';
import { manager, ServiceUUIDs } from '../../back-end/bluetooth/BLEService';
import { DeviceId } from 'react-native-ble-plx';

export const SettingsScreen = function ({ navigation }: any): JSX.Element {
    const { t } = useTranslation();

    const Disconnect = async () => {
        await manager.cancelDeviceConnection(globalThis.deviceID);
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

    return (
        <NativeBaseProvider>
            <View style={dataScreen.container}>
                <Header title={t('ScreenNames.settings')} />
                <Box style={dataScreen.box}>
                    <VStack space={5} marginTop={5}>
                        <Button
                            onPress={GetMeasurementsText}
                            colorScheme={'pink'}>
                            Get DB Data
                        </Button>
                        <Button onPress={GetBLEMeasurementsText}>
                            Get BT Data
                        </Button>
                        <Button
                            onPress={AddMeasurements}
                            colorScheme={'purple'}>
                            Add Data
                        </Button>
                        <Button onPress={Reconnection} colorScheme={'green'}>
                            Reconnect
                        </Button>
                        <Button onPress={Disconnect} colorScheme={'yellow'}>
                            Disconnect
                        </Button>
                    </VStack>
                </Box>
                <BottomMenuComponent navigation={navigation} />
            </View>
        </NativeBaseProvider>
    );
};
