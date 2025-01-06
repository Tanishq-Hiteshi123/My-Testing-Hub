import { axiosInstance } from "@/utils/axiosInstance"

export const updateStudentDetailsService = async (updatedUserDetails : unknown) =>{

    const {data}  = await axiosInstance.put("/student/updateStudentDetails" , updatedUserDetails , {
        headers : {
            "Authorization" : `Bearer ${localStorage.getItem("testHubToken")}`
        }
    })

    return data;
     

}

export const fetchAllTestService = async(branch : string , year : string) =>{
    
      const {data} = await axiosInstance.get(`/test/getTestByYearAndBranch?branch=${branch}&year=${year}` , {headers : {
         "Authorization" : `Bearer ${localStorage.getItem("testHubToken")}`
      }})

      return data;

}

export const fetchAllMCQActiveTestService = async (branch : string, year : string) =>{

    const {data} = await axiosInstance.get(`test/getAllTheActiveTest?branch=${branch}&year=${year}` , {headers : {
        "Authorization" : `Bearer ${localStorage.getItem("testHubToken")}`
    }})

    return data;

     
}

export const fetchAllMCQCompletedTestService = async(branch : string , year : string) =>{
    
     const {data} = await axiosInstance.get(`test/getAllTheCompletedTest?branch=${branch}&year=${year}` , {headers : {
         "Authorization" : `Bearer ${localStorage.getItem("testHubToken")}`
     }})

     return data;


}

export const fetchTheEvaluationResultOfCompletedTestService = async(testId : string) =>{
    
      const {data} = await axiosInstance.post(`testStudentEvaluation/getMyTestEvaluation` , {testId} , {headers : { "Authorization" : `Bearer ${localStorage.getItem("testHubToken")}` }})

      return data;

}

// Fetching all the upcomming test of MCQ type of student :-
export const fetchAllTheUpcomingTestService = async(branch : string , year : string) =>{
    
      const {data} = await axiosInstance.get(`test/getAllUpComingTestList?branch=${branch}&year=${year}` , {headers : {
         "Authorization" : `Bearer ${localStorage.getItem("testHubToken")}`
      }})

      return data;

}