const db = require("../config/db.config");

const commentProduct = async function (comment, idUser, idProduct) {
  var query = `call addComentaryProduct(?,?,?)`;
  try {
    const [estado] = await db.execute(query, [
           comment.comentary, 
           idProduct,
           idUser
    ]);

    if (estado.affectedRows != 0)
      return (message = "Comentary created sucessfully");

    return {};
  } catch (error) {
    throw Error("Error while Creating comentary: " + error);
  }
};

const commentUser = async function (comment, seller, buyer) {
    var query = `call addComentaryUser(?,?,?)`;
    try {
      const [estado] = await db.execute(query, [
             comment.comentary, 
             seller,
             buyer
      ]);
  
      if (estado.affectedRows != 0)
        return (message = "Comentary created sucessfully");
  
      return {};
    } catch (error) {
      throw Error("Error while Creating comentary: " + error);
    }
  };
  


module.exports={
    commentProduct,
    commentUser
};