// frontend/src/navigation/Navigation.jsx
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Blog from '../pages/Blog';
import Lesson from '../pages/Lesson';
import CourseDetails from '../pages/CourseDetails';
import About from '../pages/About';
import Instructor from '../pages/Instructor';
import InstructorDetails from '../pages/InstructorDetails';
import Event from '../pages/Event';
import CheckOut from '../pages/CheckOut';
import BlogDetails from '../pages/BlogDetails';
import Registration from '../pages/Registration';
import Contact from '../pages/Contact';
import InstructorEnrollCourse from '../pages/InstructorEnrolledCourses';
import InstructorReview from '../pages/InstructorReview';
import InstructorHistory from '../pages/InstructorHistory';
import InstructorAttempt from '../pages/InstructorAttempt';
import StudentDashboard from '../dashboard/student-dashboard/student-dashboard/StudentDashboardArea';
import StudentProfile from '../pages/StudentProfile';
import StudentWishlist from '../pages/StudentWishlist';
import StudentSetting from '../pages/StudentSetting';

// ...autres imports...

import OTPVerification from '../pages/OtpVerification';
import ResetPassword from '../pages/ResetPassword';
import QrCodeDisplay from '../pages/QrCodeVerification';
import SignIn from '../pages/Login';


//*********** WISSAL************** */
import Login from '../pages/Login';
import InstructorDashboard from '../pages/InstructorDashboard';
import InstructorProfile from '../pages/InstructorProfile';
import ChangePassword from '../pages/ChangePassword';
import WelcomePage from '../pages/WelcomePage'
import Course from '../pages/Course';

import UserSetting from '../pages/UserSetting';
import NotFound from '../pages/NotFound';

const AppNavigation = () => {
  return (
    <Router>
      <Routes>  
         {/* public
        <Route path="/login" element={<Login />} />
        
        */} 
        <Route path="/signin" element={ <SignIn />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/ResetPassword" element={<ResetPassword />} />
        <Route path="/otpverification" element={<OTPVerification />} />        
        <Route path="/qrcodedisplay" element={<QrCodeDisplay />} />

        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/dashboard" element={<InstructorDashboard />} />        
        <Route path="/formations" element={<Course />} />  
        <Route path="/listUsers" element={<InstructorProfile />} />
        <Route path="/editUser/:id" element={<UserSetting />} /> 


            
            
           

        {/*ROUTES TO BE USED */}
        <Route path="/student-setting" element={<StudentSetting />} />
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