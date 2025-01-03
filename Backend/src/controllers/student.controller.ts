import response from "../helpers/response"
import { Request , Response } from "express"
import { studentModel } from "../models/student.model";

const updateStudentProfile = async (req : Request , res : Response) =>{

   try {
    const {userRole , userId} = req.user!;


    if (userRole != "Student" || userId.toString() != req.body.userId.toString()){
      
         return response.error({
             res,
             code : 401,
             data : null,
             error : true,
             message : "Student is allowed to updated his/her profile..."
         })

    }

    const updatedStudentDetails = await studentModel.findOneAndUpdate({
         userId : userId  
    } , {
        ...req.body
    } , {new : true})


    if (!updatedStudentDetails) {
         return response.error({
           res,
           code : 500,
           data : null,
           error : true,
           message : "Student Profile could not get Updated..."
         })
    }

    return response.success({
        res,
        code : 200,
        data : {
           success : true,
           message : "Student Profile Updated SuccessFully",
           updatedStudentDetails
        },
        error : false,
        message : "Student Profile Updated"
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

export {updateStudentProfile}