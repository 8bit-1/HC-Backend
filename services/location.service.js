const db = require('../config/db.config');

// Obtener paises
const getCountries = async function () {
  //Consulta sql aqui
  var query = 'SELECT idCountry as id, country FROM country;';
  try {
    const [countries] = await db.query(query);
    return countries;
  } catch (error) {
    //Log Errors
    throw Error('Error while Paginating countries: ' + error);
  }
};

// obtener provincia por pais
const getProvinces = async function (idCountry) {
  //Consulta sql aqui
  var consulta = 'SELECT idProvince as id, province FROM province where Country_idCountry=?';
  try {
    const [provinces] = await db.execute(consulta, [idCountry]);
    return provinces;
  } catch (error) {
    //Log Errors
    throw Error('Error while getting provinces: ' + error);
  }
};

// obtener ciudad por provincia
const getCities = async function (idProvince) {
  //Consulta sql aqui
  var consulta = 'SELECT idCity  as id, city FROM city where Province_idProvince=?';
  try {
    const [city] = await db.execute(consulta, [idProvince]);
    return city;
  } catch (error) {
    //Log Errors
    throw Error('Error while getting cities: ' + error);
  }
};

module.exports = {
  getCities,
  getProvinces,
  getCountries,
};
