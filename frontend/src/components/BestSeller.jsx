import React, { useState, useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

const BestSeller = () => {
    const {products}=useContext(ShopContext);
    const [bestSeller, setBestSeller]=useState([]);

    useEffect(()=>{
        const bestProduct=products.filter((item)=>(item.bestSeller));
        // console.log(bestProduct)
        setBestSeller(bestProduct);
    },[products])

  return (
    <div className='my-10'>
        <div className='text-center text-3xl py-8'>
            <Title txt1={'BEST'} txt2={'SELLERS'}/>
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text:base text-gray-600'>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Enim esse vel nesciunt numquam ratione facilis!
            </p>
        </div>

        <div className='grid gap-5 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
        {
          bestSeller.map((item, index)=>(
            <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price}/>
          ))
        }
      </div>
      
    </div>
  )
}

export default BestSeller
