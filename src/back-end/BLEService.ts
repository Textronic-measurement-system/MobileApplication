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
    // ADD SERVICE/SERVER UUID
    // EXAMPLE
    // VSP = '569a1101-b87f-490c-92cb-11ba5ea5167d',
}

export enum CharacteristicsUUIDs {
    // ADD CHARACTERISTICS UUID
    // EXAMPLE
    // COM_TX = '569a2000-b87f-490c-92cb-11ba5ea5167d',
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
