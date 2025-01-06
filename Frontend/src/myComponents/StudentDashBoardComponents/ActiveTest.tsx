import { useContext, useEffect } from "react"
import TestDetailsCard from "../TestDetailsCard"
import { UserContext } from "@/context/userContext"
import { fetchAllMCQActiveTestService } from "@/Services/studentService";
import { Test, TestContext, TestContextType } from "@/context/testContext";

function ActiveTest() {

  const {userInfo} = useContext(UserContext);
  const {activeTest , setActiveTest} = useContext<TestContextType>(TestContext)
  const fetchAllMCQActiveTest = async() =>{
    
     try {
      const data = await fetchAllMCQActiveTestService(userInfo?.branch , userInfo?.year) 
      
     setActiveTest(data?.allTests)

     }
     catch(error) {
        throw new Error (error instanceof Error ? error.message : "Error Occured While fetching Active MCQ Test")
     }
    

  }
  useEffect(() =>{

     fetchAllMCQActiveTest()
  } , [userInfo])

   console.log(activeTest)
  return (
    <div className="h-screen w-full p-8">
        <div>
          {
             activeTest.length > 0 ? <div  className="w-[100%] flex flex-wrap items-start justify-start h-[70%] gap-8">
                  {
                        activeTest.map((testDetails : Test) =>{
                             return <TestDetailsCard key={testDetails._id} testCategory="Active" testDetails={testDetails} />
                        })
                  }
             </div> : <div className="w-[100%] flex flex-wrap items-center justify-center  h-[60vh] gap-8 text-2xl">No Test is currently Active</div>
          }
    
        </div>
    </div>
  )
}

export default ActiveTest
