const User = require('../models/user');
const Resume = require('../models/resume');

const getValues = require('../getValues');

exports.getHome = (req, res) => {
	res.render('admin/admin', {
		pageTitle: 'Administrator',
		path: '/admin/',
		phd: getValues.phd,
		professional: getValues.professional,
		diploma: getValues.diploma,
		masters: getValues.masters,
		bachelors: getValues.bachelors,
		jobSector: getValues.jobSector,
		educationLevel: getValues.educationLevel
	});
};

exports.postSearchSector = (req, res) => {
	const sector = req.body.sector;
	// const educationLevel = req.body.educationLevel;
	// const olPasses = req.body.olPasses;
	// const alPasses = req.body.alPasses;
	// const education = req.body.education;
	// const professional = req.body.professional;
	// const skill = req.body.skill;
	// const experience = req.body.experience;
	// console.log(req.body);
	User.find({ 'profile.preferredJobSector': sector })
		.populate('resumeId', 'skills')
		.then(results => {
			console.log(results);
			res.render('admin/search-results', {
				pageTitle: 'Administrator',
				path: '/admin/',
				results: results
			});
		});
};

exports.postSearch = (req, res) => {
	const jobSector = req.body.jobSector ? req.body.jobSector : { $exists: true };
	const diploma = req.body.diploma ? req.body.diploma : { $exists: true };
	const masters = req.body.masters ? req.body.masters : { $exists: true };
	const phd = req.body.phd ? req.body.phd : { $exists: true };
	const bachelors = req.body.bachelors ? req.body.bachelors : { $exists: true };
	const professional = req.body.professional ? req.body.professional : { $exists: true };
	const skill = req.body.skill;

	User.find({
		'profile.preferredJobSector': jobSector,
		'profile.diploma': diploma,
		'profile.bachelors': bachelors,
		'profile.masters': masters,
		'profile.phd': phd,
		'profile.professionalQualification': professional,
		'skills.skill': skill
	})
		.then(results => {
			res.render('admin/search-results', {
				pageTitle: 'Administrator',
				path: '/admin/',
				results: results
			});
		})
		.catch(err => {
			console.log(err);
		});
};
