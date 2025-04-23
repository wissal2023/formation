import FooterOne from "../../../layouts/footers/FooterOne"
import HeaderOne from "../../../layouts/headers/HeaderOne"
import BreadcrumbOne from "../../common/breadcrumb/BreadcrumbOne"
import BlogArea from "./BlogArea"

<<<<<<< HEAD:Frontend/src/components/inner-pages/login/index.tsx
const Login1 = () => {
=======
const Blog = () => {
>>>>>>> f3f567f101727f44421a20d812832d9a284f3f11:Frontend/src/components/blogs/blog/index.jsx
   return (
      <>
         <HeaderOne />
         <main className="main-area fix">
            <BreadcrumbOne title="Latest Right Sidebar" sub_title="Blogs" />
            <BlogArea style_1={false} />
         </main>
         <FooterOne style={null} style_2={true} />
      </>
   )
}

<<<<<<< HEAD:Frontend/src/components/inner-pages/login/index.tsx
export default Login1;

=======
export default Blog
>>>>>>> f3f567f101727f44421a20d812832d9a284f3f11:Frontend/src/components/blogs/blog/index.jsx
