const express = require('express');
const router = express.Router();

const productController = require('../controllers/product.controller');

router.route('/:idUser').post(productController.createProduct);
router.route('/update/:idProduct').post(productController.updateProduct);

module.exports = router;