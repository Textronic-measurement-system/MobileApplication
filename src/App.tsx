import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { RootNavigator } from './navigation/RootNavigator';
import { NativeBaseProvider } from 'native-base';
import './translations/i18n';
import { LogBox } from 'react-native';

export default function App(): JSX.Element {
    LogBox.ignoreLogs(['NativeEventEmitter']);
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    return (
        <NativeBaseProvider>
            <NavigationContainer>
                <RootNavigator />
            </NavigationContainer>
        </NativeBaseProvider>
    );
}
