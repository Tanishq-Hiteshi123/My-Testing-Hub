import mongoose from "mongoose"
import { codingQuestionSchemaType } from "../@types/SchemaTypes"


const codingQuestionSchema : mongoose.Schema<codingQuestionSchemaType> = new mongoose.Schema({
  questionDescription:{
        type:String,
        required:true
    },
    languages:{
        type:[String],
        required:true
    },
    inputTestCase:{
        type:String,
        required:true,
    },
    outputConstrains:{
        type:String,
        required:true
    },
    questionType:{
        type:String,
        default:"Code"
    }
})

const codingQuestionModel = mongoose.model<codingQuestionSchemaType>("code",codingQuestionSchema)
export {codingQuestionModel}