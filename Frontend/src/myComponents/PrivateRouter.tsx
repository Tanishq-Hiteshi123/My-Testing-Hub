import { Outlet , Navigate, useLocation } from "react-router-dom";
import { toast } from "sonner";



function PrivateRouter() {

    const token = localStorage.getItem("testHubToken") || ""
    const userInfo = JSON.parse(localStorage.getItem("userInfo")!) || {}
    const location = useLocation();
    if (!token && location.pathname != "/") {
         console.log("This is the login page redirection")
          return <Navigate to={"/"} />
    }

   
    if (token && userInfo?.role == "Student" && (location.pathname == "/adminDashboard" || location.pathname == "/facultyDashboard")) {
          toast.success("Page not found")
          return <Navigate to={"/studentDashboard"} />
    }

    else if (token && userInfo?.role == "Faculty" && (location.pathname == "/studentDashboard" || location.pathname == "/adminDashboard")) {
          toast.success("Page Not found");
          return <Navigate to={"/facultyDashboard"} />
    }
    else if  (token && userInfo?.role == "Admin" && (location.pathname == "/studentDashboard" || location.pathname == "/facultyDashboard")) {
        toast.success("Page Not found");
        return <Navigate to={"/adminDashboard"} />
    }

    

  return (
      <Outlet />
  )
}

export default PrivateRouter
