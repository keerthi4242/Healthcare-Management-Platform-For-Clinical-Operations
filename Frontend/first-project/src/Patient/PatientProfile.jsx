import React, { useEffect, useState } from "react";
import "./PatientProfile.css";
import keycloak from "../keycloak";

const PatientProfile = () => {
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    // Later replace with:
     const keycloakUserId = keycloak.tokenParsed.sub;

    //const keycloakUserId = "70ded654-7985-4354-b95a-952aaf6088ca";

    fetch(`http://localhost:8080/patients/profile/${keycloakUserId}`)
      .then((res) => res.json())
      .then((data) => setPatient(data))
      .catch((err) => console.error(err));
  }, []);

  if (!patient) {
    return <h2>Loading Profile...</h2>;
  }

  return (
    <div className="profile-container">

      <div className="profile-header">
        <h1>👤 My Profile</h1>
        <p>View your personal and medical information.</p>
      </div>

      <div className="profile-card">

        <div className="profile-row">
          <span>Patient ID</span>
          <strong>{patient.patientId}</strong>
        </div>

        <div className="profile-row">
          <span>Name</span>
          <strong>{patient.patientName}</strong>
        </div>

        <div className="profile-row">
          <span>Gender</span>
          <strong>{patient.patientGender}</strong>
        </div>

        <div className="profile-row">
          <span>Date of Birth</span>
          <strong>{patient.patientbirthDate}</strong>
        </div>

        <div className="profile-row">
          <span>Phone</span>
          <strong>{patient.patientNumber}</strong>
        </div>

        <div className="profile-row">
          <span>Address</span>
          <strong>{patient.patientAddress}</strong>
        </div>

        <div className="profile-row">
          <span>Disease</span>
          <strong>{patient.patientDisease}</strong>
        </div>

        <div className="profile-row">
          <span>Age</span>
          <strong>{patient.age}</strong>
        </div>

        <div className="profile-row">
          <span>BMI</span>
          <strong>{patient.bmi}</strong>
        </div>

        <div className="profile-row">
          <span>HbA1c Level</span>
          <strong>{patient.hbA1cLevel}</strong>
        </div>

        <div className="profile-row">
          <span>Smoking History</span>
          <strong>{patient.smokingHistory}</strong>
        </div>

        <div className="profile-row">
          <span>Cholesterol</span>
          <strong>{patient.chol}</strong>
        </div>

      </div>

    </div>
  );
};

export default PatientProfile;