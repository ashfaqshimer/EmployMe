const express = require('express');
const router = express.Router();

const jobseekerControllers = require('../controllers/jobseeker');
const isAuth = require('../middleware/isAuthUser');

router.get('/', (req, res) => {
	res.render('jobseeker/homepage', { pageTitle: 'Job-Seeker', path: 'jobseeker/' });
});

//jobseeker resume routes
router.get('/resume', isAuth, (req, res) => {
	res.render('jobseeker/resume/instructions', {
		pageTitle : 'Resume',
		path      : '/resume',
		tabpath   : '/instructions'
	});
});

router.get('/resume/summary', isAuth, (req, res) => {
	res.render('jobseeker/resume/summary', {
		pageTitle : 'Resume - Summary',
		path      : '/resume',
		tabpath   : '/summary'
	});
});

router.get('/resume/work-experience', isAuth, (req, res) => {
	res.render('jobseeker/resume/work-experience', {
		pageTitle : 'Resume - Work Experience',
		path      : '/resume',
		tabpath   : '/work'
	});
});

router.get('/resume/education', isAuth, (req, res) => {
	res.render('jobseeker/resume/education', {
		pageTitle : 'Resume - Education',
		path      : '/resume',
		tabpath   : '/education'
	});
});

router.get('/resume/skills', isAuth, (req, res) => {
	res.render('jobseeker/resume/skills', {
		pageTitle : 'Resume-Skills',
		path      : '/resume',
		tabpath   : '/skills'
	});
});

router.get('/resume/personal-info', isAuth, (req, res) => {
	res.render('jobseeker/resume/personalinfo', {
		pageTitle : 'Resume-Personal Info',
		path      : '/resume',
		tabpath   : '/personal-info'
	});
});

router.get('/resume/generate-cv', isAuth, (req, res) => {
	res.render('jobseeker/resume/generate-cv', {
		pageTitle : 'Resume-Create',
		path      : '/resume',
		tabpath   : '/create-cv'
	});
});

//jobseeker manage profile
router.get('/manage-profile', isAuth, (req, res) => {
	res.render('jobseeker/manage-profile', {
		pageTitle : 'Manage Profile',
		path      : '/manage-profile'
	});
});

module.exports = router;
