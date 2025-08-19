import userModel from '../models/userModel.js'

const addToCart = async (req, res) => {
    try {
        const { userId, itemId, size } = req.body;

        // Ensure all required fields are present
        if (!userId || !itemId || !size) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        const userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const cartData = userData.cartData || {}; // Ensure cartData is initialized

        // Safely handle nested objects for itemId and size
        if (!cartData[itemId]) {
            cartData[itemId] = {}; // Initialize if itemId doesn't exist
        }

        if (!cartData[itemId][size]) {
            cartData[itemId][size] = 1; // Initialize size if it doesn't exist
        } else {
            cartData[itemId][size] += 1; // Increment if it already exists
        }

        await userModel.findByIdAndUpdate(userId, { cartData });
        // console.log("Item added to cart");
        return res.json({ success: true, message: "Item added to cart" });

    } catch (err) {
        console.log(err);
        return res.json({ success: false, message: err.message });
    }
};



const updateCart = async (req, res) => {
    try{
        const {userId, itemId, size, quantity} =req.body
        const userData=await userModel.findById(userId)
        let cartData=await userData.cartData;

        cartData[itemId][size]=quantity;
        await userModel.findByIdAndUpdate(userId, {cartData})
        return res.json({success:true, message:"Cart updated"})
        
    }catch(err){
        console.log(err)
        return res.json({success:false, message:err.message})
    }
}

const getUserCart = async (req, res) => {
    try{
        const {userId}=req.body
        const userData=await userModel.findById(userId)
        let cartData=await userData.cartData;
        return res.json({success:true, cartData})
    }catch(err){
        console.log(err)
        return res.json({success:false, message:err.message})
    }
}

export { addToCart, updateCart, getUserCart }