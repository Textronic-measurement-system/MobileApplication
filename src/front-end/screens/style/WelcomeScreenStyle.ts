import { Dimensions, StyleSheet } from 'react-native';
const screen_width = Dimensions.get('window').width;

export const welcomeScreen = StyleSheet.create({
    container: {
        flex: 1,
        width: screen_width,
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0, 0.15)',
    },
    picture: {
        height: '100%',
        width: '100%',
    },
    button: {
        width: '80%',
        height: '6%',
        bottom: '20%',
        borderRadius: 50,
        backgroundColor: 'rgb(217, 217, 217)',
        marginTop: '6%',
    },
    button_text: {
        color: 'rgb(0,0,0)',
        fontWeight: 'bold',
        fontSize: 18,
    },
    text: {
        color: 'rgb(255,255,255)',
        fontSize: 12,
    },
});
