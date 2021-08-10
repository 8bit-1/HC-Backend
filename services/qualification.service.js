const db = require("../config/db.config");

const qualificationProduct = async function (qualification, idUser, idProduct) {
  var query = `call rateProduct(?,?,?)`;
  try {
    const [estado] = await db.execute(query, [
           qualification.calification, 
           idUser,
           idProduct
           
    ]);

    if (estado.affectedRows != 0)
      return (message = "Calification created sucessfully");

    return {};
  } catch (error) {
    throw Error("Error while Creating calification: " + error);
  }
};

const giveLike = async function (idUser, Seller) {
  var query = `call rateUser(?,?)`;
  try {
    const [estado] = await db.execute(query, [ 
           idUser,
           Seller
           
    ]);

    if (estado.affectedRows != 0)
      return (message = "like created sucessfully");

    return estado;
  } catch (error) {
    throw Error("Error while Creating like: " + error);
  }
};

const disLike = async function (idUser, Seller) {
  var query = `call unrateUser(?,?)`;
  try {
    const [estado] = await db.execute(query, [ 
           idUser,
           Seller
           
    ]);

    if (estado.affectedRows != 0)
      return (message = "dislike created sucessfully");

    return estado;
  } catch (error) {
    throw Error("Error while Creating dislike: " + error);
  }
};

const getLikeUser = async function (idUser) {
  const query = `SELECT count(*) likes from usercalification where Seller=?`;
  try {
    let [estado] = await db.execute(query, [
           idUser           
    ]);
    return estado;
  } catch (error) {
    throw Error("Error while get like: " + error);
  }
};

const verifyLike = async function (idUser, Seller) {
  const query = `SELECT count(*) likes from usercalification where Buyer=? and Seller=? `;
  try {
    let [estado] = await db.execute(query, [
           idUser, Seller          
    ]);
    return estado;
  } catch (error) {
    throw Error("Error while get like: " + error);
  }
};

module.exports={
    qualificationProduct,
    getLikeUser,
    verifyLike,
    giveLike,
    disLike
};