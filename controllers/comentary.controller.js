const comentaryService = require('../services/comentary.service');

const commentProduct = async (req, res) => {
    try {
      //Verificar que los nombre de los parametros sean correctos
      var comentaryProduct = await comentaryService.commentProduct(req.body,req.params.idUser,req.params.idProduct);
      return res.status(200).json({ data: comentaryProduct, message: 'Success' });
    } catch (error) {
      return res.status(400).json({ status: 400, message: error.message });
    }
};

const commentUser = async (req, res) => {
    try {
      //Verificar que los nombre de los parametros sean correctos
      var comentaryUser = await comentaryService.commentUser(req.body,req.params.seller,req.params.buyer);
      return res.status(200).json({ data: comentaryUser, message: 'Success' });
    } catch (error) {
      return res.status(400).json({ status: 400, message: error.message });
    }
};


module.exports={
    commentProduct,
    commentUser
};