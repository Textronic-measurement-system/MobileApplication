import React from 'react';
import { Box, NativeBaseProvider, Text, View } from 'native-base';
import { SelectHeader } from '../components/SelectHeader';
import { dataScreen } from './style/DataScreenStyle';
import { DisplayData } from '../components/DisplayData';

export const DataScreen = function ({ navigation }: any): JSX.Element {
    return (
        <NativeBaseProvider>
            <View style={dataScreen.container}>
                <SelectHeader navigation={navigation} />
                <Box style={dataScreen.box}>
                    <DisplayData />
                </Box>
            </View>
        </NativeBaseProvider>
    );
};
