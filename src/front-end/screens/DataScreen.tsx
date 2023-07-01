import React from 'react';
import { Dimensions } from 'react-native';
import {
    Box,
    CircleIcon,
    HStack,
    NativeBaseProvider,
    Text,
    View,
    VStack,
} from 'native-base';
import { dataScreen } from './style/DataScreenStyle';
import { DisplayData } from '../components/DisplayData';
import { Header } from '../components/Header';
import { useTranslation } from 'react-i18next';
import { LineChart } from 'react-native-chart-kit';

export const DataScreen = function ({ navigation }: any): JSX.Element {
    const { t } = useTranslation();
    const data1 = [
        50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80,
    ];
    const data2 = [
        -87, 66, -69, 92, -40, -61, 16, 62, 20, -93, -54, 47, -89, -44, 18,
    ];
    const data3 = [5, 1, 4, 9, -4, -2, 8, 9, 3, 5, -5, 2, 5, -2, -8];
    const data4 = [
        -70, 60, -90, 20, -40, -60, 10, 60, 20, -93, -54, 40, -80, -40, 10,
    ];

    return (
        <NativeBaseProvider>
            <View style={dataScreen.container}>
                <Header
                    navigation={navigation}
                    goto={'DeviceMenu'}
                    refreshing={'disable'}
                    title={t('DeviceMenuScreen.value1')}
                />
                <Box style={dataScreen.box}>
                    <DisplayData />
                    <LineChart
                        data={{
                            datasets: [
                                {
                                    data: data1,
                                    strokeWidth: 1,
                                    color: () => 'rgb(218,16,16)',
                                },
                                {
                                    data: data2,
                                    strokeWidth: 1,
                                    color: () => 'rgb(197,18,215)',
                                },
                                {
                                    data: data3,
                                    strokeWidth: 1,
                                    color: () => 'rgb(26,152,12)',
                                },
                                {
                                    data: data4,
                                    strokeWidth: 1,
                                    color: () => 'rgb(36,15,187)',
                                },
                            ],
                        }}
                        width={Dimensions.get('window').width * 0.9}
                        height={Dimensions.get('window').height * 0.7}
                        chartConfig={{
                            backgroundGradientFrom: '#d9d9d9',
                            backgroundGradientTo: '#d9d9d9',
                            useShadowColorFromDataset: false,
                            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        }}
                        bezier
                        style={{
                            flex: 2,
                            top: '-15%',
                            borderRadius: 20,
                        }}
                        withShadow={false}
                        withInnerLines={true}
                        segments={13}
                    />
                    <VStack space={'5%'} style={dataScreen.legend}>
                        <HStack space={'10%'}>
                            <CircleIcon size="5" color={'rgb(218,16,16)'} />
                            <Text style={dataScreen.legendTest}>Hello</Text>
                        </HStack>
                        <HStack space={'10%'}>
                            <CircleIcon size="5" color={'rgb(197,18,215)'} />
                            <Text style={dataScreen.legendTest}>Hello</Text>
                        </HStack>
                        <HStack space={'10%'}>
                            <CircleIcon size="5" color={'rgb(26,152,12)'} />
                            <Text style={dataScreen.legendTest}>Hello</Text>
                        </HStack>
                        <HStack space={'10%'}>
                            <CircleIcon size="5" color={'rgb(36,15,187)'} />
                            <Text style={dataScreen.legendTest}>Hello</Text>
                        </HStack>
                    </VStack>
                </Box>
            </View>
        </NativeBaseProvider>
    );
};
