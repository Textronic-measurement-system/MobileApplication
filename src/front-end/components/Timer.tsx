import React, { useState } from 'react';

export const CurrentDate = () => {
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds

    console.log(
        date + '.' + month + '.' + year + ' ' + hours + ':' + min + ':' + sec,
    );
};
