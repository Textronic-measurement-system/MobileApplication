import { Dimensions, StyleSheet } from 'react-native';
const screen_width = Dimensions.get('window').width;

export const device_menuScreen = StyleSheet.create({
    container: {
        flex: 2,
        width: screen_width,
        backgroundColor: 'rgb(70,147,94)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        width: '40%',
        borderRadius: 20,
        backgroundColor: 'rgb(94,157,117)',
        top: '20%',
        paddingBottom: '30%',
        marginBottom: '5%',
    },
    box: {
        height: '84%',
        width: '92%',
        backgroundColor: 'rgb(146,180,156)',
        alignItems: 'center',
        borderRadius: 50,
        bottom: '3%',
    },
    text: {
        color: 'rgb(245,245,245)',
        fontWeight: 'bold',
        fontSize: 18,
        top: '250%',
    },
});
