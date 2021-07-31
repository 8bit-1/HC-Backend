const { response, request } = require('express');
const admin = require('firebase-admin');

const AuthToken = async (req = request, res = response, next) => {
  try {
    const { token: token } = req.headers;
    if (!token) {
      return res.status(403).json({ status: 403, error: { message: 'access denied, no token provided.' } });
    }
    const { uid: idUser } = await admin.auth().verifyIdToken(token);
    req.idUser = idUser;
    next();
  } catch (error) {
    return res.status(400).json({ status: 400, error });
  }
};

module.exports = {
  AuthToken,
};
