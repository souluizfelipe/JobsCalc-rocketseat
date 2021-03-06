const Job = require('../model/Job');
const JobUtils = require('../utils/JobUtils');
const Profile = require('../model/Profile');

module.exports = {
       
    create(req, res) {

        return res.render("job");
    },

    async save(req, res) {

        await Job.create({
            name: req.body.name,
            'daily-hours': req.body['daily-hours'],
            'total-hours' : req.body['total-hours'],
            'created-at': Date.now(), 
        });
        return res.redirect('/');
    },
    
    async edit(req, res) {
        const profile = Profile.get();
        const jobs = await Job.get();

        const jobId = req.params.id;
        const job = jobs.find(job => Number(jobId) === Number(job.id));

        if(!job) {
            return res.send('Job not found! :(');
        };

        job.budget = JobUtils.calculateBudget(job, profile['value-hour']);

        return res.render("job-edit", { job })
    },

    async update(req, res) { 
        const jobId = req.params.id;
        
        const updatedJob = {
            name: req.body.name,
            'daily-hours': req.body['daily-hours'],
            'total-hours': req.body['total-hours'],
        }
        
        await Job.update(updatedJob, jobId);

        res.redirect(`/`);
    },

    async delete(req, res) {
        const jobId = req.params.id;

        await Job.delete(jobId);

        res.redirect('/');
    }
};