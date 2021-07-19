const db = require('../config/db.config');

const getUsers = async function () {
  //Consulta sql aqui

  var consulta = 'SELECT * FROM USER';

  try {
    const [users] = await db.query(consulta);
    return users;
  } catch (error) {
    //Log Errors
    throw Error('Error while Paginating Users: ' + error);
  }
};

module.exports = {
  getUsers,
};
