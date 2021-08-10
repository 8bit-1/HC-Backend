const express = require('express');
const router = express.Router();
const { AuthToken } = require('../middlewares/tokenAuth');

const userController = require('../controllers/user.controller');
// ruta -> user/ruta

router.route('/profile/:idUser').get(userController.getUser); // problemas
router.route('/').get(userController.getUsers).post(userController.createUser);
router.route('/user-company').post(userController.createUserCompany);
router.route('/categories').all(AuthToken).get(userController.getSubscribedCategories);
router.route('/category/:idCategory/subscribe').all(AuthToken).post(userController.subscribeCategory);
router.route('/category/:idCategory/unsubscribe').all(AuthToken).delete(userController.unsubscribeCategory);
router.route('/product').all(AuthToken).get(userController.getUserProducts);
router.route('/product-public/:idUser').get(userController.getUserProducts2);
router.route('/products-history').all(AuthToken).get(userController.getAllUserProducts);
router.route('/products-inactive').all(AuthToken).get(userController.getUserInactiveProducts);
router.route('/profile/updateImage').all(AuthToken).put(userController.userPictureProfile);
router.route('/profile/setStatusTips').put(userController.setStatusTips);

module.exports = router;
