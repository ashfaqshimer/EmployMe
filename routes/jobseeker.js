const express = require('express');
const router = express.Router();

const jobseekerControllers = require('../controllers/jobseeker');
const isAuth = require('../middleware/isAuthUser');

router.get('/', isAuth, jobseekerControllers.getHome);

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

router.post('/resume/work-experience/delete', isAuth, jobseekerControllers.postDeleteExperience);

router
	.route('/resume/education')
	.get(isAuth, jobseekerControllers.getResumeEducation)
	.post(isAuth, jobseekerControllers.postResumeEducation);

router
	.route('/resume/skills')
	.get(isAuth, jobseekerControllers.getResumeSkills)
	.post(isAuth, jobseekerControllers.postResumeSkills);

router.post('/resume/skills/delete', isAuth, jobseekerControllers.postDeleteSkill);

router
	.route('/resume/personal-info')
	.get(isAuth, jobseekerControllers.getResumePersonalInfo)
	.post(isAuth, jobseekerControllers.postResumePersonalInfo);

router.route('/resume/generate-cv').get(isAuth, jobseekerControllers.getResumeGenerateCV);

//jobseeker manage profile
router
	.route('/manage-profile')
	.get(isAuth, jobseekerControllers.getManageProfile)
	.post(isAuth, jobseekerControllers.postManageProfile);

module.exports = router;
