import express, { Application, NextFunction, Request, Response } from 'express';

import morgan from 'morgan';
import hpp from 'hpp';
import helmet from 'helmet';
import multer from 'multer';
import cors from 'cors';

import { handleApiError, routeNotFound } from './modules/v1/common/controllers';
import routes from './modules';
import { config } from './config';
import { userRouter } from './routes/user.router';
import { studentRouter } from './routes/student.router';
import { facultyRouter } from './routes/faculty.router';
import { subjectRouter } from './routes/subject.router';
import { adminRouter } from './routes/admin.router';
import { testRouter } from './routes/test.router';
import { testStudentEvaluationRouter } from './routes/studentTestEvaluation.router';

export function registerMiddlewares(app: Application) {
  app
    .use(express.json())
    .use(hpp({}))
    .use(helmet())
    .use(morgan('dev'))
    .use(
      cors({
        origin:
          config.ALLOWED_ORIGINS === '*'
            ? config.ALLOWED_ORIGINS
            : config.ALLOWED_ORIGINS.split(','),
        credentials: true,
      })
    )
    .use(multer().single('file'))
    .disable('x-powered-by');
}

export function registerRoutes(app: Application) {
  app.use('/api/v1/user', userRouter);
  app.use('/api/v1/student', studentRouter);
  app.use('/api/v1/faculty', facultyRouter);
  app.use('/api/v1/subject', subjectRouter);
  app.use('/api/v1/admin', adminRouter);
  app.use('/api/v1/test', testRouter);
  app.use('/api/v1/testStudentEvaluation' , testStudentEvaluationRouter)
}
