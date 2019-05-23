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

    User.findOne({ email: email }, (err, foundUser) => {
        if (!err) {
            if (foundUser) {
                //display an error saying that exists
                console.log('Found existing user', foundUser);
            } else {
                //create new user
                const user = new User({
                    name: name,
                    email: email,
                    password: password
                });

                user.save()
                    .then(response => {
                        console.log('Log: response', response);
                        res.redirect('/login/jobseeker');
                    })
                    .catch(err => {
                        console.log('Log: err', err);
                    });
            }
        }
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
            } else {
                //save the admin and redirect
                const admin = new Admin({
                    username: username,
                    email: email,
                    password: password
                });

                admin
                    .save()
                    .then(response => {
                        console.log('Log: response', response);
                        res.redirect('/login/admin');
                    })
                    .catch(err => {
                        console.log('Log: err', err);
                    });
            }
        }
    });
};

exports.getJobseekerLogin = (req, res) => {
    res.render('login-jobseeker', { pageTitle: 'Job-Seeker Login', path: '/login' }).post();
};

exports.getAdminLogin = (req, res) => {
    res.render('login-admin', { pageTitle: 'Admin Login', path: '/login' });
};
