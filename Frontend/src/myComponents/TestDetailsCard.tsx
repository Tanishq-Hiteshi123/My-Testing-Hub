import { Button } from "@/components/ui/button";
import { Test } from "@/context/testContext";
import useCountDownHook from "@/hooks/useCountDownHook";
import { fetchTheEvaluationResultOfCompletedTestService } from "@/Services/studentService";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface EvaluationResultType {
  accuracy: number;
  correctAnswer: number;
  totalMarks: string;
  unAttempted: number;
  wrongAnswer: number;
}
function TestDetailsCard({
  testDetails,
  testCategory,
}: {
  testDetails: Test;
  testCategory: "Active" | "Completed" | "Upcoming";
}) {


  const [evaluationResult, setEvaluationResult] = useState<EvaluationResultType>({});
  const [showEvaluation, setShowEvaluation] = useState<boolean>(false);
  const { days, hours, minutes, seconds } = useCountDownHook(testDetails.dateOfTest);
  const navigate = useNavigate();


  const handleGetTestEvaluationById = async (testId: string) => {
    try {
      const data = await fetchTheEvaluationResultOfCompletedTestService(testId);
      

      if (data?.success) {
          setEvaluationResult(data?.evaluationDetails?.evaluationResult)
          setShowEvaluation(true)
      }


    } catch (error) {
      throw new Error(
        error instanceof Error
          ? error.message
          : "Error Occured while getting the score of evaluated Test"
      );
    }
  };


  const handleStartMCQTest = async() => {
    
    navigate(`/mcqTestPage/${testDetails?._id}`)

  }

  return (
    <div>
      <div className="card-container flex flex-wrap gap-2 justify-around">
        <div className="card p-1 mt-6 h-72 w-64 bg-white rounded-xl select-none">
          <div className="cardheader w-full h-[75%] bg-cyan-100 rounded-t-xl">
            <div className="card-headings flex justify-between px-4 items-center w-full h-[25%] rounded-t-xl">
              <h4 className="text-xs font-semibold select-none">
                {testDetails?.dateOfTest?.split("T")[0]}
              </h4>
              <i className="ri-bookmark-line text-xl "></i>
            </div>
            <div className="cardtitles flex  justify-between p-4 w-full h-[60%]">
              <h1 className="text-[1.63em] font-normal leading-8 w-40 ">
                {testDetails?.testName}
              </h1>
            </div>
            <div className="flex items-center justify-between">
            {
                 testCategory == "Completed" ? <p className="p-3 pb-2 text-xs text-yellow-600">Completed</p> : testCategory == "Active" ? <p className="p-3 pb-2 text-xs text-green-600">  Active</p> : <p className="p-3 pb-2 text-xs text-red-600">Upcoming</p>
             }

             {
                 testCategory == "Active" && <p className="p-3 pb-2 text-xs text-red-600">{testDetails?.totalTime}min</p>
             }
            </div>
          </div>
          <div className="cardfooter p-2 w-full h-[25%] flex items-center justify-between">
            <div className="subtitle flex items-center py-2">
              <i className="ri-arrow-down-circle-fill text-4xl"></i>
              <h4 className="text-[0.73em] font-semibold w-7/12 ml-2 ">
                {testDetails?.facultyId?.facultyName}
              </h4>
            </div>
            {testCategory == "Active" ? (
              <Button className="viewbutton bg-black w-12 h-8 flex items-center justify-center rounded-full">
                <p className="text-white text-[0.7em]" onClick={handleStartMCQTest}>Start</p>
              </Button>
            ) : testCategory == "Completed" ? (
              <Button
                onClick={() => handleGetTestEvaluationById(testDetails?._id)}
                className="viewbutton bg-black w-12 h-8 flex items-center justify-center rounded-full"
              >
                {
                    showEvaluation ? <p className="text-white text-[0.7em]">{evaluationResult?.totalMarks}</p>: <p className="text-white text-[0.7em]" >Result</p>
                }
              </Button>
            ) : (
              <div className="text-red-500">
                { days <= 9 ? "0" + days : days} : { hours <= 9 ? "0" + hours : hours} : { minutes <= 9 ? "0" + minutes : minutes} : { seconds <= 9 ? "0" + seconds : seconds} Left
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TestDetailsCard;
