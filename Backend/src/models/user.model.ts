import mongoose from 'mongoose';
import { userSchemaType } from '../@types/SchemaTypes';


const userSchema : mongoose.Schema<userSchemaType> = new mongoose.Schema({
  userEmail: { type: String, required: true },
  role: {
    type: String,
    enum : ["Student" , "Faculty" , "Admin" , "NA"],
    default : "NA"
  },
  otp: {
    type: Number,
  },
  isVerified: {
    type: Boolean,
    default : false
  },
});


const userModel = mongoose.model <userSchemaType> ('user', userSchema);
export {userModel}
