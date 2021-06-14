let data = [
    {
        id: 1,
        name: 'Pizzaria Gulozo',
        'daily-hours': 2,
        'total-hours' : 1,
        'created-at': Date.now(), 
    },
    {
        id: 2,
        name: 'OneTwo Project',
        'daily-hours': 8,
        'total-hours' : 100,
        'created-at': Date.now(), 
    },
];

module.exports = {
    get: () => data,

    update: (newData) => data = newData,

    delete(id) {
        data = data.filter(job => Number(job.id) !== Number(id));
    },

    create(newJob){
        data.push(newJob);
    }
}