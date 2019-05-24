const bcrypt = require('bcryptjs');

//Import the  models
const User = require('../models/user');
const Admin = require('../models/admin');

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
						password : hashedPassword
					});
					return user.save();
				})
				.then((result) => {
					res.redirect('/login/jobseeker');
				});
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.getAdminSignup = (req, res) => {
	res.render('signup-admin', { pageTitle: 'Admin Login', path: '/signup' });
};

exports.postAdminSignup = (req, res) => {
	const username = req.body.username;
	const email = req.body.email;
	const password = req.body.password;

	Admin.findOne({ email: email }, (err, foundAdmin) => {
		if (!err) {
			if (foundAdmin) {
				//display error saying admin exists
				console.log(foundAdmin);
				res.redirect('/signup/admin');
			} else {
				//hash the password
				bcrypt
					.hash(password, 12)
					.then((hashedPassword) => {
						//save the admin and redirect
						const admin = new Admin({
							username : username,
							email    : email,
							password : hashedPassword
						});
						admin.save().then((response) => {
							res.redirect('/login/admin');
						});
					})
					.catch((err) => {});
			}
		}
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

exports.postLogout = (req, res, next) => {
	req.session.destroy((err) => {
		console.log(err);
		res.redirect('/');
	});
};