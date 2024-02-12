const mongoose = require('mongoose')
const User = require('../Models/user')
const orderSchema = new mongoose.Schema({
    orderId :{
        type : String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    paymentId :{
        type :String
    },
    status : {
        type : String,
        default : false
    }
})

const Order = mongoose.model('order',orderSchema)

module.exports = Order