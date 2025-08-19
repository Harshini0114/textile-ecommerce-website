import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { backendurl, currency } from '../App';
import { toast } from 'react-toastify';

const List = () => {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);
    const fetchList=async()=>{
        try{
            setLoading(true)
            const response=await axios.get(`${backendurl}/api/product/list`)
            if (response.data.success){
                setList(response.data.products)
            }
            else{
                console.log(response.data.message)
                toast.error(response.data.message)
            }
        }
        catch(err){
            console.log(err)
            toast.error(err.message)
        }
        finally{
            setLoading(false)
        }
    }

    const removeProduct=async(id)=>{
        try{
            const local_token=localStorage.getItem('token')
            const response=await axios.delete(`${backendurl}/api/product/remove/${id}`,
                {headers:{token:local_token}}
            )
            if (response.data.success){
                toast.success(response.data.message)
                await fetchList()
            }
            else{
                toast.error(response.data.message)
            }
        }catch(err){

        }
    }

    useEffect(() => {
        fetchList();
    }, []);

  return (
    <div>
      {(loading) &&  <h1>Loading...</h1>}
      <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
        <p>Image</p>
        <p>Name</p>
        <p>Category</p>
        <p>Price</p>
        <p>Action</p>
      </div>

      {
        list.map((item,index)=>(
            <div className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm' key={index}>
                <img className='w-12' src={item.image[0]} alt=""/>
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>{currency}{item.price}</p>
                <p onClick={()=>removeProduct(item._id)} className='text-right md:text-left cursor-pointer text-lg'>X</p>
            </div>
        ))
      }

    </div>
  )
}

export default List
