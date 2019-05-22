const express = require('express');

const User = require('../models/user');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('home', { pageTitle: 'EmployMe', path: '/' });
});

router.get('/signup', (req, res) => {
    res.render('signup', { pageTitle: 'Sign Up', path: '/signup' });
});

router.post('/signup', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password

    const user = new User({
        name: name,
        email: email,
        password: password
    });
    user.save()
        .then(response => {
            console.log('Log: response', response);
        })
        .catch(err => {
            console.log('Log: err', err);
        });
});

router.get('/login/jobseeker', (req, res) => {
    res.render('login-jobseeker', { pageTitle: 'Job-Seeker Login', path: '/login' }).post();
});

router.get('/login/admin', (req, res) => {
    res.render('login-admin', { pageTitle: 'Admin Login', path: '/login' });
});

router.get('/signup/admin', (req, res) => {
    res.render('signup-admin', { pageTitle: 'Admin Login', path: '/signup' });
});

module.exports = router;
