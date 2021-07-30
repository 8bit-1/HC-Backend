const db = require('../config/db.config');
const { excepcion } = require('../util/errorFunctions');

// Obtener usuario por id
const getUserById = async function (id) {
  //Consulta sql aqui
  const consulta = 'SELECT * FROM USER WHERE idUser=?';
  try {
    const [user] = await db.execute(consulta, [id]);
    return user[0];
  } catch (error) {
    //Log Errors
    throw new excepcion('Error while getting User.', error);
  }
};

// Obtener todos los usuarios
const getUsers = async function () {
  const consulta = 'SELECT * FROM USER';
  try {
    const [users] = await db.query(consulta);
    return users;
  } catch (error) {
    throw new excepcion('Error while Paginating Users.', error);
  }
};

const createUser = async function (params) {
  const query = `CALL registerUser(?,?,?,?,?,?)`;
  try {
    let verifiedExist = await db.execute(
      `SELECT COUNT(idUser) as exist FROM hechoencasa.user WHERE idUser = '${params.idUser}'`
    );
    const { exist } = verifiedExist[0][0];
    if (!exist) {
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
  const consulta = `INSERT INTO USER (idUser,name,lastName,email,phone,photoProfile,Verification,State_idState) VALUES (?,?,?,?,?,?,?,?)`;
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
    throw new excepcion('Error while Creating User.', error);
  }
};

const createUserCompany = async (params) => {
  const consulta = `CALL registerUserAndCompany(?,?,?,?,?,?,?,?,?,?,?)`;
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
    return result;
  } catch (error) {
    throw new excepcion('Error while Creating User with company.', error);
  }
};

const getSubscribedCategories = async (idUser) => {
  const consulta = `SELECT name as categoria FROM SUBSCRIPTION
    INNER JOIN CATEGORY ON CATEGORY.idCategory = SUBSCRIPTION.Category_idCategory
    WHERE User_idUser =  "${idUser}" `;
  try {
    const [result] = await db.query(consulta);
    return result;
  } catch (error) {
    throw new excepcion('Error obtaining categories for user.', error);
  }
};

module.exports = {
  getUsers,
  createUser,
  getUserById,
  createUserCompany,
  getSubscribedCategories,
};
