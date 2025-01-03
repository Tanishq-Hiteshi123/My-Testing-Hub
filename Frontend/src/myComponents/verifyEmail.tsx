
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input";
import { AuthContext } from "@/context/authContext";
import { UserContext } from "@/context/userContext";
import { verifyOTPOnEmailService } from "@/Services/authServices";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { GrLinkNext } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
export function VerifyEmail() {

  const [userDetails , setUserDetails] = useState({otp : "" , fullName : "" , email : "" , enroll : "" , role : ""})
  const [isFirstTime, setIsFirstTime] = useState(true);
  const {setUserInfo} = useContext(UserContext);
  const {isLoading , setIsLoading} = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e : ChangeEvent<HTMLInputElement>) =>{
    
      setUserDetails({...userDetails , [e.target.name] : e.target.value})

  }

  

  const handleVerifyOTP = async () =>{
      
    try {
    
      setIsLoading(true)
      const data = await verifyOTPOnEmailService(userDetails);

      if (data?.token) {
          localStorage.setItem("testHubToken" , data?.token);
          localStorage.setItem("userInfo" , JSON.stringify(data?.updatedUser));
          setUserInfo(data?.updatedUser);
          toast.success("Email Verified SuccessFully")
          if (data?.updatedUser && data?.updatedUser?.role == "Student") {
            navigate("/studentDashboard")
          }
          else if (data?.updatedUser && data?.updatedUser?.role == "Faculty") {
              navigate("/facultyDashboard")
          }
          else {
            navigate("/adminDashboard")
          }
          
      }
    }
    catch (error) {
       console.log(error)
    }

    finally{
      setIsLoading(false)
    }


  }

  useEffect(() =>{
     if (JSON.parse(localStorage.getItem("sendEmailResponse")!)?.isFirstTime == false) {
         setIsFirstTime(false);
     }

     setUserDetails({...userDetails , email : localStorage.getItem("userEmail")!})
  } , [])

  return (
    <Card className="w-[40%] h-[30%]   ">
      <CardHeader className="flex flex-col gap-2">
        <CardTitle className="text-blue-600">Test Hub</CardTitle>
        <CardDescription className="text-xs">Verify Your Email Through OTP</CardDescription>
      </CardHeader>
      <CardContent>
       
           <Input type="number" placeholder="Enter OTP" maxLength={4} onChange={handleChange} name="otp" value={userDetails?.otp}/>
           {
             isFirstTime && <div className="flex flex-col gap-3 mt-3">
              <Input type="text" onChange={handleChange}  name="fullName" value={userDetails?.fullName} placeholder="Enter Your FullName" />
              <Input type="text" onChange={handleChange} name="enroll" value={userDetails?.enroll} placeholder="Enter Your Enroll (If have)"/>
              <Input type="text" onChange={handleChange} name="role" value={userDetails?.role} placeholder="Enter your Role" />

             </div> 
           }
      
      </CardContent>
      <CardFooter className="flex w-[100%] justify-end">
        
         {
           isLoading ? "Loading..." :  <Button variant={"ghost"} onClick={handleVerifyOTP} ><GrLinkNext /></Button>
         }
        
      </CardFooter>
    </Card>
  )
}
