const express = require('express');
const router = express.Router();

const reportController = require('../controllers/report.controller');

router.route('/products').get(reportController.getReportProducts);
router.route('/users').get(reportController.getReportUsers);
router.route('/comments').get(reportController.getReportComments);

module.exports = router;