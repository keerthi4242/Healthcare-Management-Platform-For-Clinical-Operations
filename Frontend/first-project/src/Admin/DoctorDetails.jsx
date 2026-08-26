import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./DoctorDetails.css";

const DoctorDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8091/doctors/${id}`)
      .then((res) => res.json())
      .then((data) => setDoctor(data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!doctor) {
    return <h2 style={{ padding: "30px" }}>Loading doctor details...</h2>;
  }

  return (
    <div className="doctor-details-container">

      <div className="details-header">
        <h1>👨‍⚕️ Doctor Details</h1>

        <button
          className="back-btn"
          onClick={() => navigate("/admin/doctors")}
        >
          ← Back
        </button>
      </div>

      <div className="doctor-card">

        <div className="detail-row">
          <span>Doctor ID</span>
          <p>{doctor.doctorId}</p>
        </div>

        <div className="detail-row">
          <span>Name</span>
          <p>{doctor.doctorName}</p>
        </div>

        <div className="detail-row">
          <span>Specialization</span>
          <p>{doctor.specialization}</p>
        </div>

        <div className="detail-row">
          <span>Gender</span>
          <p>{doctor.gender}</p>
        </div>

        <div className="detail-row">
          <span>Email</span>
          <p>{doctor.email}</p>
        </div>

        <div className="detail-row">
          <span>Phone</span>
          <p>{doctor.phone}</p>
        </div>

        <div className="detail-row">
          <span>Qualification</span>
          <p>{doctor.qualification}</p>
        </div>

        <div className="detail-row">
          <span>Experience</span>
          <p>{doctor.experience} Years</p>
        </div>

        <div className="detail-row">
          <span>Status</span>
          <p>{doctor.status}</p>
        </div>

      </div>
    </div>
  );
};

export default DoctorDetails;