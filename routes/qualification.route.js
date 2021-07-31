const express = require('express');
const router = express.Router();

const qualificationController = require('../controllers/qualification.controller');

router.route('/product/:idUser/:idProduct').post(qualificationController.qualificationProduct);

module.exports=router;