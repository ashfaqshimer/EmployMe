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

router.route('/login/admin').get(authControllers.getAdminLogin).post(authControllers.postAdminLogin);

// The logout route will be commmon for the jobseeker as well as admin
router.post('/logout', authControllers.postLogout)

module.exports = router;
