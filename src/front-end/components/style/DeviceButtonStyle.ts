import { Dimensions, StyleSheet } from 'react-native';
const screen_width = Dimensions.get('window').width;
const screen_height = Dimensions.get('window').height;

export const device_buttonComponent = StyleSheet.create({
    container: {
        width: 0.8 * screen_width,
        height: 0.07 * screen_height,
        marginTop: '6%',
    },
    button: {
        width: '100%',
        height: '100%',
        borderRadius: 15,
        justifyContent: 'flex-start',
        backgroundColor: 'rgb(94,157,117)',
    },
    text: {
        color: 'rgb(245,245,245)',
        fontSize: 20,
    },
});
