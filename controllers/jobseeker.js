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

exports.postResumeWorkExperience = (req, res) => {
	const userId = req.session.user._id;
	const title = req.body.title;
	const category = req.body.category;
	const duration = req.body.duration;
	const startDate = req.body.startDate;
	const endDate = req.body.endDate;
	const description = req.body.description;

	Resume.findOne({ userId: userId })
		.then((userResume) => {
			const newExperience = {
				title       : title,
				jobCategory : category,
				startDate   : startDate,
				endDate     : endDate,
				duration    : duration,
				description : description
			};

			const updatedWorkExperience = [ ...userResume.workExperience ];
			updatedWorkExperience.push(newExperience);
			userResume.workExperience = updatedWorkExperience;
			return userResume.save();
		})
		.then((result) => {
			console.log('Log: exports.postResumeWorkExperience -> result', result);
			res.redirect('/jobseeker/resume/work-experience');
		})
		.catch((err) => {
			console.log('Log: exports.postResumeSummary -> err', err);
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
	const userId = req.session.user._id;
	Resume.findOne({ userId: userId })
		.then((foundResume) => {
			res.render('jobseeker/resume/skills', {
				pageTitle : 'Resume-Skills',
				path      : '/resume',
				tabpath   : '/skills',
				data      : foundResume.skills
			});
		})
		.catch((err) => {
			console.log('Log: exports.getResumeSummary -> err', err);
		});
};

exports.postResumeSkills = (req, res) => {
	const userId = req.session.user._id;
	const skill = req.body.skill;

	Resume.findOne({ userId: userId })
		.then((userResume) => {
			if (userResume.skills.length>=10){
				return console.log("Maximum reached!")
			}
			const newSkill = {
				skill : skill
			};

			const updatedSkills = [ ...userResume.skills ];
			updatedSkills.push(newSkill);
			userResume.skills = updatedSkills;
			return userResume.save();
		})
		.then((result) => {
			console.log('Log: exports.postResumeWorkExperience -> result', result);
			res.redirect('/jobseeker/resume/skills');
		})
		.catch((err) => {
			console.log('Log: exports.postResumeSummary -> err', err);
		});
};

exports.postDeleteSkill = (req, res) => {
	const userId = req.session.user._id;
	const skillId = req.body.skillId;

	Resume.findOne({ userId: userId })
		.then((userResume) => {
			userResume.skills.pull(skillId);
			return userResume.save();
		})
		.then((result) => {
			console.log('Log: exports.postResumeWorkExperience -> result', result);
			res.redirect('/jobseeker/resume/skills');
		})
		.catch((err) => {
			console.log('Log: exports.postResumeSummary -> err', err);
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
