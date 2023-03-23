import { Dimensions, StyleSheet } from 'react-native';
const screen_width = Dimensions.get('window').width;

export const devices_listScreen = StyleSheet.create({
    container: {
        flex: 2,
        width: screen_width,
        backgroundColor: 'rgb(70,147,94)',
        alignItems: 'center',
    },
    box: {
        height: '84%',
        width: '92%',
        backgroundColor: 'rgb(196,196,196)',
        alignItems: 'center',
        borderRadius: 50,
        bottom: '3%',
    },
    scroll: {
        width: '100%',
        marginTop: '2%',
        marginBottom: '7%',
    },
});
