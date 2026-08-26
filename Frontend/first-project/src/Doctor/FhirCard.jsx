import React, { useEffect, useState } from "react";
import "./FhirCard.css";

const FhirCard = ({ patientId }) => {

  const [patient, setPatient] = useState(null);
  const [observation, setObservation] = useState(null);

  useEffect(() => {

    fetch(`http://localhost:8084/fhir/patient/${patientId}`)
      .then(res => res.json())
      .then(data => setPatient(data));

    fetch(`http://localhost:8084/fhir/observation/${patientId}`)
      .then(res => res.json())
      .then(data => setObservation(data));

  }, []);

  return (
    <div className="fhir-card">

      <h2>📄 FHIR Resources</h2>

      <div className="fhir-grid">

        <div className="fhir-box">
          <h4>Patient Resource</h4>
          <p>{patient ? "✅ Available" : "❌ Not Found"}</p>
        </div>

        <div className="fhir-box">
          <h4>Observation</h4>
          <p>{observation ? "✅ Available" : "❌ Not Found"}</p>
        </div>

        <div className="fhir-box">
          <h4>FHIR Version</h4>
          <p>R4</p>
        </div>

        <div className="fhir-box">
          <h4>Total Resources</h4>
          <p>{(patient ? 1 : 0) + (observation ? 1 : 0)}</p>
        </div>

      </div>

    </div>
  );
};

export default FhirCard;