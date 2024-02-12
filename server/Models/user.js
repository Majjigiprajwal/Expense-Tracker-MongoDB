const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  isPremium: {
    type: Boolean,
    required: true
  },
  totalExpense: {
    type: Number,
    default: 0
  },
  totalIncome: {
    type: Number,
    default: 0
  },
  balance: {
    type: Number,
    default: 0
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;


// const Sequelize = require ('sequelize');

// const sequelize = require('../util/database');

// const user = sequelize.define('user',{
//   id : {
//     type : Sequelize.INTEGER,
//     autoIncrement : true,
//     allowNull:false,
//     primaryKey:true
//   },
//   name:{
//     type:Sequelize.STRING,
//     allowNull: false
//   },
//   email:{
//     type:Sequelize.STRING,
//     allowNull: false
//   },
//   password :{
//     type :Sequelize.STRING,
//     allowNull:false
//   },
//   isPremium :{
//     type :Sequelize.BOOLEAN,
//     allowNull :false,
//   },
//   totalExpense :{
//     type :Sequelize.INTEGER,
//     allowNull:true,
//     defaultValue:0
//   },
//   totalIncome :{
//     type :Sequelize.INTEGER,
//     allowNull:true,
//     defaultValue:0
//   },
//   balance :{
//     type :Sequelize.INTEGER,
//     allowNull:true,
//     defaultValue:0
//   }
 
// })

// module.exports = user;