import React, { useEffect, useState } from 'react';
import { NativeBaseProvider } from 'native-base';
import { Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

interface Props {
    isEnabledRes: any;
    isEnabledImp: any;
}

export const FrequencyChart = function ({
    isEnabledRes,
    isEnabledImp,
}: Props): JSX.Element {
    const [dataRES, setDataRES] = useState([]);
    const [dataIMP, setDataIMP] = useState([]);

    useEffect(() => {
        checkSwitches();
    }, [isEnabledRes, isEnabledImp]);

    const checkSwitches = () => {
        if (isEnabledRes) {
            setDataRES(globalThis.Measurement_R);
        } else {
            setDataRES([]);
        }
        if (isEnabledImp) {
            setDataIMP(globalThis.Measurement_X);
        } else {
            setDataIMP([]);
        }
    };

    const changeDecimalPlaces = () => {
        if (
            isEnabledRes === false &&
            isEnabledImp === true
        ) {
            return (
                <LineChart
                    data={{
                        labels: [
                            '0',
                            '50',
                            '100',
                            '150',
                            '200',
                            '250',
                            '300',
                            '350',
                            '400',
                            '450',
                            '500',
                            '550',
                            '600',
                            '650',
                            '700',
                            '750',
                            '800',
                            '850',
                            '900',
                            '950',
                            '1000',
                        ],
                        datasets: [
                            {
                                data: dataRES,
                                strokeWidth: 1,
                                color: () => 'rgb(197,18,215)',
                            },
                            {
                                data: dataIMP,
                                strokeWidth: 1,
                                color: () => 'rgb(26,152,12)',
                            },
                        ],
                    }}
                    fromZero={globalThis.chart_from_zero}
                    verticalLabelRotation={90}
                    width={Dimensions.get('window').width * 0.9}
                    height={Dimensions.get('window').height * 0.65}
                    chartConfig={{
                        backgroundGradientFrom: '#d9d9d9',
                        backgroundGradientTo: '#d9d9d9',
                        useShadowColorFromDataset: false,
                        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        decimalPlaces: 6,
                    }}
                    bezier
                    style={{
                        top: '-70%',
                        borderRadius: 20,
                    }}
                    withShadow={false}
                    withInnerLines={true}
                    segments={13}
                />
            );
        } else {
            return (
                <LineChart
                    data={{
                        labels: [
                            '0',
                            '50',
                            '100',
                            '150',
                            '200',
                            '250',
                            '300',
                            '350',
                            '400',
                            '450',
                            '500',
                            '550',
                            '600',
                            '650',
                            '700',
                            '750',
                            '800',
                            '850',
                            '900',
                            '950',
                            '1000',
                        ],
                        datasets: [
                            {
                                data: dataRES,
                                strokeWidth: 1,
                                color: () => 'rgb(197,18,215)',
                            },
                            {
                                data: dataIMP,
                                strokeWidth: 1,
                                color: () => 'rgb(26,152,12)',
                            },
                        ],
                    }}
                    fromZero={globalThis.chart_from_zero}
                    verticalLabelRotation={90}
                    width={Dimensions.get('window').width * 0.9}
                    height={Dimensions.get('window').height * 0.65}
                    chartConfig={{
                        backgroundGradientFrom: '#d9d9d9',
                        backgroundGradientTo: '#d9d9d9',
                        useShadowColorFromDataset: false,
                        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    }}
                    bezier
                    style={{
                        top: '-70%',
                        borderRadius: 20,
                    }}
                    withShadow={false}
                    withInnerLines={true}
                    segments={13}
                />
            );
        }
    };

    return (
        <NativeBaseProvider>
            {changeDecimalPlaces()}
        </NativeBaseProvider>
    );
};
