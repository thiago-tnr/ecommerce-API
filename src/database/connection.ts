import mongoose from "mongoose";
import { logger } from "../helpers/logger/Logger";

export const ConnectionDB = async () => {
    try {  
        await mongoose.connect(process.env.MONGO_URL as string)
        logger.info("Connect DB")
    }catch(err){
        logger.info(err)
    }
}
