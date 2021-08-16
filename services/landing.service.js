const db = require('../config/db.config');

const saveUser = async (params) => {
  const query = `INSERT INTO landing_clients (name, email, message) values (?,?,?)`;
  try {
    const data = await db.execute(query, [params.name, params.email, params.message]);
    if (data.affectedRows == 0) {
      throw Error('No se pudo agregar cliente');
    }
    console.log(data);
    return data;
  } catch (error) {
    console.log('error serv');
    return new excepcion('Error reporting product', error);
  }
};

module.exports = {
  saveUser,
};
