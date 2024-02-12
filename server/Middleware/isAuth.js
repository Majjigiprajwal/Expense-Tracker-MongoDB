const jwt = require('jsonwebtoken');
const User = require('../Models/user')

const isAuth = async (req,res,next)=>{

   const token = req.headers.authorization.split(' ')[1];

   const verify = jwt.verify(token,'fullstack-project');

   const user = await User.findOne({_id: verify.userId})

   req.user = user;
   
   
    next();
}

module.exports =  isAuth
