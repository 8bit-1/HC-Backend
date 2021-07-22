const db = require("../config/db.config");

const createProduct = async function (params, idUser) {
  var consulta = `INSERT INTO product (name, quantity, price, description, Coin_idCoin, Category_idCategory, City_Province_Country_idCountry, City_Province_idProvince, City_idCity, User_idUser) VALUES (?,?,?,?,?,?,?,?,?,?)`;
  var imagenes = `INSERT INTO images(urlImage,Product_idProduct) values (?,?)`;
  try {
    const [estado] = await db.execute(consulta, [
      params.name,
      params.quantity,
      params.price,
      params.description,
      params.coin,
      params.category,
      params.country,
      params.province,
      params.city,
      idUser,
    ]);

    var idProduct = `SELECT last_insert_id() as idProduct;`;
    const [producto] = await db.execute(idProduct);
    console.log(producto[0].idProduct);
    params.images.forEach(async (element) => {
        const [state] = await db.execute(imagenes, [
        element,
        producto[0].idProduct,
      ]);
    });

    if (estado.affectedRows != 0)
      return (message = "Product created sucessfully");

    return {};
  } catch (error) {
    throw Error("Error while Creating Product: " + error);
  }
};

const updateProduct = async function (params, idProduct){
       var actualizar = `call updateProduct (?,?,?,?,?,?,?,?,?,?)`;
       var deleted = `DELETE FROM images where urlImage=? and Product_idProduct=?`;
       var newImages = `INSERT INTO images(urlImage,Product_idProduct) values (?,?)`;
       try {
           const [modified] = await db.execute(actualizar,[ 
            params.name,
            params.quantity,
            params.price,
            params.description,
            params.coin,
            params.category,
            params.country,
            params.province,
            params.city,
            idProduct
            ]);
            params.deletedImages.forEach(async (element) => {
                const [deleteImage] = await db.execute(deleted, [
                element,
                idProduct,
              ]);
            }); 

            params.addImages.forEach(async (element) => {
                const [add] = await db.execute(newImages, [
                element,
                idProduct,
              ]);
            });
            if (modified.affectedRows != 0)
            return (message = "Product created sucessfully");
      
          return {};
       
       } catch (error) {
        throw Error("Error while updating Product: " + error);
       }
}

const getProducts = async function(init,range){
    var getAllProducts = `SELECT product.idProduct, product.User_idUser as idUser, product.name, 
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
      GROUP BY product.idProduct
      ORDER BY product.datePublication DESC
      LIMIT ?,?`
    try {
      const[productos] = await db.execute(getAllProducts,[init,range])
      return productos;
    } catch (error) {
      throw Error('Error while Paginating products: ' + error);
    }
};

const getProductsLogged = async function(idUser,init,range){
  var getAllProductsLogged = `SELECT product.idProduct, product.User_idUser as idUser, product.name, 
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
    AND user.idUser<>?
    GROUP BY product.idProduct
    ORDER BY product.datePublication DESC
    LIMIT ?,?`
  try {
    const[productos] = await db.execute(getAllProductsLogged,[idUser,init,range])
    return productos;
  } catch (error) {
    throw Error('Error while Paginating products: ' + error);
  }
};

module.exports = {
  createProduct,
  updateProduct,
  getProducts,
  getProductsLogged
};
