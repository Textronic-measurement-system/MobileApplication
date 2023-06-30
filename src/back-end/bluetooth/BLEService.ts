import {
    BleManager,
    State,
    Device,
    DeviceId,
    BleError,
} from 'react-native-ble-plx';

export const manager = new BleManager();

export enum BTStatus {
    DISCOVERING = 'DISCOVERING',
    PAIRING = 'PAIRING',
}

export enum ServiceUUIDs {
    VSP = '0000181A-0000-1000-8000-00805F9B34FB',
}

export enum CharacteristicsUUIDs {
    COM_TEM = '0000FF01-0000-1000-8000-00805F9B34FB',
    COM_RX = '0000FF02-0000-1000-8000-00805F9B34FB',
    COM_RES = '0000FF03-0000-1000-8000-00805F9B34FB',
    COM_IMP = '0000FF04-0000-1000-8000-00805F9B34FB',
    COM_FRE = '0000FF05-0000-1000-8000-00805F9B34FB',
}

export const getBluetoothState = async (): Promise<State> => {
    return await manager.state();
};

export const scanBluetoothDevices = (
    onDeviceScanned: (
        error: BleError | null,
        scannedDevice: Device | null,
    ) => void,
): void => {
    manager.startDeviceScan(null, {}, onDeviceScanned);
};

export const stopScanning = (): void => {
    manager.stopDeviceScan();
};

export const connectToDeviceWithId = async (
    deviceId: DeviceId,
): Promise<Device> => {
    return await manager.connectToDevice(deviceId);
};

export const discoverAllServices = async (id: DeviceId): Promise<Device> => {
    return await manager.discoverAllServicesAndCharacteristicsForDevice(id);
};
