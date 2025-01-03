import { UserContext } from "@/context/userContext"
import { useContext } from "react"

function WelcomeBanner() {

    const {userInfo} = useContext(UserContext)
  return (
    <div className="h-[30%] w-[100%] flex flex-col items-start pl-12 justify-center " >
      <h1 className="text-2xl text-gray-600">Welcome,</h1>
        <h2 className="text-3xl text-blue-600 pl-16">{userInfo?.studentName}</h2>
    </div>
  )
}

export default WelcomeBanner
