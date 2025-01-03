import { AuthContext, AuthContextType } from "@/context/authContext"
import { SendOTPForVerify } from "@/myComponents/sendOTPForVerify"
import { VerifyEmail } from "@/myComponents/verifyEmail"
import { useContext } from "react"

function AuthPage() {


  
  const {showNext} = useContext<AuthContextType>(AuthContext)

  return (
    <div className="flex items-center justify-center w-full h-screen">
      {
         !showNext ? <SendOTPForVerify  /> : <VerifyEmail/> 
      }
    </div>
  )
}

export default AuthPage
