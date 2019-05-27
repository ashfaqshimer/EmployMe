const User = require('../models/user');
const Resume = require('../models/resume');

const getValues = require('../getValues');

exports.getHome = (req, res) => {
	res.render('admin/search-candidate', {
		pageTitle      : 'Administrator',
		path           : '/admin/',
		phd            : getValues.phd,
		professional   : getValues.professional,
		diploma        : getValues.diploma,
		masters        : getValues.masters,
		bachelors      : getValues.bachelors,
		jobSector      : getValues.jobSector,
		educationLevel : getValues.educationLevel
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
		.then((results) => {
			console.log(results);
			res.render('admin/search-results', {
				pageTitle : 'Administrator',
				path      : '/admin/',
				results   : results
			});
		});
};
