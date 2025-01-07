import { UserContext } from "@/context/userContext";
import AddCodingQuestion from "@/myComponents/FacultyDashboardComponents/AddCodingQuestion";
import AddMCQQuestion from "@/myComponents/FacultyDashboardComponents/AddMCQQuestion";
import CreateCodingTest from "@/myComponents/FacultyDashboardComponents/CreateCodingTest";
import CreateMCQTest from "@/myComponents/FacultyDashboardComponents/CreateMCQTest";
import { FacultyCompleteProfileModal } from "@/myComponents/FacultyDashboardComponents/FacultyCompleteProfile";
import FacultyDashboardSideBar from "@/myComponents/FacultyDashboardComponents/FacultyDashBoardSideBar";
import FacultyProfile from "@/myComponents/FacultyDashboardComponents/FacultyProfile";
import WelcomeBanner from "@/myComponents/WelcomeBanner";
import { getMyRoleBasedProfileService } from "@/Services/userServices";
import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";

function FacultyDashboard() {
  const { setUserInfo, showCompleteProfile, setShowCompleteProfile } =
    useContext(UserContext);

  const locationPath = useLocation().pathname;
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
        <FacultyCompleteProfileModal />
      ) : (
        <div className="h-[100%] w-[100%]">
          <div className="flex ">
            <FacultyDashboardSideBar />

            <div className=" h-screen w-[100%]">
              {locationPath == "/facultyDashboard" && <WelcomeBanner />}
              {locationPath == "/facutlyDashboard/profile" && (
                <FacultyProfile />
              )}
              {locationPath == "/facultyDashboard/addCodingQuestion" && (
                <AddCodingQuestion />
              )}
              {locationPath == "/facultyDashboard/createCodingTest" && (
                <CreateCodingTest />
              )}
              {locationPath == "/facultyDashboard/addMCQQuestion" && (
                <AddMCQQuestion />
              )}
              {locationPath == "/facultyDashboard/createMCQTest" && (
                <CreateMCQTest />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FacultyDashboard;
