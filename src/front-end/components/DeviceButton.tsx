import React from 'react';
import { Button, NativeBaseProvider, Text, View } from 'native-base';
import { device_buttonComponent } from './style/DeviceButtonStyle';

interface Props {
    navigation: any;
    goto: any;
    name: React.ReactNode;
    id: React.ReactNode;
    onPress: any;
}

export const DeviceButton = function ({
    navigation,
    goto,
    name,
    id,
    onPress,
}: Props): JSX.Element {
    return (
        <NativeBaseProvider>
            <View style={device_buttonComponent.container}>
                <Button
                    style={device_buttonComponent.button}
                    onPressIn={onPress}
                    onPressOut={() => navigation.navigate(goto)}>
                    <Text style={device_buttonComponent.text}>{name}</Text>
                </Button>
            </View>
        </NativeBaseProvider>
    );
};
