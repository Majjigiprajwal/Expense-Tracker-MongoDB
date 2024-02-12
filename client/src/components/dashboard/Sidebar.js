import React, { useEffect,useState } from 'react'
import {RxDashboard} from "react-icons/rx"
import{GiExpense} from "react-icons/gi"
import {FaExchangeAlt} from "react-icons/fa"
import {MdLeaderboard} from "react-icons/md"
import {TbReportSearch} from "react-icons/tb"
import {FiLogOut} from "react-icons/fi"
import {FaRupeeSign} from "react-icons/fa"
import Premium from './Premium'
import { NavLink } from 'react-router-dom'
import { usePremium } from '../../context/PremiumContext'
import { useNavigate } from 'react-router-dom'

const Sidebar = () => {
     const {isPremium} = usePremium();
     const navigate = useNavigate()

     const logout = ()=>{
        localStorage.removeItem('token')
        navigate("/")
     }

  return (
    <div className=" bg-black flex flex-col font-serif text-yellow-400 font-medium h-full w-11/12 mb:w-full mb:justify-center mb:items-center mb:fixed mb:z-10 py-4 px-4 shadow-lg n">
      <div className="flex text-4xl items-center">
        <FaRupeeSign className="inline-block mr-2 text-4xl ml-4"/>
        <p>Tracker</p>
      </div>
      <div className="mt-10 flex flex-col gap-3 ">
        <NavLink to="/dashboard">
        <div className="flex text-center pt-4 pb-4  text-2xl items-center rounded-md hover:bg-slate-700">
          <RxDashboard className="inline-block mr-2 text-3xl ml-4" />
          Dashboard
        </div>
        </NavLink>
        <NavLink to="/add-transaction">
        <div className="flex text-center pt-4 pb-4 text-2xl items-center rounded-md hover:bg-slate-700">
          <GiExpense className="inline-block mr-2 text-3xl ml-4" />
          Add Expense
        </div>
        </NavLink>
        <NavLink to="/transactions">
        <div className="flex text-center pt-4 pb-4 text-2xl items-center rounded-md hover:bg-slate-700">
          <FaExchangeAlt className="inline-block mr-2 text-3xl ml-4" />
          Transactions
        </div>
        </NavLink>
        <NavLink to="/leaderboard">
        <div className="flex text-center pt-4 pb-4 text-2xl items-center rounded-md hover:bg-slate-700">
          <MdLeaderboard className="inline-block mr-2 text-3xl ml-4 " />
          Leaderboard
        </div>
        </NavLink>
        <NavLink to="/reports">
        <div className="flex text-center pt-4 pb-4 text-2xl items-center rounded-md hover:bg-slate-700">
          <TbReportSearch className="inline-block mr-2 text-3xl ml-4" />
          Reports
        </div>
        </NavLink>
        <div className="flex text-center pt-4 pb-4 text-2xl items-center rounded-md hover:bg-slate-700 cursor-pointer" onClick={logout}>
          <FiLogOut className="inline-block mr-2 text-3xl ml-4" />
          Logout
        </div>
        <div className="flex text-center mr-2 ml-4 mt-8 text-xl items-center ">
          {!isPremium && <Premium />}
        </div>
        
      </div>
    </div>
  )
}

export default Sidebar
