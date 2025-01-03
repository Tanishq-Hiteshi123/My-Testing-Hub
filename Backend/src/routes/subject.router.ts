import { Router } from 'express';
import { isAuthenticated } from '../middlewares/authentication';
import { addNewSubject, deleteSubjectById, getAllSubjects } from '../controllers/subject.controller';
import { PromiseHandler } from '../modules/v1/common/middlewares';

const subjectRouter = Router();

subjectRouter.post('/addNewSubject', PromiseHandler(addNewSubject));
subjectRouter.get('/getAllSubjects' , isAuthenticated , PromiseHandler(getAllSubjects))
subjectRouter.delete('/deleteSubjectById/:subjectId' , isAuthenticated , PromiseHandler(deleteSubjectById))
export { subjectRouter };
