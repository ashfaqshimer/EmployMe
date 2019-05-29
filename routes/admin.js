const express = require('express');

const adminControllers = require('../controllers/admin');
const isAuth = require('../middleware/isAuthAdmin');

const router = express.Router();

// Authentication has been commented out. Re-enable after development

router.get('/', isAuth, adminControllers.getHome);
// router.get("/", adminControllers.getHome);

router.post('/searchsector', isAuth, adminControllers.postSearchSector);
// router.post("/searchsector", adminControllers.postSearchSector);

router.post('/search', isAuth, adminControllers.postSearch);
// router.post("/search", adminControllers.postSearch);

module.exports = router;
