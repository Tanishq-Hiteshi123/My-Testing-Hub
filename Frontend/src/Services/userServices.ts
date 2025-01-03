import { axiosInstance } from "@/utils/axiosInstance"

export const getMyRoleBasedProfileService = async (userId : string , role : string) =>{
    
    const {data} = await axiosInstance.post("/user/getMyRoleBasedProfile" , {userId , role} , {headers : {"Authorization" : `Bearer ${localStorage.getItem("testHubToken")}`}})
    console.log(data , "In API")
    return data;
     

}