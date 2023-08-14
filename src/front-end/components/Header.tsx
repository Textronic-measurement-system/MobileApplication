import React from 'react';
import { NativeBaseProvider, Text, View } from 'native-base';
import { headerComponent } from './style/HeaderStyle';

interface Props {
    title: React.ReactNode;
}

export const Header = function ({ title }: Props): JSX.Element {
    return (
        <NativeBaseProvider>
            <View style={headerComponent.container}>
                <Text style={headerComponent.title}>{title}</Text>
            </View>
        </NativeBaseProvider>
    );
};
