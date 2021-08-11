const comentaryService = require('../services/comentary.service');

const commentProduct = async (req, res) => {
  try {
    //Verificar que los nombre de los parametros sean correctos
    const idUser = req.idUser || req.params.idUser;
    const idProduct = req.params.idProduct;

    const comentaryProduct = await comentaryService.commentProduct(req.body, idUser, idProduct);
    return res.status(200).json({ data: comentaryProduct, message: 'Success' });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};

const commentUser = async (req, res) => {
  try {
    //Verificar que los nombre de los parametros sean correctos
    const idUser = req.idUser || req.params.seller;
    const buyer = req.params.buyer;

    const comentaryUser = await comentaryService.commentUser(req.body, idUser, buyer);
    return res.status(200).json({ data: comentaryUser, message: 'Success' });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};

module.exports = {
  commentProduct,
  commentUser,
};
