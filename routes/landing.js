const express = require('express');
const { check, body } = require('express-validator/check');

const router = express.Router();

//Import the controllers
const authControllers = require('../controllers/auth');

router.get('/', authControllers.getHome);

router
	.route('/signup')
	.get(authControllers.getSignup)
	.post(
		[
			check('email')
				.isEmail()
				.withMessage('Please enter a valid email'),

			body('password', 'Please enter a valid password of at least 6 characters.').isLength({
				min: 6
			}),
			body('password2').custom((value, { req }) => {
				if (value !== req.body.password) {
					throw new Error('Passwords have to match.');
				}
				return true;
			})
		],
		authControllers.postSignup
	);

router
	.route('/signup/admin')
	.get(authControllers.getAdminSignup)
	.post(authControllers.postAdminSignup);

router
	.route('/login/jobseeker')
	.get(authControllers.getJobseekerLogin)
	.post(authControllers.postJobseekerLogin);

router
	.route('/login/admin')
	.get(authControllers.getAdminLogin)
	.post(authControllers.postAdminLogin);

// The logout route will be commmon for the jobseeker as well as admin
router.post('/logout', authControllers.postLogout);

module.exports = router;
