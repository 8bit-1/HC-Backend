const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');

router.route('/:idUser').get(userController.getUser);
router.route('/').get(userController.getUsers).post(userController.createUser);
router.route('/user-company').post(userController.createUserCompany);
router.route('/categories/:idUser').get(userController.getSubscribedCategories);

module.exports = router;
