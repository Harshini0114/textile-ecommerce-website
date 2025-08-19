import express, { json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoutes.js';
import productRouter from './routes/productRoutes.js';
import cartRouter from './routes/cartRoutes.js';
import orderRouter from './routes/orderRoutes.js';

// app config
const app=express()
const port=process.env.PORT || 4000;
connectDB()
connectCloudinary()


// app.use(cors({
//     origin: "*", // Temporarily allow all origins to test
//     methods: "GET,POST,PUT,DELETE",
//     allowedHeaders: "Content-Type,Authorization"
//   }));

app.use(cors({
    origin: "*",  
    methods: 'GET,POST,PUT,DELETE, OPTIONS',
    allowedHeaders: ['Content-Type', 'Authorization', 'token'], // ✅ Allow custom headers
    credentials: true // ✅ If using cookies or authentication
  }));
app.options('*', cors());


// middleware
app.use(json())
// app.use(cors())
// app.use(cors({
//     origin: ['https://textile-ecomerce-website-mmly7bsli.vercel.app', 'https://textile-ecomerce-website-seven.vercel.app/', 'https://textile-ecomerce-website.vercel.app'],
//     methods: 'GET,POST,PUT,DELETE',
//     allowedHeaders: 'Content-Type,Authorization'
//   }));


  


// router
app.use('/api/user',userRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)

// create server
app.get('/', (req,res)=>{
    res.send("API working")
})

app.listen(port,()=>console.log('sever running on port:'+port))