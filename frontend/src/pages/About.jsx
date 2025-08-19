import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewletterBox from '../components/NewletterBox'

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title txt1={'ABOUT'} txt2={'US'}/>
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt=''/>
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eum aliquam impedit ab, deleniti quibusdam dignissimos assumenda suscipit provident veritatis expedita nemo excepturi esse tempora tempore. Quasi sint voluptate nihil, error sequi accusantium quibusdam dignissimos deleniti amet numquam ipsa nulla at?</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui tempore eum incidunt sequi quos voluptatibus cupiditate necessitatibus quibusdam cum voluptatum repudiandae voluptatem porro placeat fuga, explicabo, vitae beatae corrupti quo.</p>
          <b className='text-gray-800'>Our Mission</b>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente eveniet soluta maiores vitae aliquid alias veritatis velit, illum blanditiis repudiandae?</p>
        </div>
      </div>
      <div className='text-xl py-4'>
        <Title txt1={'WHY'} txt2={'CHOOSE US'}/>
      </div>
      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-20 flex flex-col gap-5'>
          <b>Quality and assurance</b>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, ut!</p>
        </div>
        <div className='border px-10 md:px-16 py-20 flex flex-col gap-5'>
          <b>Convenience</b>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, ut!</p>
        </div>
        <div className='border px-10 md:px-16 py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Service</b>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, ut!</p>
        </div>
      </div>
      <NewletterBox/>
    </div>
  )
}

export default About
