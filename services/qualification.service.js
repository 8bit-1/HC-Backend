const db = require('../config/db.config');

const qualificationProduct = async function (qualification, idUser, idProduct) {
  var query = `call rateProduct(?,?,?)`;
  try {
    let [estado] = await db.execute(query, [qualification.calification, idUser, idProduct]);
    const [[{ message: status }]] = estado;
    if (status != '1') {
      throw new Error(status);
    }
    [[estado]] = estado;
    return estado;
  } catch (error) {
    throw Error('Error while Creating calification: ' + error);
  }
};

const giveLike = async function (idUser, Seller) {
  var query = `call rateUser(?,?)`;
  try {
    let [estado] = await db.execute(query, [idUser, Seller]);
    const [[{ message: status }]] = estado;
    if (status != '1') {
      throw new Error(status);
    }
    [[estado]] = estado;
    return estado;
  } catch (error) {
    throw new Error('Error while Creating like: ' + error.message);
  }
};

const disLike = async function (idUser, Seller) {
  var query = `call unrateUser(?,?)`;
  try {
    let [estado] = await db.execute(query, [idUser, Seller]);
    console.log(estado);
    const [[{ message: status }]] = estado;

    if (status != '1') {
      throw new Error(status);
    }

    [[estado]] = estado;
    return estado;
  } catch (error) {
    throw Error('Error while Creating dislike: ' + error.message);
  }
};

const getLikeUser = async function (idUser) {
  const query = `SELECT count(*) likes from usercalification where Seller=?`;
  try {
    let [estado] = await db.execute(query, [idUser]);
    return estado;
  } catch (error) {
    throw Error('Error while get like: ' + error);
  }
};

const verifyLike = async function (idUser, Seller) {
  const query = `SELECT count(*) likes from usercalification where Buyer=? and Seller=? `;
  try {
    let [estado] = await db.execute(query, [idUser, Seller]);
    return estado;
  } catch (error) {
    throw Error('Error while get like: ' + error.message);
  }
};

module.exports = {
  qualificationProduct,
  getLikeUser,
  verifyLike,
  giveLike,
  disLike,
};
