const express = require('express');

const adminControllers = require('../controllers/admin')

const router = express.Router();

router.get('/', adminControllers.getHome);

router.post('/searchsector', adminControllers.postSearchSector)

module.exports = router;
