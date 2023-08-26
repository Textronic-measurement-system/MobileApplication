import React, { useEffect, useState } from 'react';
import { NativeBaseProvider } from 'native-base';
import { Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

interface Props {
    isEnabledTem: any;
    isEnabledRes: any;
    isEnabledImp: any;
    isEnabledFre: any;
}

export const ChartComponent = function ({
    isEnabledTem,
    isEnabledRes,
    isEnabledImp,
    isEnabledFre,
}: Props): JSX.Element {
    const [dataTEM, setDataTEM] = useState([]);
    const [dataRES, setDataRES] = useState([]);
    const [dataIMP, setDataIMP] = useState([]);
    const [dataFRE, setDataFRE] = useState([]);

    useEffect(() => {
        checkSwitches();
    }, [isEnabledTem, isEnabledRes, isEnabledImp, isEnabledFre]);

    const checkSwitches = () => {
        if (isEnabledTem) {
            setDataTEM([
                10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80,
            ]);
        } else {
            setDataTEM([]);
        }

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
        if (isEnabledFre) {
            setDataFRE(globalThis.Measurement_F);
        } else {
            setDataFRE([]);
        }
    };

    return (
        <NativeBaseProvider>
            <LineChart
                data={{
                    datasets: [
                        {
                            data: dataTEM,
                            strokeWidth: 1,
                            color: () => 'rgb(218,16,16)',
                        },
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
                        {
                            data: dataFRE,
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
