const Job = require('../model/Job');
const Profile = require('../model/Profile');
const JobUtils = require('../utils/JobUtils');

module.exports = {
    index(req, res) {
        const jobs = Job.get();
        const profile = Profile.get();

        let statusCount = {
                total: jobs.length,
                progress: 0,
                done: 0,
        };

        let jobTotalHours = 0

        const updateJobs = jobs.map((job) => {
            const remaning = JobUtils.remaningDays(job);
            const status = remaning <= 0 ? 'done' : 'progress';

            statusCount[status] += 1;

            jobTotalHours = status === 'progress' ? jobTotalHours += Number(job['daily-hours']) : jobTotalHours;

            return {
                ...job,
                remaning,
                status,
                budget: JobUtils.calculateBudget(job, profile['value-hour']),
            };
        });

        const freeHours = profile["hours-per-day"] - jobTotalHours;
        
        res.render( "index", { jobs: updateJobs, profile: profile, statusCount: statusCount, freeHours: freeHours, });
    },
};