const bcrypt = require('bcryptjs');

const User = require('../models/user');
const Resume = require('../models/resume');

exports.getResume = (req, res) => {
	res.render('jobseeker/resume/instructions', {
		pageTitle : 'Resume',
		path      : '/resume',
		tabpath   : '/instructions'
	});
};

exports.getResumeSummary = (req, res) => {
	const userId = req.session.user._id;
	Resume.findOne({ userId: userId })
		.then((foundResume) => {
			res.render('jobseeker/resume/summary', {
				pageTitle : 'Resume - Summary',
				path      : '/resume',
				tabpath   : '/summary',
				data      : foundResume.summary
			});
		})
		.catch((err) => {
			console.log('Log: exports.getResumeSummary -> err', err);
		});
};

exports.postResumeSummary = (req, res) => {
	const userId = req.session.user._id;
	const summary = req.body.summary;

	Resume.findOne({ userId: userId })
		.then((userResume) => {
			userResume.summary = summary;
			return userResume.save();
		})
		.then((result) => {
			res.redirect('/jobseeker/resume/summary');
		})
		.catch((err) => {
			console.log('Log: exports.postResumeSummary -> err', err);
		});
};

exports.getResumeWorkExperience = (req, res) => {
	res.render('jobseeker/resume/work-experience', {
		pageTitle : 'Resume - Work Experience',
		path      : '/resume',
		tabpath   : '/work'
	});
};

exports.getResumeEducation = (req, res) => {
	res.render('jobseeker/resume/education', {
		pageTitle : 'Resume - Education',
		path      : '/resume',
		tabpath   : '/education'
	});
};

exports.getResumeSkills = (req, res) => {
	res.render('jobseeker/resume/skills', {
		pageTitle : 'Resume-Skills',
		path      : '/resume',
		tabpath   : '/skills'
	});
};

exports.getResumePersonalInfo = (req, res) => {
	res.render('jobseeker/resume/personalinfo', {
		pageTitle : 'Resume-Personal Info',
		path      : '/resume',
		tabpath   : '/personal-info'
	});
};

exports.getResumeGenerateCV = (req, res) => {
	res.render('jobseeker/resume/generate-cv', {
		pageTitle : 'Resume-Create',
		path      : '/resume',
		tabpath   : '/create-cv'
	});
};

exports.getManageProfile = (req, res) => {
	res.render('jobseeker/manage-profile', {
		pageTitle : 'Manage Profile',
		path      : '/manage-profile'
	});
};
