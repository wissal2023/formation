// frontend/src/navigation/Navigation.jsx
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import HomeTwo from '../pages/HomeTwo';
import HomeThree from '../pages/HomeThree';
import HomeFour from '../pages/HomeFour';
import HomeFive from '../pages/HomeFive';
import HomeSix from '../pages/HomeSix';
import HomeSeven from '../pages/HomeSeven';
import HomeEight from '../pages/HomeEight';
import Lesson from '../pages/Lesson';
import CourseDetails from '../pages/CourseDetails';
import About from '../pages/About';
import Instructor from '../pages/Instructor';
import InstructorDetails from '../pages/InstructorDetails';
import Event from '../pages/Event';
import EventDetails from '../pages/EventDetails';
import Shop from '../pages/Shop';
import ShopDetails from '../pages/ShopDetails';
import Cart from '../pages/Cart';
import Wishlist from '../pages/Wishlist';
import CheckOut from '../pages/CheckOut';
import BlogTwo from '../pages/BlogTwo';
import BlogThree from '../pages/BlogThree';
import BlogDetails from '../pages/BlogDetails';
import Registration from '../pages/Registration';
import Contact from '../pages/Contact';
import InstructorEnrollCourse from '../pages/InstructorEnrolledCourses';
import InstructorWishlist from '../pages/InstructorWishlist';
import InstructorReview from '../pages/InstructorReview';
import InstructorQuiz from '../pages/InstructorQuiz';
import InstructorHistory from '../pages/InstructorHistory';
import InstructorCourses from '../pages/InstructorCourses';
import InstructorAnnouncement from '../pages/InstructorAnnouncement';
import InstructorAssignment from '../pages/InstructorAssignment';
import InstructorSetting from '../pages/InstructorSetting';
import InstructorAttempt from '../pages/InstructorAttempt';
import StudentDashboard from '../dashboard/student-dashboard/student-dashboard/StudentDashboardArea';
import StudentProfile from '../pages/StudentProfile';
import StudentEnrollCourse from '../pages/StudentEnrolledCourses';
import StudentWishlist from '../pages/StudentWishlist';
import StudentReview from '../pages/StudentReview';
import StudentAttempt from '../pages/StudentAttempt';
import StudentHistory from '../pages/StudentHistory';
import StudentSetting from '../pages/StudentSetting';

//*********** WISSAL************** */
import Login from '../pages/Login';
import InstructorDashboard from '../pages/InstructorDashboard';
import InstructorProfile from '../pages/InstructorProfile';
import ChangePassword from '../pages/ChangePassword';
import WelcomePage from '../pages/WelcomePage'
import Course from '../pages/Course';

import NotFound from '../pages/NotFound';
import UserSetting from '../pages/UserSetting';

const AppNavigation = () => {
  return (
    <Router>
      <Routes>         
        <Route path="/listUsers" element={<InstructorProfile />} />
        <Route path="/editUser/:id" element={<UserSetting />} />
         {/* public */}
        <Route path="/login" element={<Login />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/dashboard" element={<InstructorDashboard />} />        
        <Route path="/formations" element={<Course />} />  

        <Route path="/student-setting" element={<StudentSetting />} />

        {/*ROUTES TO BE USED */}
        <Route path="/instructor-setting" element={<StudentProfile />} />
        <Route path="/instructor-attempts" element={<InstructorAttempt />} /> 
        <Route path="/course-details" element={<CourseDetails />} />
        <Route path="/lesson" element={<Lesson />} />
        <Route path="/instructor-details" element={<InstructorDetails />} />
        <Route path="/instructors" element={<Instructor />} />   {/* list formateur */}
        <Route path="/events" element={<Event />} />{/* doc */}
        <Route path="/check-out" element={<CheckOut />} />   {/*form  */}      
        <Route path="/blog-details" element={<BlogDetails />} />{/* evla rating commentaire  */}
        <Route path="/contact" element={<Contact />} /> {/* note dig  */}
        <Route path="/instructor-enrolled-courses" element={<InstructorEnrollCourse />} />
        <Route path="/instructor-review" element={<InstructorReview />} /> {/* rating table */}
        <Route path="/instructor-history" element={<InstructorHistory />} />  {/* color icons status table */}
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/student-wishlist" element={<StudentWishlist />} />
        <Route path="/about-us" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppNavigation;