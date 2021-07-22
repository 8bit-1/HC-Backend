const productService = require('../services/product.service');

const createProduct = async (req, res) => {
    try {
      //Verificar que los nombre de los parametros sean correctos
      var product = await productService.createProduct(req.body,req.params.idUser);
      return res.status(200).json({ data: product, message: 'Success' });
    } catch (error) {
      return res.status(400).json({ status: 400, message: error.message });
    }
};


const updateProduct = async (req, res) => {
  try {
    //Verificar que los nombre de los parametros sean correctos
    var product = await productService.updateProduct(req.body,req.params.idProduct);
    return res.status(200).json({ data: product, message: 'Success' });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};

const getProducts = async (req, res) => {
  try {
    var products = await productService.getProducts();
    return res.status(200).json({ data: products, message: 'Sucess' });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};


module.exports = {
    createProduct,
    updateProduct,
    getProducts
};