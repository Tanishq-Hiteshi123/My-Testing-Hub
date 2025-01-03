import { Router } from 'express';
import { assignSubjectToFaculty } from '../controllers/admin.controller';
import { isAuthenticated } from '../middlewares/authentication';
import { PromiseHandler } from '../modules/v1/common/middlewares';

const adminRouter = Router();

adminRouter.post(
  '/assignSubjectToFaculty',
  isAuthenticated,
  PromiseHandler(assignSubjectToFaculty)
);

export { adminRouter };
