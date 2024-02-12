import React from 'react'
import {useState} from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useParams } from 'react-router-dom'
import {useNavigate} from 'react-router-dom';

const ResetPassword = () => {
    const [newPassword,setNewPassword] = useState({
        password :"",
        confirmPassword :""
    })

    const {id} = useParams()
    const navigate = useNavigate()
    const handleSubmit = async (e)=>{
        e.preventDefault()

        if(newPassword.password !== newPassword.confirmPassword){
            toast.error('Passwords do not match', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
                setNewPassword((prevState)=>({...prevState,password: '',confirmPassword: ''}));
                return 
        }
         try{
            const response = await axios.post(`http://localhost:4000/resetPassword`,{
                id : id,
                password : newPassword.password
            })
            toast.success(response.data.message, {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
            navigate('/')
         }
         catch(error){
            console.log(error)
            if(error?.response?.status === 400){
                toast.error('Link Expired, try generating another link or please try after sometime', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    });
                }
         }
    }

    const handleChange = (e)=>{
         setNewPassword({...newPassword,[e.target.name] : e.target.value})
    }

  return (
    <div className="bg-black flex min-h-full  flex-1 flex-col h-screen items-center px-6 py-12 lg:px-8 border border-solid border-gray-400 p-4 mb:w-full mb:m-4">
        <h1 className="text-yellow-400 flex items-center font-bold text-3xl">RESET PASSWORD</h1>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm mb:w-full mb:m-4 mb:p-4">
          <form className="space-y-6" onSubmit={(e)=>{handleSubmit(e)}} >
            <div>
              <label htmlFor="password" className="block text-lg font-bold leading-6 text-yellow-400 mb:w-full">
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={newPassword.password}
                  onChange={(e)=>{
                    handleChange(e)
                  }}
                  required
                  className="block w-full rounded-md border-0 py-1 px-1.5 text-sm font-medium text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-black focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mb:text-xl"
                />
              </div>
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-lg font-bold leading-6 text-yellow-400">
                Confirm Password
              </label>
              <div className="mt-2">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="Password"
                  value={newPassword.confirmPassword}
                  onChange={(e)=>{
                    handleChange(e)
                  }}
                  required
                  className="block w-full rounded-md border-0 py-1 px-1.5 text-sm font-medium text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-black focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mb:text-xl"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-yellow-400 px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mb:text-lg">
                Submit
              </button>
            </div>
          </form>
        </div>
    </div>
  )
}

export default ResetPassword
