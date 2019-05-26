const User = require('../models/user');
const Resume = require('../models/resume');
const Lookup = require('../models/lookup');

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
		.catch((err) => {});
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
		.catch((err) => {});
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
			res.redirect('/jobseeker/resume/work-experience');
		})
		.catch((err) => {});
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
		.catch((err) => {});
};

exports.postResumeSkills = (req, res) => {
	const userId = req.session.user._id;
	const skill = req.body.skill;

	Resume.findOne({ userId: userId })
		.then((userResume) => {
			if (userResume.skills.length >= 10) {
				return console.log('Maximum reached!');
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
			res.redirect('/jobseeker/resume/skills');
		})
		.catch((err) => {});
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
			res.redirect('/jobseeker/resume/skills');
		})
		.catch((err) => {});
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
	const userId = req.session.user._id;
	let alStream = [];
	let bachelors = [];
	let masters = [];
	let phd = [];
	let jobSector = [];
	let educationLevel = [];
	let diploma = [];
	let professional = [];

	Lookup.findOne({ type: 'alStream' }).then((result) => {
		alStream = [ ...result.values ];
	});
	Lookup.findOne({ type: 'bachelors' }).then((result) => {
		bachelors = [ ...result.values ];
	});
	Lookup.findOne({ type: 'masters' }).then((result) => {
		masters = [ ...result.values ];
	});
	Lookup.findOne({ type: 'phd' }).then((result) => {
		phd = [ ...result.values ];
	});
	Lookup.findOne({ type: 'jobSector' }).then((result) => {
		jobSector = [ ...result.values ];
	});
	Lookup.findOne({ type: 'educationLevel' }).then((result) => {
		educationLevel = [ ...result.values ];
	});
	Lookup.findOne({ type: 'diploma' }).then((result) => {
		diploma = [ ...result.values ];
	});
	Lookup.findOne({ type: 'professional' }).then((result) => {
		professional = [ ...result.values ];
	});

	User.findById(userId)
		.then((user) => {
			res.render('jobseeker/manage-profile', {
				pageTitle    : 'Manage Profile',
				path         : '/manage-profile',
				data         : user.profile,
				alStream     : alStream,
				phd          : phd,
				professional : professional,
				diploma      : diploma,
				masters      : masters,
				bachelors    : bachelors,
				jobSector    : jobSector,
				phd          : phd
			});
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.postManageProfile = (req, res) => {
	const userId = req.session.user._id;
	const sector = req.body.sector;
	const education = req.body.education;
	const olPasses = req.body.olPasses;
	const alPasses = req.body.alPasses;
	const alStream = req.body.alStream;
	const diploma = req.body.diploma;
	const bachelors = req.body.bachelors;
	const masters = req.body.masters;
	const phd = req.body.phd;
	const professionalQualification = req.body.professional;

	User.findById(userId)
		.then((user) => {
			const newProfile = {
				preferredJobSector        : sector,
				highestCompletedEducation : education,
				olPasses                  : olPasses,
				alPasses                  : alPasses,
				alStream                  : alStream,
				diploma                   : diploma,
				bachelors                 : bachelors,
				masters                   : masters,
				phd                       : phd,
				professionalQualification : professionalQualification
			};
			user.profile = newProfile;
			return user.save();
		})
		.then((result) => {
			res.redirect('/jobseeker/manage-profile');
		})
		.catch((err) => {});
};
