import React, { useEffect } from 'react'
import Sidebar from '../components/dashboard/Sidebar'
import Transactions from '../components/Transactions/Transactions'
import { MdOutlineArrowBackIos } from "react-icons/md";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import {useState} from 'react'
import axios from 'axios'
import classNames from 'classnames'
import Modal from 'react-modal'
import UpdateModal from '../components/Modals/UpdateModal';
import {FaRupeeSign} from "react-icons/fa"

const AllTransactions = () => {

  const [transactions,setTransactions] = useState([]);
  const [currentPage,setCurrentPage] = useState(1)
  const [hasPrevious,setHasPrevious] = useState(false)
  const [hasNext,setHasNext] = useState(false)
  const [totalPages,setTotalPages] = useState(null)
  const [itemsPerPage,setItemsPerpage] = useState(5)
  const [isModalOpen,setIsModalOpen] = useState(false)
  const [dataToBeUpdated,setDataToBeUpdated] = useState({})
  const [menu,setMenu] = useState(false)
  const [isLoading,setIsLoading] = useState(true)

  const token = JSON.parse(localStorage.getItem('token'));

  useEffect(()=>{
    setItemsPerpage(()=>Number(JSON.parse(localStorage.getItem('itemsPerPage'))))
  },[])

  useEffect(()=>{

    const fetchData = async ()=>{
      try{
        console.log(itemsPerPage)
         let {data :{data,hasNext,hasPrevious,pages}} = await axios.get(`http://localhost:4000/transactions?page=${currentPage}&limit=${itemsPerPage}`,{
          headers : {
            'Authorization' : `Bearer ${token}`
          }
         })
        setTransactions(()=>data)
        setHasNext(hasNext)
        setHasPrevious(hasPrevious)
        setTotalPages(pages)
      }
      catch(error){
        console.log(error)
      }
    }
    fetchData() 
  },[currentPage,token,itemsPerPage,isModalOpen])


    const deleteTransaction = async (transactionId,amount,type)=>{
        try{
          const response = await axios.delete(`http://localhost:4000/deleteTransaction/${transactionId}?amount=${amount}&type=${type}`,{
            headers : {
              'Authorization' : `Bearer ${token}`
            }
           })
           const updatedTransaction = transactions.filter((transaction)=>transaction._id!==transactionId)
           setTransactions(()=>updatedTransaction)
        }
        catch(error){
           console.log(error)
        }
    }

    const handleForwardClick = ()=>{
      if(hasNext){
        setCurrentPage((prevPage)=>prevPage+1)
      }
    }

    const handleBackwardClick = ()=>{
      if(hasPrevious){
        setCurrentPage((prevPage)=>prevPage-1)
      }
    }

    const handleitemsPerPageChange = (e)=>{
      window.localStorage.setItem('itemsPerPage',JSON.stringify(e.target.value))
      setItemsPerpage(e.target.value)
      setCurrentPage(1)
    }

    const openModal = ()=>{
      setIsModalOpen(true)
    }

    const closeModal = ()=>{
      setIsModalOpen(false)
    }

    const handleUpdate = (data)=>{
      setIsModalOpen(true)
      setDataToBeUpdated(data)
    }

  
   
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
      <div className="w-full h-full mt-5 flex flex-col justify-center items-center text-xl mb:text-xs">
        <h1 className="font-serif text-yellow-400 text-4xl mb-5">Transactions</h1>
        <div className="flex justify-end items-center gap-4">
        <label className="text-white mb:text-lg">Items per page:</label>
      <select
        className="border border-gray-300 p-1 rounded-md text-white bg-black mb:text-sm "
        value={itemsPerPage}
        onChange={handleitemsPerPageChange}
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
        <option value="20">20</option>
      </select>
      </div>
       {
        transactions.map((transaction)=>{
          return <Transactions key={transaction._id} data={transaction} handleDelete={deleteTransaction} openModal={openModal} update={handleUpdate}  />
        })
      }
       <div className="flex justify-center items-center gap-10 text-xl mt-5 ">
        <button className={classNames('rounded-full','p-2',{'hover:bg-yellow-300 bg-white':hasPrevious,"bg-slate-400":!hasPrevious})} disabled={!hasPrevious} onClick={()=>{handleBackwardClick()}}><MdOutlineArrowBackIos className="text-2xl text-black" /></button>
        <div className="text-white text-2xl ">{currentPage} of {totalPages}</div>
        <button className={classNames('rounded-full','p-2',{'hover:bg-yellow-300 bg-white':hasNext,'bg-slate-400':!hasNext})} disabled={!hasNext} onClick={()=>{handleForwardClick()}}><MdOutlineArrowForwardIos className="text-2xl text-black"  /></button>
      </div>
      </div>
      <Modal isOpen={isModalOpen} className="flex justify-center items-center w-full mt-10">
          <UpdateModal  closeModal={closeModal}  updateData={dataToBeUpdated} />
      </Modal>
    </div>
  )
}

export default AllTransactions
