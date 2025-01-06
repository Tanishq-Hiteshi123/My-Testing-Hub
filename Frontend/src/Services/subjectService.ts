import { axiosInstance } from "@/utils/axiosInstance"

export const getAllSubjectsService = async() =>{
    
    const {data} = await axiosInstance.get("/subject/getAllSubjects" , {
        headers : {
             "Authorization" : `Bearer ${localStorage.getItem("testHubToken")}`
        }
    })

    return data;

}

