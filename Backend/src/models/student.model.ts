import mongoose from 'mongoose';
import { studentSchemaType } from '../@types/SchemaTypes';

const studentSchema: mongoose.Schema<studentSchemaType> = new mongoose.Schema({
  studentName: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  enroll: {
    type: String,
    required: true,
  },
  MCQtest: {
    type: [mongoose.Schema.Types.ObjectId], // Test given by student
    ref: 'test',
  },
  codingTest: {
    type: [mongoose.Schema.Types.ObjectId], // Test given by student
    ref: 'test',
  },
  year: {
    type: String,
    enum: ['First', 'Second', 'Third', 'Fourth'],
  },
  section: {
    type: String,
  },
  branch: {
    type: String,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
  },
  DOB: {
    type: Date,
  },
});

const studentModel = mongoose.model<studentSchemaType>(
  'students',
  studentSchema
);
export { studentModel };
