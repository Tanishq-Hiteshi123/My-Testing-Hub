import mongoose from "mongoose";
import { testStudentEvaluationType } from "../@types/SchemaTypes";

const testStudentEvaluationSchema : mongoose.Schema<testStudentEvaluationType> = new mongoose.Schema({

     studentId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "students"
     },
     testId : {
         type : mongoose.Schema.Types.ObjectId,
         ref : "test"
     },
     evaluationResult : {
         correctAnswer : {
            type : Number
         },
         wrongAnswer : {
            type : Number
         },
         unAttempted : {
            type : Number
         },
         totalMarks : {
            type : String
         },
         accuracy : {
           type : Number
         },

     }

} , { timestamps : true})

const testStudentEvaluationModel =  mongoose.model<testStudentEvaluationType>("testStudentEvaluation" , testStudentEvaluationSchema)

export {testStudentEvaluationModel}