import { Router } from 'express';
import { createNewMCQTest, evaluateTheTestAfterSubmission, getAllTheActiveTest, getAllTheCompletedTest, getAllUpComingTestList, getTestBySubjectId, getTestByYearAndBranch } from '../controllers/test.controller';
import { isAuthenticated } from '../middlewares/authentication';
import { PromiseHandler } from '../modules/v1/common/middlewares';

const testRouter = Router();

testRouter.post('/createNewMCQTest', isAuthenticated, createNewMCQTest);
testRouter.get('/getTestByYearAndBranch' , isAuthenticated , getTestByYearAndBranch)
testRouter.get('/getTestBySubjectId/:subjectId' , isAuthenticated , getTestBySubjectId)
testRouter.post('/evaluateTheTestAfterSubmission/:testId' , isAuthenticated , evaluateTheTestAfterSubmission)
testRouter.get('/getAllTheActiveTest' , isAuthenticated , getAllTheActiveTest)
testRouter.get("/getAllTheCompletedTest" , isAuthenticated , PromiseHandler(getAllTheCompletedTest))
testRouter.get("/getAllUpComingTestList" , isAuthenticated , PromiseHandler(getAllUpComingTestList))
export { testRouter };
