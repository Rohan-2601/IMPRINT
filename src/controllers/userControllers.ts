import {Request, Response} from "express"
import User from "../model/user"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const registerUser= async(req: Request, res: Response) => {
    try{
         const username= req.body.username
          const password= req.body.password

          if(!username || !password) {
            return res.status(400).json({message: "username and password are required"})
          }
          const existUser= await User.findOne({username})
          if(existUser){
            return res.status(400).json({Message: "username already exists"})
          }
          const hashesedPassword= await bcrypt.hash(password,10);
         const user = await User.create({username, password:hashesedPassword})
          res.status(201).json({message: "user registered successfully", userId: user._id}) 

    }
    catch(err) {
        res.status(500).json({message: "error registering user"})
    }
}

