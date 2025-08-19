import React, { useState, useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { use } from 'react';
import {jwtDecode} from "jwt-decode";

const Login = () => {
  const [currentState, setCurrentState]=useState('Login');
  const {token, setToken, navigate, backendUrl}=useContext(ShopContext);
  const [name, setName]=useState('');
  const [email, setEmail]=useState('');
  const [password, setPassword]=useState('');

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    
    try {
      const endpoint = currentState === "Sign Up" ? "/api/user/register" : "/api/user/login";
      const userData = currentState === "Sign Up" ? { name, email, password } : { email, password };
  
      const response = await axios.post(`${backendUrl}${endpoint}`, userData);
  
      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        setToken(response.data.token); 
        
        toast.success(
          currentState === "Sign Up" ? "Account created successfully" : "Logged in successfully"
        );
  
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    }
  };

  useEffect(()=>{
    if (token){
      navigate('/');
    }
  },[token])
  



  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl'>{currentState}</p>
        <hr/>
      </div>
      {currentState==='Login' ? '' :  <input onChange={(e)=>setName(e.target.value)} type='text' className='w-full px-3 py-2 border border-gray-800' placeholder='Name' required/>}
      <input onChange={(e)=>setEmail(e.target.value)} value={email} type='email' className='w-full px-3 py-2 border border-gray-800' placeholder='Email' required/>
      <input onChange={(e)=>setPassword(e.target.value)} value={password} type='password' className='w-full px-3 py-2 border border-gray-800' placeholder='Password required'/>
      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        {
          currentState==='Login'
          ? <><p className='cursor-pointer'>Forgot your password?</p>
          <p onClick={()=>setCurrentState('Sign Up')} className='cursor-pointer'>Create new account</p></>

          : <><p></p><p onClick={()=>setCurrentState('Login')} className='cursor-pointer'>Login Here</p></>
          
        }
      </div>
      <button className='bg-black text-white font-light px-8 py-2 mt-4'>{currentState==='Login' ? 'Sign In' : 'Sign Up'}</button>
    </form>
  )
}

export default Login

