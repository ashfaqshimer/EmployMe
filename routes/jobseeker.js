const express = require('express');
const router = express.Router();

const jobseekerControllers = require('../controllers/jobseeker');
const isAuth = require('../middleware/isAuthUser');

router.get('/', (req, res) => {
	res.render('jobseeker/homepage', { pageTitle: 'Job-Seeker', path: 'jobseeker/' });
});

//jobseeker resume routes
router.route('/resume').get(isAuth, jobseekerControllers.getResume);

router
	.route('/resume/summary')
	.get(isAuth, jobseekerControllers.getResumeSummary)
	.post(isAuth, jobseekerControllers.postResumeSummary);

router
	.route('/resume/work-experience')
	.get(isAuth, jobseekerControllers.getResumeWorkExperience)
	.post(isAuth, jobseekerControllers.postResumeWorkExperience);

router.route('/resume/education').get(isAuth, jobseekerControllers.getResumeEducation);

router.route('/resume/skills').get(isAuth, jobseekerControllers.getResumeSkills);

router.route('/resume/personal-info').get(isAuth, jobseekerControllers.getResumePersonalInfo);

router.route('/resume/generate-cv').get(isAuth, jobseekerControllers.getResumeGenerateCV);

//jobseeker manage profile
router.route('/manage-profile').get(isAuth, jobseekerControllers.getManageProfile);

module.exports = router;
