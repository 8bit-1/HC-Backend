const { response, request } = require('express');

const noToken = async (req = request, res = response, next) => {
  try {
    const idUser = 'AArIqPbF0nYSWbAIkcwvkOV3CoP2';
    req.idUser = idUser;
    next();
  } catch (error) {
    return res.status(400).json({ status: 400, error });
  }
};

module.exports = {
  noToken,
};
