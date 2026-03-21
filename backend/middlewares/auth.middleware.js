import jwt from "jsonwebtoken";

export const authVerify=(req,res,next)=>{
    
    try{
    const token=req.cookie.authToken;
    console.log("token",token)
    if(!token) return res.status(401).json({
        success:false, 
        message:"token not found, Please log in."
    });

    const decode=jwt.verify(token,process.env.JWT_SECRET);

    req.user={id:decode.id};
    next();
    }
    catch(error){
        return res.statu(401).json({
            success:false,
            message:"Invalid or expired token. Please log in again."
        })
    }

}