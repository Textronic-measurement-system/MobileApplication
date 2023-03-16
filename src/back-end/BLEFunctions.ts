import { PermissionsAndroid } from 'react-native';

export const requestPermission = async () => {
    const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_COURSE_LOCATION,
        {
            title: 'Request for Location Permission',
            message:
                'Bluetooth Scanner requires access to Fine Location Permission',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
        },
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
};
