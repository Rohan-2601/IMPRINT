import mongoose from "mongoose";
import User from "./user";

const contentSchema= new mongoose.Schema({
     title: {
      type: String,
      required: true
     },
     link:{
      type:String,
     },
     note:{
      type:String,
     },

     userId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
     },

     type:{
      type: String,
      enum: ["article", "video", "tweet", "note"],
      required: true
     }

     
})