const express = require('express');
const router = express.Router();
const { AuthToken } = require('../middlewares/tokenAuth');

const complaintController = require('../controllers/complaint.controller');

router.route('/product/:idProduct').all(AuthToken).post(complaintController.reportProducts);
router.route('/user/:accused').all(AuthToken).post(complaintController.reportUser);
router.route('/comments/:idComentary').all(AuthToken).post(complaintController.reportComments);
router.route('/verifyComplaintUser/:accused').all(AuthToken).get(complaintController.verifyComplaintUser);
module.exports=router;