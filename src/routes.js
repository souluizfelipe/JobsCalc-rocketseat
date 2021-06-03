const express = require("express");
const routes = express.Router();

const views = __dirname + "/views/";

const profile = {
    name: 'Luiz Felipe',
    avatar: 'https://unavatar.vercel.app/github/souluizfelipe',
    "monthly-budget": 5000.00,
    "hours-per-day": 8,
    "days-per-week": 5,
    "vacation-per-year": 5,
}

routes.get('/', (req, res) => res.render(views + "index"));
routes.get('/job', (req, res) => res.render(views + "job"));
routes.get('/job/edit', (req, res) => res.render(views + "job-edit"));
routes.get('/profile', (req, res) => res.render(views + "profile", {profile}));

module.exports = routes;