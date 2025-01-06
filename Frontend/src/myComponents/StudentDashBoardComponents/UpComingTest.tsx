import { Test, TestContext, TestContextType } from "@/context/testContext";
import { UserContext } from "@/context/userContext";
import { fetchAllTheUpcomingTestService } from "@/Services/studentService";
import { useContext, useEffect } from "react";
import TestDetailsCard from "../TestDetailsCard";

function UpComingTest() {

   const {userInfo} = useContext(UserContext);
    const {upcomingTest, setUpcomingTest} = useContext<TestContextType>(TestContext)
    const fetchAllMCQActiveTest = async() =>{
      
       try {
        const data = await fetchAllTheUpcomingTestService(userInfo?.branch , userInfo?.year) 
        
        console.log(data)
       setUpcomingTest(data?.allUpcomingTestList)
  
       }
       catch(error) {
          throw new Error (error instanceof Error ? error.message : "Error Occured While fetching Active MCQ Test")
       }
      
  
    }
    useEffect(() =>{
  
       fetchAllMCQActiveTest()
    } , [userInfo])
  return (
    <div className="h-screen w-full p-8">
        <div>
          {
             upcomingTest.length > 0 ? <div  className="w-[100%] flex flex-wrap items-start justify-start h-[70%] gap-8">
                  {
                        upcomingTest.map((testDetails : Test) =>{
                             return <TestDetailsCard key={testDetails._id} testCategory="Upcoming" testDetails={testDetails} />
                        })
                  }
             </div> : <div className="w-[100%] flex flex-wrap items-center justify-center  h-[60vh] gap-8 text-2xl">No Test is currently Active</div>
          }
    
        </div>
    </div>
  )
}

export default UpComingTest
