import { Router } from 'express';
import { isAuthenticated } from '../middlewares/authentication';
import { updateStudentProfile } from '../controllers/student.controller';
import { PromiseHandler } from '../modules/v1/common/middlewares';

const studentRouter = Router();

studentRouter.put(
  '/updateStudentDetails',
  isAuthenticated,
  PromiseHandler(updateStudentProfile)
);

export { studentRouter };
