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
            setDataRES([
                -87, 66, -69, 92, -40, -61, 16, 62, 20, -93, -54, 47, -89, -44,
                18,
            ]);
        } else {
            setDataRES([]);
        }
        if (isEnabledImp) {
            setDataIMP([5, 1, 4, 9, -4, -2, 8, 9, 3, 5, -5, 2, 5, -2, -8]);
        } else {
            setDataIMP([]);
        }
    };

    return (
        <NativeBaseProvider>
            <LineChart
                data={{
                    labels: [
                        '0',
                        '100',
                        '200',
                        '300',
                        '400',
                        '500',
                        '600',
                        '700',
                        '800',
                        '900',
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
        </NativeBaseProvider>
    );
};
