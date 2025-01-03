import mongoose from "mongoose"
import { facultySchemaType } from "../@types/SchemaTypes"

const facultySchema : mongoose.Schema<facultySchemaType> = new mongoose.Schema({
    facultyName:{
        type:String,
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    branch:{
        type:String,
       
    },
    subject:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"Subject"
    },
    joinInYear:{
        type:Date,
        
    },
    gender:{
        type:String,
        enum : ["Male" , "Female" , "Other"],
        
    },

    MCQTest:{
         type:[mongoose.Schema.Types.ObjectId],
         ref:"test"
    },
    codingTest:{
         type:[mongoose.Schema.Types.ObjectId],
         ref:"test"
    },
    facultyEnroll:{
        type:String,
        required:true
    },
    DOB:{
        type:Date,
       
    }
})

const facultyModel = mongoose.model<facultySchemaType>("Faculty",facultySchema)

export {facultyModel}