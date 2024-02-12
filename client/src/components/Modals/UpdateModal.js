import React,{useState} from 'react'
import { FaRupeeSign } from 'react-icons/fa'
import axios from 'axios'
import { toast } from 'react-toastify';

const UpdateModal = ({openModal,closeModal,updateData}) => {
  console.log(updateData)
    const [transaction,setTransaction] = useState(updateData)

    const token = JSON.parse(localStorage.getItem('token'))

    const handleOnchange = (e)=>{
        setTransaction((prevState) => ({ ...prevState, [e.target.name]: e.target.value }))
    }

    const updateTransaction = async()=>{
         try{
            const response = await  axios.post('http://localhost:4000/update-transaction',{transaction},
            {
              headers : {
                'Authorization' : `Bearer ${token}`
              }
            })
            closeModal()
            if(response.status === 201){
                toast.success('Update transaction successfully', {
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
                toast.error('Could not update transaction', {
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
    <div className="flex flex-col mt-2 w-2/5 rounded-lg bg-slate-800 m-5 mb:w-full justify-center items-start" >
    <div className="flex justify-between w-11/12 m-2 ">
    <h1 className="text-yellow-400 text-3xl m-4 font-medium">Update Transaction</h1>
    <button className="text-yellow-400" onClick={()=>closeModal()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          </button>
    </div>
    <div className=" text-white text-4xl flex  items-center m-5  mb:w-full ">
      <FaRupeeSign className="text-yellow-400" />
      <input className="p-3 bg-slate-800 text-4xl w-2/4 border-b-2 outline-none [appearance:none] mb:text-3xl "
       placeholder="0" type="number" name="amount" value={transaction.amount} onChange={(e)=>{handleOnchange(e)}}></input>
    </div>
    <input className="p-3 px-4 text-2xl font-medium rounded-md ml-12 mt-2 w-2/4 placeholder-yellow-400 bg-slate-700 outline-none text-white mb:w-4/5 mb:text-xl mb:font-normal" value={transaction.description} name="description" placeholder="what was this expense for ?" onChange={(e)=>{handleOnchange(e)}}></input>
    <input className="p-3 px-4 text-xl font-medium rounded-md mt-4 ml-12 w-1/4 placeholder-yellow-400 bg-slate-700 outline-none text-white mb:w-3/5 mb:text-xl mb:font-normal" value={transaction.date} name="date" placeholder="Date" type="date" onChange={(e)=>{handleOnchange(e)}}></input>
    <div className="ml-12 mt-2">
          <h1 className="text-white  font-bold text-xl  mt-4 mb:font-medium">Category</h1>
        </div>
        <div className="text-black ml-12 mt-2">
          {transaction.transactionType === 'expense'?<select className="bg-slate-700 text-white px-3 text-xl py-2 my-1 rounded mb:text-lg" value={transaction.category} name="category" id="categories" onChange={(e)=>{handleOnchange(e)}}>
            <option value="General">General</option>
            <option value="Food">Food</option>
            <option value="Fuel">Fuel</option>
            <option value="Shopping">Shopping</option>
            <option value="Travel">Travel</option>
          </select>:<select className="bg-slate-700 text-white px-3 text-xl py-2 my-1 rounded mb:text-lg" value={transaction.category} name="category" id="categories" onChange={(e)=>{handleOnchange(e)}}>
            <option value="General">Others</option>
            <option value="Salary">Salary</option>
            <option value="Investment">Investments</option>
            <option value="Rental Income">Rental Income</option>
          </select>}
        </div>
        <button className="font-medium max-w-fit ml-12 mt-5 mb-5 rounded-lg text-yellow-400 py-4 px-4 text-xl border border-yellow-400 mb:p-2 mb:text-lg hover:bg-yellow-300 hover:text-black" onClick={updateTransaction}>
              Update Transaction
        </button>
  </div>
  )
}

export default UpdateModal
