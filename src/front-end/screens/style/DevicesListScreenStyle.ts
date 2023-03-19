import { Dimensions, StyleSheet } from 'react-native';
const screen_width = Dimensions.get('window').width;

export const deviceslistScreen = StyleSheet.create({
    container: {
        flex: 2,
        width: screen_width,
        backgroundColor: 'rgb(246,246,246)',
    },
});
