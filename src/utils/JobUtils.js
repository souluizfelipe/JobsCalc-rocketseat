module.exports = {
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

};