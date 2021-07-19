const userService = require('../services/user.service');

//
const getUsers = async (req, res) => {
  // Validate request parameters, queries using express-validator

  // let params = [1, 2];

  try {
    var users = await userService.getUsers();
    return res.status(200).json({ data: users, message: true });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

module.exports = {
  getUsers,
};
