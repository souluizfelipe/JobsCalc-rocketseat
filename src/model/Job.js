const Database = require('../db/config');

// let data = [
//     {
//         id: 1,
//         name: 'Pizzaria Gulozo',
//          
//     },
//     {
//         id: 2,
//         name: 'OneTwo Project',
//         'daily-hours': 8,
//         'total-hours' : 100,
//         'created-at': Date.now(), 
//     },
// ];

module.exports = {
    async get(){
        const db = await Database();

        let data = await db.all(
            `SELECT * FROM jobs`
        );

        data = data.map((data) => {
            return {
                id: data.id,
                name: data.name,
                'daily-hours': data.daily_hours,
                'total-hours': data.total_hours,
                'created-at': data.createt_at,
            };
        }),   
        
        await db.close();
        
        return data;
    },

    update: (newData) => data = newData,

    delete(id) {
        data = data.filter(job => Number(job.id) !== Number(id));
    },

    create(newJob){
        data.push(newJob);
    }
}