const express = require('express');

const isAuth = require('../Middleware/isAuth')

const router = express.Router();

const reportController = require('../Controller/report')

router.get('/daily-report',isAuth,reportController.getReportByDay)

router.get('/weekly-report',isAuth,reportController.getReportByWeek)

router.get('/monthly-report',isAuth,reportController.getReportByMonth)

router.get('/report-download',isAuth,reportController.downloadReport)

router.get('/download-history',isAuth,reportController.downloadHistory)

module.exports = router;