import { Request, Response } from 'express';
import response from '../helpers/response';
import { subjectModel } from '../models/subject.model';
import { generateRandomQuestionsForMCQ } from '../utils/generateRandomQuestions';
import { testModel } from '../models/test.model';
import { facultyModel } from '../models/faculty.model';
import mongoose from 'mongoose';
import { studentModel } from '../models/student.model';
import { testStudentEvaluationModel } from '../models/TestStudentEvaluation';

const createNewMCQTest = async (req: Request, res: Response) => {
  try {
    // Step - 1 :- need to be a faculty for creating the test :-

    const userRole = req.user?.userRole;
    const userId = req.user?.userId;

    if (userRole != 'Faculty') {
      return response.error({
        res,
        code: 401,
        data: null,
        error: true,
        message: 'Only Faculty is allowed to set the test',
      });
    }

    // Step - 2 :- take all the necessary data from the req.body

    const {
      testName,
      testDescription,
      testType,
      noOfQuestions,
      totalTime,
      subjectId,
      branch,
      year,
      dateOfTest,
      isActive
    } = req.body;

    if (
      !testName ||
      !testType ||
      !noOfQuestions ||
      !totalTime ||
      !subjectId ||
      !branch ||
      !year ||
      !dateOfTest || 
      isActive == undefined
    ) {
      return response.error({
        res,
        code: 400,
        data: null,
        error: true,
        message:
          'Please Provide all the necessary detail(s) for creating the test',
      });
    }
    const subjectDetails = await subjectModel.findById(subjectId);

    if (!subjectDetails) {
      return response.error({
        res,
        code: 404,
        data: null,
        error: true,
        message: 'Subject not found',
      });
    }
    if (noOfQuestions > subjectDetails.questionBankMCQ.length) {
      return response.error({
        res,
        code: 400,
        data: null,
        error: true,
        message: 'Out of bound No of Questions',
      });
    }

    const facultyDetails = await facultyModel.findOne({
      userId: userId,
    });

    // Check Faculty is eligible for the setting the test or not :-
    if (!facultyDetails) {
      return response.error({
        res,
        code: 404,
        data: null,
        error: true,
        message: 'Faculty with Id not found',
      });
    }

    if (branch != facultyDetails.branch) {
      return response.error({
        res,
        code: 400,
        data: null,
        error: true,
        message: 'You does not belong to this branch',
      });
    }

    let isSubjectPresent = facultyDetails.subject.find(
      (x) => x.toString() == subjectId
    );

    if (!isSubjectPresent) {
      return response.error({
        res,
        code: 400,
        data: null,
        error: true,
        message: 'You does not teaches this subject',
      });
    }

    // Generate the random Questions for test :-
    let testQuestions = generateRandomQuestionsForMCQ(
      [...subjectDetails.questionBankMCQ],
      noOfQuestions
    );
    // Step - 3 :- create the test :-
    const newTest = await testModel.create({
      testName,
      testDescription: testDescription || '',
      noOfQuestions,
      totalQuestionsMCQ: testQuestions,
      testType,
      totalTime,
      subjectId,
      branch,
      year,
      facultyId: facultyDetails._id,
      dateOfTest,
      isActive
    });

    if (!newTest) {
      return response.error({
        res,
        code: 500,
        data: null,
        error: true,
        message: 'Test could not get created...Please Try again Later',
      });
    }
    // step - 4 :- Add the newly created test in the MCQ test list of faculty
    const TestId = newTest._id as mongoose.Types.ObjectId;
    facultyDetails.MCQTest.push(TestId);
    await facultyDetails.save();

    return response.success({
      res,
      code: 201,
      data: {
        message: 'Test Created',
        newTest,
      },
      error: true,
      message: `New Test Created SuccessFully`,
    });
  } catch (error) {
    return response.error({
      res,
      code: 500,
      message: error instanceof Error ? error.message : 'Internal Server Error',
      data: null,
      error: true,
    });
  }
};

const getTestByYearAndBranch = async (req: Request, res: Response) => {
  try {
    const { branch, year , testType} = req.query;

    if (!branch || !year || !testType) {
      return response.error({
        res,
        code: 400,
        data: null,
        error: true,
        message: 'Please Provide the branch details as well as Year Details',
      });
    }

    // Fetching all the test which is active as well as of requested year and Branch :-
    const allTest = await testModel.find({
      branch: branch,
      year: year,
      isActive: true,
    });

    if (!allTest) {
      return response.error({
        res,
        code: 500,
        data: null,
        error: true,
        message: 'Could not fetch any test details',
      });
    }

    return response.success({
      res,
      code: 200,
      data: {
        message: `All Tests for ${branch} of ${year} year which is currently Active`,
        allTest,
      },
      error: false,
      message: 'All Tests',
    });
  } catch (error) {
    return response.error({
      res,
      code: 500,
      error: true,
      message: error instanceof Error ? error.message : 'Internal Server Error',
      data: null,
    });
  }
};


const getTestBySubjectId = async (req: Request, res: Response) => {
  try {
    const { subjectId } = req.params;

    if (!subjectId) {
      return response.error({
        res,
        code: 500,
        error: true,
        message: 'Please Provide the subjectId',
        data: null,
      });
    }

    const allTestsBySubjectId = await testModel.find({
      subjectId,
      isActive: true,
    });

    if (!allTestsBySubjectId) {
      return response.error({
        res,
        code: 500,
        data: null,
        error: true,
        message: 'Could not fetch any test details',
      });
    }

    return response.error({
      res,
      code: 200,
      data: {
        message: 'All Test by subjectId',
        allTestsBySubjectId,
      },
      error: false,
      message: 'All Test List',
    });
  } catch (error) {
    return response.error({
      res,
      code: 500,
      error: true,
      message: error instanceof Error ? error.message : 'Internal Server Error',
      data: null,
    });
  }
};




const evaluateTheTestAfterSubmission = async (req: Request, res: Response) => {
  try {
    const { testId } = req.params;

    const { userId, answersObj } = req.body;

    const userRole = req.user?.userRole;

    if (userRole != 'Student') {
      return response.error({
        res,
        code: 401,
        data: null,
        error: true,
        message: 'Only Student can access this',
      });
    }

    if (
      !userId ||
      !testId ||
      !answersObj ||
      typeof answersObj != 'object' ||
      Array.isArray(answersObj)
    ) {
      return response.error({
        res,
        code: 400,
        data: null,
        error: true,
        message: 'Please Provide all the details Or may be the format is wrong',
      });
    }

    // Get the test Details along with questions details :-
    const testDetails = await testModel
      .findOne({
        _id: testId,
        testType: 'MCQ',
      })
      .populate('totalQuestionsMCQ');

    if (!testDetails) {
      return response.error({
        res,
        code: 404,
        message: 'Test with provided Id not found',
        data: null,
        error: true,
      });
    }

    const studentDetails = await studentModel.findOne({
      userId: userId,
    });

    if (!studentDetails) {
      return response.error({
        res,
        code: 404,
        message: 'Student with this userId not found',
        data: null,
        error: true,
      });
    }

    // Check the student should not have already recorded the response with this testId
    const isAlreadyResponseRecorded = await testStudentEvaluationModel.findOne({
      testId: testDetails._id,
    });

    if (isAlreadyResponseRecorded) {
      return response.error({
        res,
        code: 400,
        message: 'Response for this test is already recorded',
        data: null,
        error: true,
      });
    }

    // Evaluating the test Result :-
    const allTestQuestion = testDetails.totalQuestionsMCQ;
    let evaluationResult = {};

    let unAttempted = 0;
    let correctAns = 0;
    let wrongAnswer = 0;
    allTestQuestion.forEach((question: any) => {
      if (answersObj[question._id.toString()]) {
        if (answersObj[question._id.toString()] == question?.correctAns) {
          correctAns++;
        } else {
          wrongAnswer++;
        }
      } else {
        unAttempted++;
      }
    });

    evaluationResult = {
      ...evaluationResult,
      correctAnswer: correctAns,
      wrongAnswer,
      unAttempted,
      totalMarks: `${correctAns * 2 - wrongAnswer} / ${
        allTestQuestion.length * 2
      }`,
      accuracy: (correctAns * 100) / allTestQuestion.length,
    };

    // Add an Entry for the studentTestEvaulation :-
    const newStudentTestEvaluation = await testStudentEvaluationModel.create({
      studentId: studentDetails._id,
      testId: testDetails._id,
      evaluationResult: evaluationResult,
    });

    if (!newStudentTestEvaluation) {
      return response.error({
        res,
        code: 500,
        data: null,
        error: true,
        message: 'Evaluation could not get stored',
      });
    }

    // Add This test Id into the student Record :-
    studentDetails.MCQtest.push(testDetails._id as mongoose.Types.ObjectId);
    await studentDetails.save();



    return response.success({
      res,
      code: 201,
      data: {
        newStudentTestEvaluation,
        message: 'New Test Evaluation is Made',
      },
      error: false,
      message: 'New Evaluation',
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


// API for getting all the isActive Test (Branch and Year) :- 
const getAllTheActiveTest = async (req: Request, res: Response) =>{
   try {
    
     const userId = req.user?.userId;
     const userRole = req.user?.userRole;
     const {branch , year} = req.query;

     if (!branch || !year) {
      return response.error({
        res,
        code : 400,
        data :  null,
        error : true,
        message : "Branch and Year Both are required"
      })
   }

     if (userRole != "Student") {
      
        return response.error ({
           res,
           code : 401,
           data : null,
           error : true,
           message : "Only for student"
        })

     }


    //  Test must be :-
    // 1. isActive :- true
    //  2. student haven't given test 
    // 3. Greater that today :-
    const allActiveTest = await testModel.find({
        branch,
        year,
        isActive : true,
        dateOfTest : {
           $gte : new Date().toISOString()
        }
    })


    // Now extract the test that Student Haven't given :-

    const studentDetails = await studentModel.findOne({
       userId : userId
    });

   let allTests : mongoose.Document[] = [];
       allActiveTest.map((testDetails : mongoose.Document , index) =>{
         if (!studentDetails?.MCQtest.includes(testDetails?._id as mongoose.Types.ObjectId)) {
          //  does not includes :-
          allTests.push(testDetails);
         }
    })

    

    return res.json({
       success : true,
       allTests
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


const getAllTheCompletedTest = async (req : Request , res : Response) =>{
  
    try {
      
      const userId = req.user?.userId;
      const userRole = req.user?.userRole;

      const {branch , year} = req.query;

      if (!branch || !year) {
         return response.error({
           res,
           code : 400,
           data :  null,
           error : true,
           message : "Branch and Year Both are required"
         })
      }

      if (userRole != "Student") {
        return response.error({
          res,
          code : 401,
          data : null,
          error : true,
          message : "Only Student Can Access This"
       }) 
      }

      const studentDetails = await studentModel.findOne({
         userId : userId,
         branch,
         year
      }).populate("MCQtest")

      if (!studentDetails) {
        return response.error({
          res,
          code : 404,
          data : null,
          error : true,
          message : "Student not found"
       }) 
      }

      // Completed test are those tests which are already given by user :-

      if (!studentDetails || !studentDetails.MCQtest) {
         return response.error({
           res,
           code : 500,
           data : null,
           error : true,
           message : "Test could not be found"
         })
      }


      return response.success({
         res,
         code : 200,
         data : {
           success : true,
           allMyCompletedTest : studentDetails.MCQtest
         },
         error : false,
         message : "All Completed Test Lists"
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

const getAllUpComingTestList = async(req : Request , res : Response) =>{
  
    try {
      
        const userId = req.user?.userId;
        const userRole = req.user?.userRole;
        const {branch , year} = req.query;

        if (userRole != "Student") {
          return response.error({
            res,
            code : 401,
            data : null,
            error : true,
            message : "Only Student Can Access This"
         }) 
        }

        if (!branch || !year) {
          return response.error({
            res,
            code : 400,
            data :  null,
            error : true,
            message : "Branch and Year Both are required"
          })
       }

        const studentDetails = await studentModel.findOne({
          userId : userId,
          branch,
          year
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

       const allTests = await testModel.find({
         isActive : false,
         dateOfTest : {
          $gte : new Date().toISOString()
         }
       })


       let allUpcomingTestList : mongoose.Document[] = [];
       allTests.map((testDetails : mongoose.Document ) =>{
         if (!studentDetails?.MCQtest.includes(testDetails?._id as mongoose.Types.ObjectId)) {
          //  does not includes :-
          allUpcomingTestList.push(testDetails);
         }
    })



       return res.json({
         success : true,
         allUpcomingTestList
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
 
export {
  createNewMCQTest,
  getTestByYearAndBranch,
  getTestBySubjectId,
  evaluateTheTestAfterSubmission,
  getAllTheActiveTest,
  getAllTheCompletedTest,
  getAllUpComingTestList
};
