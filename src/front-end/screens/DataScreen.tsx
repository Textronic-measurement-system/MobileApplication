import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
    manager,
    ServiceUUIDs,
    CharacteristicsUUIDs,
} from '../../back-end/bluetooth/BLEService';
import { Box, NativeBaseProvider, Text, View } from 'native-base';
import { SelectHeader } from '../components/SelectHeader';
import { SelectButton } from '../components/SelectButton';
import { dataScreen } from './style/DataScreenStyle';

export const DataScreen = function ({ navigation }: any): JSX.Element {
    return (
      <NativeBaseProvider>
          <View style={dataScreen.container}>
              <SelectHeader navigation={navigation} />
              <Box style={dataScreen.box}>
                  <SelectButton />
              </Box>
          </View>
      </NativeBaseProvider>
    );
};
