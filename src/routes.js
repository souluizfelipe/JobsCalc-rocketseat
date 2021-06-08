const express = require("express");
const routes = express.Router();

const views = __dirname + "/views/";

const Profile = {
    data: {
    name: 'Luiz Felipe',
    avatar: 'https://unavatar.vercel.app/github/souluizfelipe',
    "monthly-budget": 5000.00,
    "hours-per-day": 8,
    "days-per-week": 5,
    "vacation-per-year": 5,
    "value-hour": 75,
    },

    controllers: {
        index(req, res) {
            return res.render(views + "profile", { profile: Profile.data });
        }   
    }
};

const Job = {
    
    data: [
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
    ],

    controllers: {
        index(req, res) {
            const updateJobs = Job.data.map((job) => {
                const remaning = Job.services.remaningDays(job);
                const status = remaning <= 0 ? 'done' : 'progress';
                return {
                    ...job,
                    remaning,
                    status,
                    budget: Profile.data['value-hour'] * job['total-hours'],
                }
            });
            res.render(views + "index", { jobs: updateJobs, profile: Profile.data });
        },
        
        create(req, res) {
            return res.render(views + "job");
        },
    
        save(req, res) {
            const lastId = Job.data[Job.data.length - 1]?.id || 0;
        
            Job.data.push({
                id: lastId + 1,
                name: req.body.name,
                'daily-hours': req.body['daily-hours'],
                'total-hours' : req.body['total-hours'],
                'created-at': Date.now(), 
            });
            return res.redirect('/');
        },  
    },
    
    services: {
        remaningDays(job) {
            const remaningDays = (job['total-hours'] / job['daily-hours']).toFixed();
            
            const createdDate = new Date(job['created-at']);
            const dueDay = createdDate.getDate() + Number(remaningDays);
            const dueDateInMs = createdDate.setDate(dueDay);
            
            const timeDiffInMs = dueDateInMs - Date.now();
            
            const dayInMs = 1000 * 60 * 60 * 24 
            const dayDiff = Math.floor(timeDiffInMs / dayInMs);
            
            return dayDiff;
        },
    },
}

routes.get('/',  Job.controllers.index);
routes.get('/job', Job.controllers.create);
routes.post('/job', Job.controllers.save);
routes.get('/job/edit', (req, res) => res.render(views + "job-edit"));
routes.get('/profile', Profile.controllers.index);

module.exports = routes;