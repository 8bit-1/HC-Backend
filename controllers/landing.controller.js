const landingService = require('../services/landing.service');

const saveUser = async (req, res) => {
  try {
    let result;
    if (req.body) {
      [result] = await landingService.saveUser(req.body);
    } else {
      throw Error('No parameters in request');
    }
    return res.status(200).json({ message: 'Success', res: result });
  } catch (error) {
    return res.status(400).json({ status: 400, error: error.message });
  }
};

module.exports = {
  saveUser,
};
