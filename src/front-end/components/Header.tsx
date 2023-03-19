import React, { useState } from "react";
import {
    Button,
    ChevronLeftIcon,
    HStack,
    NativeBaseProvider,
    SearchIcon,
    Text,
    View,
} from 'native-base';
import { headerComponent } from './style/HeaderStyle';

import { ConnectionPriority, Device, DeviceId } from 'react-native-ble-plx';
import { requestPermission } from '../../back-end/bluetooth/BLEFunctions';
import {
    CharacteristicsUUIDs,
    manager,
    ServiceUUIDs,
} from '../../back-end/bluetooth/BLEService';

interface Props {
    navigation: any;
    goto: any;
    refreshing: React.ReactNode;
    title: React.ReactNode;
}

export const Header = function ({
    navigation,
    goto,
    refreshing,
    title,
}: Props): JSX.Element {
    const [, setDeviceCount] = useState<DeviceId | string>('0');
    const [scannedDevices, setScannedDevices] = useState<Device[]>([]);

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
        return true;
    }

    const RefreshButton = (value: any) => {
        if (value === 'enable') {
            return (
                <Button style={headerComponent.button2} onPress={BLE_Button}>
                    <SearchIcon size="8" color={'rgb(0, 0, 0)'} />
                </Button>
            );
        }
    };

    return (
        <NativeBaseProvider>
            <View style={headerComponent.container}>
                <HStack>
                    <Button
                        style={headerComponent.button1}
                        onPress={() => navigation.navigate(goto)}>
                        <ChevronLeftIcon size="8" color={'rgb(0, 0, 0)'} />
                    </Button>
                    {RefreshButton(refreshing)}
                </HStack>
                <Text style={headerComponent.title}>{title}</Text>
            </View>
        </NativeBaseProvider>
    );
};
