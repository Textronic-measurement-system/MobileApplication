export const CurrentDate = () => {
    var day = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var hours = new Date().getHours();
    var min = new Date().getMinutes();
    var sec = new Date().getSeconds();

    console.log(
        'Time: ',
        year +
            '-' +
            month +
            '-' +
            day +
            'T' +
            hours +
            ':' +
            min +
            ':' +
            sec +
            '.000Z',
    );
    return (
        year +
        '-' +
        month +
        '-' +
        day +
        'T' +
        hours +
        ':' +
        min +
        ':' +
        sec +
        '.000Z'
    );
};
