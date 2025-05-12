import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import CourseTop from './CourseTop';
import UseFormationsByUser  from '../../../hooks/UseFormationsByUser';
import { Link } from 'react-router-dom';

const InstructorCourse = () => {
   const { formations, setFormations, loading, error } = UseFormationsByUser ();

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
                     // Random image logic
                     const randomIndex = Math.floor(Math.random() * 10) + 1; 
                     const imagePath = `/assets/img/formations/thumb${randomIndex}.jpg`; 

                     // Construct the user's photo URL
                     const userPhoto = item.User?.photo ? `/assets/uploads/${item.User.photo}` : '/assets/img/user.png';

                     // Debugging: Log the user photo URL
                     console.log('User  Photo URL:', userPhoto);

                     return (
                        <div key={item.id} className="col">
                           <div className="courses__item shine__animate-item">
                              <div className="courses__item-thumb">
                                 <Link to={`#/${item.id}`} className="shine__animate-link">
                                    <img src={imagePath} alt="img" />
                                 </Link>
                              </div>
                              <div className="courses__item-content ">
                                 <ul className="courses__item-meta list-wrap">
                                    <li className="courses__item-tag">
                                       <Link to="/course">{item.thematique}</Link>
                                    </li>
                                    <li className="avg-rating"><i className="fas fa-star"></i> ({item.rating || 0} Reviews)</li>
                                 </ul>
                                 <h5 className="title">
                                    <Link to={`#/${item.id}`}>{item.titre}</Link>
                                 </h5>
                                 <div className="courses__item-content-bottom">
                                    <div className="author-two">
                                       <Link to="#"> <img src={userPhoto} alt="User " /> {item.User?.username || 'Unknown'}</Link>
                                    </div>
                                    <div className="avg-rating">
                                       <i className="fas fa-star"></i> {item.rating || 'N/A'}
                                    </div>
                                 </div>
                              </div>
                              <div className="courses__item-bottom-two">
                                 <ul className="list-wrap">
                                    <li><i className="flaticon-book"></i>{item.book || 'N/A'}</li>
                                    <li><i className="flaticon-clock"></i>{item.time || 'N/A'}</li>
                                    <li><i className="flaticon-mortarboard"></i>{item.mortarboard || 'N/A'}</li>
                                 </ul>
                              </div>
                           </div>
                        </div>
                     );
                  })}
               </div>
            </div>
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
   );
};

export default InstructorCourse;