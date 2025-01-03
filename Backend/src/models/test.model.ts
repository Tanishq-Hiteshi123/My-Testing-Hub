import mongoose from 'mongoose';
import { testSchemaType } from '../@types/SchemaTypes';

const testSchema: mongoose.Schema<testSchemaType> = new mongoose.Schema(
  {
    testName: {
      type: String,
      required: true,
    },
    testDescription: {
      type: String,
    },
    testType: {
      type: String,
      enum: ['MCQ', 'Coding'],
      required: true,
    },
    noOfQuestions: {
      type: Number,
      required: true,
    },
    totalTime: {
      type: Number, // In Minutes
      required: true,
    },
    totalQuestionsMCQ: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MCQ',
      },
    ],
    totalQuestionsCode: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'code',
      },
    ],
    facultyId: {
      type: mongoose.Schema.Types.ObjectId, // Test Setter
      ref: 'Faculty',
    },
    subjectId: {
      type: mongoose.Schema.Types.ObjectId, // Whose test is this
      ref: 'subject',
    },
    branch: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      enum: ['First', 'Second', 'Third', 'Fourth'],
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    dateOfTest : {
       type : Date
    }
  },
  {
    timestamps: true,
  }
);

const testModel = mongoose.model<testSchemaType>('test', testSchema);
export { testModel };
