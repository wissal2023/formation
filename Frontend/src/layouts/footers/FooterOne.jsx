import { Link } from "react-router-dom";
import FooterCommon from "./FooterCommon";
import Social from "../../components/common/Social";

const FooterOne = ({ style, style_2 }) => {
   return (
      <footer className={`footer__area ${style_2 ? "footer__area-five" : "footer__area-two"}`}>
         <div className={`footer__top ${style_2 ? "footer__top-three" : ""}`}>
            <div className="container">
               <div className="row">
                  <FooterCommon />
                  <div className="col-xl-3 col-lg-4 col-md-6">
                     <div className="footer__widget">
                        <h4 className="footer__widget-title">Get In Touch</h4>
                        <div className="footer__contact-content">
                           <p>when an unknown printer took <br /> galley type and scrambled</p>
                           <ul className="list-wrap footer__social">
                              <Social />
                           </ul>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            {style_2 && (
               <div className="footer__shape" style={{ backgroundImage: 'url(/assets/img/others/h8_footer_shape.svg)' }}></div>
            )}
         </div>
      </footer>
   );
};


export default FooterOne;
