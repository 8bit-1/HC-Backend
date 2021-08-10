const db = require('../config/db.config');
const { excepcion } = require('../util/errorFunctions');

// Obtener usuario por id
const getUserById = async function (id) {
  var consulta = 'CALL getUserByUid(?)';
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
    throw new excepcion('Error getting  categories for user.', error);
  }
};

const getUserProducts = async (idUser) => {
  const consulta = `SELECT product.idProduct, product.User_idUser as idUser, product.name, 
  CONCAT(city.city,", ",country.country) as location,
  CONCAT(product.price," ",RIGHT( coin.coin,3 )) as cost,
  img.urlImage, CONVERT( DATE(product.datePublication),char) AS datep
from product INNER JOIN city  ON product.City_idCity=city.idCity 
  AND  product.City_Province_idProvince=city.Province_idProvince
  AND product.City_Province_Country_idCountry=city.Province_Country_idCountry 
  INNER JOIN province  ON product.City_Province_idProvince=province.idProvince
  INNER JOIN country ON product.City_Province_Country_idCountry=country.idCountry
  INNER JOIN coin ON product.Coin_idCoin=coin.idCoin
  INNER JOIN (SELECT DISTINCT MIN( idImages) ,urlImage, Product_idProduct FROM images GROUP BY Product_idProduct)  as img ON img.Product_idProduct = product.idProduct
  INNER JOIN user ON user.idUser=product.User_idUser
  WHERE  product.State_idState=1
  AND user.State_idState=1
  AND user.idUser = "${idUser}"
  GROUP BY product.idProduct
  ORDER BY product.datePublication DESC`;

  try {
    const [result] = await db.query(consulta);
    return result;
  } catch (error) {
    throw new excepcion('Error getting products.', error);
  }
};

// probar con rest operator
const subscribeCategory = async (idUser, idCategory) => {
  const query = `INSERT INTO SUBSCRIPTION (User_idUser, Category_idCategory) values (?,?);`;
  try {
    const data = await db.execute(query, [idUser, idCategory]);
    return data;
  } catch (error) {
    throw new excepcion('Error subscribing to category.', error);
  }
};

const unsubscribeCategory = async (idUser, idCategory) => {
  const query = `DELETE FROM SUBSCRIPTION where User_idUser = ? and Category_idCategory = ?`;
  try {
    console.log('borrando');
    const data = await db.execute(query, [idUser, idCategory]);
    if (data.affectedRows == 0) {
      throw new excepcion('Already unsubscribed');
    }
    return data;
  } catch (error) {
    console.log('error serv');
    return new excepcion('Error unsubscribing from category', error);
  }
};

const getAllUserProducts = async (idUser) => {
  const consulta = `SELECT product.idProduct, product.User_idUser as idUser, product.name, 
  CONCAT(city.city,", ",country.country) as location,
  CONCAT(product.price," ",RIGHT( coin.coin,3 )) as cost,
  img.urlImage, CONVERT( DATE(product.datePublication),char) AS datep,
      product.State_idState as status
from product INNER JOIN city  ON product.City_idCity=city.idCity 
  AND  product.City_Province_idProvince=city.Province_idProvince
  AND product.City_Province_Country_idCountry=city.Province_Country_idCountry 
  INNER JOIN province  ON product.City_Province_idProvince=province.idProvince
  INNER JOIN country ON product.City_Province_Country_idCountry=country.idCountry
  INNER JOIN coin ON product.Coin_idCoin=coin.idCoin
  INNER JOIN (SELECT DISTINCT MIN( idImages) ,urlImage, Product_idProduct FROM images GROUP BY Product_idProduct)  as img ON img.Product_idProduct = product.idProduct
  INNER JOIN user ON user.idUser=product.User_idUser
  WHERE user.State_idState=1
  AND user.idUser = "${idUser}"
  GROUP BY product.idProduct
  ORDER BY status desc, product.datePublication desc`;

  try {
    const [result] = await db.query(consulta);
    return result;
  } catch (error) {
    throw new excepcion('Error getting products.', error);
  }
};

const getUserInactiveProducts = async (idUser) => {
  const consulta = `SELECT product.idProduct, product.User_idUser as idUser, product.name, 
  CONCAT(city.city,", ",country.country) as location,
  CONCAT(product.price," ",RIGHT( coin.coin,3 )) as cost,
  img.urlImage, CONVERT( DATE(product.datePublication),char) AS datep
from product INNER JOIN city  ON product.City_idCity=city.idCity 
  AND  product.City_Province_idProvince=city.Province_idProvince
  AND product.City_Province_Country_idCountry=city.Province_Country_idCountry 
  INNER JOIN province  ON product.City_Province_idProvince=province.idProvince
  INNER JOIN country ON product.City_Province_Country_idCountry=country.idCountry
  INNER JOIN coin ON product.Coin_idCoin=coin.idCoin
  INNER JOIN (SELECT DISTINCT MIN( idImages) ,urlImage, Product_idProduct FROM images GROUP BY Product_idProduct)  as img ON img.Product_idProduct = product.idProduct
  INNER JOIN user ON user.idUser=product.User_idUser
  WHERE  product.State_idState=0
  AND user.State_idState=1
  AND user.idUser = "${idUser}"
  GROUP BY product.idProduct
  ORDER BY product.datePublication DESC`;

  try {
    const [result] = await db.query(consulta);
    return result;
  } catch (error) {
    throw new excepcion('Error getting products.', error);
  }
};

module.exports = {
  getUsers,
  createUser,
  getUserById,
  createUserCompany,
  getSubscribedCategories,
  getUserProducts,
  subscribeCategory,
  unsubscribeCategory,
  getAllUserProducts,
  getUserInactiveProducts,
};
