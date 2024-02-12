import React, { useEffect,useState} from 'react'
import Sidebar from '../components/dashboard/Sidebar'
import DoughnutChart from '../components/dashboard/DoughnutChart'
import SplineChart from '../components/dashboard/SplineChart'
import FinancialStatus from '../components/dashboard/FinancialStatus'
import { parseJwt } from '../utils/jwtParser'
import { usePremium } from '../context/PremiumContext'
import axios from 'axios'
import { categorySegregator } from '../utils/segregator'
import {FaRupeeSign} from "react-icons/fa"
import classNames from 'classnames'


const DashBoard = () => {

        const {setIsPremium} = usePremium();
        const [categoryData,setCategorydata] = useState({})
        const [expenseData,setExpenseData] = useState({})
        const [incomeData,setIncomeData] = useState({})
        const [menu,setMenu] = useState(false)
        useEffect(() => {
                const token = JSON.parse(localStorage.getItem('token'));
                if (token) {
                  const result = parseJwt(token);
                  setIsPremium(result.premium);
                }
                const fetchData = async ()=>{
                     try{
                        let {data :{data}} = await axios.get(`http://localhost:4000/allTransactions`,{
                              headers : {
                                'Authorization' : `Bearer ${token}`
                              }
                             })
                             const result = categorySegregator(data)
                             setCategorydata(result[0])
                             setExpenseData(result[1])
                             setIncomeData(result[2])
                             console.log(result[1],result[2])
                          }
                          catch(error){
                            console.log(error)
                          }
                        }
                        fetchData() 
              }, []);

  return (
    <div className="flex w-screen h-screen bg-slate-800 gap-5 mb:h-full mb:gap-5 mb:flex-col">
      <div className={classNames('lg:hidden','md:hidden','flex','justify-between','p-2','bg-black','text-yellow-400','text-2xl','font-serif',{'hidden':menu,'visible':!menu})}>
        <h1><FaRupeeSign className="inline-block mr-2  ml-2"/>Tracker</h1>
        <button onClick={()=>setMenu(true)}><svg
               xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 24 24"
               width="24"
               height="24"
               fill="none"
               stroke="currentColor"
               strokeWidth="2"
               strokeLinecap="round"
               strokeLinejoin="round"
                >
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg></button>
      </div>
        <div className={classNames('w-1/5','h-screen',{'mb:hidden':!menu,'mb:visible':menu})}>
                <Sidebar />
        </div>
        <div className="w-4/5 h-[90%] mr-10 mt-7 mb:flex mb:flex-col mb:justify-center mb:items-center mb:w-full mb:gap-5 mb:mt-0  mb:h-auto">
        <div className="w-full h-1/5  mb:flex mb:justify-center mb:h-auto mb:mt-5">
                <FinancialStatus />
        </div>
        <div className="flex gap-5 h-4/5 w-full  justify-center items-center mb-10 mb:flex-col mb:h-auto">
                <DoughnutChart  data={categoryData} />
                <SplineChart  expense={expenseData} income={incomeData}/>
        </div>
        </div> 
    </div>
  )
}

export default DashBoard
