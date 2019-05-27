const express = require('express');

const adminControllers = require('../controllers/admin');
const isAuth = require('../middleware/isAuthAdmin');

const router = express.Router();

router.get('/', isAuth, adminControllers.getHome);

router.post('/searchsector', isAuth, adminControllers.postSearchSector)

module.exports = router;
