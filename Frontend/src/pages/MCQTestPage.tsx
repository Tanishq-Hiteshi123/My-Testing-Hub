import { TestContext, TestContextType } from "@/context/testContext";
import SingleQuestionComponent from "@/myComponents/TestPageComponent/singleQuestionComponent";
import { getTestDetailsByIdService } from "@/Services/testService";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom"

function MCQTestPage() {

    const {testId} = useParams();

    const {currentTest , setCurrentTest , currentQuestionIndex } = useContext<TestContextType>(TestContext)
      

     
    const fetchTestDetailsById = async(testId : string) =>{
        
        try {
            const data = await getTestDetailsByIdService(testId);

            setCurrentTest(data?.testDetails)
            console.log(data?.testDetails)
        }
        catch(error) {
             throw new Error (error instanceof Error ? error.message : "Error while fetching the test details By Id")
        }


    }
    useEffect(() =>{
        
        // Fetching  test Details by Id :-
        fetchTestDetailsById(testId!)
      
    } , [])

  return (
    <div className="h-screen w-full bg-gray-200 flex items-center justify-center">
           {
             (currentTest && currentTest?.totalQuestionsMCQ?.length)  ? <div>

                  {
                    <SingleQuestionComponent singleQuestionDetails={currentTest?.totalQuestionsMCQ[currentQuestionIndex]}/>
                  }

             </div> : <div>No Test</div> 
           }
    </div>
  )
}

export default MCQTestPage
