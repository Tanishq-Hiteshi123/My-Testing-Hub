import { UserContext, UserContextType } from "@/context/userContext";
import { CompleteYourProfileStudent } from "@/myComponents/CompleteYourProfileStudent";
import DashboardSideBar from "@/myComponents/DashboardSideBar";
import ActiveTest from "@/myComponents/StudentDashBoardComponents/ActiveTest";
import CompletedTest from "@/myComponents/StudentDashBoardComponents/CompletedTest";
import Profile from "@/myComponents/StudentDashBoardComponents/Profile";
import Progress from "@/myComponents/StudentDashBoardComponents/Progress";
import UpComingTest from "@/myComponents/StudentDashBoardComponents/UpComingTest";
import WelcomeBanner from "@/myComponents/WelcomeBanner";
import { getMyRoleBasedProfileService } from "@/Services/userServices";
import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";

function StudentDashboard() {
  const { showCompleteProfile, setShowCompleteProfile } = useContext<UserContextType>(UserContext);
  const { setUserInfo  } = useContext<UserContextType>(UserContext);

  const location : string = useLocation().pathname;



  const getRoleBasedProfile = async (userData: unknown) => {
    try {
    
      const userId = userData && userData?._id;
      const userRole = userData && userData?.role;
      const data = await getMyRoleBasedProfileService(userId, userRole);
      if (data && data?.userDetails && data?.userDetails?.gender != undefined) {
        setUserInfo(data?.userDetails);
        localStorage.setItem("userInfo", JSON.stringify(data?.userDetails));
        setShowCompleteProfile(false);
      } else {
        setShowCompleteProfile(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userInfo")!);
    if (userData?.gender == undefined) {
      getRoleBasedProfile(userData);
    }
  });


  
  return (
    <div className="h-screen w-full ">
      {showCompleteProfile ? (
        <CompleteYourProfileStudent />
      ) : (
        <div className="h-[100%] w-[100%]">

          <div className="flex ">
             <DashboardSideBar/>

             
              <div className=" h-screen w-[100%]">
              
              {location === "/studentDashboard" && <WelcomeBanner />}
              {location === "/studentDashboard/profile" && <Profile />}
              {location === "/studentDashboard/MCQActiveTest" && <ActiveTest />}
              {location === "/studentDashboard/MCQCompletedTest" && <CompletedTest />}
              {location === "/studentDashboard/MCQUpcomingTest" && <UpComingTest />}
              {location === "/studentDashboard/progress" && <Progress />}
             
              </div>
             
          </div>

        </div>
      )}
    </div>
  );
}

export default StudentDashboard;
