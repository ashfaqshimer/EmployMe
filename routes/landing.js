const express = require('express');

const router = express.Router();

//Import the controllers
const authControllers = require('../controllers/auth');

router.get('/', authControllers.getHome);

router.route('/signup').get(authControllers.getSignup).post(authControllers.postSignup);

router
	.route('/signup/admin')
	.get(authControllers.getAdminSignup)
	.post(authControllers.postAdminSignup);

router
	.route('/login/jobseeker')
	.get(authControllers.getJobseekerLogin)
	.post(authControllers.postJobseekerLogin);

router.route('/login/admin').get(authControllers.getAdminLogin);

module.exports = router;
