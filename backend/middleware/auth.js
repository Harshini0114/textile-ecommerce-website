import jwt from 'jsonwebtoken';

const authUser=async (req, res, next)=>{
    const {token}=req.headers;
    if (!token){
        return res.json({success:false, message:"Token not found"})
    }
    try{
        const token_decode=jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId=token_decode.id
        // console.log(req.body.userId, req.body.itemId, req.body.size)
        next()

    }catch(err){
        console.log(err)
        return res.json({success:false, message:err.message})
    }
}

export default authUser;