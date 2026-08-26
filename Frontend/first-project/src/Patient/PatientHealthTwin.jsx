import React, { useEffect, useState } from "react";
import "./PatientHealthTwin.css";
import keycloak from "../keycloak";

const PatientHealthTwin = () => {
  const [patient, setPatient] = useState(null);
  const [healthTwin, setHealthTwin] = useState(null);

  useEffect(() => {
  const keycloakUserId = "70ded654-7985-4354-b95a-952aaf6088ca";
  // const keycloakUserId = keycloak.tokenParsed.sub;

  fetch(`http://localhost:8080/patients/profile/${keycloakUserId}`)
    .then(res => res.json())
    .then(data => {
      setPatient(data);

      return fetch(`http://localhost:8082/healthtwin/${data.patientId}`);
    })
    .then(res => res.json())
    .then(data => setHealthTwin(data))
    .catch(err => console.error(err));

}, []);

  if (!patient) return <h2>Loading Health Data...</h2>;

  return (
    <div className="health-container">

      <div className="health-header">
        <h1>❤️ My Health</h1>
        <p>Overview of your current health status.</p>
      </div>

      <div className="health-grid">

        <div className="health-card">
  <h3>Weight</h3>
  <p>{healthTwin?.weight} kg</p>
</div>

<div className="health-card">
  <h3>Height</h3>
  <p>{healthTwin?.height} cm</p>
</div>

<div className="health-card">
  <h3>BMI</h3>
  <p>{healthTwin?.bmi}</p>
</div>

<div className="health-card">
  <h3>Risk Level</h3>
  <p>{healthTwin?.risklevel}</p>
</div>

{/* <div className="health-card">
  <h3>Health Status</h3>
  <p>{healthTwin?.healthStatus}</p>
</div>

<div className="health-card">
  <h3>Last Updated</h3>
  <p>{healthTwin?.updatedAt}</p>
</div> */}

      </div>

      <div className="recommendation-card">
        <h2>Health Recommendation</h2>

        <p>
          Maintain a balanced diet, exercise regularly,
          monitor your vitals, and follow your doctor's advice.
        </p>

      </div>

    </div>
  );
};

export default PatientHealthTwin;