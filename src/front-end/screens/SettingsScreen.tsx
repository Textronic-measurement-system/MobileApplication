import React from 'react';
import { Box, Button, NativeBaseProvider, View, VStack } from 'native-base';
import { dataScreen } from './style/DataScreenStyle';
import { Header } from '../components/Header';
import { useTranslation } from 'react-i18next';
import { BottomMenuComponent } from '../components/BottomMenuComponent';
import { GetMeasurementsText } from '../../back-end/GetMeasurements';
import { GetBLEMeasurementsText } from '../../back-end/GetBLEMeasurement';
import { AddMeasurements } from '../../back-end/AddMeasurement';
import { manager } from '../../back-end/bluetooth/BLEService';

export const SettingsScreen = function ({ navigation }: any): JSX.Element {
    const { t } = useTranslation();

    const Disconnect = async () => {
        await manager.cancelDeviceConnection(globalThis.deviceID);
    };

    const Reconnection = async () => {
        await manager.connectToDevice(globalThis.deviceID, {
            requestMTU: 498,
        });
    };

    return (
        <NativeBaseProvider>
            <View style={dataScreen.container}>
                <Header title={t('ScreenNames.settings')} />
                <Box style={dataScreen.box}>
                    <VStack space={5} marginTop={5}>
                        <Button
                            onPress={GetMeasurementsText}
                            colorScheme={'pink'}>
                            Get DB Data
                        </Button>
                        <Button onPress={GetBLEMeasurementsText}>
                            Get BT Data
                        </Button>
                        <Button
                            onPress={AddMeasurements}
                            colorScheme={'purple'}>
                            Add Data
                        </Button>
                        <Button onPress={Reconnection} colorScheme={'green'}>
                            Reconnect
                        </Button>
                        <Button onPress={Disconnect} colorScheme={'yellow'}>
                            Disconnect
                        </Button>
                    </VStack>
                </Box>
                <BottomMenuComponent navigation={navigation} />
            </View>
        </NativeBaseProvider>
    );
};
