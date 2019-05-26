const express = require('express');

const adminControllers = require('../controllers/admin')

const router = express.Router();

router.get('/', (req, res) => {
	res.render('admin/search-candidate', { pageTitle: 'Administrator', path: '/admin/' });
});

router.post('/search', adminControllers.postSearch)
module.exports = router;
