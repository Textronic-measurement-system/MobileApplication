import { Dimensions, StyleSheet } from 'react-native';
const screen_width = Dimensions.get('window').width;
const screen_height = Dimensions.get('window').height;

export const headerComponent = StyleSheet.create({
    container: {
        width: screen_width,
        height: 0.06 * screen_height,
        marginTop: '2%',
    },
    button1: {
        width: '20%',
        backgroundColor: 'transparent',
        justifyContent: 'center',
    },
    button2: {
        width: '20%',
        backgroundColor: 'transparent',
        justifyContent: 'flex-start',
        left: '60%',
    },
    title: {
        color: 'rgb(245,245,245)',
        fontSize: 32,
        paddingTop: '3%',
        textAlign: 'center',
        fontWeight: 'bold',
    },
});
