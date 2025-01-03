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