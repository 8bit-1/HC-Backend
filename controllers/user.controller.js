const userService = require('../services/user.service');

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
    let categories = await userService.getSubscribedCategories(req.params.idUser);
    // console.log(categories);
    categories = categories.map((item) => item.categoria);
    // console.log(categories);
    return res.status(200).json({ data: categories, message: 'Success' });
  } catch (error) {
    res.status(400).json({ status: 400, error });
  }
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  createUserCompany,
  getSubscribedCategories,
};
