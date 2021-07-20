const locationService = require('../services/location.service');

const getCountries = async (req, res) => {
  try {
    var countries = await locationService.getCountries();
    return res.status(200).json({ data: countries, message: 'Sucess' });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};

const getProvinces = async (req, res) => {
  const id = req.params.id;
  try {
    var provinces = await locationService.getProvinces(id);
    return res.status(200).json({ data: provinces, message: 'Sucess' });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};

const getCities = async (req, res) => {
  const id = req.params.id;
  try {
    var cities = await locationService.getCities(id);
    return res.status(200).json({ data: cities, message: 'Sucess' });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};

module.exports = {
  getCountries,
  getProvinces,
  getCities,
};
