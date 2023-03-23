import React from 'react';
import { Button, NativeBaseProvider, Text, View } from 'native-base';

import {
    manager,
    ServiceUUIDs,
    CharacteristicsUUIDs,
} from '../../back-end/bluetooth/BLEService';

export const DeviceMenu = function ({ navigation }: any): JSX.Element {
    const handleDisconnectDevice = async () => {
        await manager.cancelDeviceConnection((globalThis as any).deviceID);
        return navigation.navigate('DevicesList');
    };
    return (
        <NativeBaseProvider>
            <View>
                <Text>Test</Text>
                <Button onPress={handleDisconnectDevice}>Disconnected</Button>
            </View>
        </NativeBaseProvider>
    );
};
