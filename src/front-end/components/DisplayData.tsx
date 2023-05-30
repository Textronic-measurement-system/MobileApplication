import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
    Center,
    NativeBaseProvider,
    Text,
    View,
} from 'native-base';
import { displayDataComponent } from './style/DisplayDataStyle';
import {
    manager,
    ServiceUUIDs,
    CharacteristicsUUIDs,
} from '../../back-end/bluetooth/BLEService';

export const DisplayData = function (): JSX.Element {
    const { t } = useTranslation();
    const id = globalThis.deviceID;
    const base64 = require('base-64');
    const [COMX, setCOMX] = useState('');

    const handleReadCOMX = async () => {
        try {
            await manager.monitorCharacteristicForDevice(
              id,
              ServiceUUIDs.VSP,
              CharacteristicsUUIDs.COM_X,
              (error, characteristic) => {
                  if (error) {
                      console.log(error);
                  }
                  setCOMX({
                      ...(COMX as any),
                      value: base64.decode(characteristic.value),
                  });
              },
              'COM_X',
            );
        } catch (e) {
            return false;
        }
    };

    const ReadCharacteristic = async () => {
        if (globalThis.valueType === '1') {
            await handleReadCOMX();
            console.log(COMX.value);
        }
    };

    useEffect(() => {
        const timerWrite = setTimeout(() => {
            ReadCharacteristic();
        }, 10);
        return () => clearTimeout(timerWrite);
    }, []);

    return (
        <NativeBaseProvider>
            <View>
                <Center>
                    <Text style={displayDataComponent.sliderText}>{globalThis.valueType}</Text>
                    <Text style={displayDataComponent.sliderText}>{COMX.value}</Text>
                </Center>
            </View>
        </NativeBaseProvider>
    );
};
