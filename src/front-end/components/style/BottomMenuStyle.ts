import { Dimensions, StyleSheet } from 'react-native';
const screen_width = Dimensions.get('window').width;
const screen_height = Dimensions.get('window').height;

export const bottom_menuComponent = StyleSheet.create({
    container: {
        width: screen_width,
        height: 0.06 * screen_height,
    },
    button: {
        width: 0.1 * screen_height,
        height: 0.06 * screen_height,
        backgroundColor: 'rgba(0, 170, 84, 0)',
        paddingLeft: '-10%',
        paddingRight: '-10%',
        borderRadius: 10,
    },
    text: {
        color: 'rgb(255, 255, 255)',
        fontWeight: 'bold',
        fontSize: 16,
    },
    text1: {
        color: 'rgb(241,184,135)',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
