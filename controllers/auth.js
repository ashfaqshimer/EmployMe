const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator/check');

//Importing the  models
const User = require('../models/user');
const Admin = require('../models/admin');
const Resume = require('../models/resume');

exports.getHome = (req, res) => {
	res.render('home', { pageTitle: 'EmployMe', path: '/' });
};

exports.getSignup = (req, res) => {
	let message = req.flash('error');
	if (message.length > 0) {
		message = message[0];
	} else {
		message = null;
	}
	res.render('signup', { pageTitle: 'Sign Up', path: '/signup', error: message });
};

exports.postSignup = (req, res) => {
	const name = req.body.name;
	const email = req.body.email;
	const password = req.body.password;
	const password2 = req.body.password2;
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res
			.status(422)
			.render('signup', { pageTitle: 'Sign Up', path: '/signup', error: errors.array()[0].msg });
	}

	User.findOne({ email: email })
		.then(userDoc => {
			if (userDoc) {
				req.flash('error', 'User with that email already exists');
				return res.redirect('/signup');
			}
			return bcrypt
				.hash(password, 12)
				.then(hashedPassword => {
					const user = new User({
						name: name,
						email: email,
						password: hashedPassword,
						profile: {},
						skills: []
					});

					return user.save();
				})
				.then(result => {
					const resume = new Resume({
						userId: result._id
					});
					return resume.save();
				})
				.then(result => {
					User.findById(result.userId).then(user => {
						user.resumeId = result._id;
						return user.save();
					});
				})
				.then(result => {
					res.redirect('/login/jobseeker');
				});
		})
		.catch(err => {
			console.log(err);
		});
};

exports.getAdminSignup = (req, res) => {
	let message = req.flash('error');
	if (message.length > 0) {
		message = message[0];
	} else {
		message = null;
	}
	res.render('signup-admin', { pageTitle: 'Admin Login', path: '/signup/admin', error: message });
};

exports.postAdminSignup = (req, res) => {
	const username = req.body.username;
	const email = req.body.email;
	const password = req.body.password;

	Admin.findOne({ username: username })
		.then(userDoc => {
			if (userDoc) {
				req.flash('error', 'Admin with that username already exists');
				return res.redirect('/signup/admin');
			}

			return bcrypt
				.hash(password, 12)
				.then(hashedPassword => {
					const admin = new Admin({
						username: username,
						email: email,
						password: hashedPassword
					});

					return admin.save();
				})
				.then(result => {
					res.redirect('/login/admin');
				});
		})
		.catch(err => {
			console.log(err);
		});
};

exports.getJobseekerLogin = (req, res) => {
	let message = req.flash('error');
	if (message.length > 0) {
		message = message[0];
	} else {
		message = null;
	}
	res.render('login-jobseeker', {
		pageTitle: 'Job-Seeker Login',
		path: '/login',
		error: message
	});
};

exports.postJobseekerLogin = (req, res) => {
	const email = req.body.email;
	const password = req.body.password;

	User.findOne({ email: email })
		.then(user => {
			if (!user) {
				console.log('No user found!');
				req.flash('error', 'No user found matching that email address');
				return res.redirect('/login/jobseeker');
			}
			bcrypt
				.compare(password, user.password)
				.then(doMatch => {
					if (doMatch) {
						req.session.isLoggedIn = true;
						req.session.user = user;
						req.session.userType = 'jobseeker';
						return req.session.save(err => {
							console.log(err);
							res.redirect('/jobseeker/');
						});
					}
					req.flash('error', 'Incorrect email or password');
					res.redirect('/login/jobseeker');
				})
				.catch(err => {
					console.log(err);
					res.redirect('/login/jobseeker');
				});
		})
		.catch(err => console.log(err));
};

exports.getAdminLogin = (req, res) => {
	let message = req.flash('error');
	if (message.length > 0) {
		message = message[0];
	} else {
		message = null;
	}
	res.render('login-admin', { pageTitle: 'Admin Login', path: '/login', error: message });
};

exports.postAdminLogin = (req, res) => {
	const username = req.body.username;
	const password = req.body.password;
	Admin.findOne({ username: username })
		.then(admin => {
			if (!admin) {
				console.log('No admin found!');
				req.flash('error', 'No user found matching that username');
				return res.redirect('/login/jobseeker');
			}
			bcrypt
				.compare(password, admin.password)
				.then(doMatch => {
					if (doMatch) {
						req.session.isLoggedIn = true;
						req.session.user = admin;
						req.session.userType = 'admin';
						return req.session.save(err => {
							console.log(err);
							res.redirect('/admin/');
						});
					}
					req.flash('error', 'Incorrect email or password');
					res.redirect('/login/admin');
				})
				.catch(err => {
					console.log(err);
					res.redirect('/login/admin');
				});
		})
		.catch(err => console.log(err));
};

exports.postLogout = (req, res, next) => {
	req.session.destroy(err => {
		console.log(err);
		res.redirect('/');
	});
};
