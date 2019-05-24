const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	res.render('jobseeker/homepage', { pageTitle: 'Job-Seeker', path: 'jobseeker/' });
});

//jobseeker resume routes
router.get('/resume', (req, res) => {
	res.render('jobseeker/resume/instructions', {
		pageTitle : 'Resume',
		path      : '/resume',
		tabpath   : '/instructions'
	});
});

router.get('/resume/summary', (req, res) => {
	res.render('jobseeker/resume/summary', {
		pageTitle : 'Resume - Summary',
		path      : '/resume',
		tabpath   : '/summary'
	});
});

router.get('/resume/work-experience', (req, res) => {
	res.render('jobseeker/resume/work-experience', {
		pageTitle : 'Resume - Work Experience',
		path      : '/resume',
		tabpath   : '/work'
	});
});

router.get('/resume/education', (req, res) => {
	res.render('jobseeker/resume/education', {
		pageTitle : 'Resume - Education',
		path      : '/resume',
		tabpath   : '/education'
	});
});

router.get('/resume/skills', (req, res) => {
	res.render('jobseeker/resume/skills', {
		pageTitle : 'Resume-Skills',
		path      : '/resume',
		tabpath   : '/skills'
	});
});

router.get('/resume/personal-info', (req, res) => {
	res.render('jobseeker/resume/personalinfo', {
		pageTitle : 'Resume-Personal Info',
		path      : '/resume',
		tabpath   : '/personal-info'
	});
});

router.get('/resume/generate-cv', (req, res) => {
	res.render('jobseeker/resume/generate-cv', {
		pageTitle : 'Resume-Create',
		path      : '/resume',
		tabpath   : '/create-cv'
	});
});

//jobseeker manage profile
router.get('/manage-profile', (req, res) => {
	res.render('jobseeker/manage-profile', {
		pageTitle : 'Manage Profile',
		path      : '/manage-profile'
	});
});

module.exports = router;
