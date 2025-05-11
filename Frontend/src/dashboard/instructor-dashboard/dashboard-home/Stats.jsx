import Count from "../../../components/common/Count";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Lottie from "lottie-react";
import flameAnimation from '../../../../public/assets/img/lotti/flame.json'; // Adjust the path as necessary

const Stats = () => {
  const [dashboardCountData, setDashboardCountData] = useState([]);

  useEffect(() => {
    const fetchStatsData = async () => {
      try {
        const API = import.meta.env.VITE_API_URL;

        // Fetch streaks
        const streakRes = await axios.get(`${API}/streak/get`, {
          withCredentials: true,
        });

        // Fetch completed formations
        /*const formationRes = await axios.get(`${API}/formations/completed`, {
          withCredentials: true,
        });*/

        // Fetch badge count
       /* const badgeRes = await axios.get(`${API}/recompenses/badges-count`, {
          withCredentials: true,
        });*/

        // Update dashboard count data
        setDashboardCountData([
          {
            title: "Nombre de Streaks",
            count: streakRes.data.nombreStreak,
            lottie: flameAnimation,
          },
          /*{
            title: "Formations Terminées",
            count: formationRes.data.completedFormations,
            icon: "fa-solid fa-graduation-cap",
          },*/
          /*{
            title: "Badges Débloqués",
            count: badgeRes.data.badgesCount,
            icon: "fa-solid fa-award", // FontAwesome badge icon
          },*/
        ]);
      } catch (error) {
        console.error("Error fetching stats data:", error);
      }
    };

    fetchStatsData();
  }, []);

  return (
    <>
      {dashboardCountData.length > 0 ? (
        dashboardCountData.map((item, index) => (
          <div key={`${item.title}-${index}`} className="col-lg-4 col-md-4 col-sm-6">
            <div className="dashboard__counter-item">
              <div className="icon" style={{ width: 50, height: 50 }}>
                {item.lottie && (
                  <Lottie animationData={item.lottie} loop={true} />
                )}
              </div>
              <div className="content">
                <span className="count"><Count number={item.count || 0} /></span>
                <p style={{ marginTop: "5px" }}>{item.title || "Untitled"}</p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default Stats;
