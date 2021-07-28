const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');

router.route('/').get(userController.getUsers).post(userController.createUser);
router.route('/user-company').post(userController.createUserCompany);
router.route('/:idUser').get(userController.getUsers);

module.exports = router;
