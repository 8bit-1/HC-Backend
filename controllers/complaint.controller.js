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

module.exports = {
  reportProducts,
  reportUser,
  reportComments
};