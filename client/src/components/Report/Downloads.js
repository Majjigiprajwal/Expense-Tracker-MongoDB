import React,{useState,useEffect} from 'react'
import axios from 'axios'

const Downloads = ({setIsHistoryVisible}) => {

    const [downloadHistory,setDownloadHistory] = useState([])
    
    const token = JSON.parse(localStorage.getItem('token'))

    useEffect(()=>{
        const fetchData = async ()=>{
            try{
            const {data:{data}} = await  axios.get('http://localhost:4000/download-history',
            {
              headers : {
                'Authorization' : `Bearer ${token}`
              }
            })
            setDownloadHistory(data)
        }
        catch(error){
             console.log(error)
        }
        }
        fetchData()
    },[])
  return (
    <div className="flex flex-col justify-center w-6/12 overflow-hidden h-1/2 mt-10   overflow-y-auto rounded-lg mb:w-full mb:m-2">
      <h1 className="text-yellow-400 flex justify-center text-4xl m-4 font-medium font-serif">Download History</h1>
          <div>
      <table className="bg-black  m-5 p-3  border-separate rounded-md mb:m-2 mb:p-1 mb:text-lg  ">
    <thead className=" text-black font-serif text-2xl bg-yellow-300 mb:text-lg ">
      <tr>
        <th className="py-2 px-4 w-1/5  text-left">Sl.No</th>
        <th className="py-2 px-4 w-2/5 text-left">Link</th>
      </tr>
    </thead>
    <tbody className="text-2xl text-white font-serif mb:text-sm ">
      { downloadHistory?.map((download,index)=>
      <tr  key={index}>
        <td className="py-2 px-4">{index+1}</td>
        <td className="py-2 px-4 hover:text-red-400"><a href={download.URL}>{download.date.slice(0,10)}</a></td>
      </tr>
      )}
    </tbody>
  </table>
  </div>
     <div className="flex justify-center">
      <button className="bg-yellow-400 text-xl font-serif mb:text-sm p-2 mb-5 rounded-lg mb:p-1 " onClick={()=>setIsHistoryVisible(false)}>Back To Report</button>
     </div>
    </div>
  )
}

export default Downloads
