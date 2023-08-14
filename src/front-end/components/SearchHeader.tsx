import React from 'react';
import {
    Button,
    ChevronLeftIcon,
    HStack,
    NativeBaseProvider,
    SearchIcon,
    View,
    Text,
} from 'native-base';
import { search_headerComponent } from './style/SearchHeaderStyle';
import { manager } from '../../back-end/bluetooth/BLEService';

interface Props {
    navigation: any;
    goto: any;
    refreshing: React.ReactNode;
    title: any;
}

export const SearchHeader = function ({
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
                <Button
                    style={search_headerComponent.button2}
                    onPress={EnableSerach}>
                    <SearchIcon size="8" color={'rgb(255,255,255)'} />
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
            handleDisconnectDevice();
        } else {
            manager.cancelTransaction('COM_TEM');
            manager.cancelTransaction('COM_RES');
            manager.cancelTransaction('COM_IMP');
            manager.cancelTransaction('COM_FRE');
            navigation.navigate(goto);
        }
    };

    return (
        <NativeBaseProvider>
            <View style={search_headerComponent.container}>
                <HStack>
                    <Button
                        style={search_headerComponent.button1}
                        onPress={() => DisconnectButton(refreshing)}>
                        <ChevronLeftIcon size="8" color={'rgb(255,255,255)'} />
                    </Button>
                    {RefreshButton(refreshing)}
                </HStack>
                <Text style={search_headerComponent.title}>{title}</Text>
            </View>
        </NativeBaseProvider>
    );
};
