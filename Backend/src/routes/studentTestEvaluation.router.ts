import { Router } from "express";
import { isAuthenticated } from "../middlewares/authentication";
import { getTheEvaluationDetails } from "../controllers/testStudentEvaluation";

const testStudentEvaluationRouter = Router();

testStudentEvaluationRouter.post("/getMyTestEvaluation" , isAuthenticated , getTheEvaluationDetails)

export {testStudentEvaluationRouter}