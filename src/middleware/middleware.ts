import User from "../model/user";
import jwt from "jsonwebtoken"

export const authMiddleware= async(req: any, res: any, next: any) => {
  try{
    const authHeader= req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({message: "authorization header missing or invalid"})
    }
    const token= authHeader.split(" ")[1];
    const decoded: any= jwt.verify(token, process.env.JWT_SECRET
    || "secretkey");
    const user= await User.findById(decoded.userId).select("-password");
    if(!user) {
      return res.status(401).json({message: "user not found"})
    }
    req.user= user;
    next();


  }
  catch(err) {
    res.status(401).json({message: "invalid token"})
  }
}