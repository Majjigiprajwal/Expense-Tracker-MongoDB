const express = require('express');


const router = express.Router();

const userController = require('../Controller/user')

router.post('/login',userController.getUser);

router.post('/register',userController.registerUser);


module.exports = router;

