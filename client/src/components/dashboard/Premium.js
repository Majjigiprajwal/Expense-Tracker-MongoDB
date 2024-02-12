import React from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import { usePremium } from '../../context/PremiumContext';

const Premium = () => {

  const token = JSON.parse(localStorage.getItem('token'))
  const {setIsPremium} = usePremium()

  
  function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };
        document.body.appendChild(script);
    });
}

  const handlePayment = async ()=>{
    console.log('clicked')
    try{
      const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
    }
       const {data} = await axios.get('http://localhost:4000/createOrder',{
        headers : {
          'Authorization' : `Bearer ${token}`
        }
       })
       const options = {
        key: data.key_id,
        order_id:data.order.id,
        handler: async (data) => {
           const response = await axios.post('http://localhost:4000/updateTransaction',{
            order_id:options.order_id,
            payment_id:data.razorpay_payment_id
           },{ 
            headers : {
            'Authorization' : `Bearer ${token}`
          }
        })
        toast.success('Thankyou for purchasing premium membership', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
          setIsPremium(true)
          window.localStorage.setItem('token',JSON.stringify(response.data.token))  
        }
      };
      const razorpay = new window.Razorpay(options);
      razorpay.open();

      razorpay.on('payment.failed',(response)=>{
       console.log(response)
       razorpay.close()
       toast.error('sorry try after sometime', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
      })
    }
    catch(error){
      console.log(error)
      toast.error('sorry try after sometime', {
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
    <div className="bg-yellow-400  p-3 justify-center align-middle  text-black rounded-md w-full font-bold text-xl">
      <button onClick={handlePayment} >Buy Premium</button>
    </div> 
  )
}

export default Premium
