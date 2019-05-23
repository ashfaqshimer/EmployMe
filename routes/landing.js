const express = require('express');

const router = express.Router();

//Import the controllers
const landingControllers = require('../controllers/landing');

router.get('/', landingControllers.getHome);

router
    .route('/signup')
    .get(landingControllers.getSignup)
    .post(landingControllers.postSignup);

router
    .route('/signup/admin')
    .get(landingControllers.getAdminSignup)
    .post(landingControllers.postAdminSignup);

router.route('/login/jobseeker').get(landingControllers.getJobseekerLogin);

router.route('/login/admin').get(landingControllers.getAdminLogin);

module.exports = router;
