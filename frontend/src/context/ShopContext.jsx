import { createContext, useEffect, useState } from "react";
// import { products } from "../assets/assets.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {jwtDecode} from "jwt-decode";

// export const ShopContext=createContext();
const ShopContext=createContext();

const ShopContextProvider=(props)=>{
    const backendUrl=import.meta.env.VITE_BACKEND_URL;
    const currency='₹';
    const delivery_fee=10;
    const [search, setSearch]=useState('');
    const [showSearch, setShowSearch]=useState(false);
    const [cartItems, setCartItems]=useState({});
    const navigate=useNavigate();
    const [products, setProducts]=useState([]);
    const [token, setToken]=useState('');

    const addToCart=async (itemId, size)=>{

        if (!size){
            toast.error('Select Product Size')
            return;
        }

        setCartItems(prevCartItems => {
            let newCartData = { ...prevCartItems };
    
            if (!newCartData[itemId]) {
                newCartData[itemId] = {};
            }
            if (!newCartData[itemId][size]) {
                newCartData[itemId][size] = 1;
            } else {
                newCartData[itemId][size] += 1;
            }
    
            // console.log(newCartData);
            return newCartData;  // Return the updated cart state
        });
        console.log("cart items",cartItems);

        if (token){
            try{
                console.log("hi");
                await axios.post(`${backendUrl}/api/cart/add`, {itemId, size}, {headers:{token}});
                console.log('Item added to cart');
                toast.success('Item added to cart');
            }catch(err){
                console.log(err);
                toast.error(err.message);
            }
        }
        else{
            console.log("Please login to add items to cart");
            toast.error("Please login to add items to cart");
        }
    }

    const getuserCart=async (token)=>{
        try{
            const response=await axios.post(`${backendUrl}/api/cart/get`,{}, {headers:{token}});
            if (response.data.success){
                setCartItems(response.data.cartData);
            }
        }catch(err){
            console.log(err);
            toast.error(err.message);
        }
    }

    const getCartCount=()=>{
        let totalCount=0;
        for (const items in cartItems){
            for (const size in cartItems[items]){
                try{
                    if (cartItems[items][size]>0){
                        totalCount+=cartItems[items][size];
                    }
                }catch(err){
                    console.log(err)
                }
            }
        }
        return totalCount;
    }

    const updateQuantity=async(itemId, size, quantity)=>{
        setCartItems(prevCartItems => {
            // Create a new copy of the cart state
            let cartData = { ...prevCartItems };
            cartData[itemId][size] = quantity;
            return cartData;
        })
        if (token){
            try{
                await axios.post(`${backendUrl}/api/cart/update`, {itemId, size, quantity}, {headers:{token}});
                toast.success('Quantity updated successfully');
            }catch(err){
                console.log(err);
                toast.error(err.message);
            }
        }
    }

    const getCartAmount=()=>{
        let totalAmount=0;
        for (const items in cartItems){
            let itemInfo=products.find((product)=>product._id ===items);
            for (const item in cartItems[items]){
                try{
                    if (cartItems[items][item]>0){
                        totalAmount+=itemInfo.price*cartItems[items][item]
                    }
                }catch(err){
                    console.log(err)
                }
            }
        }
        return totalAmount;
    }

    const getProductsData=async()=>{
        try{
            const response=await axios.get(`${backendUrl}/api/product/list`);
            if (response.data.success){
                setProducts(response.data.products);
            }
            else{
                toast.error(response.data.message);
            }
        }catch(err){
            console.log(err)
            toast.error(err);
        }
    }

    useEffect(()=>{
        getProductsData();
    },[])
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
    
        if (storedToken) {
          const decodedToken = jwtDecode(storedToken);
          
          if (decodedToken.exp * 1000 < Date.now()) {
            // Token is expired
            localStorage.removeItem("token");
            setToken(null);
            toast.error("Session expired. Please log in again.");
          } else {
            setToken(storedToken);
            getuserCart(storedToken)
          }
        }
      }, []);

    const value={
        navigate,
        products,
        currency, delivery_fee,
        search, setSearch, showSearch, setShowSearch,
        cartItems, setCartItems, addToCart, getCartCount, updateQuantity, getCartAmount,
        backendUrl, token, setToken
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

// export default ShopContextProvider;
// export { ShopContext, ShopContextProvider };
export { ShopContext };
export default ShopContextProvider;
