const db = require('../config/db.config');

const createProduct = async function (params, idUser){
    var consulta = `INSERT INTO product (name, quantity, price, description, Coin_idCoin, Category_idCategory, City_Province_Country_idCountry, City_Province_idProvince, City_idCity, User_idUser) VALUES (?,?,?,?,?,?,?,?,?,?)`;
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
            idUser
        ]);
    
    var idProduct =`SELECT last_insert_id() as idProduct;`;
    const[producto]= await db.execute(idProduct);
    console.log(producto[0].idProduct);
    params.images.forEach( async (element) => {
        var imagenes = `INSERT INTO images(urlImage,Product_idProduct) values (?,?)`;
            const [state]= await db.execute(imagenes, [   
                    element, 
                    producto[0].idProduct]);             
        });
    
        if (estado.affectedRows != 0) return message = 'Product created sucessfully';

        return {};
    } catch (error) {
        throw Error('Error while Creating Product: ' + error);
    }
}

module.exports = {
    createProduct
};