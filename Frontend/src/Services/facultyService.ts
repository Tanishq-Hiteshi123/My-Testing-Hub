import { axiosInstance } from "@/utils/axiosInstance";

export const updateFacultyDetailsService = async (updatedUserDetails : unknown) =>{

    const {data}  = await axiosInstance.put("/faculty/updateFacultyDetails" , updatedUserDetails , {
        headers : {
            "Authorization" : `Bearer ${localStorage.getItem("testHubToken")}`
        }
    })

    return data;
     

}


export const addNewMCQQuestionService = async (mcqDetails : unknown) =>{
    
    const {data} = await axiosInstance.post("/faculty/addMCQQuestion" , mcqDetails , {
         headers : {
            "Authorization" : `Bearer ${localStorage.getItem("testHubToken")}`
         }
    })
    return data;

}