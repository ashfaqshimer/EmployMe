const PDFDocument = require('pdfkit');

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
	const userId = req.session.user._id;
	Resume.findOne({ userId: userId }).then(resume => {
		res.render('jobseeker/resume/education', {
			pageTitle: 'Resume - Education',
			path: '/resume',
			tabpath: '/education',
			education: resume.education
		});
	});
};

exports.postResumeEducation = (req, res) => {
	const userId = req.session.user._id;
	const title = req.body.title;
	const startDate = req.body.startDate;
	const endDate = req.body.endDate;
	const description = req.body.description;

	if (endDate <= startDate) {
		console.log('Throw error : End Date cannot be before start date');
		return res.redirect('/jobseeker/resume/education');
	}

	Resume.findOne({ userId: userId })
		.then(userResume => {
			if (userResume.education.length >= 3) {
				console.log('Throw error, maximum number of education');
				res.redirect('/jobseeker/resume/education');
			}
			const newEducation = {
				title: title,
				startDate: startDate,
				endDate: endDate,
				description: description
			};

			const updatededucation = [...userResume.education];
			updatededucation.push(newEducation);
			userResume.education = updatededucation;
			return userResume.save();
		})
		.then(result => {
			res.redirect('/jobseeker/resume/education');
		})
		.catch(err => {
			console.log(err);
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
	const userId = req.session.user._id;
	Resume.findOne({ userId: userId })
		.then(foundResume => {
			res.render('jobseeker/resume/personal-info', {
				pageTitle: 'Resume - Personal Information',
				path: '/resume',
				tabpath: '/personal-info',
				data: foundResume.personalInfo
			});
		})
		.catch(err => {
			console.log('TCL: exports.getResumePersonalInfo -> err', err);
		});
};

exports.postResumePersonalInfo = (req, res) => {
	const userId = req.session.user._id;
	const name = req.body.name;
	const email = req.body.email;
	const number = req.body.number;
	const linkedin = req.body.linkedin;

	Resume.findOne({ userId: userId })
		.then(userResume => {
			userResume.personalInfo.fullName = name;
			userResume.personalInfo.contactNumber = number;
			userResume.personalInfo.email = email;
			linkedin ? (userResume.personalInfo.linkedinProfile = linkedin) : null;
			return userResume.save();
		})
		.then(result => {
			res.redirect('/jobseeker/resume/personal-info');
		})
		.catch(err => {
			console.log('TCL: exports.postResumePersonalInfo -> err', err);
		});
};

exports.getResumeGenerateCV = (req, res) => {
	const userId = req.session.user._id;
	// res.render('jobseeker/resume/generate-cv', {
	// 	pageTitle: 'Resume-Create',
	// 	path: '/resume',
	// 	tabpath: '/create-cv'
	// });
	Resume.findOne({ userId: userId })
		.populate('userId', 'skills')
		.then(resume => {
			// Creating a downloadable PDF of the resume
			const pdfDoc = new PDFDocument();
			pdfDoc.pipe(res);
			//Header
			pdfDoc
				.font('Helvetica')
				.fontSize(20)
				.text('Curriculum Vitae', {
					underline: true,
					align: 'center'
				})
				.moveDown();
			// User Personal Info
			pdfDoc
				.fontSize(16)
				.text('Personal Information', {
					underline: true
				})
				.moveDown();
			pdfDoc
				.fontSize(11)
				.text(resume.personalInfo.fullName)
				.text(resume.personalInfo.email)
				.text(resume.personalInfo.contactNumber)
				.text(resume.personalInfo.linkedinProfile)
				.moveDown();

			// Career Objective
			pdfDoc
				.fontSize(16)
				.text('Career Objective', {
					underline: true
				})
				.moveDown();
			pdfDoc
				.fontSize(11)
				.text(resume.summary)
				.moveDown();

			// Work Experience
			pdfDoc
				.fontSize(16)
				.text('Work Experience', {
					underline: true
				})
				.moveDown();
			resume.workExperience.forEach(experience => {
				pdfDoc
					.fontSize(11)
					.text(experience.title)
					.moveDown();
				pdfDoc
					.fontSize(11)
					.text(experience.startDate.toDateString() + ' - ' + experience.endDate.toDateString(), {
						oblique: true
					})
					.moveDown();
				pdfDoc
					.fontSize(11)
					.text(experience.description, { align: 'justify' })
					// .text('-----------------------------------------------------------------------------', {
					// 	align: 'center'
					// })
					.moveDown();
			});

			// pdfDoc.addPage();

			// Education
			pdfDoc
				.fontSize(16)
				.text('Education', {
					underline: true
				})
				.moveDown();
			resume.education.forEach(education => {
				pdfDoc
					.fontSize(11)
					.text(education.title)
					.moveDown();
				pdfDoc
					.fontSize(11)
					.text(education.startDate.toDateString() + ' - ' + education.endDate.toDateString(), {
						oblique: true
					})
					.moveDown();
				pdfDoc
					.fontSize(11)
					.text(education.description, { align: 'justify' })
					// .text('-----------------------------------------------------------------------------', {
					// 	align: 'center'
					// })
					.moveDown();
			});

			// Skills
			pdfDoc
				.fontSize(16)
				.text('Skills', {
					underline: true
				})
				.moveDown();
			resume.userId.skills.forEach(skill => {
				pdfDoc.fontSize(11).text(skill.skill, { columns: 2, align: 'justify', height: 150 });
			});
			pdfDoc.moveDown();

			pdfDoc.end();
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
