import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Example from '../front-end/screens/Example';
import { WelcomeScreen } from '../front-end/screens/WelcomeScreen';
import { DevicesList } from '../front-end/screens/DevicesListScreen';
import { DataScreen } from '../front-end/screens/DataScreen';
import { DataBase } from '../front-end/screens/DataBaseScreen';
import { FrequencyScreen } from '../front-end/screens/FrequencyScreen';
import { SettingsScreen } from '../front-end/screens/SettingsScreen';

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
                component={DataScreen}
                options={{ title: 'Devices List Screen' }}
            />
            <Stack.Screen
                name="DataScreen"
                component={DataScreen}
                options={{ title: 'Data Screen' }}
            />
            <Stack.Screen
                name="DataBase"
                component={DataBase}
                options={{ title: 'Data Base' }}
            />
            <Stack.Screen
                name="FrequencyScreen"
                component={FrequencyScreen}
                options={{ title: 'Frequency Screen' }}
            />
            <Stack.Screen
                name="SettingsScreen"
                component={SettingsScreen}
                options={{ title: 'Settings Screen' }}
            />
        </Stack.Navigator>
    );
};
