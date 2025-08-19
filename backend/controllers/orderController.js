import orderModel from '../models/orderModel.js'
import Order from '../models/orderModel.js'
import userModel from '../models/userModel.js'

//cod
const placeOrder=async (req, res)=>{
    try{
        const {userId, items, amount, address}=req.body
        const orderData={
            userId,
            items,
            amount,
            address,
            paymentMethod:"COD",
            payment:false,
            date:Date.now(),
        }
        const newOrder=new Order(orderData);
        await newOrder.save();

        await userModel.findByIdAndUpdate(userId, {cartData:{}})

        res.json({success:true, message:"Order placed"})
    }catch(err){
        res.json({success:false, message:err.message})
    }
}

//stripe
const placeOrderStripe=async (req, res)=>{  

}

//razonpay
const placeOrderRazorpay=async (req, res)=>{

}

//all orders data
const allOrders=async (req, res)=>{
    try{
        const orders=await orderModel.find({})
        res.json({success:true, orders})
    }catch(err){
        res.json({success:false, message:err.message})
        console.log(err.message)
    }
}   

// user orders
const userOrders=async (req, res)=>{
    try{
        const {userId}=req.body
        const orders=await orderModel.find({userId})
        res.json({success:true, orders})

    }catch(err){
        res.json({success:false, message:err.message})
        console.log(err.message)
    }
}   

//update order status
const updateOrderStatus=async (req, res)=>{
    try{
        const {orderId, status}=req.body
        await orderModel.findByIdAndUpdate(orderId, {status})
        res.json({success:true, message:"Order status updated"})

    }catch(err){
        res.json({success:false, message:err.message})
        console.log(err.message)
    }

}

export {placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateOrderStatus}