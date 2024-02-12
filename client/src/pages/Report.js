import React,{useState,useEffect} from 'react'
import Sidebar from '../components/dashboard/Sidebar'
import ReportCard from '../components/Report/ReportCard'
import axios from 'axios'
import { toast } from 'react-toastify';
import Downloads from '../components/Report/Downloads';
import {FaRupeeSign} from "react-icons/fa"
import classNames from 'classnames'

const Report = () => {

  const [reportData,setReportData] = useState([]);
  const [reportType,setReportType] = useState('Monthly')
  const [isHistoryVisible,setIsHistoryVisible] = useState(false)
  const [menu,setMenu] = useState(false)
  const token = JSON.parse(localStorage.getItem('token'))

   useEffect(()=>{
         getMonthlyReport();
   },[])

   const getDailyReport = async()=>{
        try{
          setReportType('Daily')
          setIsHistoryVisible(false)
          const {data:{data}} = await  axios.get('http://localhost:4000/daily-report',
          {
            headers : {
              'Authorization' : `Bearer ${token}`
            }
          })
           setReportData(data)
        }
        catch(error){
            console.log(error)
        }
   }

   const getWeeklyReport = async()=>{
        try{
          setReportType('Weekly')
          setIsHistoryVisible(false)
           const {data : {data}} = await  axios.get('http://localhost:4000/weekly-report',
          {
            headers : {
              'Authorization' : `Bearer ${token}`
            }
          })
           setReportData(data)
        }
        catch(error){
            console.log(error)
        }
   }

   const getMonthlyReport = async()=>{
        try{
          setReportType('Monthly')
          setIsHistoryVisible(false)
          const {data:{data}} = await axios.get('http://localhost:4000/monthly-report',{
            headers : {
             'Authorization' : `Bearer ${token}`
            }
           })
           setReportData(data)
        }
        catch(error){
            console.log(error)
        }
   }

   const getDownloadHistory = ()=>{
    setIsHistoryVisible(true)
   }

   const downloadReport = async()=>{
      try{
        const {data} = await axios.get('http://localhost:4000/report-download',{
          headers : {
           'Authorization' : `Bearer ${token}`
          }
         })
         if(data.URL){
          const downloadLink = document.createElement('a');
          downloadLink.href = data.URL;
          downloadLink.download = 'Transactions.txt';
          document.body.appendChild(downloadLink);
          downloadLink.click();
          document.body.removeChild(downloadLink);
          toast.success('Report downloaded successfully', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
         }
      }
      catch(error){
        toast.error("Can not download report at the moment", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
      }
   }
  return (
    <div className="bg-slate-800 flex w-full min-h-screen mb:min-w-screen no-scrollbar mb:flex-col ">
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
    <div className={classNames('w-1/5','min-h-screen',{'mb:hidden':!menu,'mb:visible':menu})} >
      <Sidebar />
    </div>
    <div className="w-4/5 h-full mt-5 mb:w-full mb:overflow-auto no-scrollbar ">
    <div className="flex  justify-around w-full">
      <button className="bg-yellow-400 rounded-lg p-2 items-center text-black text-2xl font-serif mb:text-sm" onClick={getDailyReport}> Daily Report </button>
      <button className="bg-yellow-400 rounded-lg p-2 items-center text-black text-2xl font-serif mb:text-sm" onClick={getWeeklyReport}> Weekly Report </button>
      <button className="bg-yellow-400 rounded-lg p-2 items-center text-black text-2xl font-serif mb:text-sm" onClick={getMonthlyReport}> Monthly Report</button>
    </div>
    {isHistoryVisible ? <div className="flex justify-center items-center w-full h-1/2 overflow-hidden"> <Downloads setIsHistoryVisible={setIsHistoryVisible} /> </div> :
    <div>
    <h1 className="text-yellow-400 text-4xl flex font-serif  justify-center mt-8  mb-1 mb:text-3xl mb:mt-5  items-center ">{reportType} Report </h1>
    <div className="flex justify-between gap-10 mr-5">
    <button className="bg-red-500 text-2xl text-black font-serif w-fit rounded-lg p-2 ml-5 mb:text-sm mb:p-1 mb:mt-4" onClick={downloadReport} >Download Report</button>
    <button className="bg-red-500 text-2xl text-black font-serif w-fit rounded-lg p-2 ml-5 mb:text-sm mb:p-1 mb:mt-4" onClick={getDownloadHistory}>Download History</button>
    </div>
        <ReportCard  transactions={reportData}/>
    </div>
     }
    </div>
  </div>
    
  )
}

export default Report
