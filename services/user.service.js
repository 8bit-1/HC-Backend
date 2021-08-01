const db = require('../config/db.config');
const { excepcion } = require('../util/errorFunctions');

// Obtener usuario por id
const getUserById = async function (id) {
  //Consulta sql aqui

  var consulta = 'CALL getUserByUid(?)';

  try {
    const [user] = await db.execute(consulta, [id]);
    return user[0];
  } catch (error) {
    //Log Errors
    throw Error('Error while getting User: ' + error);
  }
};

// Obtener todos los usuarios
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

const createUser = async function (params) {
  var query = `CALL registerUser(?,?,?,?,?,?)`;

  try {
    let verifiedExist = await db.execute(`SELECT COUNT(idUser) as exist FROM hechoencasa.user WHERE idUser = '${params.idUser}'`);
    const { exist }  = verifiedExist[0][0];
    if ( !exist ) {
      const [estado] = await db.execute(query, [
        params.idUser,
        params.firstName,
        params.lastName,
        params.email,
        params.phoneNumber,
        params.photoProfile,
      ]);
      return await getUserById(params.idUser);
    } else {
      return await getUserById(params.idUser);
    }
  } catch (error) {
    throw new excepcion('Error while Creating User ', error);
  }
};

const createUser2 = async function (params) {
  var consulta = `INSERT INTO USER (idUser,name,lastName,email,phone,photoProfile,Verification,State_idState) VALUES (?,?,?,?,?,?,?,?)`;

  try {
    const [estado] = await db.execute(consulta, [
      params.idUser,
      params.firstName,
      params.lastName,
      params.email,
      params.phoneNumber,
      params.photoProfile,
      0, //verification
      1, //state
    ]);

    if (estado.affectedRows != 0) return await getUserById(params.idUser);

    return {};
  } catch (error) {
    throw Error('Error while Creating User: ' + error);
  }
};

// registrar usuario con compania (crear una transaccion mejor)
const createUserCompany = async (params) => {
  var consulta = `CALL registerUserAndCompany(?,?,?,?,?,?,?,?,?,?,?)`;
  try {
    const [result] = await db.execute(consulta, [
      params.idUser,
      params.firstName,
      params.lastName,
      params.email,
      params.phoneNumber,
      params.photoProfile,
      params.companyName,
      params.description,
      params.country,
      params.province,
      params.city,
    ]);
    console.log(result);
    return result;
  } catch (error) {
    throw new excepcion('Error while Creating User with company. ', error);
  }
};

module.exports = {
  getUsers,
  createUser,
  getUserById,
  createUserCompany,
};
