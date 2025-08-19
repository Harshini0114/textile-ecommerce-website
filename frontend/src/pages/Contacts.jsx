import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewletterBox from '../components/NewletterBox'

const Contacts = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 border-t'>
        <Title txt1={'CONTACT'} txt2={'US'}/>
      </div>
      <div className='flex flex-col justify-between md:flex-row gap-10 mb-28'>
        <img className='w-full md:max-w-[480px]' src={assets.contact_img} alt=''/>
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold tesxt-xl text-gray-600'>Our Store</p>
          <p className='text-gray-500'>54709 WilliamsStation<br/>Suite 350, Washington</p>
          <p className='text-gray-500'>Phone: +1 123 456 7890<br/>admin@gmail.com</p>
          <p className='font-semibold texr-xl text-gray-600'>carreers at fashionX</p>
          <p className='text-gray-500'>learn more about our teams an job openings</p>
          <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>Explore jobs</button>
        </div>
      </div>
      <NewletterBox/>

    </div>
  )
}

export default Contacts
