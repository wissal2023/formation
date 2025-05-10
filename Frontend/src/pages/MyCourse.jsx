import DashboardLayout from '../layouts/DashboardLayout';
import InstructorCourse from "../components/courses/course/InstructorCourse"


const Course = () => {
  return (
      <DashboardLayout pageTitle="mes formations">
          <InstructorCourse />
      </DashboardLayout>
  );
};

export default Course;