const express = require('express');
const router = express.Router();

const productController = require('../controllers/product.controller');

router.route('/:idUser').post(productController.createProduct);
router.route('/update/:idProduct').post(productController.updateProduct);
router.route('/getAllProducts/:init/:range').get(productController.getProducts);
router.route('/getAllProducts/:idUser/:init/:range').get(productController.getProductsLogged);

module.exports = router;