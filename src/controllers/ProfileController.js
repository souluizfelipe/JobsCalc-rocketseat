const Profile = require('../model/Profile');

module.exports = {
    index(req, res) {
        return res.render("profile", { profile: Profile.get() });
    },   

    updade(req, res) {
        const data = req.body;
        const weeksPerYear = 52;
        const weeksPerMonth = (weeksPerYear - data['vacation-per-year']) / 12;
        const workHoursWeek = data['hours-per-day'] * data['days-per-week'];
        const monthlyWorkHours = workHoursWeek * weeksPerMonth;
        const valueHour = data['monthly-budget'] / monthlyWorkHours;
        
        Profile.update({
            ...Profile.get(),
            ...req.body,
            'value-hour': valueHour,
        });

        return res.redirect('/profile')
    },
}