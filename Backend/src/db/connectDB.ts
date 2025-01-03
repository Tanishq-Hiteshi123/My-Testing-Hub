import mongoose from "mongoose";
import logger from "../helpers/logger";

export const connectDB = async () =>{
  
    try {
      
      const conn = await mongoose.connect(`${process.env.MONGO_URI}/${process.env.DATABASE_NAME}` , {family : 4})
       logger.info(`DataBase Connected SuccessFully ${conn.connection.host}`)

    } catch (error) {
      
        if (error instanceof Error) {
          logger.error("Error Occured : " , error.message)
        }
        else {
          logger.error("Something went wrong while connecting with database")
        }

    }

}