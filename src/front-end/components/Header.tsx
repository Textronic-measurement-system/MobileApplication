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
import { BLE_Button } from '../screens/DevicesListScreen';

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
