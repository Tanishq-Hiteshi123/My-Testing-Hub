import mongoose from 'mongoose';
import { MCQQuestionSchemaType } from '../@types/SchemaTypes';

const questionSchema: mongoose.Schema<MCQQuestionSchemaType> =
  new mongoose.Schema({
    quesDescription: {
      type: String,
      required: true,
    },
    options: {
      type: [],
      required: true,
    },
    correctAns: {
      type: String,
      required: true,
    },
    reason: {
      type: String, // Not mandatory :-
    },
    faculty: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Faculty',
    },
    questionType: {
      type: String,
      default: 'MCQ',
    },
    subjectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'subject',
    },
  });

const mcqQuestionModel = mongoose.model<MCQQuestionSchemaType>(
  'MCQ',
  questionSchema
);
export { mcqQuestionModel };
