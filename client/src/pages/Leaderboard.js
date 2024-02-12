import React from 'react'
import axios from 'axios'
import { useState,useEffect } from 'react'
import Sidebar from '../components/dashboard/Sidebar'
import LeaderboardCard from '../components/leaderboard/LeaderboardCard'
import { parseJwt } from '../utils/jwtParser'
import {FaRupeeSign} from "react-icons/fa"
import classNames from 'classnames'

const Leaderboard = () => {

    const [leaderboard,setLeaderboard] = useState([]);
    const [userId,setUserId] = useState(null)
    const [menu,setMenu] = useState(false)

    const token = JSON.parse(localStorage.getItem('token'))

    useEffect(()=>{
          const fetchLeaderboard = async ()=>{
            try{
              const {data :{data}} = await axios.get('http://localhost:4000/leaderboard',{
               headers : {
                'Authorization' : `Bearer ${token}`
               }
              })
              setLeaderboard(()=>data)
              const user = parseJwt(token)
              setUserId(user.userId)
          }
            catch(error){
              console.log(error)
            }
          }
        
          fetchLeaderboard()
    },[])

  return (
    <div className="bg-slate-800 flex w-full min-h-screen mb:flex-col">
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
    <div className="w-full h-full mt-5 flex flex-col justify-center items-center mb:w-full mb:m-0 mb:mt-5">
    <div className="text-4xl flex justify-center  text-yellow-300 m-2 font-serif">
        <h1>LEADERBOARD</h1>
    </div>
        {
          leaderboard?.map((member,index)=>{
                return <LeaderboardCard key={member._id} data={member} id={userId} index={index} />
            })
        }
    </div>
  </div>
  )
}

export default Leaderboard