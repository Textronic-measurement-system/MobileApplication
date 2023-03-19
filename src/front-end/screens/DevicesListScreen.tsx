import React from 'react';
import { useTranslation } from 'react-i18next';
import { NativeBaseProvider, Text, View } from 'native-base';

import { Header } from '../components/Header';
import { deviceslistScreen } from './style/DevicesListScreenStyle';

export const DevicesList = function ({ navigation }: any): JSX.Element {
    const { t } = useTranslation();

    return (
        <NativeBaseProvider>
            <View style={deviceslistScreen.container}>
                <Header
                    navigation={navigation}
                    goto={'Root'}
                    refreshing={'enable'}
                    title={t('DevicesListScreen.title')}
                />
            </View>
        </NativeBaseProvider>
    );
};
