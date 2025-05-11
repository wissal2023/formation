import DashboardLayout from '../layouts/DashboardLayout';
import CourseArea from "../components/courses/course/CourseArea"


const Course = () => {
  return (
      <DashboardLayout pageTitle=" All formation">
          <CourseArea />
      </DashboardLayout>
  );
};

export default Course;