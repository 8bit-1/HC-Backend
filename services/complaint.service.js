const db = require('../config/db.config');
const { excepcion } = require('../util/errorFunctions');

const reportProducts = async ( report,idUser, idProduct) => {
  const query = `INSERT INTO productcomplaint (accuser, Product_idProduct,ReportProduct_idReport, description) values (?,?,?,?)`;
  try {
    const data = await db.execute(query, [idUser, idProduct, report.idReport, report.description]);
    if (data.affectedRows == 0) {
      return {};
    }
    return data;
  } catch (error) {
    console.log('error serv');
    return new excepcion('Error reporting product', error);
  }
};

const reportUsers = async ( report,idUser, accused) => {
    const query = `INSERT INTO usercomplaint (accuser, accused,ReportUser_idReport, description) values (?,?,?,?)`;
    try {
      const data = await db.execute(query, [idUser, accused, report.idReport, report.description]);
      if (data.affectedRows == 0) {
        return {};
      }
      return data;
    } catch (error) {
      console.log('error serv');
      return new excepcion('Error reporting user', error);
    }
  };

  const reportComments = async ( report,idUser, idComentary) => {
    const query = `INSERT INTO comentarycomplaint (accuser, Comentary_idComentary,ReportComentary_idReport) values (?,?,?)`;
    try {
      const data = await db.execute(query, [idUser, idComentary, report.idReport]);
      if (data.affectedRows == 0) {
        return {};
      }
      return data;
    } catch (error) {
      console.log('error serv');
      return new excepcion('Error reporting Comment', error);
    }
  };


  const verifyComplaintUser = async function (idUser, accused) {
    const query = `SELECT count(*) complaint from usercomplaint where accuser=? and accused=? `;
    try {
      let [estado] = await db.execute(query, [idUser, accused]);
      return estado;
    } catch (error) {
      throw Error('Error while verify Complaint: ' + error.message);
    }
  };

module.exports = {
    reportProducts,
    reportUsers,
    reportComments,
    verifyComplaintUser
};