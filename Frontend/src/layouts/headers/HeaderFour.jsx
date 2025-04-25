import { useState } from "react"
import NavMenuOne from "./menu/NavMenu"
import UseSticky from "../../hooks/UseSticky"
import { Link } from "react-router-dom"
import InjectableSvg from "../../hooks/InjectableSvg"
import HeaderSearch from "./menu/HeaderSearch"
import HeaderOffCanvas from "./menu/HeaderOffCanvas"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const HeaderFour = () => {

   const [isSearch, setIsSearch] = useState(false);
   const [offcanvas, setOffcamvas] = useState(false);
   const { sticky } = UseSticky();
   const [isActive, setIsActive] = useState(false);

   const navigate = useNavigate();

   const handleLogout = async (e) => {
      e.preventDefault(); // IMPORTANT: Prevent <a> default behavior
      try {
         await axios.post(`${import.meta.env.VITE_API_URL}/users/logout`, 
            {}, { withCredentials: true });
         navigate('/signin');
      } catch (error) {
         console.error('Erreur lors de la déconnexion :', error);
      }
   };

   return (
      <header className="transparent-header">
         <div id="header-fixed-height"></div>
         <div id="sticky-header" className={`tg-header__area tg-header__style-four ${sticky ? "sticky-menu" : ""}`}>
            <div className="container">
               <div className="row">
                  <div className="col-12">
                     <div className="tgmenu__wrap">
                        <nav className="tgmenu__nav">
                           <div className="logo">
                              <Link to="/"><img src="/assets/img/logo/teamwill.png" alt="Logo" style={{ maxHeight: '60px'}} /></Link>
                           </div>
                           <div className="tgmenu__navbar-wrap tgmenu__main-menu d-none d-xl-flex">
                              <NavMenuOne />
                           </div>
                           <div className="tgmenu__action tgmenu__action-four">
                              <ul className="list-wrap">
                                 <li className="header-search">
                                    <a onClick={() => setIsSearch(true)} style={{ cursor:"pointer" }} className="search-open-btn">
                                       <i className="flaticon-search"></i>
                                    </a>
                                 </li> 
                                 <li className="offCanvas-menu">
                                 <a href="#" onClick={(e) => {
                                                e.preventDefault();
                                                setOffcamvas(true);
                                                handleLogout(e);
                                             }}
                                    className="menu-tigger" style={{ cursor: "pointer" }}>
                                    <InjectableSvg src="/assets/img/icons/offCanvas_icon.svg" alt="" className="injectable" />
                                 </a>
                                 </li>
                              </ul>
                           </div>                           
                        </nav>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <HeaderSearch isSearch={isSearch} setIsSearch={setIsSearch} />
      </header>
   )
}

export default HeaderFour
