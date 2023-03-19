import React from 'react';
import { ImageBackground, View } from 'react-native';
import { Button, NativeBaseProvider, Text } from 'native-base';
import { useTranslation } from 'react-i18next';

import { welcomeScreen } from './style/WelcomeScreenStyle';

export const WelcomeScreen = function ({ navigation }: any): JSX.Element {
    const { t } = useTranslation();

    return (
        <NativeBaseProvider>
            <ImageBackground
                style={welcomeScreen.picture}
                source={require('../pictures/welcome-screen-picture.jpg')}>
                <View style={welcomeScreen.container}>
                    <Text style={welcomeScreen.text1}>{t('WelcomeScreen.welcome1')}</Text>
                    <Text style={welcomeScreen.text1}>{t('WelcomeScreen.welcome2')}</Text>
                    <Button style={welcomeScreen.button}>
                        <Text style={welcomeScreen.button_text}>
                            {t('WelcomeScreen.button')}
                        </Text>
                    </Button>
                    <Text style={welcomeScreen.text2}>{t('WelcomeScreen.description')}</Text>
                </View>
            </ImageBackground>
        </NativeBaseProvider>
    );
};
