import express from 'express';
import { placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateOrderStatus } from '../controllers/orderController.js';    
import authUser from '../middleware/auth.js';
import adminAuth from '../middleware/adminAuth.js';

const orderRouter=express.Router()

orderRouter.post('/list',adminAuth, allOrders)
orderRouter.post('/status',adminAuth, updateOrderStatus)

orderRouter.post('/userOrders',authUser, userOrders)
orderRouter.post('/place',authUser, placeOrder)
orderRouter.post('/stripe',authUser, placeOrderStripe)
orderRouter.post('/razorpay',authUser, placeOrderRazorpay)

export default orderRouter;