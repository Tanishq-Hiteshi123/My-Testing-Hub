import mongoose from 'mongoose'
import { adminSchemaType } from '../@types/SchemaTypes'

const adminSchema : mongoose.Schema<adminSchemaType> = new mongoose.Schema({
    adminName:{
        type:String,
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }

})

const adminModel = mongoose.model<adminSchemaType>("Admin",adminSchema)
export {adminModel}