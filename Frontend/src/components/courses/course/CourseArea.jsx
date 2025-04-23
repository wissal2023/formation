import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import CourseTop from './CourseTop';
import UseFormations from '../../../hooks/UseFormations';
import { Link } from 'react-router-dom';

const CourseArea = () => {
   const { formations, setFormations, loading, error } = UseFormations();

   const itemsPerPage = 6;
   const [itemOffset, setItemOffset] = useState(0);
   const endOffset = itemOffset + itemsPerPage;
   const currentItems = formations.slice(itemOffset, endOffset);
   const pageCount = Math.ceil(formations.length / itemsPerPage);

   const startOffset = itemOffset + 1;
   const totalItems = formations.length;

   const handlePageClick = ({ selected }) => {
      const newOffset = (selected * itemsPerPage) % formations.length;
      setItemOffset(newOffset);
   };

   const [activeTab, setActiveTab] = useState(0);

   const handleTabClick = (index) => {
      setActiveTab(index);
   };

   if (loading) return <p>Loading...</p>;
   if (error) return <p>{error}</p>;

   return (
      <div className="col-xl-9 col-lg-8">
         <div className="dashboard__content-title">
            <h4 className="title">Formations</h4>
         </div>
         <CourseTop
            startOffset={startOffset}
            endOffset={Math.min(endOffset, totalItems)}
            totalItems={totalItems}
            setFormations={setFormations}
            handleTabClick={handleTabClick}
            activeTab={activeTab}
         />
         <div className="tab-content" id="myTabContent">
            <div className={`tab-pane fade ${activeTab === 0 ? 'show active' : ''}`} id="grid" role="tabpanel" aria-labelledby="grid-tab">
               <div className="row courses__grid-wrap row-cols-1 row-cols-xl-3 row-cols-lg-2 row-cols-md-2 row-cols-sm-1">
               {currentItems.map((item) => {
                  // 1. Random image logic
                  const randomIndex = Math.floor(Math.random() * 10) + 1; 
                  const imagePath = `/assets/img/formations/thumb${randomIndex}.jpg`; // e.g., course_1.jpg to course_10.jpg

                  return (
                     <div key={item.id} className="col">
                        <div className="courses__item shine__animate-item">
                           <div className="courses__item-thumb">
                              <Link to={`/course-details/${item.id}`} className="shine__animate-link">
                                 <img src={imagePath} alt="img" />
                              </Link>
                           </div>
                           <div className="courses__item-content">
                              <ul className="courses__item-meta list-wrap">
                                 <li className="courses__item-tag">
                                    <Link to="/course">{item.thematique}</Link>
                                 </li>
                                 <li className="avg-rating"><i className="fas fa-star"></i> ({item.rating || 0} Reviews)</li>
                              </ul>
                              <h5 className="title">
                                 <Link to={`/course-details/${item.id}`}>{item.titre}</Link>
                              </h5>
                              <p className="author">
                                 By <Link to="#">{item.User?.username || 'Unknown'}</Link>
                              </p>
                              <div className="courses__item-bottom">
                                 <div className="button">
                                    <Link to={`/course-details/${item.id}`}>
                                       <span className="text">more details</span>
                                       <i className="flaticon-arrow-right"></i>
                                    </Link>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  );
               })}

               </div>
               <nav className="pagination__wrap mt-30">
                  <ReactPaginate
                     breakLabel="..."
                     onPageChange={handlePageClick}
                     pageRangeDisplayed={3}
                     pageCount={pageCount}
                     renderOnZeroPageCount={null}
                     className="list-wrap"
                  />
               </nav>
            </div>
         </div>
      </div>
   );
};

export default CourseArea;
