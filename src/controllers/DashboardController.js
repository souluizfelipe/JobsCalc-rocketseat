const Job = require('../model/Job');
const Profile = require('../model/Profile');
const JobUtils = require('../utils/JobUtils');

module.exports = {
    index(req, res) {
        const jobs = Job.get();
        const profile = Profile.get();

        const updateJobs = jobs.map((job) => {
            const remaning = JobUtils.remaningDays(job);
            const status = remaning <= 0 ? 'done' : 'progress';
            return {
                ...job,
                remaning,
                status,
                budget: JobUtils.calculateBudget(job, profile['value-hour']),
            }
        });
        
        res.render( "index", { jobs: updateJobs, profile: profile });
    },
}