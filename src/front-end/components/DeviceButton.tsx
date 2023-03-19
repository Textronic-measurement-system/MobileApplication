import React from 'react';
import {
    Button,
    Text,
    View,
} from 'native-base';
import { device_buttonComponent } from './style/DeviceButtonStyle';

interface Props {
    navigation: any;
    goto: any;
    name: React.ReactNode;
    id: React.ReactNode;
}

export const DeviceButton = function ({
    navigation,
    goto,
    name,
id,
}: Props): JSX.Element {
    return (
        <View style={device_buttonComponent.container}>
            <Button
                style={device_buttonComponent.button}
                onPress={() => navigation.navigate(goto)}>
                <Text style={device_buttonComponent.text}>{name}</Text>
            </Button>
        </View>
    );
};
