const express = require('express');
const router = express.Router();

const landingController = require('../controllers/landing.controller');

router.route('/client').post(landingController.saveUser);

module.exports = router;
