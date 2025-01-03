
import { lazy, Suspense } from 'react'
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom'
import PrivateRouter from './myComponents/PrivateRouter'
function App() {

  const AuthPageComponent = lazy(() => import("./pages/AuthPage"))
  const StudentDashboardComponent = lazy(() => import("./pages/StudentDashboard"))
  const AdminDashboardComponent = lazy(() => import("./pages/AdminDashboard"))
  const FacultyDashboardComponent = lazy(() => import("./pages/FacultyDashboard"))
  return (
   <>
     <Router>
        <Suspense fallback = {<>Loading...</>}>
      <Routes>
        <Route element = {<PrivateRouter></PrivateRouter>}>
        <Route path='/' element = {<AuthPageComponent />} />
        <Route path='/studentDashboard' element = {<StudentDashboardComponent />} />
        <Route path="/studentDashboard" element={<StudentDashboardComponent />} />
        <Route path="/studentDashboard/profile" element={<StudentDashboardComponent />} />
        <Route path="/studentDashboard/MCQActiveTest" element={<StudentDashboardComponent />} />
        <Route path="/studentDashboard/MCQCompletedTest" element={<StudentDashboardComponent />} />
        <Route path="/studentDashboard/MCQUpcomingTest" element={<StudentDashboardComponent />} />
        <Route path="/studentDashboard/progress" element={<StudentDashboardComponent />} />
        <Route path='/adminDashboard' element = {<AdminDashboardComponent />} />
        <Route path='/facultyDashboard' element = {<FacultyDashboardComponent />} />
        </Route>
      </Routes>
        </Suspense>
     </Router>
   </>
  )
}

export default App