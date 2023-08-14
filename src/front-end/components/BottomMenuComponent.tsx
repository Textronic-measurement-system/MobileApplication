import React from 'react';
import { Button, Center, HStack, Text, View } from 'native-base';
import { bottom_menuComponent } from './style/BottomMenuStyle';
import { manager } from '../../back-end/bluetooth/BLEService';
import { useTranslation } from 'react-i18next';

interface Props {
    navigation: any;
}

export const BottomMenuComponent = function ({
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
        globalThis.screen_used = 0;
        navigation.navigate('DataScreen');
    };

    const ButtonTwo = () => {
        globalThis.screen_used = 1;
        navigation.navigate('FrequencyScreen');
    };

    const ButtonThree = () => {
        globalThis.screen_used = 2;
        StopTransferBTData();
        navigation.navigate('SettingsScreen');
    };

    const ButtonFour = () => {
        globalThis.screen_used = 0;
        /*DisconnectButton();*/
        navigation.navigate('DevicesList');
    };

    const CheckTextStyle = (screen_used: number) => {
        if (screen_used === 0 || screen_used === undefined) {
            return (
                <HStack space={'1.5%'}>
                    <Button
                        style={bottom_menuComponent.button}
                        onPress={ButtonOne}>
                        <Text style={bottom_menuComponent.text1}>
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
            );
        } else if (screen_used === 1) {
            return (
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
                        <Text style={bottom_menuComponent.text1}>
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
            );
        } else if (screen_used === 2) {
            return (
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
                        <Text style={bottom_menuComponent.text1}>
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
            );
        }
    };

    return (
        <View style={bottom_menuComponent.container}>
            <Center>{CheckTextStyle(globalThis.screen_used)}</Center>
        </View>
    );
};
