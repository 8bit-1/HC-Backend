const qualificationService = require('../services/qualification.service');

const qualificationProduct = async (req, res) => {
    try {
      //Verificar que los nombre de los parametros sean correctos
      var qualiProduct = await qualificationService.qualificationProduct(req.body,req.params.idUser,req.params.idProduct);
      return res.status(200).json({ data: qualiProduct, message: 'Success' });
    } catch (error) {
      return res.status(400).json({ status: 400, message: error.message });
    }
};


module.exports={
    qualificationProduct
};
