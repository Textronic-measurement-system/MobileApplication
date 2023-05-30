import React from 'react';
import { useTranslation } from 'react-i18next';
import { Header } from './Header';

interface Props {
    navigation: any;
}

export const SelectHeader = function ({ navigation }: Props): JSX.Element {
    const { t } = useTranslation();

    if (globalThis.valueType != null) {
        if (globalThis.valueType === '1') {
            return (
                <Header
                    navigation={navigation}
                    goto={'DeviceMenu'}
                    refreshing={'disable'}
                    title={t('DeviceMenuScreen.value1')}
                />
            );
        }
    }
    return (
        <Header
            navigation={navigation}
            goto={'DeviceMenu'}
            refreshing={'disable'}
            title={'ERROR 404'}
        />
    );
};
