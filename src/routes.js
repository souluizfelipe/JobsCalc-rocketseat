const express = require("express");
const routes = express.Router();

const views = __dirname + "/views/";

const profile = {
    name: 'Luiz Felipe',
    avatar: 'https://unavatar.vercel.app/github/souluizfelipe',
    "monthly-budget": 5000.00,
    "hours-per-day": 8,
    "days-per-week": 5,
    "vacation-per-year": 5,
    "value-hour": 75,
}

const jobs = [
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

function remaningDays(job) {
    const remaningDays = (job['total-hours'] / job['daily-hours']).toFixed();
    
    const createdDate = new Date(job['created-at']);
    const dueDay = createdDate.getDate() + Number(remaningDays);
    const dueDateInMs = createdDate.setDate(dueDay);

    const timeDiffInMs = dueDateInMs - Date.now();

    const dayInMs = 1000 * 60 * 60 * 24 
    const dayDiff = Math.floor(timeDiffInMs / dayInMs);

    return dayDiff;
};

routes.get('/', (req, res) => {

    const updateJobs = jobs.map((job) => {
        const remaning = remaningDays(job);
        const status = remaning <= 0 ? 'done' : 'progress';
        
        return {
            ...job,
            remaning,
            status,
            budget: profile['value-hour'] * job['total-hours'],
        }
    });

    res.render(views + "index", { jobs: updateJobs, profile });

});

routes.get('/job', (req, res) => res.render(views + "job"));

routes.post('/job', (req, res) => {

    const lastId = jobs[jobs.length - 1]?.id || 0;

    //{ name: 'Nubank', 'daily-hours': '7', 'total-hours': '98' }
    jobs.push({
        id: lastId + 1,
        name: req.body.name,
        'daily-hours': req.body['daily-hours'],
        'total-hours' : req.body['total-hours'],
        'created-at': Date.now(), 
    });

    console.log(jobs);

    return res.redirect('/');
});
routes.get('/job/edit', (req, res) => res.render(views + "job-edit"));
routes.get('/profile', (req, res) => res.render(views + "profile", { profile }));

module.exports = routes;