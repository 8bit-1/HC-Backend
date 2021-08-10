const reportService = require('../services/report.service');


const getReportUsers = async (req, res) => {
    try {
        var rUsers = await reportService.getReportUsers();
        return res.status(200).json({ data: rUsers, message: 'Sucess' });
    } catch (error) {
        return res.status(400).json({ status: 400, message: error.message });
    }
};

const getReportComments = async (req, res) => {
    try {
        var rComments = await reportService.getReportComments();
        return res.status(200).json({ data: rComments, message: 'Sucess' });
    } catch (error) {
        return res.status(400).json({ status: 400, message: error.message });
    }
};

const getReportProducts = async (req, res) => {
    try {
        var report = await reportService.getReportProducts();
        return res.status(200).json({ data: report, message: 'Sucess' });
    } catch (error) {
        return res.status(400).json({ status: 400, message: error.message });
    }
};


module.exports = {
    getReportUsers,
    getReportProducts,
    getReportComments
};