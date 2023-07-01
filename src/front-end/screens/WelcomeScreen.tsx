import React from 'react';
import { useTranslation } from 'react-i18next';
import { ImageBackground, View } from 'react-native';
import { Button, NativeBaseProvider, Text } from 'native-base';

import { welcomeScreen } from './style/WelcomeScreenStyle';

export const WelcomeScreen = function ({ navigation }: any): JSX.Element {
    const { t } = useTranslation();

    return (
        <NativeBaseProvider>
            <ImageBackground
                style={welcomeScreen.picture}
                source={require('../pictures/logo_wallpaper.png')}>
                <View style={welcomeScreen.container}>
                    <Button
                        style={welcomeScreen.button}
                        onPress={() => navigation.navigate('DevicesList')}>
                        <Text style={welcomeScreen.button_text}>
                            {t('WelcomeScreen.button')}
                        </Text>
                    </Button>
                    <Text style={welcomeScreen.text}>
                        {t('WelcomeScreen.description')}
                    </Text>
                </View>
            </ImageBackground>
        </NativeBaseProvider>
    );
};
