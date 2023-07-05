import React from 'react';
import {
    Box,
    Button,
    HStack,
    NativeBaseProvider,
    Text,
    View,
} from 'native-base';
import { useTranslation } from 'react-i18next';
import { manager } from '../../back-end/bluetooth/BLEService';
import { device_menuScreen } from './style/DeviceMenuStyle';
import { Header } from '../components/Header';

export const DeviceMenu = function ({ navigation }: any): JSX.Element {
    const { t } = useTranslation();

    const handleDisconnectDevice = async () => {
        await manager.cancelDeviceConnection((globalThis as any).deviceID);
        return navigation.navigate('DevicesList');
    };

    return (
        <NativeBaseProvider>
            <View style={device_menuScreen.container}>
                <Header
                    navigation={navigation}
                    goto={'DeviceMenu'}
                    refreshing={'disconnect'}
                    title={t('DeviceMenuScreen.title')}
                />
                <Box style={device_menuScreen.box}>
                    <HStack space={'5%'}>
                        <Button
                            style={device_menuScreen.button}
                            onPress={() => navigation.navigate('DataScreen')}>
                            <Text style={device_menuScreen.text}>
                                {t('DeviceMenuScreen.value1')}
                            </Text>
                        </Button>
                        <Button
                            style={device_menuScreen.button}
                            onPress={() => navigation.navigate('DataBase')}>
                            <Text style={device_menuScreen.text}>
                                {'Data Base'}
                            </Text>
                        </Button>
                    </HStack>
                    <HStack space={'5%'}>
                        <Button
                            style={device_menuScreen.button}
                            onPress={() =>
                                navigation.navigate('FrequencyScreen')
                            }>
                            <Text style={device_menuScreen.text}>
                                {'Frequency'}
                            </Text>
                        </Button>
                        <Button
                            style={device_menuScreen.button}
                            onPress={handleDisconnectDevice}>
                            <Text style={device_menuScreen.text}>
                                {t('DeviceMenuScreen.disconnected')}
                            </Text>
                        </Button>
                    </HStack>
                </Box>
            </View>
        </NativeBaseProvider>
    );
};
