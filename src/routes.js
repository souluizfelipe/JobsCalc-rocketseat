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
}

const jobs = [
    {
        id: 1,
        name: 'Pizzaria Gulozo',
        'daily-hours': 8,
        'total-hours' : 28,
        'created-at': Date.now(), 
    },
    {
        id: 2,
        name: 'OneTwo Project',
        'daily-hours': 8,
        'total-hours' : 190,
        'created-at': Date.now(), 
    },
];

routes.get('/', (req, res) => res.render(views + "index", { jobs, profile }));
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