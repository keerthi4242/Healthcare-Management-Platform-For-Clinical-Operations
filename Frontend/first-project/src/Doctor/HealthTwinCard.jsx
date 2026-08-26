import React, { useEffect, useState } from "react";
import "./HealthTwinCard.css";

const HealthTwinCard = ({ patientId }) => {

  const [healthTwin, setHealthTwin] = useState(null);

  useEffect(() => {

    fetch(`http://localhost:8082/healthtwin/${patientId}`)
      .then(res => res.json())
      .then(data => setHealthTwin(data))
      .catch(err => console.error("Error:", err));

  }, []);

  if (!healthTwin) {
    return <h2>Loading Health Twin...</h2>;
  }

  return (
    <div className="health-card">

      <h2>🧬 Digital Health Twin</h2>

      <div className="health-grid">

        <div className="health-box">
          <h4>Weight</h4>
          <p>{healthTwin.weight} kg</p>
        </div>

        <div className="health-box">
          <h4>Height</h4>
          <p>{healthTwin.height} cm</p>
        </div>

        <div className="health-box">
          <h4>BMI</h4>
          <p>{healthTwin.bmi}</p>
        </div>

        <div className="health-box">
          <h4>Risk Level</h4>
          <p className="risk">{healthTwin.risklevel}</p>
        </div>

      </div>

    </div>
  );
};

export default HealthTwinCard;