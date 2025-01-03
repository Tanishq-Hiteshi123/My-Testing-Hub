import { UserContext, UserContextType } from "@/context/userContext"
import { useContext } from "react"
import { NavLink } from "react-router-dom"

function DashboardSideBar() {

    const {userInfo} = useContext<UserContextType>(UserContext)
  return (
    <div className="w-[14%] h-screen">
      	<div className="w-64 h-[100%] bg-gray-50 border-r border-gray-200">

<div className="py-4 px-6">
    
       <h1 className="text-2xl text-blue-600 font-bold text-center">Test Hub</h1>
    
</div>

<div className="mb-10">
    <h3 className="mx-6 mb-2 text-xs text-gray-400 uppercase tracking-widest">
        Dashboard
    </h3>

    <NavLink to="/studentDashboard/progress" className="flex items-center px-6 py-2.5 text-gray-500 hover:text-blue-600 group">
        <svg className="h-5 w-5 text-gray-400 mr-2 group-hover:text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
        Progress
    </NavLink>

  

</div>

<div className="mb-10">
    <h3 className="mx-6 mb-2 text-xs text-gray-400 uppercase tracking-widest">
        Coding Test
    </h3>

    <a href="/" className="flex items-center px-6 py-2.5 text-gray-500 hover:text-blue-600 group">
        <svg className="h-5 w-5 text-gray-400 mr-2 group-hover:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
        </svg>
        Upcoming Test
    </a>

    <a href="/" className="flex items-center px-6 py-2.5 text-gray-500 hover:text-blue-600 group">
        <svg className="h-5 w-5 text-gray-400 mr-2 group-hover:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
       Active Test
    </a>

    <a href="/" className="flex items-center px-6 py-2.5 text-gray-500 hover:text-blue-600 group">
        <svg className="h-5 w-5 text-gray-400 mr-2 group-hover:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
        </svg>
        Completed Test
    </a>


</div>
<div className="mb-10">
    <h3 className="mx-6 mb-2 text-xs text-gray-400 uppercase tracking-widest">
        MCQ Test
    </h3>

    <NavLink to="/studentDashboard/MCQUpcomingTest" className="flex items-center px-6 py-2.5 text-gray-500 hover:text-blue-600 group">
        <svg className="h-5 w-5 text-gray-400 mr-2 group-hover:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
        </svg>
        Upcoming Test
    </NavLink>

    <NavLink to="/studentDashboard/MCQActiveTest" className="flex items-center px-6 py-2.5 text-gray-500 hover:text-blue-600 group">
        <svg className="h-5 w-5 text-gray-400 mr-2 group-hover:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
       Active Test
    </NavLink>

    <NavLink to="/studentDashboard/MCQCompletedTest" className="flex items-center px-6 py-2.5 text-gray-500 hover:text-blue-600 group">
        <svg className="h-5 w-5 text-gray-400 mr-2 group-hover:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
        </svg>
        Completed Test
    </NavLink>


</div>
<div className="mb-10">
    <h3 className="mx-6 mb-2 text-xs text-gray-400 uppercase tracking-widest">
        Profile
    </h3>

    <NavLink  to={"/studentDashboard/profile"} className="flex items-center px-6 py-2.5 text-gray-500 hover:text-blue-600 group">
        <img src="https://picsum.photos/200" alt="" className="w-7 h-7 rounded-full mr-2" />
       {userInfo?.studentName}
    </NavLink>

</div>

</div>

    </div>
  )
}

export default DashboardSideBar
