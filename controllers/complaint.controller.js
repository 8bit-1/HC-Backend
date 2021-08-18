const complaintService = require('../services/complaint.service');

const reportProducts = async (req, res) => {
  try {
    const idUser = req.idUser;
    const idProduct = req.params.idProduct;
    const [result] = await complaintService.reportProducts(req.body, idUser, idProduct);

    return res.status(200).json({ message: 'Success' });
  } catch (error) {
    return res.status(400).json({ status: 400, error });
  }
};

const reportUser = async (req, res) => {
    try {
      const idUser = req.idUser;
      const accused = req.params.accused;
      const [result] = await complaintService.reportUsers(req.body, idUser, accused);
  
      return res.status(200).json({ message: 'Success' });
    } catch (error) {
      return res.status(400).json({ status: 400, error });
    }
};

const reportComments = async (req, res) => {
    try {
      const idUser = req.idUser;
      const idComentary = req.params.idComentary;
      const [result] = await complaintService.reportComments(req.body, idUser, idComentary);
  
      return res.status(200).json({ message: 'Success' });
    } catch (error) {
      return res.status(400).json({ status: 400, error });
    }
};

const verifyComplaintUser = async (req, res) => {
  const accused = req.params.accused;
  const idUser = req.idUser;
  try {
    var like = await complaintService.verifyComplaintUser(idUser, accused);
    return res.status(200).json({ data: like, message: 'Sucess' });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};

const verifyComplaintProduct = async (req, res) => {
  const idProduct = req.params.idProduct;
  const idUser = req.idUser;
  try {
    var like = await complaintService.verifyComplaintProduct(idUser, idProduct);
    return res.status(200).json({ data: like, message: 'Sucess' });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};

const verifyComplaintComment = async (req, res) => {
  const idComment = req.params.idComment;
  const idUser = req.idUser;
  try {
    var like = await complaintService.verifyComplaintComment(idUser, idComment);
    return res.status(200).json({ data: like, message: 'Sucess' });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};

module.exports = {
  reportProducts,
  reportUser,
  reportComments,
  verifyComplaintUser,
  verifyComplaintProduct,
  verifyComplaintComment,
};