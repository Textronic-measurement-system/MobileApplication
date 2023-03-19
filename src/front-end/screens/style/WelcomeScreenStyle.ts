import { Dimensions, StyleSheet } from 'react-native';
const screen_width = Dimensions.get('window').width;

export const welcomeScreen = StyleSheet.create({
    container: {
        flex: 1,
        width: screen_width,
        backgroundColor: 'rgba(0,0,0, 0.42)',
        alignItems: 'center',
        justifyContent: 'flex-end',
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
        backgroundColor: 'rgb(246,246,246)',
        marginTop: '6%',
    },
    button_text: {
        color: 'rgb(0,0,0)',
        fontWeight: 'bold',
        fontSize: 18,
    },
    text1: {
        bottom: '12%',
        color: 'rgb(245,245,245)',
        fontWeight: 'bold',
        fontSize: 33,
        paddingTop: '5%',
    },
    text2: {
        color: 'rgb(245,245,245)',
        fontSize: 12,
    },
});
