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
        height: '86.5%',
        width: '100%',
        backgroundColor: 'rgb(217,217,217)',
        alignItems: 'center',
        borderRadius: 25,
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
