import { Request, Response } from "express"
import response from "../helpers/response"
import { testStudentEvaluationModel } from "../models/TestStudentEvaluation";
import { studentModel } from "../models/student.model";

const getTheEvaluationDetails = async(req : Request , res : Response)=>{
    
    try {
     
        const userId = req.user?.userId;
        const userRole = req.user?.userRole;
        const {testId} = req.body;


        if (userRole != "Student") {
              return response.error({
                 res,
                 code : 401,
                 data : null,
                 error : true,
                 message : "Only Student can see score"
              })
        }


        const studentDetails = await studentModel.findOne({
              userId 
        })

        if (!studentDetails) {
             return response.error({
                 res,
                 code : 404,
                 data : null,
                 error : true,
                 message : "Student not found"
             })
        }


        const evaluationDetails = await testStudentEvaluationModel.findOne({
             studentId : studentDetails?._id,
             testId
        })


        if (!evaluationDetails) {
            return response.error({
                res,
                code : 500,
                data : null,
                error : true,
                message : "Could not get the evaluation details"
            })
        }

        return response.success({
            res,
            code : 200,
            data : {
                evaluationDetails,
                success : true
            },
            error : false,
            message : "Your Test Evalutation detail"
        })



        
    }
    catch (error) {
          return response.error({
             res,
             code : 500,
             data : null,
             error : true,
             message : error instanceof Error ? error.message : "Internal Server Error"
          })
    }

}

export {getTheEvaluationDetails}