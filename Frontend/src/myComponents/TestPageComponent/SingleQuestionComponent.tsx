import { Question, TestContext, TestContextType } from "@/context/testContext";
import { UserContext, UserContextType } from "@/context/userContext";
import { evaluateStudentMCQTestService } from "@/Services/testService";
import { useContext, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

function SingleQuestionComponent({
  singleQuestionDetails,
}: {
  singleQuestionDetails: Question;
}) {
  const [selectedOption, setSelectedOption] = useState(-1);
  const {userInfo} = useContext<UserContextType>(UserContext)
  const { currentQuestionIndex, setCurrentQuestionIndex, currentTest } =
    useContext<TestContextType>(TestContext);
  const navigate = useNavigate();
  

  const [selectedAnswers , setSelectedAnswers] = useState({})  
  const [isLoading , setIsLoading] = useState(false)
  const handleNextQuestion = () => {
    if (
      currentQuestionIndex + 1 <
      (currentTest?.totalQuestionsMCQ?.length ?? 0)
    ) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(-1);
    } else {
      setSelectedOption(-1);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      
    }


  };


  const handleSelectOption = (index : number , option : string) =>{
    setSelectedOption(index)
    setSelectedAnswers({...selectedAnswers , [singleQuestionDetails?._id] : option});

  }
  


//   API for Evaluating the MCQ Test :-
  const handleEvaluteTest = async() => {
    setSelectedOption(-1);
     
    try {
        setIsLoading(true);

      
       const data = await evaluateStudentMCQTestService(currentTest?._id , userInfo?.userId , selectedAnswers);
     
       if (data?.success) {
         
           navigate("/studentDashboard/progress")
       }
       
    }
    catch (error) {
         throw new Error (error instanceof Error ? error.message : "Error While Evaluting the MCQ Test")
    }
    finally{
         setIsLoading(false)
    }
    

   
  };

  return (
    <div className="h-[85%] w-[75%] bg-white flex items-center justify-center p-6">
      <div className="questionContainer h-[100%] w-[80%] ">
        <div className="flex items-center gap-4">
          <IoMdArrowRoundBack
            className="cursor-pointer"
            size={"1.1rem"}
            color="#a855f7"
            onClick={handleBack}
          />
          <h1 className="">
            {" "}
            <span className="text-purple-500 text-3xl  font-bold">
              {" "}
              {currentQuestionIndex < 9
                ? `0${currentQuestionIndex + 1}`
                : currentQuestionIndex + 1}{" "}
            </span>{" "}
            <span className="text-gray-400 text-md ">/ {currentTest?.noOfQuestions < 9 ? "0" + currentTest?.noOfQuestions : currentTest?.noOfQuestions} </span>{" "}
          </h1>
        </div>

        <div className="mt-5 ">
          <h2 className="text-lg font-bold">
            {" "}
            {singleQuestionDetails?.quesDescription}{" "}
          </h2>
        </div>

        <ul className="mt-12 ">
          {singleQuestionDetails?.options.map((option, index) => {
            return (
              <li
                key={index}
                onClick={() => handleSelectOption(index , option)}
                className={` ${
                  selectedOption == index
                    ? "bg-pink-200 border border-purple-800"
                    : ""
                }  text-gray-800 no-underline list-none text-base bg-white border border-gray-300 rounded-lg p-3 mt-4 cursor-pointer`}
              >
                {option}
              </li>
            );
          })}
        </ul>

        <div className="w-[100%] flex items-center justify-center mt-8">
          {currentQuestionIndex + 1 < currentTest?.totalQuestionsMCQ?.length ??
          0 ? (
            <button
              onClick={handleNextQuestion}
              className={` ${
                selectedOption != -1
                  ? "bg-gradient-to-r from-purple-800 to-pink-100"
                  : "bg-[#e7e8e9] text-[#9fa3a9] cursor-not-allowed"
              } rounded-md text-white text-lg py-2.5 px-10 outline-none border-none cursor-pointer mt-4`}
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleEvaluteTest}
              className={` ${
                selectedOption != -1
                  ? "bg-gradient-to-r from-purple-800 to-pink-100"
                  : "bg-[#e7e8e9] text-[#9fa3a9] cursor-not-allowed"
              } rounded-md text-white text-lg py-2.5 px-10 outline-none border-none cursor-pointer mt-4`}
            >
              {
                 isLoading ? <h1>Evaluating...</h1> : <h1>Finish</h1>
              }
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default SingleQuestionComponent;
