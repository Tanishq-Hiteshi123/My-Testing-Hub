import { Request, Response } from 'express';
import response from '../helpers/response';
import { subjectModel } from '../models/subject.model';
import { facultyModel } from '../models/faculty.model';

const assignSubjectToFaculty = async (req: Request, res: Response) => {
  try {
    const userRole = req.user?.userRole;
    if (!userRole || userRole != 'Admin') {
      return response.error({
        res,
        error: true,
        message: 'Admin can Only assign the subject to the faculty',
        code: 401,
        data: null,
      });
    }
    const { facultyId, subjectId } = req.body;

    if (!facultyId || !subjectId) {
      return response.error({
        res,
        error: true,
        message: 'FacultyId and SubjectId both are required',
        code: 400,
        data: null,
      });
    }

    //  Now associate the subject and faculty :-
    const subject = await subjectModel.findById(subjectId);
    if (!subject) {
      return response.error({
        res,
        error: true,
        message: 'Subject Not found',
        code: 404,
        data: null,
      });
    }
    const faculty = await facultyModel.findById(facultyId);
    if (!faculty) {
      return response.error({
        res,
        error: true,
        message: 'faculty Not found',
        code: 404,
        data: null,
      });
    }

    faculty.subject.push(subjectId);
    subject.facultyId.push(facultyId);

    await faculty.save();
    await subject.save();

    return response.success({
      res,
      code: 200,
      message: `Subject ${subject.subjectName} is assigned to ${faculty.facultyName} SuccessFully`,
      data: {
        isAssigned: true,
      },
      error: false,
    });
  } catch (error) {
    return response.error({
      res,
      error: true,
      message: error instanceof Error ? error.message : 'Internal Server Error',
      code: 500,
      data: null,
    });
  }
};

export { assignSubjectToFaculty };
