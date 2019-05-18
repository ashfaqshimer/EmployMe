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
    res.render('login-jobSeeker', { pageTitle: 'Job-Seeker Login', path: '/login' });
});

app.get('/login/admin', (req, res) => {
    res.render('login-admin', { pageTitle: 'Admin Login', path: '/login' });
});

//jobseeker routes
app.get('/jobseeker/', (req, res) => {
    res.render('jobSeeker/homePage', { pageTitle: 'Job-Seeker', path: 'jobseeker/' });
});

app.get('/jobseeker/resume', (req, res) => {
    res.render('jobSeeker/resume/instructions', { pageTitle: 'Resume', path: '/resume' });
});



//set the page not found
app.use((req, res, next) => {
    res.status(404).render('404', { pageTitle: 'Page Not Found' });
});

sequelize
    .sync()
    .then(result => {
        console.log('TCL: result', result);
        app.listen(4000, () => {
            console.log('App listening on port 4000!');
        });
    })
    .catch(err => {
        console.log('TCL: err', err);
    });
