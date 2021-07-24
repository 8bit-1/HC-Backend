const categoryService = require('../services/category.service');

const getCategories = async (req, res) => {
  try {
    var categories = await categoryService.getCategories();
    return res.status(200).json({ data: categories, message: 'Sucess' });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};



module.exports = {
  getCategories
};
