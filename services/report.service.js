const db = require('../config/db.config');

// Obtener Reporte de Productos
const getReportProducts = async function () {
  //Consulta sql aqui
  var query = 'SELECT idReport as id, nameReport as name FROM reportproduct;';
  try {
    const [rProducts] = await db.query(query);
    return rProducts;
  } catch (error) {
    //Log Errors
    throw Error('Error while Paginating reports for products: ' + error);
  }
};

// Obtener Reporte de Users
const getReportUsers = async function () {
    //Consulta sql aqui
    var query = 'SELECT idReport as id, nameReport as name FROM reportuser;';
    try {
      const [rUsers] = await db.query(query);
      return rUsers;
    } catch (error) {
      //Log Errors
      throw Error('Error while Paginating reports for Users: ' + error);
    }
  };

// Obtener Reporte de Comentarios
const getReportComments = async function () {
    //Consulta sql aqui
    var query = 'SELECT idReport as id, nameReport as name FROM reportcomentary;';
    try {
      const [rComments] = await db.query(query);
      return rComments;
    } catch (error) {
      //Log Errors
      throw Error('Error while Paginating reports for comments: ' + error);
    }
  };

module.exports = {
  getReportProducts,
  getReportUsers,
  getReportComments
};