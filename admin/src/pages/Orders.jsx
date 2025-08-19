import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { backendurl, currency } from '../App';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';


const Orders = () => {
  const local_token=localStorage.getItem('token')
  const [orders, setOrders]=useState([])
  const fetchAllOrders=async()=>{
    if (!local_token){
      return null
    }
    try{
      const response =await axios.post(`${backendurl}/api/order/list`,{}, {headers:{token: local_token}})
      if (response.data.success){
        setOrders(response.data.orders)
      }else{
        toast.error(response.data.message)
      }
    }catch(err){
      console.log(err)
      toast.error(err.message)``
    }
  }

  const statusHandler=async(event, orderId)=>{
    try{
      const response=await axios.post(`${backendurl}/api/order/status`, {orderId, status:event.target.value}, {headers:{token: local_token}})
      if (response.data.success){
        await fetchAllOrders()
        toast.success(response.data.message)
      }

    }catch(err){
      console.log(err)
      toast.error(err.message)
    }
  }

useEffect(()=>{
  fetchAllOrders()
},[local_token])
  return (
    <div>
      <h3>Order Page</h3>
      <div>
        {
          orders.map((order, index)=>(
            <div className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border border-gray-200 p-5 md:my-3 md-4 text-xs sm:text-sm test-gray-700' key={index}>
              <img className='w-12' src={assets.parcel_icon} alt=''/>
              <div>
                <div>
                  {order.items.map((item, index)=>{
                    if (index===order.items.length-1){
                      return <p className='py-0.5' key={index}>{item.name} x {item.quantity} <span>{item.size}</span></p>
                    }
                    else{
                      return <p className='py-0.5' key={index}>{item.name} x {item.quantity} <span>{item.size}</span>,</p>
                    }
                  })}
                </div>
                <p className='mt-3 mb-2 font-medium' >{order.address.firstName + " " + order.address.lastName}</p>
                <div>
                  <p>{order.address.street + ","}</p>
                  <p>{order.address.city+ ", "+ order.address.state+","+order.address.country+","+order.address.zipcode}</p>
                </div>
                <p>{order.address.phone}</p>
              </div>
              <div>
                <p className='text-sm sm:text-[15px]'>Items: {order.items.length}</p>
                <p className='mt-3'>Method: {order.paymentMethod}</p>
                <p>Payment: {order.payment? 'Done' :"Pending"}</p>
                <p>Date: {new Date(order.date).toLocaleDateString()}</p>
              </div>
              <p className='text-sm sm:text-[15px]'>{currency}{order.amount}</p>
              <select onChange={(event)=>statusHandler(event, order._id)} value={order.status} className='p-2 font-semibold ' name="status" id="status">
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
              
            </div>
          ))
        }
      </div>
      
    </div>
  )
}

export default Orders
