import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProduct from '../components/RelatedProduct';


const Product = () => {
  const {productId}=useParams();
  const {products, currency, addToCart, cartItems}=useContext(ShopContext);
  const [productData, setProductData]=useState([]);
  const [image, setImage]=useState('');
  const [size,setSize]=useState('');

  useEffect(() => {
    if (products.length > 0) {  // Ensure products are loaded
      const item = products.find((item) => item._id === productId);
      if (item) {
        // console.log(item);
        setProductData(item);
        setImage(item.image[0]);
      } else {
        console.log("Product not found");
      }
    }
  }, [productId, products]);




  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      <div className='flex gap-12 flex-col sm:flex-row'>

        {/* product image */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {
              productData.image && productData.image.map((item, index) => {
                return (
                  <img
                  onClick={()=>setImage(item)}
                    src={item}
                    key={index}
                    className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer'
                  />
                );
                })
            }
          </div>
          <div className='w-full sm:w-[80%]'>
            <img className='w-full h-auto' src={image} alt=""/>
          </div>
        </div>

        {/* product info */}
        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
          <div className='flex item-center gap-1 mt-2'>
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <p className="pl-2">{122}</p>
          </div>
          <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
          <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
          <div className='flex flex-col gap-4 my-8'>
            <p>Select Size</p>
            <div className='flex gap-2'>
              {productData.sized && productData.sized.map((item,index)=>(
                <button onClick={()=>setSize(item)} className={`border py-2 px-4 bg-gray-100 ${item===size ? 'border-orange-500' : ""}`} type='button' key={index}>{item}</button>
              ))}
            </div>
          </div>
          <button onClick={()=>addToCart(productData._id, size)} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>Add to Cart</button>
          <hr className='mt-8 sm:w-3/4'/>
          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
            <p>100% original product</p>
            <p>cash on delivery is available on this product</p>
            <p>easy return and exchange policy within 7 days</p>
          </div>
        </div>
      </div>

      <div className='mt-20'>
        <div className='flex'>
          <p className='border px-5 py-3 text-sm'>Description</p>
          <p className='border px-5 py-3 text-sm'>Reviews {122}</p>
        </div>
        <div className='flex flex-col gap-4 border px-6 text-sm text-gray-500'>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores optio reiciendis expedita quas placeat. Eligendi voluptates unde quod iure repellat et atque officiis illum accusamus?</p>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Velit ratione unde ea laudantium sequi numquam ipsa! Distinctio consequuntur iusto beatae praesentium voluptas iste fugit, eos delectus veniam minus corporis pariatur.</p>
        </div>
      </div>
      <RelatedProduct category={productData.category} subCategory={productData.subCategory}/>
    </div>
  ) : <div className='opacity-0'>Product not found</div>
}

export default Product
