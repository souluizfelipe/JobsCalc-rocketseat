const Profile = require('../model/Profile');

module.exports = {
    async index(req, res) {
        return res.render("profile", { profile: await Profile.get() });
    },   

    async updade(req, res) {
        const data = req.body;
        const weeksPerYear = 52;
        const weeksPerMonth = (weeksPerYear - data['vacation-per-year']) / 12;
        const workHoursWeek = data['hours-per-day'] * data['days-per-week'];
        const monthlyWorkHours = workHoursWeek * weeksPerMonth;
        const valueHour = data['monthly-budget'] / monthlyWorkHours;
        
        await Profile.update({
            ...Profile.get(),
            ...req.body,
            'value-hour': valueHour,
        });

        return res.redirect('/profile')
    },
}