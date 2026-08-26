import React, { useEffect, useState } from "react";
import "./PatientSummary.css";

const PatientSummary = ({ patientId }) => {

  const [patient, setPatient] = useState(null);

  useEffect(() => {

    fetch(`http://localhost:8080/patients/${patientId}`)
      .then(res => res.json())
      .then(data => setPatient(data));

  }, []);

  if (!patient) {
    return <h2>Loading...</h2>;
  }

  return (

    <div className="patient-summary">

      <h2>👤 Patient Summary</h2>

      <div className="summary-grid">

        <div>
          <label>Patient Name</label>
          <p>{patient.patientName}</p>
        </div>

        <div>
          <label>Patient ID</label>
          <p>{patient.patientId}</p>
        </div>

        <div>
          <label>Gender</label>
          <p>{patient.patientGender}</p>
        </div>

        <div>
          <label>Date of Birth</label>
          <p>{patient.patientbirthDate}</p>
        </div>

        <div>
          <label>Blood Group</label>
          <p>O+</p>
        </div>

        <div>
          <label>Risk Level</label>
          <p className="risk">Low</p>
        </div>

      </div>

    </div>

  );

};

export default PatientSummary;