import mongoose from 'mongoose';

export interface userSchemaType extends mongoose.Document {
  userEmail: string;
  role: 'Student' | 'Faculty' | 'Admin' | 'NA';
  otp?: number | null;
  isVerified: boolean;
}

export interface testSchemaType extends mongoose.Document {
  testName: string;
  testDescription?: string;
  testType: 'MCQ' | 'Coding';
  noOfQuestions: number;
  totalTime: number; // In minutes
  totalQuestionsMCQ: mongoose.Types.ObjectId[];
  totalQuestionsCode: mongoose.Types.ObjectId[];
  facultyId: mongoose.Types.ObjectId;
  studentList: mongoose.Types.ObjectId[];
  subjectId: mongoose.Types.ObjectId;
  isActive: boolean;
  branch: string;
  year: 'First' | 'Second' | 'Third' | 'Fourth';
  dateOfTest : Date
}
export interface subjectSchemaType extends mongoose.Document {
  subjectName: string;
  subjectCode: string;
  questionBankMCQ: mongoose.Types.ObjectId[];
  questionBankCode: mongoose.Types.ObjectId[];
  facultyId: mongoose.Types.ObjectId[];
}

export interface studentSchemaType extends mongoose.Document {
  studentName: string;
  userId: mongoose.Types.ObjectId;
  enroll: string;
  MCQtest: mongoose.Types.ObjectId[];
  codingTest: mongoose.Types.ObjectId[];
  year: string;
  section: string;
  branch: string;
  gender: string;
  DOB: Date;
}

export interface MCQQuestionSchemaType extends mongoose.Document {
  quesDescription: string;
  options: string[];
  correctAns: string;
  reason?: string;
  faculty?: mongoose.Types.ObjectId;
  questionType: string;
  subjectId?: mongoose.Types.ObjectId;
}

export interface facultySchemaType extends mongoose.Document {
  facultyName: string;
  userId: mongoose.Types.ObjectId;
  branch: string;
  subject: mongoose.Types.ObjectId[];
  joinInYear: Date;
  gender: 'Male' | 'Female' | 'Other';
  MCQTest: mongoose.Types.ObjectId[];
  codingTest: mongoose.Types.ObjectId[];
  facultyEnroll: string;
  DOB: Date;
}

export interface codingQuestionSchemaType extends mongoose.Document {
  questionDescription: string;
  languages: string[];
  inputTestCase: string;
  outputConstrains: string;
  questionType: string;
}

export interface adminSchemaType extends mongoose.Document {
  adminName: string;
  userId: mongoose.Types.ObjectId;
}


export interface testStudentEvaluationType extends mongoose.Document {
    
     studentId : mongoose.Types.ObjectId;
     testId : mongoose.Types.ObjectId;
     evaluationResult : {
       correctAnswer : number,
       wrongAnswer : number,
       unAttempted : number,
       totalMarks : string,
       accuracy : number
     }

}