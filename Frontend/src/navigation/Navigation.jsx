// navigation/Navigation.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Blog from '../pages/Blog';
import Home from '../pages/Home';
import HomeTwo from '../pages/HomeTwo';
import HomeThree from '../pages/HomeThree';
import HomeFour from '../pages/HomeFour';
import HomeFive from '../pages/HomeFive';
import HomeSix from '../pages/HomeSix';
import HomeSeven from '../pages/HomeSeven';
import HomeEight from '../pages/HomeEight';
import Course from '../pages/Course';
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
import InstructorDashboard from '../pages/InstructorDashboard';
import InstructorProfile from '../pages/InstructorProfile';
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
import StudentDashboard from '../pages/StudentDashboard';
import StudentProfile from '../pages/StudentProfile';
import StudentEnrollCourse from '../pages/StudentEnrolledCourses';
import StudentWishlist from '../pages/StudentWishlist';
import StudentReview from '../pages/StudentReview';
import StudentAttempt from '../pages/StudentAttempt';
import StudentHistory from '../pages/StudentHistory';
import StudentSetting from '../pages/StudentSetting';
import NotFound from '../pages/NotFound';
import PrivateRoute from '../PrivateRoute.jsx';
import SignIn from "/Users/ons/Desktop/giiit baaack/formation/Frontend/src/signIn";

const AppNavigation = () => {
  return (
    <Routes>
      <Route path="/blog" element={
        <PrivateRoute>
          <Blog />
        </PrivateRoute>
      } />
      <Route path="/home" element={<Home />} />
      <Route path="/home-two" element={<HomeTwo />} />
      <Route path="/home-three" element={<HomeThree />} />
      <Route path="/home-four" element={<HomeFour />} />
      <Route path="/home-five" element={<HomeFive />} />
      <Route path="/home-six" element={<HomeSix />} />
      <Route path="/home-seven" element={<HomeSeven />} />
      <Route path="/home-eight" element={<HomeEight />} />
      <Route path="/courses" element={<Course />} />
      <Route path="/course-details" element={<CourseDetails />} />
      <Route path="/lesson" element={<Lesson />} />
      <Route path="/about-us" element={<About />} />
      <Route path="/instructors" element={<Instructor />} />
      <Route path="/instructor-details" element={<InstructorDetails />} />
      <Route path="/events" element={<Event />} />
      <Route path="/events-details" element={<EventDetails />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/shop-details" element={<ShopDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/check-out" element={<CheckOut />} />
      <Route path="/blog-2" element={<BlogTwo />} />
      <Route path="/blog-3" element={<BlogThree />} />
      <Route path="/blog-details" element={<BlogDetails />} />
      <Route path="/SignIn" element={<SignIn />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/instructor-dashboard" element={<InstructorDashboard />} />
      <Route path="/instructor-profile" element={<InstructorProfile />} />
      <Route path="/instructor-enrolled-courses" element={<InstructorEnrollCourse />} />
      <Route path="/instructor-wishlist" element={<InstructorWishlist />} />
      <Route path="/instructor-review" element={<InstructorReview />} />
      <Route path="/instructor-attempts" element={<InstructorAttempt />} />
      <Route path="/instructor-history" element={<InstructorHistory />} />
      <Route path="/instructor-courses" element={<InstructorCourses />} />
      <Route path="/instructor-announcement" element={<InstructorAnnouncement />} />
      <Route path="/instructor-quiz" element={<InstructorQuiz />} />
      <Route path="/instructor-assignment" element={<InstructorAssignment />} />
      <Route path="/instructor-setting" element={<InstructorSetting />} />
      <Route path="/student-dashboard" element={<StudentDashboard />} />
      <Route path="/student-profile" element={<StudentProfile />} />
      <Route path="/student-enrolled-courses" element={<StudentEnrollCourse />} />
      <Route path="/student-wishlist" element={<StudentWishlist />} />
      <Route path="/student-review" element={<StudentReview />} />
      <Route path="/student-attempts" element={<StudentAttempt />} />
      <Route path="/student-history" element={<StudentHistory />} />
      <Route path="/student-setting" element={<StudentSetting />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppNavigation;