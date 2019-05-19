const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/', (req, res) => {
    res.render('jobseeker/homePage', { pageTitle: 'Job-Seeker', path: 'jobseeker/' });
});

//jobseeker resume routes
router.get('/resume', (req, res) => {
    res.render('jobseeker/resume/instructions', {
        pageTitle: 'Resume',
        path: '/resume',
        tabpath: '/instructions'
    });
});

router.get('/resume/summary', (req, res) => {
    res.render('jobseeker/resume/summary', {
        pageTitle: 'Resume - Summary',
        path: '/resume',
        tabpath: '/summary'
    });
});

router.get('/resume/work-experience', (req, res) => {});

router.get('/resume/education', (req, res) => {});

router.get('/resume/skills', (req, res) => {});

router.get('/resume/workexperience', (req, res) => {});

router.get('/resume/workexperience', (req, res) => {});

//jobseeker manage profile
router.get('/manage-profile', (req, res) => {
    res.render('jobseeker/manage-profile', {
        pageTitle: 'Manage Profile',
        path: '/manage-profile'
    });
});  

module.exports = router;