import { Test, TestContext, TestContextType } from "@/context/testContext"
import { UserContext } from "@/context/userContext"
import { fetchAllMCQCompletedTestService } from "@/Services/studentService"
import { useContext, useEffect } from "react"
import TestDetailsCard from "../TestDetailsCard"

function CompletedTest() {

  const {completedTest , setCompletedTest} = useContext<TestContextType>(TestContext)
  const {userInfo} = useContext(UserContext)
  
  const fetchAllTheCompletedTest = async() =>{
     
      const data = await fetchAllMCQCompletedTestService(userInfo?.branch , userInfo?.year);

      console.log(data?.allMyCompletedTest)
      setCompletedTest(data?.allMyCompletedTest)
      

  }
  useEffect(() =>{
    
    fetchAllTheCompletedTest()

  } , [userInfo])
  
  return (
    <div>
      <div className="h-screen w-full p-8">
        <div>
          {
             completedTest.length > 0 ? <div  className="w-[100%] flex flex-wrap items-start justify-start h-[70%] gap-8">
                  {
                        completedTest.map((testDetails : Test) =>{
                             return <TestDetailsCard key={testDetails?._id} testDetails ={testDetails} testCategory = "Completed"/>
                        })
                  }
             </div> : <div className="w-[100%] flex flex-wrap items-center justify-center  h-[60vh] gap-8 text-2xl">No Test is currently Completed</div>
          }
    
        </div>
    </div>
    </div>
  )
}

export default CompletedTest
