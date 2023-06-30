import { Dimensions, StyleSheet } from 'react-native';
const screen_width = Dimensions.get('window').width;

export const dataScreen = StyleSheet.create({
    container: {
        flex: 2,
        width: screen_width,
        backgroundColor: 'rgb(94,157,117)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    box: {
        height: '84%',
        width: '92%',
        backgroundColor: 'rgb(146,180,156)',
        alignItems: 'center',
        borderRadius: 50,
        bottom: '3%',
    },
    text1: {
        color: 'rgb(245,245,245)',
        fontWeight: 'bold',
        fontSize: 40,
        paddingTop: '5%',
        top: '5%',
    },
});
