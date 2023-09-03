import axios from 'axios';
import { CurrentDate } from '../front-end/components/Timer';

const baseUrl_measurementText =
    'https://appbackend.azurewebsites.net/measurementsText';

export const AddMeasurements = (data: any) => {
    axios
        .post(`${baseUrl_measurementText}`, {
            ID_MEASUREMENTTYPE: 21,
            MEASUREMENT: data,
            MEASUREMENTTIME: CurrentDate(),
        })
        .then((response) => {
            console.log('Add Data to DB: ' + response.data);
        });
};
