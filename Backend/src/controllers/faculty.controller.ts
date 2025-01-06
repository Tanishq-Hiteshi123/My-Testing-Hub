import { Request, Response } from 'express';
import response from '../helpers/response';
import { facultyModel } from '../models/faculty.model';
import { subjectModel } from '../models/subject.model';
import { mcqQuestionModel } from '../models/MCQ.model';
import mongoose from 'mongoose';

const updateFacultyProfile = async (req: Request, res: Response) => {
  try {
    const { userRole, userId } = req.user!;

    if (
      !userRole ||
      userRole != 'Faculty' ||
      userId.toString() != req.body.userId.toString()
    ) {
      return response.error({
        res,
        code: 401,
        message: 'UnAuthorised Access Denied',
        data: null,
        error: true,
      });
    }

    const updatedFacultyDetails = await facultyModel.findOneAndUpdate(
      {
        userId: userId,
      },
      {
        ...req.body,
      },
      { new: true }
    );

    if (!updatedFacultyDetails) {
      return response.error({
        res,
        code: 500,
        data: null,
        error: true,
        message: 'Faculty Profile could not get Updated...',
      });
    }

    return response.success({
      res,
      code: 200,
      data: {
        message: 'Faculty Profile Updated SuccessFully',
        updatedFacultyDetails,
        success : true
      },
      error: false,
      message: 'Faculty Profile Updated',
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

//  Faculty can create question for the subject in the question bank :-
const addMCQQuestion = async (req: Request, res: Response) => {
  try {
    const userRole = req.user?.userRole;
    const userId = req.user?.userId;

    const { quesDescription, options, correctAns, reason, subjectId } =
      req.body;

      console.log(quesDescription , options , correctAns , reason , subjectId)
    if (userRole != 'Faculty') {
      return response.error({
        res,
        error: true,
        code: 401,
        data: null,
        message: 'Only Faculty is allowed to add the questions',
      });
    }

    if (
      !quesDescription ||
      (!options && !Array.isArray(options) && options.length <= 1) ||
      !correctAns ||
      !subjectId
    ) {
      return response.error({
        res,
        error: true,
        code: 400,
        data: null,
        message: 'Please Provide all the necessary details',
      });
    }

    //  Find The Faculty using userId :-
    const facultyDetails = await facultyModel.findOne({
      userId: userId,
    });

    if (!facultyDetails) {
      return response.error({
        res,
        code: 404,
        data: null,
        message: 'Faculty with userId not found',
        error: true,
      });
    }
    // Get the subject details from the subjectId :-
    const subject = await subjectModel.findById(subjectId);

    if (!subject) {
      return response.error({
        res,
        error: true,
        code: 404,
        data: null,
        message: 'Subject with provided Id not found',
      });
    }

    // Check Faculty teaches that subject or not :-
    const isFacultyTeaches = subject.facultyId.find(
      (x) =>
        x.toString() ==
        (facultyDetails._id as mongoose.Types.ObjectId).toString()
    );
    if (!isFacultyTeaches) {
      return response.error({
        res,
        code: 500,
        data: null,
        error: true,
        message: 'Faculty does not teaches this subject',
      });
    }

    // Otherwise faculty can create the ques :-
    const newQuestion = await mcqQuestionModel.create({
      quesDescription,
      options,
      correctAns,
      reason: reason || '',
      faculty: facultyDetails._id,
      subjectId: subjectId,
    });

    if (!newQuestion) {
      return response.error({
        res,
        code: 500,
        data: null,
        error: true,
        message: 'New MCQ Question could not be created',
      });
    }
    const Id = newQuestion._id as mongoose.Types.ObjectId;

    // Add this question in the Subject Question Bank :-
    subject.questionBankMCQ.push(Id);

    await subject.save();

    return response.success({
      res,
      error: false,
      code: 201,
      message: `New MCQ Question created Successfully for subject ${subject.subjectName}(${subject.subjectCode})`,
      data: {
        newQuestion,
        success : true
      },
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



export { updateFacultyProfile, addMCQQuestion };
