import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Routes, Route } from 'react-router-dom';
import Add from './pages/Add';
import List from './pages/List';
import Orders from './pages/Orders';
import Login from './components/Login';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

// App.js or App.jsx
export const backendurl = import.meta.env.VITE_BACKEND_URL;
export const currency = '₹';

const App = () => {
    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : "");

    useEffect(() => {
        localStorage.setItem('token', token);
    }, [token]);

    return (
        <div className='bg-gray-50 min-h-screen'>
            {token === ''
                ? <Login setToken={setToken} />
                :
                <>
                    <Navbar setToken={setToken} />
                    <hr className='border-gray-400' />
                    <div className='flex w-full'>
                        <Sidebar />
                        <div className='w-[70%] mx-auto ml-[max(5vw, 25px)] my-8 text-gray-600 text-base'>
                            <Routes>
                                <Route path='/' element={<List token={setToken} />} />
                                <Route path='/add' element={<Add token={setToken} />} />
                                <Route path='/list' element={<List token={setToken} />} />
                                <Route path='/orders' element={<Orders token={setToken} />} />
                            </Routes>
                        </div>
                    </div>
                </>
            }
            <ToastContainer />
        </div>
    );
};

export default App;
