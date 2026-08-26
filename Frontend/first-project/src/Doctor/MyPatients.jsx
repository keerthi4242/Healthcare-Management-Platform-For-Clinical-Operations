import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./MyPatients.css";

const MyPatients = () => {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

 useEffect(() => {
  const loadPatients = async () => {
    try {
      const doctorId = "6a6ec6b54a7e2bb852290339"; // Temporary. Later get this from Keycloak.

      // Get assigned patient IDs
      const assignmentResponse = await fetch(
        `http://localhost:8091/assignments/doctor/${doctorId}`
      );

      const assignments = await assignmentResponse.json();

      // Get full patient details
      const patientDetails = await Promise.all(
        assignments.map(async (assignment) => {
          const response = await fetch(
            `http://localhost:8080/patients/${assignment.patientId}`
          );
          return response.json();
        })
      );

      setPatients(patientDetails);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  loadPatients();
}, []);

  const filteredPatients = patients.filter((patient) =>
    patient.patientName?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="my-patients-container">
      <div className="patients-header">
        <div>
          <h2>👥 My Patients</h2>
          <p>View and monitor your assigned patients.</p>
        </div>

        <input
          type="text"
          placeholder="🔍 Search patient..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="patient-search"
        />
      </div>

      <div className="patients-table-card">
        {loading ? (
          <div className="loading">Loading patients...</div>
        ) : (
          <table className="patients-table">
            <thead>
              <tr>
                <th>Patient ID</th>
                <th>Name</th>
                <th>Gender</th>
                <th>Age</th>
                <th>Disease</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredPatients.length > 0 ? (
                filteredPatients.map((patient) => (
                  <tr key={patient.patientId}>
                    <td>{patient.patientId}</td>
                    <td>{patient.patientName}</td>
                    <td>{patient.patientGender}</td>
                    <td>{patient.age}</td>
                    <td>{patient.patientDisease}</td>

                    <td>
                      <Link
                        to={`/patient/${patient.patientId}`}
                        className="view-btn"
                      >
                        View Patient
                      </Link>
                       <Link
    to={`/patient/${patient.patientId}/ai-prediction`}
    className="prediction-btn"
  >
    AI Prediction
  </Link>
  <Link
  to={`/doctor/care-plans/${patient.patientId}`}
  className="careplan-btn"
>
  📋 Care Plan
</Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="no-data">
                    No patients found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default MyPatients;