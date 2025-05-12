import { useState } from "react";
import Details from "../course-details/Details";
import Reviews from "../course-details/Reviews";

const tab_title = ["Overview", "Reviews"];

const FormationDetails = ({ formationId }) => {
  const [activeTab, setActiveTab] = useState(0);
  
  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <div className="courses__details-content lesson__details-content">
      <ul className="nav nav-tabs" id="myTab" role="tablist">
        {tab_title.map((tab, index) => (
          <li key={index} onClick={() => handleTabClick(index)} className="nav-item" role="presentation">
            <button className={`nav-link ${activeTab === index ? "active" : ""}`}>{tab}</button>
          </li>
        ))}
      </ul>
      <div className="tab-content" id="myTabContent">
        <div className={`tab-pane fade ${activeTab === 0 ? 'show active' : ''}`} id="overview-tab-pane" role="tabpanel" aria-labelledby="overview-tab">
          <Details formationId={formationId} />
        </div>
        <div className={`tab-pane fade ${activeTab === 2 ? 'show active' : ''}`} id="reviews-tab-pane" role="tabpanel" aria-labelledby="reviews-tab">
          <Reviews />
        </div>
      </div>
    </div>
  );
};


export default FormationDetails;
