import React, { useEffect, useState } from "react";
import "./VitalCards.css";

const VitalsCard = ({ patientId }) => {

  const [vitals, setVitals] = useState([]);
        const systolic = vitals.find(
  v => v.code?.text === "Systolic Blood Pressure"
);

const diastolic = vitals.find(
  v => v.code?.text === "Diastolic Blood Pressure"
);

  useEffect(() => {

  const loadVitals = () => {
    fetch(`http://localhost:8084/fhir/observation/${patientId}`)
      .then(res => res.json())
      .then(data => setVitals(data))
      .catch(err => console.error(err));
  };

  loadVitals();

  const interval = setInterval(loadVitals, 5000);

  return () => clearInterval(interval);

}, [patientId]);

  const getValue = (display) => {
    const observation = vitals.find(
      v => v.code?.text === display
    );

    return observation
      ? `${observation.valueQuantity.value} ${observation.valueQuantity.unit}`
      : "--";
  };

  return (
    <div className="vitals-card">

      <h2>❤️ Latest Vitals</h2>

      <div className="vitals-grid">

        <div className="vital-box">
          <h4>Heart Rate</h4>
          <p>{getValue("Heart Rate")}</p>
        </div>

        <div className="vital-box">
          <h4>🩸 Blood Pressure</h4>
<p>
  {systolic ? systolic.valueQuantity.value : "--"} /
  {diastolic ? diastolic.valueQuantity.value : "--"} mmHg
</p>
        </div>

        <div className="vital-box">
          <h4>🌡️ Temperature</h4>
          <p>{getValue("Body Temperature")}</p>
        </div>

        <div className="vital-box">
          <h4>🫁SpO₂</h4>
          <p>{getValue("Oxygen Saturation")}</p>
        </div>

      </div>

    </div>
  );
};

export default VitalsCard;