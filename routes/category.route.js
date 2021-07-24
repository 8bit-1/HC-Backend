const express = require('express');
const router = express.Router();

const categoriesController = require('../controllers/category.controller');

router.route('/Categories').get(categoriesController.getCategories);

module.exports = router;