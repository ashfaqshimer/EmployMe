const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('home', { pageTitle: 'EmployMe', path: '/' });
});

router.get('/signup', (req, res) => {
    res.render('signup', { pageTitle: 'Sign Up', path: '/signup' });
});

router.get('/login/jobseeker', (req, res) => {
    res.render('login-jobseeker', { pageTitle: 'Job-Seeker Login', path: '/login' });
});

router.get('/login/admin', (req, res) => {
    res.render('login-admin', { pageTitle: 'Admin Login', path: '/login' });
});

module.exports = router;