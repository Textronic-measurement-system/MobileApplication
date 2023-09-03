import axios from 'axios';

const baseUrl_measurementText =
    'https://appbackend.azurewebsites.net/measurementsText_meas';

export const GetMeasurementsText = () => {
    axios
        .get(`${baseUrl_measurementText}`, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
            },
        })
        .then((response) => {
            const jsonData = JSON.parse(
                JSON.parse(JSON.stringify(response.data[0])).MEASUREMENT,
            );
            console.log(
                'Get DB Data: ' +
                    JSON.parse(JSON.stringify(response.data[0])).MEASUREMENT,
            );

            globalThis.Measurement_F = jsonData.F;
            globalThis.Measurement_R = jsonData.R;
            globalThis.Measurement_X = jsonData.X;
        });
};
