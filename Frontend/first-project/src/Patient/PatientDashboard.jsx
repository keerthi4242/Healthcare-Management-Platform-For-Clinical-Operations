import React, { useEffect, useState } from "react";
import "./PatientDashboard.css";
import keycloak from "../keycloak";

const PatientDashboard = () => {
  const [patient, setPatient] = useState(null);

 useEffect(() => {

   const keycloakUserId = "70ded654-7985-4354-b95a-952aaf6088ca";
  // const keycloakUserId = keycloak.tokenParsed.sub; // JWT sub

   fetch(`http://localhost:8080/patients/profile/${keycloakUserId}`)
      .then(res => res.json())
      .then(data => setPatient(data));

}, []);
if (!patient) {
  return <h2>Loading...</h2>;
}

  return (
    <div className="patient-dashboard">

      <div className="patient-header">
        <div>
          <h1 className="name">👋 Welcome, {patient.patientName}</h1>
          <p>Monitor your health and AI-powered insights.</p>
        </div>
      </div>
<div className="patient-stats">

  <div className="patient-card blue">
    <h2>{patient.age}</h2>
    <p>Age</p>
  </div>

  <div className="patient-card red">
    <h2>{patient.patientDisease}</h2>
    <p>Disease</p>
  </div>

  <div className="patient-card orange">
    <h2>{patient.bmi}</h2>
    <p>BMI</p>
  </div>

  <div className="patient-card purple">
    <h2>{patient.hbA1cLevel}</h2>
    <p>HbA1c Level</p>
  </div>

  <div className="patient-card green">
    <h2>{patient.chol}</h2>
    <p>Cholesterol</p>
  </div>

  <div className="patient-card cyan">
    <h2>{patient.smokingHistory}</h2>
    <p>Smoking History</p>
  </div>

</div>

    <div className="patient-summary">

  <div className="summary-card">
    <h3>👤 Personal Information</h3>

    <p><strong>Name:</strong> {patient.patientName}</p>
    <p><strong>Gender:</strong> {patient.patientGender}</p>
    <p><strong>Date of Birth:</strong> {patient.patientbirthDate}</p>
    <p><strong>Phone:</strong> {patient.patientNumber}</p>
    <p><strong>Address:</strong> {patient.patientAddress}</p>

  </div>

  <div className="summary-card">
    <h3>🩺 Health Details</h3>

    <p><strong>Hypertension:</strong> {patient.hypertension ? "Yes" : "No"}</p>
    <p><strong>Heart Disease:</strong> {patient.heartDisease ? "Yes" : "No"}</p>
    <p><strong>Chest Pain Type:</strong> {patient.cp}</p>
    <p><strong>Exercise Angina:</strong> {patient.exang ? "Yes" : "No"}</p>

  </div>

</div>
      
    </div>
  );
};

export default PatientDashboard;