import { Dimensions, StyleSheet } from 'react-native';
const screen_width = Dimensions.get('window').width;
const screen_height = Dimensions.get('window').height;

export const headerComponent = StyleSheet.create({
    container: {
        width: screen_width,
        height: 0.06 * screen_height,
        marginTop: '2%',
    },
    title: {
        color: 'rgb(255,255,255)',
        fontSize: 32,
        paddingTop: '6%',
        textAlign: 'center',
        fontWeight: 'bold',
    },
});
