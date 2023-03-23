import React from 'react';
import { NativeBaseProvider, Text, View } from 'native-base';

export const DeviceMenu = function ({ navigation }: any): JSX.Element {
    return (
        <NativeBaseProvider>
            <View>
                <Text>Test</Text>
            </View>
        </NativeBaseProvider>
    );
};
