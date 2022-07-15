import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const ConnectionDB = async () => {
    try {  
        await mongoose.connect(process.env.MONGO_URL as string)
        console.log("Connect DB")
    }catch(err){
        console.log(err)
    }
}
