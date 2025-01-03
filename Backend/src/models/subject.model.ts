import mongoose from "mongoose"
import { subjectSchemaType } from "../@types/SchemaTypes"

const subjectSchema : mongoose.Schema<subjectSchemaType> = new mongoose.Schema({
    subjectName:{
        type:String,
        required:true
    },
    subjectCode:{
        type:String,
        required:true,
        unique : true
    },
    questionBankMCQ:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"MCQ"
    },
    questionBankCode:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"code"
    },
    facultyId:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"Faculty"
    }
})

const subjectModel = mongoose.model <subjectSchemaType> ("subject", subjectSchema)
export {subjectModel}