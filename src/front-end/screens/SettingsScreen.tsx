import React from 'react';
import { Box, Button, NativeBaseProvider, View } from 'native-base';
import { dataScreen } from './style/DataScreenStyle';
import { Header } from '../components/Header';
import { useTranslation } from 'react-i18next';
import { BottomMenuComponent } from '../components/BottomMenuComponent';
import { GetMeasurementsText } from '../../back-end/GetMeasurements';
import { GetBLEMeasurementsText } from '../../back-end/GetBLEMeasurement';
import { AddMeasurements } from '../../back-end/AddMeasurement';

export const SettingsScreen = function ({ navigation }: any): JSX.Element {
    const { t } = useTranslation();

    const ParsingData = () => {
        const jsonData = JSON.parse(
            JSON.parse(JSON.stringify(globalThis.BLE_Sweep)),
        );

        const F = jsonData.F;
        console.log('Frequency: ' + F);
        const R = jsonData.R;
        console.log('Resistance: ' + R);
        const X = jsonData.X;
        console.log('Impedance: ' + X);
    };

    return (
        <NativeBaseProvider>
            <View style={dataScreen.container}>
                <Header title={t('ScreenNames.settings')} />
                <Box style={dataScreen.box}>
                    <Button onPress={GetMeasurementsText} colorScheme={'pink'}>
                        GET DATA
                    </Button>
                    <Button onPress={GetBLEMeasurementsText}>
                        GET BT DATA
                    </Button>
                    <Button onPress={ParsingData} colorScheme={'red'}>
                        PARSE DATA
                    </Button>
                    <Button onPress={AddMeasurements} colorScheme={'purple'}>
                        ADD DATA
                    </Button>
                </Box>
                <BottomMenuComponent navigation={navigation} />
            </View>
        </NativeBaseProvider>
    );
};
