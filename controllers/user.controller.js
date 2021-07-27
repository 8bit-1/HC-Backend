const userService = require('../services/user.service');

const getUsers = async (req, res) => {
  // Validate request parameters, queries using express-validator
  try {
    var users = await userService.getUsers();
    return res.status(200).json({ data: users, message: 'Sucess' });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    //Verificar que los nombre de los parametros sean correctos
    var user = await userService.createUser(req.body);
    return res.status(200).json({ data: user, message: 'Success' });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};

const createUserCompany = async (req, res) => {
  try {
    //Verificar que los nombre de los parametros sean correctos
    var user = await userService.createUserCompany(req.body);
    return res.status(200).json({ data: user, message: 'Success' });
  } catch (error) {
    // you can retrieve information from the internal error
    // const InErr = error.error;
    return res.status(400).json({
      status: 400,
      message: error.message + error.error.message,
    });
  }
};

module.exports = {
  getUsers,
  createUser,
  createUserCompany,
};
