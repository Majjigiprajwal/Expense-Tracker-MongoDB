// Apikey = 'xsmtpsib-20e8cee3da6dee64598cab777d1354a55bf61e97dd6b00e9af8fd59fd8255f5e-BdsjH4cO5wnqah1U'
const express = require('express')

const router = express.Router();

const forgotPasswordcontroller = require('../Controller/forgotPassword')

router.post('/forgotPassword',forgotPasswordcontroller.sendEmail)

router.post('/resetPassword',forgotPasswordcontroller.resetPassword)

module.exports = router;