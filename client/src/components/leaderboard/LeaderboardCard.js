import React from 'react'
import classNames from 'classnames'

const LeaderboardCard = (props) => {

    const {data,index,id} = props;
    
  return (
    <>
    <div className={classNames('flex','bg-black','rounded-lg','w-3/5','mt-1','mb:w-full','mb:mb-2',{'text-red-500':data._id!==id,'text-green-600':data._id===id})}>
    <div className="bg-white rounded-full w-11  mt-2 mb-3 ml-6 mr-6 flex justify-center items-center text-2xl font-medium  mb:m-2">
     {index+1}
    </div>
    <div className=" m-2 w-3/5 flex  items-center mb:ml-1 mb:w-6/12">
     <div className=" m-1 text-2xl font-serif mb:text-2xl">
         {data.name}
     </div>
    </div>
    <div>
        <p className=" bg-slate-800 rounded-xl w-fit px-2  ml-3 mt-1 text-sm mb:text-xs mb:mr-2 ">BALANCE</p>
        <p className=" text-3xl mb:text-2xl">₹ {data.balance}</p>
    </div>
    </div>
    </>
  )
}

export default LeaderboardCard
