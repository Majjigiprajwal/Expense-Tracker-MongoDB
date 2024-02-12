const dotenv = require('dotenv')
dotenv.config()
const express = require('express');
const mongoose = require('mongoose')
const fs = require('fs')
const path = require('path')
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet')
const morgan = require('morgan')

const app = express();
const PORT = process.env.PORT;

const accessLogStream = fs.createWriteStream(path.join(__dirname,'access.log'),{flags :'a'})

app.use(cors());
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
app.use(cookieParser())
app.use(morgan('combined',{stream:accessLogStream}));



const User = require('./Models/user');
const Transaction = require('./Models/transaction')
const Downloads = require('./Models/downloads')



const userRoutes = require('./Routes/user');
const transactionRoutes = require('./Routes/transaction');
const premiumRoutes = require('./Routes/purchasePremium');
const leaderboardRoutes = require('./Routes/leaderboard');
const forgotPasswordRoutes = require('./Routes/forgotPasssword')
const reportRoutes = require('./Routes/reports')

app.use(userRoutes)
app.use(transactionRoutes)
app.use(premiumRoutes)
app.use(leaderboardRoutes)
app.use(forgotPasswordRoutes)
app.use(reportRoutes)

// User.hasMany(Transaction,{foreignKey : 'userId'});
// Transaction.belongsTo(User,{foreignKey : 'userId'});

// User.hasMany(Order,{foreignKey : 'userId'});
// Order.belongsTo(User,{foreignKey : 'userId'});

// User.hasMany(PasswordRequests,{foreignKey : 'userId'});
// PasswordRequests.belongsTo(User,{foreignKey : 'userId'});

// User.hasMany(Downloads,{foreignKey : 'userId'});
// Downloads.belongsTo(User,{foreignKey : 'userId'});

 

      const connectDb = async ()=>{
          try{
              await mongoose.connect(process.env.MONGOOSE_URL)
              app.listen(PORT)
              console.log('connected')
          }
          catch(error){
                console.log(error)
          }
      }

      connectDb()

  


