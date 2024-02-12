import React from 'react'
import axios from 'axios'
import {useState} from 'react'
import { toast } from 'react-toastify'
import {useNavigate} from 'react-router-dom';

const SendMail = () => {
      const navigate = useNavigate();
      const [email,setEmail] = useState(null)

      const handleChange = (e)=>{
          setEmail(()=>e.target.value) 
      }

      const handleSubmit = async (e)=>{
        e.preventDefault();
        if(email.trim()===""){
          toast.error('Please enter correct Email', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
            return
        }
        try{
          await axios.post('http://localhost:4000/forgotPassword',{email},)
          toast.success("Mail sent successfully", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
          navigate("/signup");
        }
        catch(error){
            toast.error("Please try after sometime", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
              });
              return
        }
    }
  return (
    <div className="bg-black flex min-h-full  flex-1 flex-col h-screen items-center px-6 py-12 lg:px-8 border border-solid border-gray-400 p-4">
        <h1 className="text-yellow-400 flex items-center font-bold text-3xl">RESET PASSWORD</h1>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={(e)=>{handleSubmit(e)}} >
            <div>
              <label htmlFor="email" className="block text-lg font-bold leading-6 text-yellow-400">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  onChange={(e)=>{
                    handleChange(e)
                  }}
                  required
                  className="block w-full rounded-md border-0 py-1 px-1.5 text-sm font-medium text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-black focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-yellow-400 px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Send Me A Mail
              </button>
            </div>
          </form>
        </div>
    </div>
  )
}

export default SendMail
