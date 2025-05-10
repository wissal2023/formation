import Footer from "../../../layouts/footers/Footer"

import HeaderOne from "../../../layouts/headers/HeaderOne"
import LessonArea from "./LessonArea"

const Lesson = () => {
   return (
      <>
         <HeaderOne />
         <main className="main-area fix">
            <LessonArea />
         </main>
         <Footer/>
      </>
   )
}

export default Lesson
