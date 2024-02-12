import React from 'react'
import classNames from 'classnames'

const Report = ({transactions}) => {
  return (
    <div className="flex flex-col  h-full w-full mb:min-w-screen overflow-auto no-scrollbar ">
  <table className="bg-white  m-5 p-3 border-separate rounded-md mb:m-2 mb:p-1 mb:text-lg">
    <thead className=" text-black font-serif text-2xl bg-yellow-300 mb:text-lg ">
      <tr>
        <th className="py-2 px-4  text-left">Sl.No</th>
        <th className="py-2 px-4  text-left">Date</th>
        <th className="py-2 px-4  text-left">Description</th>
        <th className="py-2 px-4  text-left">Type</th>
        <th className="py-2 px-4  text-left">Amount</th>
      </tr>
    </thead>
    <tbody className="text-xl font-serif mb:text-sm ">
      { transactions?.map((transaction,index)=>
      <tr className={classNames({ 'bg-green-700 bg-opacity-60': transaction.transactionType === 'income', 'bg-red-700 bg-opacity-60': transaction.transactionType!== 'income' })} key={index}>
        <td className="py-2 px-4">{index+1}</td>
        <td className="py-2 px-4">{transaction.date.slice(0,10)}</td>
        <td className="py-2 px-4">{transaction.description}</td>
        <td className="py-2 px-4">{transaction.transactionType}</td>
        <td className="py-2 px-4">{transaction.amount}</td>
      </tr>
      )}
    </tbody>
  </table>
</div>
  )
}

export default Report