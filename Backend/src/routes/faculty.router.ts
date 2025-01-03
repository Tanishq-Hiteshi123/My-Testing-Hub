import { Router } from 'express';
import { isAuthenticated } from '../middlewares/authentication';
import {
  addMCQQuestion,
  updateFacultyProfile,
} from '../controllers/faculty.controller';
import { PromiseHandler } from '../modules/v1/common/middlewares';

const facultyRouter = Router();

facultyRouter.put(
  '/updateFacultyDetails',
  isAuthenticated,
  PromiseHandler(updateFacultyProfile)
);

facultyRouter.post('/addMCQQuestion', isAuthenticated, addMCQQuestion);
export { facultyRouter };
