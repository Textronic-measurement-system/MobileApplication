import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Text, HStack } from 'native-base';
import { remoteControlComponent } from './style/SelectButtonStyle';
import { DisplayData } from './DisplayData';
import { Image } from 'react-native';

export const SelectButton = function (): JSX.Element {
    const { t } = useTranslation();

    if (globalThis.valueType != null) {
        if (globalThis.valueType === '1') {
            return <DisplayData />;
        }
    }
    return (
        <Button style={remoteControlComponent.button}>
            <Text style={remoteControlComponent.text}>{'ERROR 404'}</Text>
        </Button>
    );
};
