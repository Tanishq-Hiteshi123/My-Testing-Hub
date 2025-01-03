import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { AuthContext, AuthContextType } from "@/context/authContext";
import { sendVerificationMailService } from "@/Services/authServices";
import { ChangeEvent, useContext, useState } from "react";
import { GrLinkNext } from "react-icons/gr";
import { toast } from "sonner";

export function SendOTPForVerify() {
  const {setShowNext, isLoading, setIsLoading } =
    useContext<AuthContextType>(AuthContext);
  const [email, setEmail] = useState<string>("");



  

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target?.value);
  };

  const handleSendOTPOnEmail = async () => {
    //  Hitting an API call for send verification Mail :-
     try {
         setIsLoading(true);
         const data = await sendVerificationMailService(email);
         if (data?.success) {
            setShowNext(true);
            toast.success("OTP sent on mail...")
            localStorage.setItem("userEmail" , email)
            localStorage.setItem("sendEmailResponse" , JSON.stringify(data))
         }
     }
     catch (error) {
          console.log(error);
          setShowNext(false);
     }
     finally{
       setIsLoading(false)
     }

  };

  return (
    <Card className="w-[40%] h-[30%]   ">
      <CardHeader className="flex flex-col gap-2">
        <CardTitle className="text-blue-600">Test Hub</CardTitle>
        <CardDescription className="text-xs">
          Dare To Test Your Knowledge
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col items-start space-y-3.5">
            <Input
              value={email}
              onChange={handleEmailChange}
              type="email"
              id="name"
              placeholder="Enter Your Email"
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex w-[100%] justify-end">
        {
           isLoading ? <>Loading...</> :  <Button onClick={handleSendOTPOnEmail} variant={"ghost"}>
           <GrLinkNext />
         </Button>
        }
      </CardFooter>
    </Card>
  );
}
