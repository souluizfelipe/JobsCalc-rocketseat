let data = {
    name: 'Luiz Felipe',
    avatar: 'https://unavatar.vercel.app/github/souluizfelipe',
    "monthly-budget": 8000.00,
    "hours-per-day": 8,
    "days-per-week": 5,
    "vacation-per-year": 4,
    "value-hour": 75,
};

module.exports = {
    get: () => data,

    update: (newData) => data = newData,
}



