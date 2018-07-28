
// // ['seconds', 'minutes', 'hours', 'dayOfMonth', 'month', 'dayOfWeek']
// const fetch = require('node-fetch');

// asyncForEach = async (array, callback) => {
//     for (let index = 0; index < array.length; index++) {
//         await callback(array[index], index, array)
//     }
// }

module.exports.cron = {
    firstJob: {
        schedule: '* */1 * * * *',
        onTick: async function () {
            asyncForEach = async (array, callback) => {
                for (let index = 0; index < array.length; index++) {
                    await callback(array[index], index, array)
                }
            }
        },
    }
};