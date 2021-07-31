const userService = require('../services/user.service');
const admin = require('firebase-admin');

const getUsers = async (req, res) => {
  // Validate request parameters, queries using express-validator
  try {
    let users = await userService.getUsers();
    return res.status(200).json({ data: users, message: 'Success' });
  } catch (error) {
    return res.status(400).json({ status: 400, error });
  }
};

const getUser = async (req, res) => {
  // Validate request parameters, queries using express-validator
  try {
    let users = await userService.getUserById(req.params.idUser);
    return res.status(200).json({ data: users, message: 'Success' });
  } catch (error) {
    return res.status(400).json({ status: 400, error });
  }
};

const createUser = async (req, res) => {
  try {
    //Verificar que los nombre de los parametros sean correctos
    let user = await userService.createUser(req.body);
    return res.status(200).json({ data: user, message: 'Success' });
  } catch (error) {
    return res.status(400).json({ status: 400, error });
  }
};

const createUserCompany = async (req, res) => {
  try {
    //Verificar que los nombre de los parametros sean correctos
    let user = await userService.createUserCompany(req.body);
    return res.status(200).json({ data: user, message: 'Success' });
  } catch (error) {
    // you can retrieve information from the internal error
    return res.status(400).json({ status: 400, error });
  }
};

const getSubscribedCategories = async (req, res) => {
  try {
    const idUser = req.idUser;

    let categories = await userService.getSubscribedCategories(idUser);
    categories = categories.map((item) => item.categoria);
    return res.status(200).json({ data: categories, message: 'Success' });
  } catch (error) {
    if (error.code == 'auth/id-token-revoked') {
      res.status(403).json({ status: 403, error: { message: 'token revoked' } });
    }
    res.status(400).json({ status: 400, error });
  }
};

const getUserProducts = async (req, res) => {
  try {
    const idUser = req.idUser;
    const products = await userService.getUserProducts(idUser);

    return res.status(200).json({ data: products, message: 'Success' });
  } catch (error) {
    if (error.code == 'auth/id-token-revoked') {
      res.status(403).json({ status: 403, error: { message: 'token revoked' } });
    }
    res.status(400).json({ status: 400, error });
  }
};

const subscribeCategory = async (req, res) => {
  try {
    const idUser = req.idUser;
    //  verificar que sea un number
    const idCategory = req.params.idCategory;

    const [result] = await userService.subscribeCategory(idUser, idCategory);
    return res.status(200).json({ message: 'Success' });
  } catch (error) {
    return res.status(400).json({ status: 400, error });
  }
};

const unsubscribeCategory = async (req, res) => {
  try {
    const idUser = req.idUser;
    const idCategory = req.params.idCategory;
    const [result] = await userService.unsubscribeCategory(idUser, idCategory);

    return res.status(200).json({ message: 'Success' });
  } catch (error) {
    return res.status(400).json({ status: 400, error });
  }
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  createUserCompany,
  getSubscribedCategories,
  getUserProducts,
  subscribeCategory,
  unsubscribeCategory,
};
