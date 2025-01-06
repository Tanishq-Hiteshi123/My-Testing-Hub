import { Request, Response } from 'express';
import response from '../helpers/response';
import { subjectModel } from '../models/subject.model';

const addNewSubject = async (req: Request, res: Response) => {
  try {
    const { subjectName, subjectCode } = req.body;

    if (!subjectCode || !subjectName) {
      return response.error({
        res,
        code: 400,
        data: null,
        error: true,
        message: 'Please Provide all details',
      });
    }

    const subjectCodeExist = await subjectModel.findOne({
      subjectCode,
    });

    if (subjectCodeExist) {
      return response.error({
        res,
        code: 400,
        data: null,
        error: true,
        message: 'Subject with this subject code already exist',
      });
    }
    //  Creating new Subject :-

    const newSubject = await subjectModel.create({
      subjectCode,
      subjectName,
    });

    if (!newSubject) {
      return response.error({
        res,
        code: 400,
        data: null,
        error: true,
        message: 'Subject could not get added',
      });
    }

    return response.success({
      res,
      code: 200,
      data: {
        newSubject,
      },
      error: true,
      message: 'New Subject added SuccessFully',
    });
  } catch (error) {
    return response.error({
      res,
      code: 500,
      data: null,
      error: true,
      message: error instanceof Error ? error.message : 'Internal Server Error',
    });
  }
};

const getAllSubjects = async (req : Request , res : Response) =>{
  
   try {
    
       const allSubjectsList = await subjectModel.find({} , {subjectCode : 1 , subjectName : 1 , _id : 1 , facultyId : 1 });

       if (!allSubjectsList){
         return response.error({
           res,
           code : 500,
           data : null,
           error : true,
           message : "Subject List could not get fetched"
         })
       }

       return response.success({
        res,
        code : 200,
        data : {
           message : "All Subject List" ,
           allSubjectsList,
           success : true
        },
        error : false,
        message : "All Subject List" ,
      })

   }
   catch (error) {
     return response.error({
        res,
        code : 500,
        message : error instanceof Error ? error.message : "Internal Server error",
        data : null,
        error : true
     })
   }

}

const deleteSubjectById = async (req : Request , res : Response) =>{
  
   try {
    
      const {subjectId} = req.params;

      const userRole = req.user?.userRole;
      if (!subjectId) {
        return response.error({
          res,
          code : 400,
          message :  "Please Provide the subjectId",
          data : null,
          error : true
       })
      }

      if (userRole != "Admin") {
        return response.error({
          res,
          code : 401,
          message :  "Only Admin can delete any Subject",
          data : null,
          error : true
       })
      }
      

      const subjectDetails = await subjectModel.findById(subjectId);

      if (!subjectDetails) {
        return response.error({
          res,
          code : 404,
          message : "Subject not found with provided Id",
          data : null,
          error : true
       })
      }



      // Deleting the subject :-
      const deletedSubject = await subjectModel.findByIdAndDelete(subjectId , {new : true});

      if (!deletedSubject) {
        return response.error({
          res,
          code : 500,
          message : "Subject not get deleted",
          data : null,
          error : true
       }) 
      }

      return response.success({
        res,
        code : 200,
        message : "Subject deleted successfully",
        data : {
          isDeleted : true,
          deletedSubject
        },
        error : false
     }) 

   }
   catch (error) {
    return response.error({
      res,
      code : 500,
      message : error instanceof Error ? error.message : "Internal Server error",
      data : null,
      error : true
   }) 
   }

}
export { addNewSubject , getAllSubjects , deleteSubjectById};
