import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Example from '../front-end/screens/Example';
import { WelcomeScreen } from '../front-end/screens/WelcomeScreen';
import { DevicesList } from '../front-end/screens/DevicesListScreen';
import { DeviceMenu } from '../front-end/screens/DeviceMenu';
import { DataScreen } from '../front-end/screens/DataScreen';

const Stack = createNativeStackNavigator();

export const RootNavigator = function (): JSX.Element {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name="Root"
                component={WelcomeScreen}
                options={{ title: 'Welcome Screen' }}
            />
            <Stack.Screen
                name="DevicesList"
                component={DeviceMenu}
                options={{ title: 'Devices List Screen' }}
            />
            <Stack.Screen
                name="DeviceMenu"
                component={DeviceMenu}
                options={{ title: 'Devices Menu Screen' }}
            />
            <Stack.Screen
                name="DataScreen"
                component={DataScreen}
                options={{ title: 'Data Screen' }}
            />
        </Stack.Navigator>
    );
};
