import React from 'react'
import { FaRupeeSign } from 'react-icons/fa'
import {useState,useEffect} from 'react'
import axios from 'axios'

const FinancialStatus = () => {
   
   const [financialStatus,setFinancialStatus] = useState({
      Expense:0,
      Income:0,
      Balance:0
   });

   const token = JSON.parse(localStorage.getItem('token'));

   useEffect(()=>{
      const fetchData = async ()=>{
         try{
            let response = await axios.get('http://localhost:4000/financial-status',{
             headers : {
               'Authorization' : `Bearer ${token}`
             }
            })
            setFinancialStatus({Expense:response.data.expense,Income:response.data.income,Balance:response.data.balance})
         }
         catch(error){
           console.log(error)
         }
       }
       fetchData()
   },[])

  return (
    <div className="flex justify-between items-center gap-20 h-full w-full font-sans mb:flex-col mb:gap-2 mb:w-4/5 ">
    <div className=" bg-black flex gap-1 w-2/5 h-4/5  rounded-2xl mb:w-full">
       <div className=" w-1/3 h-full  text-yellow-400 text-5xl pt-5  flex items-center justify-center mb:pb-2">
       <FaRupeeSign />
       </div>
       <div className="text-4xl w-2/3  flex flex-col items-center justify-center text-white ">
         <p className="text-yellow-400 bg-slate-800 pl-2 pr-2  rounded-xl w-fit  ml-3 font-medium text-sm  ">INCOME</p>
          <p className="text-green-400">{financialStatus.Income}</p>
       </div>
    </div>
    <div className=" bg-black flex w-2/5 h-4/5  rounded-2xl mb:w-full ">
       <div className=" w-1/3 h-full  text-yellow-400 text-5xl pt-5   flex items-center justify-center   mb:pb-2">
       <FaRupeeSign />
       </div>
       <div className="text-4xl w-2/3  flex flex-col items-center justify-center text-white ">
         <p className="text-yellow-400 bg-slate-800 pl-2 pr-2 rounded-xl w-fit  ml-3 font-medium text-sm ">EXPENSE</p>
          <p className="text-red-400">{financialStatus.Expense}</p>
       </div>
    </div>
    <div className=" bg-black flex w-2/5 h-4/5  rounded-2xl mb:w-full ">
       <div className=" w-1/3 h-full  text-yellow-400 text-5xl pt-5   flex items-center justify-center  mb:pb-2">
       <FaRupeeSign />
       </div>
       <div className="text-4xl w-2/3  flex flex-col items-center justify-center text-white ">
         <p className="text-yellow-400 bg-slate-800 pl-2 pr-2 rounded-xl w-fit  ml-3 font-medium text-sm ">BALANCE</p>
          <p className="text-yellow-400">{financialStatus.Balance}</p>
       </div>
    </div>
    </div>
  )
}

export default FinancialStatus
