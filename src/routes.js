const express = require("express");
const routes = express.Router();


const Profile = {
    data: {
        name: 'Luiz Felipe',
        avatar: 'https://unavatar.vercel.app/github/souluizfelipe',
        "monthly-budget": 8000.00,
        "hours-per-day": 8,
        "days-per-week": 5,
        "vacation-per-year": 4,
        "value-hour": 75,
    },

    controllers: {
        index(req, res) {
            return res.render("profile", { profile: Profile.data });
        },   

        updade(req, res) {
            const data = req.body;
            const weeksPerYear = 52;
            const weeksPerMonth = (weeksPerYear - data['vacation-per-year']) / 12;
            const workHoursWeek = data['hours-per-day'] * data['days-per-week'];
            const monthlyWorkHours = workHoursWeek * weeksPerMonth;
            const valueHour = data['monthly-budget'] / monthlyWorkHours;
            
            Profile.data = {
                ...Profile.data,
                ...req.body,
                'value-hour': valueHour,
            };

            return res.redirect('/profile')
        },
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
                    budget: Job.services.calculateBudget(job, Profile.data['value-hour']) ,
                }
            });
            
            res.render( "index", { jobs: updateJobs, profile: Profile.data });
        },
        
        create(req, res) {
            return res.render("job");
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
        
        edit(req, res) {
            const jobId = req.params.id;
            const job = Job.data.find(job => Number(jobId) === Number(job.id));

            if(!job) {
                return res.send('Job not found! :(');
            };

            job.budget = Job.services.calculateBudget(job, Profile.data['value-hour']);

            return res.render("job-edit", { job })
        },

        update(req, res) {
            const jobId = req.params.id;
            const job = Job.data.find(job => Number(jobId) === Number(job.id));

            if(!job){
                return res.send('job not found! :(');
            }

            const updatedJob = {
                ...job,
                name: req.body.name,
                'daily-hours': req.body['daily-hours'],
                'total-hours': req.body['total-hours'],
            }

            Job.data = Job.data.map(job => {
                if(Number(job.id) === Number(jobId)){
                    job = updatedJob;
                };
                return job;
            });

            res.redirect(`/`);
        },

        delete(req, res) {
            const jobId = req.params.id;

            Job.data = Job.data.filter(job => Number(jobId) !== Number(job.id));

            res.redirect('/')
        }
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

        calculateBudget: (job, valueHour) => valueHour * job['total-hours'],

    },
}

routes.get('/',  Job.controllers.index);

routes.get('/job', Job.controllers.create);
routes.post('/job', Job.controllers.save);

routes.get('/job/:id', Job.controllers.edit);
routes.post('/job/:id', Job.controllers.update);
routes.post('/job/delete/:id', Job.controllers.delete);

routes.get('/profile', Profile.controllers.index);
routes.post('/profile', Profile.controllers.updade);

module.exports = routes;