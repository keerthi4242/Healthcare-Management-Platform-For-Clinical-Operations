import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./DoctorAssignment.css";

const DoctorAssignment = () => {
  const { doctorId } = useParams();
  const navigate = useNavigate();

  const [doctor, setDoctor] = useState({});
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState("");

  useEffect(() => {
    fetch(`http://localhost:8091/doctors/${doctorId}`)
      .then((res) => res.json())
      .then((data) => setDoctor(data))
      .catch((err) => console.log(err));

    fetch("http://localhost:8080/patients")
      .then((res) => res.json())
      .then((data) => setPatients(data))
      .catch((err) => console.log(err));
  }, [doctorId]);

  const assignDoctor = async () => {
    if (!selectedPatient) {
      alert("Please select a patient.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8091/assignments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          doctorId: doctorId,
          patientId: selectedPatient,
        }),
      });

      if (!response.ok) {
        throw new Error("Assignment failed");
      }

      alert("Doctor assigned successfully!");
      navigate("/admin/doctors");
    } catch (error) {
      console.error(error);
      alert("Error assigning doctor.");
    }
  };

  return (
    <div className="assignment-container">
      <h1>👨‍⚕️ Assign Doctor to Patient</h1>

      <div className="doctor-card">
        <h2>Doctor Details</h2>

        <p>
          <strong>ID:</strong> {doctor.doctorId}
        </p>

        <p>
          <strong>Name:</strong> {doctor.doctorName}
        </p>

        <p>
          <strong>Specialization:</strong> {doctor.specialization}
        </p>

        <p>
          <strong>Status:</strong> {doctor.status}
        </p>
      </div>

      <h2>Select Patient</h2>

      <table className="assignment-table">
        <thead>
          <tr>
            <th>Select</th>
            <th>Patient ID</th>
            <th>Name</th>
            <th>Disease</th>
            <th>Gender</th>
          </tr>
        </thead>

        {/* <tbody>
          {patients.map((patient) => (
            <tr key={patient.patientId}>
              <td>
                <input
                  type="radio"
                  name="patient"
                  value={patient.patientId}
                  checked={selectedPatient === patient.patientId}
                  onChange={(e) => setSelectedPatient(e.target.value)}
                />
              </td>

              <td>{patient.patientId}</td>

              <td>{patient.patientName}</td>

              <td>{patient.patientDisease}</td>

              <td>{patient.patientGender}</td>
            </tr>
          ))}
        </tbody> */}
        <tbody>
  {patients.map((patient) => (
    <tr
      key={patient.patientId}
      onClick={() => {
        console.log("Selected Patient:", patient.patientId);
        setSelectedPatient(patient.patientId);
      }}
      className={
        selectedPatient === patient.patientId ? "selected-row" : ""
      }
      style={{ cursor: "pointer" }}
    >
      <td>
        <input
          type="radio"
          name="patient"
          checked={selectedPatient === patient.patientId}
          readOnly
        />
      </td>

      <td>{patient.patientId}</td>
      <td>{patient.patientName}</td>
      <td>{patient.patientDisease}</td>
      <td>{patient.patientGender}</td>
    </tr>
  ))}
</tbody>
      </table>

      <div className="assignment-buttons">
        <button className="assign-btn" onClick={assignDoctor}>
          Assign Doctor
        </button>

        <button
          className="cancel-btn"
          onClick={() => navigate("/admin/doctors")}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DoctorAssignment;