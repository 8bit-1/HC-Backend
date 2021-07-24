const coinService = require('../services/coin.service');

const getCoines = async (req, res) => {
  try {
    var coines = await coinService.getCoines();
    return res.status(200).json({ data: coines, message: 'Sucess' });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};



module.exports = {
  getCoines
};
