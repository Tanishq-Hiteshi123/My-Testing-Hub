import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";

export interface Question {
    _id: string;
    correctAns: string; 
    faculty: string; 
    options: string[]; 
    quesDescription: string
    questionType: "MCQ" | "Coding";
    reason: string; 
    subjectId: string; 
    __v: number; 
  }
export interface Test {
    _id: string; 
    testName: string;
    testDescription?: string;
    testType: "MCQ" | "Coding";
    noOfQuestions: number;
    totalTime: number;
    facultyId: string; 
    studentList: string[]; 
    subjectId: string; 
    isActive: boolean; 
    branch: string;
    year: "First" | "Second" | "Third" | "Fourth";
    dateOfTest: string;
    totalQuestionsMCQ? : Question[];
    totalQuestionsCode? : []
  }
export interface TestContextType {
   
        activeTest: Test[];
        setActiveTest: Dispatch<SetStateAction<Test[]>>;
        upcomingTest: Test[];
        setUpcomingTest: Dispatch<SetStateAction<Test[]>>;
        completedTest: Test[];
        setCompletedTest: Dispatch<SetStateAction<Test[]>>;
        currentTest : Test;
        setCurrentTest : Dispatch<SetStateAction<Test>>;
        currentQuestionIndex : number;
        setCurrentQuestionIndex : Dispatch<SetStateAction<number>>;
      }

export const TestContext = createContext<TestContextType | null>(null);

export const TestContextProvider = ({children} : {children : ReactNode}) =>{

    const [activeTest , setActiveTest] = useState<Test[]>([])
    const [upcomingTest , setUpcomingTest] = useState<Test[]>([])
    const [completedTest, setCompletedTest] = useState<Test[]>([])
    const [currentTest , setCurrentTest] = useState<Test>({})
    const [currentQuestionIndex , setCurrentQuestionIndex] = useState(0)
    
      return <TestContext.Provider value={{activeTest , setActiveTest , upcomingTest , setUpcomingTest , completedTest , setCompletedTest , currentTest , setCurrentTest , currentQuestionIndex , setCurrentQuestionIndex }}>{children}</TestContext.Provider>

}