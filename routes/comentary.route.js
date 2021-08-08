const express = require('express');
const router = express.Router();

const comentaryController = require('../controllers/comentary.controller');

router.route('/product/:idUser/:idProduct').post(comentaryController.commentProduct);
router.route('/user/:seller/:buyer').post(comentaryController.commentUser);

module.exports=router;