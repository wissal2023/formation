import Footer from "../../../layouts/footers/Footer";
import HeaderOne from "../../../layouts/headers/HeaderOne";
import LessonArea from "./LessonArea";

const Lesson = ({ lessonId, filename }) => { // Accept filename as a prop
   return (
      <>
         <HeaderOne />
         <main className="main-area fix">
            <LessonArea lessonId={lessonId} filename={filename} /> {/* Pass filename prop here */}
         </main>
         <Footer />
      </>
   );
};

export default Lesson;
