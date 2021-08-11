const express = require('express');
const router = express.Router();
const { AuthToken } = require('../middlewares/tokenAuth');
const { noToken } = require('../middlewares/noTokenTest');

const qualificationController = require('../controllers/qualification.controller');

router.route('/product/:idUser/:idProduct').post(qualificationController.qualificationProduct);
router.route('/likesUser/:idUser').get(qualificationController.getLikeUser);
router.route('/verifyLike/:Seller').all(AuthToken).get(qualificationController.verifyLike);
router.route('/giveLike/:Seller').all(AuthToken).post(qualificationController.giveLike);
router.route('/disLike/:Seller').all(AuthToken).post(qualificationController.disLike);

module.exports = router;
