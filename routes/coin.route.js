const express = require('express');
const router = express.Router();

const coinController = require('../controllers/coin.controller');

router.route('/Coines').get(coinController.getCoines);

module.exports = router;