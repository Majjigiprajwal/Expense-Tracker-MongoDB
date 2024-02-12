const mongoose = require('mongoose')
const User = require('../Models/user')

const downloadSchema = new mongoose.Schema({
     URL :{
        type :String,
        required:true
     },
     userId : {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
     },
     date: {
      type: Date,
      default: Date.now,
      required: true
    }
})

const Download = mongoose.model('Download',downloadSchema)

module.exports = Download;





// const Sequelize = require ('sequelize');

// const sequelize = require('../util/database');

// const download = sequelize.define('download',{
//   id : {
//     type : Sequelize.INTEGER,
//     autoIncrement : true,
//     allowNull:false,
//     primaryKey:true
//   },
//   link:{
//     type:Sequelize.STRING,
//     allowNull: false
//   }
// })

// module.exports = download;