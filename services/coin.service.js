const db = require('../config/db.config');

// Obtener Moneda
const getCoines = async function () {
  //Consulta sql aqui
  var query = 'SELECT idCoin as id, coin as name FROM coin;';
  try {
    const [coines] = await db.query(query);
    return coines;
  } catch (error) {
    //Log Errors
    throw Error('Error while Paginating coines: ' + error);
  }
};


module.exports = {
  getCoines
};