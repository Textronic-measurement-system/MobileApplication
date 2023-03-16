import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export const RootNavigator = function (): JSX.Element {
    return(
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            
        </Stack.Navigator>
    );
};