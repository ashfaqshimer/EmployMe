const bcrypt = require('bcryptjs');

//Import the  models
const User = require('../models/user');
const Admin = require('../models/admin');
const Resume = require('../models/resume');

exports.getHome = (req, res) => {
	res.render('home', { pageTitle: 'EmployMe', path: '/' });
};

exports.getSignup = (req, res) => {
	res.render('signup', { pageTitle: 'Sign Up', path: '/signup' });
};

exports.postSignup = (req, res) => {
	const name = req.body.name;
	const email = req.body.email;
	const password = req.body.password;

	User.findOne({ email: email })
		.then((userDoc) => {
			if (userDoc) {
				return res.redirect('/signup');
			}
			return bcrypt
				.hash(password, 12)
				.then((hashedPassword) => {
					const user = new User({
						name     : name,
						email    : email,
						password : hashedPassword,
						profile  : {}
					});

					return user.save();
				})
				.then((result) => {
					const resume = new Resume({
						userId : result._id
					});
					return resume.save();
				})
				.then((result) => {
					User.findById(result.userId).then((user) => {
						user.resumeId = result._id;
						return user.save();
					});
				})
				.then((result) => {
					console.log('Log: exports.postSignup -> result', result);
					res.redirect('/login/jobseeker');
				});
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.getAdminSignup = (req, res) => {
	res.render('signup-admin', { pageTitle: 'Admin Login', path: '/signup/admin' });
};

exports.postAdminSignup = (req, res) => {
	const username = req.body.username;
	const email = req.body.email;
	const password = req.body.password;

	Admin.findOne({ email: email })
		.then((userDoc) => {
			if (userDoc) {
				return res.redirect('/signup');
			}
			return bcrypt
				.hash(password, 12)
				.then((hashedPassword) => {
					const admin = new Admin({
						username : username,
						email    : email,
						password : hashedPassword
					});

					return admin.save();
				})
				.then((result) => {
					res.redirect('/login/admin');
				});
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.getJobseekerLogin = (req, res) => {
	res.render('login-jobseeker', { pageTitle: 'Job-Seeker Login', path: '/login' });
};

exports.postJobseekerLogin = (req, res) => {
	const email = req.body.email;
	const password = req.body.password;
	User.findOne({ email: email })
		.then((user) => {
			if (!user) {
				console.log('No user found!');
				return res.redirect('/login/jobseeker');
			}
			bcrypt
				.compare(password, user.password)
				.then((doMatch) => {
					if (doMatch) {
						req.session.isLoggedIn = true;
						req.session.user = user;
						return req.session.save((err) => {
							console.log(err);
							res.redirect('/jobseeker/');
						});
					}
					res.redirect('/login/jobseeker');
				})
				.catch((err) => {
					console.log(err);
					res.redirect('/login/jobseeker');
				});
		})
		.catch((err) => console.log(err));
};

exports.getAdminLogin = (req, res) => {
	res.render('login-admin', { pageTitle: 'Admin Login', path: '/login' });
};

exports.postAdminLogin = (req, res) => {
	const username = req.body.username;
	const password = req.body.password;
	Admin.findOne({ username: username })
		.then((admin) => {
			if (!admin) {
				console.log('No admin found!');
				return res.redirect('/login/jobseeker');
			}
			bcrypt
				.compare(password, admin.password)
				.then((doMatch) => {
					if (doMatch) {
						req.session.isLoggedIn = true;
						req.session.admin = admin;
						return req.session.save((err) => {
							console.log(err);
							res.redirect('/admin/');
						});
					}
					res.redirect('/login/admin');
				})
				.catch((err) => {
					console.log(err);
					res.redirect('/login/admin');
				});
		})
		.catch((err) => console.log(err));
};

exports.postLogout = (req, res, next) => {
	req.session.destroy((err) => {
		console.log(err);
		res.redirect('/');
	});
};
