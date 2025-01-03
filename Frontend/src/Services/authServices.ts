import { axiosInstance } from "@/utils/axiosInstance"

export const sendVerificationMailService = async (userEmail : string) =>{
     
    const {data} = await axiosInstance.post("/user/sendEmailForVerification" , {email : userEmail});

    return data
     
}

export const verifyOTPOnEmailService = async (userDetails : {otp : string , fullName : string , email : string, enroll : string , role : string}) =>{
    
    const {data} = await axiosInstance.post("/user/verifyEmail" , userDetails)

    return data;

}