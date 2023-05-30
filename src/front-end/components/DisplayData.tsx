import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
    Button,
    Center,
    NativeBaseProvider,
    Text,
    View,
} from "native-base";
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
    const [COMTX, setCOMTX] = useState('');

    const handleWrite = async () => {
        try {
            await manager.writeCharacteristicWithoutResponseForDevice(
              id,
              ServiceUUIDs.VSP,
              CharacteristicsUUIDs.COM_RX,
              base64.encode(globalThis.RX_value),
            );
            await manager.readCharacteristicForDevice(
              id,
              ServiceUUIDs.VSP,
              CharacteristicsUUIDs.COM_RX,
            );
            console.log("123")
        } catch (e) {
            return false;
        }
    };

    const handleReadCOMTX = async () => {
        try {
            await manager.monitorCharacteristicForDevice(
              id,
              ServiceUUIDs.VSP,
              CharacteristicsUUIDs.COM_TX,
              (error, characteristic) => {
                  if (error) {
                      console.log(error);
                  }
                  setCOMTX({
                      ...(COMTX as any),
                      value: base64.decode(characteristic.value),
                  });
              },
              'COM_TX',
            );
        } catch (e) {
            return false;
        }
    };

    const ReadCharacteristic = async () => {
        if (globalThis.valueType === '1') {
            await handleReadCOMTX();
            return COMTX.value;
        }
        console.log("1");
    };

    useEffect(() => {
        const timerWrite = setTimeout(() => {
            ReadCharacteristic();
        }, 1);
        return () => clearTimeout(timerWrite);
    }, []);

    const DisplayValue = () => {
        if (globalThis.valueType === '1') {
            return COMTX.value;
        }
    };

    return (
        <NativeBaseProvider>
            <View>
                <Center>
                    <Text style={displayDataComponent.sliderText}>{globalThis.valueType}</Text>
                    <Text style={displayDataComponent.sliderText}>{DisplayValue()}</Text>
                    <Button
                      colorScheme="green"
                      onPress={handleWrite}>
                        Send Data
                    </Button>
                </Center>
            </View>
        </NativeBaseProvider>
    );
};
