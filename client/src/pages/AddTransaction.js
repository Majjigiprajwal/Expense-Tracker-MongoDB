import React,{useState}from 'react'
import Sidebar from '../components/dashboard/Sidebar'
import AddExpense from '../components/AddExpense/AddExpense'
import {FaRupeeSign} from "react-icons/fa"
import classNames from 'classnames'

const AddTransaction = () => {
  const [menu,setMenu] = useState(false)
  return (
    <div className="bg-slate-800 flex w-full min-h-screen mb:bg-black mb:flex-col">
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
      <div className={classNames('w-1/5','h-screen',{'mb:hidden':!menu,'mb:visible':menu})} >
        <Sidebar />
      </div>
      <div className="w-4/5 h-full mt-5 ml-10 mb:w-full mb:m-0 mb:mt-5">
       <AddExpense />
      </div>
    </div>
  )
}

export default AddTransaction
