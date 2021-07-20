const express = require('express');
const router = express.Router();

const productController = require('../controllers/product.controller');

router.route('/:idUser').post(productController.createProduct);


module.exports = router;