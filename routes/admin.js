const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('admin/home', { pageTitle: 'Welcome Administrator', path: '/admin/' });
});

module.exports = router;
