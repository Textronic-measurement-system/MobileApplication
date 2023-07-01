import { Dimensions, StyleSheet } from 'react-native';
const screen_width = Dimensions.get('window').width;

export const dataScreen = StyleSheet.create({
    container: {
        flex: 2,
        width: screen_width,
        backgroundColor: 'rgb(0,163,84)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    box: {
        height: '84%',
        width: '92%',
        backgroundColor: 'rgb(217,217,217)',
        alignItems: 'center',
        borderRadius: 50,
        bottom: '3%',
    },
    legend: {
        flex: 1,
        left: '-12%',
        top: '12%',
    },
    legendTest: {
        fontSize: 16,
    },
});
