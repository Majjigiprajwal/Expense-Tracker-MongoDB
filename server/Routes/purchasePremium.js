const express = require('express');

const router = express.Router();

const isAuth = require('../Middleware/isAuth')

const premiumController = require('../Controller/purchasePremium')

router.get('/createOrder',isAuth,premiumController.createOrder);

router.post('/updatetransaction',isAuth,premiumController.updateTransaction)

module.exports = router