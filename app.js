const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

//Main code starts here
const sequelize = require('./util/database'); //importing the database

app.get('/', (req, res) => {
    res.render('home', { pageTitle: 'EmployMe', path: '/' });
});

app.get('/signup', (req, res) => {
    res.render('signup', { pageTitle: 'Sign Up', path: '/signup' });
});

app.get('/login/jobseeker', (req, res) => {
    res.render('login-jobseeker', { pageTitle: 'Job-Seeker Login', path: '/login' });
});

app.get('/login/admin', (req, res) => {
    res.render('login-admin', { pageTitle: 'Admin Login', path: '/login' });
});

//jobseeker routes
app.get('/jobseeker/', (req, res) => {
    res.render('jobseeker/homePage', { pageTitle: 'Job-Seeker', path: 'jobseeker/' });
});

//jobseeker resume routes
app.get('/jobseeker/resume', (req, res) => {
    res.render('jobseeker/resume/instructions', {
        pageTitle: 'Resume',
        path: '/resume',
        tabpath: '/instructions'
    });
});

app.get('/jobseeker/resume/summary', (req, res) => {
    res.render('jobseeker/resume/summary', {
        pageTitle: 'Resume - Summary',
        path: '/resume',
        tabpath: '/summary'
    });
});

app.get('/jobseeker/resume/work-experience', (req, res) => {});

app.get('/jobseeker/resume/education', (req, res) => {});

app.get('/jobseeker/resume/skills', (req, res) => {});

app.get('/jobseeker/resume/workexperience', (req, res) => {});

app.get('/jobseeker/resume/workexperience', (req, res) => {});

//jobseeker manage profile
app.get('/jobseeker/manage-profile', (req, res) => {
    res.render('jobseeker/manage-profile', {
        pageTitle: 'Manage Profile',
        path: '/manage-profile'
    });
});

//set the page not found
app.use((req, res, next) => {
    res.status(404).render('404', { pageTitle: 'Page Not Found' });
});

app.listen(4000, () => {
    console.log('App listening on port 4000!');
});
