const User = require('../Models/user')

exports.getLeaderboard = async (req,res,next)=>{
    
    try{
      const leaderboardData = await User.find().sort({balance : -1})
      return res.status(200).json({success:true,data:leaderboardData,message:'Data fetched successfully'})
    }
    catch(error){
        console.log(error)
      return res.status(500).json({success:false,message:'Could not fetch leaderboard try after sometime'})
    }
}