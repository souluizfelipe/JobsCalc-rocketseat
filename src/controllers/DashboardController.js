const Job = require('../model/Job');
const Profile = require('../model/Profile');
const JobUtils = require('../utils/JobUtils');

module.exports = {
    async index(req, res) {
        const jobs = await Job.get();
        const profile = await Profile.get();

        let statusCount = {
            total: jobs.length,
            progress: 0,
            done: 0,
        };

        let jobTotalHours = 0

        const updatedJobs = jobs.map((job) => {
            const remaining = JobUtils.remainingDays(job);
            const status = remaining <= 0 ? 'done' : 'progress';

            statusCount[status] += 1;

            jobTotalHours = status == 'progress' ? jobTotalHours + Number(job['daily-hours']) : jobTotalHours;
            
            // console.log(remaning);
            return {
                ...job,
                remaining,
                status,
                budget: JobUtils.calculateBudget(job, profile['value-hour']),
            };
        });

        const freeHours = profile["hours-per-day"] - jobTotalHours;
        
        res.render( "index", { jobs: updatedJobs, profile: profile, statusCount: statusCount, freeHours: freeHours, });
    },
};