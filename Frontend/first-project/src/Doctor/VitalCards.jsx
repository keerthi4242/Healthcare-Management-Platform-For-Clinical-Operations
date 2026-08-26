import React, { useEffect, useState } from "react";
import "./VitalCards.css";

const VitalsCard = ({ patientId }) => {

  const [vitals, setVitals] = useState(null);


  useEffect(() => {

    const loadVitals = () => {

      fetch(`http://localhost:8085/vitals/latest/${patientId}`)
        .then(res => res.json())
        .then(data => setVitals(data))
        .catch(err => console.error(err));

    };


    loadVitals();


    const interval = setInterval(loadVitals, 5000);


    return () => clearInterval(interval);


  }, [patientId]);



  if (!vitals) {
    return <p>Loading vitals...</p>;
  }



  return (

    <div className="vitals-card">

      <h2>❤️ Live Monitoring</h2>


      <div className="vitals-grid">


        <div className="vital-box">
          <h4>❤️ Heart Rate</h4>
          <p>
            {vitals.heartRate} bpm
          </p>
        </div>



        <div className="vital-box">
          <h4>🩸 Blood Pressure</h4>
          <p>
            {vitals.systolicBP}/
            {vitals.diastolicBP} mmHg
          </p>
        </div>



        <div className="vital-box">
          <h4>🌡️ Temperature</h4>
          <p>
            {vitals.temperature.toFixed(1)} °C
          </p>
        </div>



        <div className="vital-box">
          <h4>🫁 SpO₂</h4>
          <p>
            {vitals.spo2} %
          </p>
        </div>



        <div className="vital-box">
          <h4>🫁 Respiratory Rate</h4>
          <p>
            {vitals.respiratoryRate} /min
          </p>
        </div>



        <div className="vital-box">
          <h4>🩸 Blood Glucose</h4>
          <p>
            {vitals.bloodGlucoseLevel} mg/dL
          </p>
        </div>


      </div>

    </div>

  );
};

export default VitalsCard;