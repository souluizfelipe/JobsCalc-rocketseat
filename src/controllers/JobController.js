const Job = require('../model/Job');
const JobUtils = require('../utils/JobUtils');
const Profile = require('../model/Profile');

module.exports = {
       
    create(req, res) {
        return res.render("job");
    },

    save(req, res) {
        const jobs = Job.get();
        const lastId = jobs[jobs.length - 1]?.id || 0;

        jobs.push({
            id: lastId + 1,
            name: req.body.name,
            'daily-hours': req.body['daily-hours'],
            'total-hours' : req.body['total-hours'],
            'created-at': Date.now(), 
        });
        return res.redirect('/');
    },
    
    edit(req, res) {
        const profile = Profile.get();
        const jobs = Job.get();

        const jobId = req.params.id;
        const job = jobs.find(job => Number(jobId) === Number(job.id));

        if(!job) {
            return res.send('Job not found! :(');
        };

        job.budget = JobUtils.calculateBudget(job, profile['value-hour']);

        return res.render("job-edit", { job })
    },

    update(req, res) {
        const jobs = Job.get();
    
        const jobId = req.params.id;
        const job = jobs.find(job => Number(jobId) === Number(job.id));

        if(!job){
            return res.send('job not found! :(');
        }

        const updatedJob = {
            ...job,
            name: req.body.name,
            'daily-hours': req.body['daily-hours'],
            'total-hours': req.body['total-hours'],
        }

        const newJob = (jobs.map(job => {
            if(Number(job.id) === Number(jobId)){
                job = updatedJob;
            };
            return job;
        }));

        Job.update(newJob);

        res.redirect(`/`);
    },

    delete(req, res) {
        const jobId = req.params.id;

        Job.delete(jobId);

        res.redirect('/');
    }
};