const mongoose = require('mongoose')
const User = require('../Models/user')
const userPasswordResetSchema = new mongoose.Schema({
    uuid :{
        type : String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    isActive :{
        type : Boolean,
        default : true,
        required : true
    }
})

const userPasswordReset = mongoose.model('password',userPasswordResetSchema)

module.exports = userPasswordReset