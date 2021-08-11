const db = require('../config/db.config');

const commentProduct = async function (comment, idUser, idProduct) {
  var query = `call addComentaryProduct(?,?,?)`;
  try {
    const [estado] = await db.execute(query, [comment.comentary, idProduct, idUser]);

    if (estado.affectedRows == 0) {
      throw new Error('No se afectaron lineas');
    }

    return estado.affectedRows;
  } catch (error) {
    throw Error('Error while Creating comentary: ' + error.message);
  }
};

const commentUser = async function (comment, seller, buyer) {
  var query = `call addComentaryUser(?,?,?)`;
  try {
    const [estado] = await db.execute(query, [comment.comentary, seller, buyer]);

    if (estado.affectedRows == 0) {
      throw new Error('No se afectaron lineas');
    }

    return estado.affectedRows;
  } catch (error) {
    throw Error('Error while Creating comentary: ' + error.message);
  }
};

module.exports = {
  commentProduct,
  commentUser,
};
