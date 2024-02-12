const mongoose = require('mongoose')
const Transaction = require('../Models/transaction')
const Download = require('../Models/downloads')
const moment = require('moment')
const AWS = require('aws-sdk')
const uploadToS3 = (data,file)=>{
      const BUCKET_NAME = process.env.AWS_BUCKET_NAME;
      const SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
      const ACCESS_KEY = process.env.AWS_ACCESS_KEY;


        const s3 = new AWS.S3({
            accessKeyId:ACCESS_KEY,
            secretAccessKey:SECRET_ACCESS_KEY,
        })

            var params = {
                Bucket:BUCKET_NAME,
                Key:file,
                Body : data,
                ACL:'public-read'
            }
            return new Promise((resolve,reject)=>{
                s3.upload(params,(err, s3response)=>{
                    if(err){
                        reject(err)
                    }
                    else{
                        resolve(s3response.Location);
                    }
                })
            })
}

exports.getReportByDay = async (req,res,next)=>{
      const user = req.user
      const currentDate = moment().format('YYYY-MM-DD');

    try{
          const data = await Transaction.find({userId : user._id,date:{ $eq: currentDate }})
          return res.status(200).json({success:true,data:data,message:'Daily report fetched successfully'})
    }
    catch(error){
        console.log(error)
        return res.status(500).json({success:false,messsage:"Falied to fetch report,please try after sometime"})
    }
}

exports.getReportByWeek = async (req,res,next)=>{
        const user = req.user
        const currentDate = moment();
        const weekStart = currentDate.clone().startOf('week').format('YYYY-MM-DD');
        const weekEnd = currentDate.clone().endOf('week').format('YYYY-MM-DD');
    try{
          const data = await Transaction.find({userId : user._id,date: {$gte: weekStart, $lt: weekEnd}}) 
          return res.status(200).json({success:true,data:data,message:'Weekly report fetched successfully'})  
    }
    catch(error){
        console.log(error)
        return res.status(500).json({success:false,messsage:"Falied to fetch report,please try after sometime"})
    }
}

exports.getReportByMonth = async (req,res,next)=>{
      const user = req.user;
      const currentDate = moment();
      const monthStart = currentDate.clone().startOf('month').toDate();
      const monthEnd = currentDate.clone().endOf('month').toDate();
    
    try{
        const data = await Transaction.find({userId : user._id, date: { $gte: monthStart, $lte: monthEnd }});
         console.log(data) 
         return res.status(200).json({success:true,data:data,message:'Monthly report fetched successfully'})  
    }
    catch(error){
        console.log(error)
        return res.status(500).json({success:false,messsage:"Falied to fetch report,please try after sometime"})
    }
}

exports.downloadReport = async (req,res,next)=>{
       const user = req.user
    try{
        const transactions = await Transaction.find({_id : user._id});
        const stringifyedData = JSON.stringify(transactions)

        const userId = user._id;

        const fileName = `Transactions${userId}/${new Date()}.txt`
        const URL = await  uploadToS3(stringifyedData,fileName)
        await Download.create({userId : user._id,URL:URL})
        return res.status(200).json({success:true,URL,message:"Report downloaded successfully"})
        
    }
    catch(error){
        console.log(error)
        return res.status(500).json({success:false,messsage:"Falied to fetch report,please try after sometime"})
    }
}

exports.downloadHistory = async (req,res,next)=>{
      const user = req.user;
    try{
        const data = await Download.find({userId : user._id})
        return res.status(200).json({success:true,data,message:"Fetched the download history successfully"})
    }
    catch(error){
        console.log(error)
        return res.status(500).json({success:false,messsage:"Falied to fetch download history,please try after sometime"})
    }
}