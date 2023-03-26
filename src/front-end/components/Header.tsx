import React, { useState } from 'react';
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
import { manager } from '../../back-end/bluetooth/BLEService';

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
    const EnableSerach = () => {
        (globalThis as any).Search = 'enable';
    };

    const RefreshButton = (value: any) => {
        if (value === 'enable') {
            return (
                <Button style={headerComponent.button2} onPress={EnableSerach}>
                    <SearchIcon size="8" color={'rgb(0, 0, 0)'} />
                </Button>
            );
        }
    };

    const handleDisconnectDevice = async () => {
        await manager.cancelDeviceConnection((globalThis as any).deviceID);
        return navigation.navigate('DevicesList');
    };

    const DisconnectButton = (value: any) => {
        if (value === 'disconnect') {
            handleDisconnectDevice(value);
        } else {
            navigation.navigate(goto);
        }
    };

    return (
        <NativeBaseProvider>
            <View style={headerComponent.container}>
                <HStack>
                    <Button
                        style={headerComponent.button1}
                        onPress={() => DisconnectButton(refreshing)}>
                        <ChevronLeftIcon size="8" color={'rgb(0, 0, 0)'} />
                    </Button>
                    {RefreshButton(refreshing)}
                </HStack>
                <Text style={headerComponent.title}>{title}</Text>
            </View>
        </NativeBaseProvider>
    );
};
