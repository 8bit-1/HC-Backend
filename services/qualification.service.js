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

module.exports={
    qualificationProduct
};