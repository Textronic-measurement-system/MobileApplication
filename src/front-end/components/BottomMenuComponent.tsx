import React from 'react';
import { Button, Center, HStack, Text, View } from 'native-base';
import { bottom_menuComponent } from './style/BottonMenuStyle';
import { manager } from '../../back-end/bluetooth/BLEService';
import { useTranslation } from 'react-i18next';

interface Props {
    navigation: any;
}

export const BottonMenuComponent = function ({
    navigation,
}: Props): JSX.Element {
    const { t } = useTranslation();

    const handleDisconnectDevice = async () => {
        await manager.cancelDeviceConnection((globalThis as any).deviceID);
        return navigation.navigate('DevicesList');
    };

    const DisconnectButton = () => {
        handleDisconnectDevice();
    };

    const StopTransferBTData = () => {
        manager.cancelTransaction('COM_TEM');
        manager.cancelTransaction('COM_RES');
        manager.cancelTransaction('COM_IMP');
        manager.cancelTransaction('COM_FRE');
    };

    const ButtonOne = () => {
        navigation.navigate('DataScreen');
    };

    const ButtonTwo = () => {
        navigation.navigate('FrequencyScreen');
    };

    const ButtonThree = () => {
        StopTransferBTData();
        navigation.navigate('DeviceMenu');
    };

    const ButtonFour = () => {
        DisconnectButton();
        navigation.navigate('DevicesList');
    };

    return (
        <View style={bottom_menuComponent.container}>
            <Center>
                <HStack space={'1.5%'}>
                    <Button
                        style={bottom_menuComponent.button}
                        onPress={ButtonOne}>
                        <Text style={bottom_menuComponent.text}>
                            {t('ScreenNames.home')}
                        </Text>
                    </Button>
                    <Button
                        style={bottom_menuComponent.button}
                        onPress={ButtonTwo}>
                        <Text style={bottom_menuComponent.text}>
                            {t('ScreenNames.frequency')}
                        </Text>
                    </Button>
                    <Button
                        style={bottom_menuComponent.button}
                        onPress={ButtonThree}>
                        <Text style={bottom_menuComponent.text}>
                            {t('ScreenNames.settings')}
                        </Text>
                    </Button>
                    <Button
                        style={bottom_menuComponent.button}
                        onPress={ButtonFour}>
                        <Text style={bottom_menuComponent.text}>
                            {t('ScreenNames.logout')}
                        </Text>
                    </Button>
                </HStack>
            </Center>
        </View>
    );
};
