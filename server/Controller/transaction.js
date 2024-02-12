const mongoose = require('mongoose')
const Transaction = require('../Models/transaction');

exports.addTransaction = async (req,res,next)=>{
    const user = req.user;
    const {transaction} = req.body
    transaction.userId = user._id
    let session;
    try{
        session = await mongoose.startSession();
        session.startTransaction();
        await Transaction.create([transaction],{session})
        if(transaction.transactionType === 'income'){
            let income = Number(transaction.amount)+Number(user.totalIncome)
            let balance = Number(user.balance) + Number(transaction.amount)
            user.balance = balance;
            user.totalIncome = income
        }
        else{
            let expense = Number(transaction.amount)+Number(user.totalExpense)
            let balance = Number(user.balance) - Number(transaction.amount)
            user.balance = balance
            user.totalExpense = expense
        }

        await user.save({session})

        await session.commitTransaction();
        session.endSession();

        return  res.status(201).json({success:true,message:'Transaction added successfully'});
    }
    catch(error){
        await session.abortTransaction();
        session.endSession();
        console.log(error)
        res.status(500).json({success:false,message:'Failed to  add transaction please try after sometime'})
    }
}

exports.getTransactions = async (req,res,next)=>{
    const user = req.user
    const page = Number(req.query.page)
    const limit = Number(req.query.limit);
    try{
      let count = await Transaction.countDocuments({userId : user._id})
      let data = await Transaction.find({userId : user._id}).skip((page-1) * limit).limit(limit)
       let totalPages = Math.ceil(Number(count)/Number(limit))
       return res.status(200).json({success:true,data:data,pages:totalPages,hasNext:page<totalPages,
                                    hasPrevious:page>1,message:"Fetched all the transactions successfully"})
    }
    catch(error){
        console.log(error)
     return res.status(500).json({Success:false,message:"Failed to fetch the data please try after sometime"})
    }
}

exports.getAllTransactions = async (req,res,next)=>{
    const user = req.user
    try{
        let data = await Transaction.find({userId : user._id})
         return res.status(200).json({success:true,data:data,message:"Fetched all the transactions successfully"})
    }
    catch(error){
        return res.status(500).json({Success:false,message:"Failed to fetch the data please try after sometime"})
    }
}

exports.updateTransaction = async(req,res,next)=>{
    const user = req.user
    const {transaction} = req.body
    const updatedAmount =Number(transaction.amount)
    let session ;
    try{
        session = await mongoose.startSession();
        session.startTransaction();
        const response = await Transaction.findOne({userId:user._id,_id:transaction._id}).session(session)
        if(!response){
            return res.status(404).json({success:false,message:'Sorry could not find the transaction'})
        }
        if(transaction.transactionType === 'expense'){
            const balance = Number(user.balance)+Number(updatedAmount)-Number(response.amount);
            const totalExpense = Number(user.totalExpense)+Number(updatedAmount)-Number(response.amount)
            user.balance = balance
            user.totalExpense = totalExpense
        }
        else{
            const balance = Number(user.balance)+Number(updatedAmount)-Number(response.amount);
            const totalIncome = Number(user.totalIncome)+Number(updatedAmount)-Number(response.amount)
            user.balance = balance;
            user.totalIncome = totalIncome
        }
             await user.save({session})
             await response.updateOne(transaction,{session})
             await session.commitTransaction();
             session.endSession();
             return res.status(200).json({success:false,message:'updated transaction successfully'})  
    }
    catch(error){
          console.log(error)
          await session.abortTransaction();
          session.endSession();
          return res.status(500).json({success:false,message:'Could not update the Transaction,please try after sometime'})
    }
}

exports.deleteTransaction = async (req,res,next)=>{
       const id = req.params.id
       const amount = req.query.amount
       const transactionType = req.query.type
       const user = req.user
       let session ;
    try{
        session = await mongoose.startSession();
        session.startTransaction();
        const response = await Transaction.deleteOne({_id : id}).session(session)
        if(response.deletedCount === 1){
        if(transactionType === 'expense'){
            const balance = Number(user.balance)+Number(amount);
            const totalExpense = Number(user.totalExpense)-Number(amount)
            user.balance = balance;
            user.totalExpense = totalExpense
        }
        else{
            const balance = Number(user.balance)-Number(amount);
            const totalIncome = Number(user.totalIncome)-Number(amount)
            user.balance = balance;
            user.totalIncome = totalIncome
        }
        await user.save({session})
        await session.commitTransaction();
        session.endSession();

        return res.status(200).json({success:true,message:'Deleted the transaction successfully'})
    }
    else{
        await session.abortTransaction();
        session.endSession();
        return res.status(404).json({ success: false, message: 'Transaction not found' });
    }
 }
    catch(error){
          console.log(error)
          await session.abortTransaction();
          session.endSession();
          return res.status(500).json({success:false,message:'Please try after sometime'})

    }
}

exports.getFinancialStatus = async (req,res,next)=>{
    try{
         const data = req.user

         return res.status(200).json({success:true,message:'Fetched data successfully',expense:data.totalExpense,income:data.totalIncome,balance:data.balance})
    }
    catch(error){
        return res.status(500).json({success:false,message:'please try after siometime'})
    }
}