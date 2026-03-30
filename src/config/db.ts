import mongoose from "mongoose";

async function connectDb (){

  try{
    const uri=process.env.MONGO_URI ;
    if(!uri) {
      console.log("MONGO_URI not found in environment variables");
      return;
    }
    await mongoose.connect(uri);
    console.log("connected to db");

  }
  catch(err) {
    console.log("error connectiong db")
  }
  
}