const User = require('../models/user');
const Resume = require('../models/resume');

const getValues = require('../getValues');

exports.getHome = (req, res) => {
	res.render('jobseeker/homepage', { pageTitle: 'Job-Seeker', path: 'jobseeker/' });
};

exports.getResume = (req, res) => {
	res.render('jobseeker/resume/instructions', {
		pageTitle: 'Resume',
		path: '/resume',
		tabpath: '/instructions'
	});
};

exports.getResumeSummary = (req, res) => {
	const userId = req.session.user._id;
	Resume.findOne({ userId: userId })
		.then(foundResume => {
			res.render('jobseeker/resume/summary', {
				pageTitle: 'Resume - Summary',
				path: '/resume',
				tabpath: '/summary',
				data: foundResume.summary
			});
		})
		.catch(err => {});
};

exports.postResumeSummary = (req, res) => {
	const userId = req.session.user._id;
	const summary = req.body.summary;
	Resume.findOne({ userId: userId })
		.then(userResume => {
			userResume.summary = summary;
			return userResume.save();
		})
		.then(result => {
			res.redirect('/jobseeker/resume/summary');
		})
		.catch(err => {});
};

exports.getResumeWorkExperience = (req, res) => {
	const userId = req.session.user._id;
	Resume.findOne({ userId: userId }).then(resume => {
		res.render('jobseeker/resume/work-experience', {
			pageTitle: 'Resume - Work Experience',
			path: '/resume',
			tabpath: '/work',
			workExperience: resume.workExperience
		});
	});
};

exports.postResumeWorkExperience = (req, res) => {
	const userId = req.session.user._id;
	const title = req.body.title;
	const category = req.body.category;
	const startDate = req.body.startDate;
	const endDate = req.body.endDate;
	const description = req.body.description;

	if (endDate <= startDate) {
		console.log('Throw error : End Date cannot be before start date');
		return res.redirect('/jobseeker/resume/work-experience');
	}

	Resume.findOne({ userId: userId })
		.then(userResume => {
			if (userResume.workExperience.length >= 3) {
				console.log('Throw error, maximum number of work experiences');
				res.redirect('/jobseeker/resume/work-experience');
			}
			const newExperience = {
				title: title,
				jobCategory: category,
				startDate: startDate,
				endDate: endDate,
				description: description
			};

			const updatedWorkExperience = [...userResume.workExperience];
			updatedWorkExperience.push(newExperience);
			userResume.workExperience = updatedWorkExperience;
			return userResume.save();
		})
		.then(result => {
			res.redirect('/jobseeker/resume/work-experience');
		})
		.catch(err => {});
};

exports.postDeleteExperience = (req, res) => {
	const userId = req.session.user._id;
	const experienceId = req.body.experienceId;

	Resume.findOne({ userId: userId })
		.then(resume => {
			resume.workExperience.pull(experienceId);
			return resume.save();
		})
		.then(result => {
			res.redirect('/jobseeker/resume/work-experience');
		})
		.catch(err => {
			console.log(err);
		});
};

exports.getResumeEducation = (req, res) => {
	res.render('jobseeker/resume/education', {
		pageTitle: 'Resume - Education',
		path: '/resume',
		tabpath: '/education'
	});
};

exports.getResumeSkills = (req, res) => {
	const userId = req.session.user._id;
	User.findById(userId)
		.then(foundUser => {
			res.render('jobseeker/resume/skills', {
				pageTitle: 'Resume-Skills',
				path: '/resume',
				tabpath: '/skills',
				data: foundUser.skills
			});
		})
		.catch(err => {});
};

exports.postResumeSkills = (req, res) => {
	const userId = req.session.user._id;
	const skill = req.body.skill;

	User.findById(userId)
		.then(user => {
			if (user.skills.length >= 10) {
				return console.log('Maximum reached!');
			}
			const newSkill = {
				skill: skill
			};

			const updatedSkills = [...user.skills];
			updatedSkills.push(newSkill);
			user.skills = updatedSkills;
			return user.save();
		})
		.then(result => {
			res.redirect('/jobseeker/resume/skills');
		})
		.catch(err => {
			console.log(err);
		});
};

exports.postDeleteSkill = (req, res) => {
	const userId = req.session.user._id;
	const skillId = req.body.skillId;

	User.findOne(userId)
		.then(user => {
			user.skills.pull(skillId);
			return user.save();
		})
		.then(result => {
			res.redirect('/jobseeker/resume/skills');
		})
		.catch(err => {});
};

exports.getResumePersonalInfo = (req, res) => {
	res.render('jobseeker/resume/personalinfo', {
		pageTitle: 'Resume-Personal Info',
		path: '/resume',
		tabpath: '/personal-info'
	});
};

exports.getResumeGenerateCV = (req, res) => {
	res.render('jobseeker/resume/generate-cv', {
		pageTitle: 'Resume-Create',
		path: '/resume',
		tabpath: '/create-cv'
	});
};

exports.getManageProfile = (req, res) => {
	const userId = req.session.user._id;

	User.findById(userId)
		.then(user => {
			res.render('jobseeker/manage-profile', {
				pageTitle: 'Manage Profile',
				path: '/manage-profile',
				data: user.profile,
				alStream: getValues.alStream,
				phd: getValues.phd,
				professional: getValues.professional,
				diploma: getValues.diploma,
				masters: getValues.masters,
				bachelors: getValues.bachelors,
				jobSector: getValues.jobSector,
				educationLevel: getValues.educationLevel
			});
		})
		.catch(err => {
			console.log(err);
		});
};

exports.postManageProfile = (req, res) => {
	const userId = req.session.user._id;
	const sector = req.body.sector;
	const highestCompletedEducation = req.body.education;
	const olPasses = req.body.olPasses;
	const alPasses = req.body.alPasses;
	const experience = req.body.experience;
	const alStream = req.body.alStream;
	const diploma = req.body.diploma;
	const bachelors = req.body.bachelors;
	const masters = req.body.masters;
	const phd = req.body.phd;
	const professionalQualification = req.body.professional;

	User.findById(userId)
		.then(user => {
			let newProfile = {
				preferredJobSector: sector,
				highestCompletedEducation: highestCompletedEducation,
				olPasses: olPasses,
				alPasses: alPasses,
				workExperience: experience,
				alStream: alStream,
				diploma: diploma,
				bachelors: bachelors,
				masters: masters,
				phd: phd,
				professionalQualification: professionalQualification
			};
			user.profile = newProfile;
			return user.save();
		})
		.then(result => {
			res.redirect('/jobseeker/manage-profile');
		})
		.catch(err => {});
};
