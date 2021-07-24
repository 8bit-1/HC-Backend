const db = require('../config/db.config');

// Obtener Moneda
const getCategories = async function () {
  //Consulta sql aqui
  var query = 'SELECT idCategory as id, name FROM category;';
  try {
    const [categories] = await db.query(query);
    return categories;
  } catch (error) {
    //Log Errors
    throw Error('Error while Paginating categories: ' + error);
  }
};


module.exports = {
  getCategories
};