import {
    manager,
    ServiceUUIDs,
    CharacteristicsUUIDs,
} from './bluetooth/BLEService';

export const GetBLEMeasurementsText = () => {
    const base64 = require('base-64');

    try {
        manager.monitorCharacteristicForDevice(
            globalThis.deviceID,
            ServiceUUIDs.VSP,
            CharacteristicsUUIDs.COM_SWEEP,
            (error, characteristic) => {
                if (error) {
                    console.log(error);
                }
                if (base64.decode(characteristic.value) === null) {
                    globalThis.BLE_Sweep = 0;
                } else {
                    globalThis.BLE_Sweep = base64.decode(characteristic.value);
                }
                console.log('Get BT Data: ' + globalThis.BLE_Sweep);
            },
            'COM_SWEEP',
        );
    } catch (e) {
        return false;
    }
};
