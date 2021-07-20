const express = require('express');
const router = express.Router();

const locationController = require('../controllers/location.controller');

router.route('/countries').get(locationController.getCountries);
router.route('/provinces/:id').get(locationController.getProvinces);
router.route('/cities/:id').get(locationController.getCities);

module.exports = router;
