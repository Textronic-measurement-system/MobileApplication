import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { RootNavigator } from './navigation/RootNavigator';
import { NativeBaseProvider } from 'native-base';
import { LogBox } from 'react-native';

export default function App(): JSX.Element {
    LogBox.ignoreLogs(['NativeEventEmitter']);
    return (
        <NativeBaseProvider>
            <NavigationContainer>
                <RootNavigator />
            </NavigationContainer>
        </NativeBaseProvider>
    );
}
