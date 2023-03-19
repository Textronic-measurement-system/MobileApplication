import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Example from '../front-end/screens/Example';
import { WelcomeScreen } from '../front-end/screens/WelcomeScreen';

const Stack = createNativeStackNavigator();

export const RootNavigator = function (): JSX.Element {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name="Root"
                component={WelcomeScreen}
                options={{ title: 'Welcome Screen' }}
            />
        </Stack.Navigator>
    );
};
