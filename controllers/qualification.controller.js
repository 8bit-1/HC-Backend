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

const getLikeUser = async (req, res) => {
  const idUser = req.params.idUser;
  try {
    var likesUser = await qualificationService.getLikeUser(idUser);
    return res.status(200).json({ data: likesUser, message: 'Sucess' });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};

const verifyLike = async (req, res) => {
  const Seller = req.params.Seller;
  const idUser = req.idUser;
  try {
    var like = await qualificationService.verifyLike(idUser,Seller);
    return res.status(200).json({ data: like, message: 'Sucess' });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};

const giveLike = async (req, res) => {
  const Seller = req.params.Seller;
  const idUser = req.idUser;
  try {
    var give = await qualificationService.giveLike(idUser,Seller);
    return res.status(200).json({ data: give, message: 'Sucess' });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};

const disLike = async (req, res) => {
  const Seller = req.params.Seller;
  const idUser = req.idUser;
  try {
    var dis = await qualificationService.disLike(idUser,Seller);
    return res.status(200).json({ data: dis, message: 'Sucess' });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};
module.exports={
    qualificationProduct,
    getLikeUser,
    verifyLike,
    giveLike,
    disLike
};
