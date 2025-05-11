// frontend/src/navigation/Navigation.jsx
import React from 'react';

import { Route, BrowserRouter as Router, Routes,Navigate } from 'react-router-dom';
import Registration from '../pages/Registration';
import StudentProfile from '../pages/StudentProfile';

//*********** ons************** */

import ResetPassword from '../pages/ResetPassword';
import QrCodeDisplay from '../pages/QrCodeVerification';
import SignIn from '../pages/Login';
import OTPVerification from '../pages/OtpVerification';
import TotpVerif from '../pages/TotpVerif';

//*********** WISSAL************** */
import InstructorDashboard from '../pages/InstructorDashboard';
import StudentDashboard from '../pages/StudentDashboard';
import InstructorProfile from '../pages/InstructorProfile';
import ChangePassword from '../pages/ChangePassword';
import WelcomePage from '../pages/WelcomePage'
import Course from '../pages/Course';
import MyCourse from '../pages/MyCourse';
import AddFormation from '../pages/AddFormation';
import Convert from '../pages/Convert';
import UserSetting from '../pages/UserSetting';
import Lesson from '../pages/Lesson';
import NotFound from '../pages/NotFound';

const AppNavigation = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/signin" replace />} />  
        <Route path="/signin" element={ <SignIn />} />
        <Route path="/change-password" element={<ChangePassword />} />        
        <Route path="/ResetPassword" element={<ResetPassword />} />
        <Route path="/otpverification" element={<OTPVerification />}/>        
        <Route path="/qrcodedisplay" element={<QrCodeDisplay />} />
        <Route path="/verify-qrcode" element={<TotpVerif />} />
        <Route path="/welcome" element={<WelcomePage />} />
        
        <Route path="/dashboard" element={<InstructorDashboard />} />        
        <Route path="/formations" element={<Course />} />  
        <Route path="/listUsers" element={<InstructorProfile />} />
        <Route path="/editUser/:id" element={<UserSetting />} />           
        <Route path="/stepper" element={<AddFormation />} />
        <Route path="/Myformations" element={<MyCourse />} />

        <Route path="/convert" element={<Convert />} />

        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/student-profile" element={<StudentProfile />} />
        <Route path="/lesson/:id" element={<Lesson />} />


        {/*ROUTES TO BE USED         
        <Route path="/instructor-attempts" element={<InstructorAttempt />} /> 
        
        <Route path="/lesson" element={<Lesson />} />
        <Route path="/instructor-details" element={<InstructorDetails />} />
        <Route path="/instructors" element={<Instructor />} />   {/* list formateur 
        <Route path="/events" element={<Event />} />{/* doc 
        <Route path="/check-out" element={<CheckOut />} />   {/*form      
        <Route path="/blog-details" element={<BlogDetails />} />{/* evla rating commentaire  
        <Route path="/contact" element={<Contact />} /> {/* note dig  
        <Route path="/instructor-enrolled-courses" element={<InstructorEnrollCourse />} />
        <Route path="/instructor-review" element={<InstructorReview />} /> {/* rating table 
        <Route path="/instructor-history" element={<InstructorHistory />} />  {/* color icons status table 
        <Route path="/instructor-review" element={<InstructorReview />} /> {/* rating table 
        <Route path="/instructor-history" element={<InstructorHistory />} />  {/* color icons status table 
        <Route path="/course-details" element={<CourseDetails />} />

        <Route path="/instructor-review" element={<InstructorReview />} /> {/* rating table
        <Route path="/instructor-history" element={<InstructorHistory />} />  {/* color icons status table 

        {/*<Route path="/student-dashboard" element={<StudentDashboard />} />
        {/*<Route path="/student-wishlist" element={<StudentWishlist />} />

        <Route path="/student-wishlist" element={<StudentWishlist />} />
        <Route path="/about-us" element={<About />} />
        */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
   
  );
};

export default AppNavigation;