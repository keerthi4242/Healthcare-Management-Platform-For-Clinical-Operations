import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./DoctorDetails.css";
import keycloak from "../keycloak";

const API_URL = "http://localhost:8091/doctors";

const DoctorDetails = () => {
  const navigate = useNavigate();

  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDoctor();
  }, []);

  const fetchDoctor = async () => {
    try {
      setLoading(true);
      setError("");

      const keycloakUserId = keycloak.tokenParsed?.sub;

      console.log("Keycloak User ID:", keycloakUserId);

      if (!keycloakUserId) {
        throw new Error("Unable to identify logged-in doctor.");
      }

      const response = await fetch(
        `${API_URL}/profile/${keycloakUserId}`
      );

      console.log("Doctor API Status:", response.status);

      if (!response.ok) {
        throw new Error(
          `Failed to fetch doctor details. Status: ${response.status}`
        );
      }

      const text = await response.text();

      console.log("Doctor API Response:", text);

      if (!text || text.trim() === "") {
        throw new Error("Doctor service returned an empty response.");
      }

      const data = JSON.parse(text);

      console.log("Doctor Details:", data);

      setDoctor(data);

    } catch (error) {
      console.error("Error fetching doctor:", error);
      setError(error.message || "Unable to load doctor details.");
    } finally {
      setLoading(false);
    }
  };

  /* ============================= */
  /* LOADING */
  /* ============================= */

  if (loading) {
    return (
      <div className="doctor-details-container">
        <div className="loading-box">
          <div className="loader"></div>
          <p>Loading your profile...</p>
        </div>
      </div>
    );
  }

  /* ============================= */
  /* ERROR */
  /* ============================= */

  if (error) {
    return (
      <div className="doctor-details-container">
        <div className="error-box">

          <div className="error-icon">
            ⚠️
          </div>

          <h2>Unable to Load Profile</h2>

          <p>{error}</p>

          <button
            className="back-button"
            onClick={() => navigate("/dashboard")}
          >
            ← Back to Dashboard
          </button>

        </div>
      </div>
    );
  }

  /* ============================= */
  /* DOCTOR NOT FOUND */
  /* ============================= */

  if (!doctor) {
    return (
      <div className="doctor-details-container">
        <div className="error-box">

          <div className="error-icon">
            👨‍⚕️
          </div>

          <h2>Doctor Profile Not Found</h2>

          <p>
            We could not find your doctor profile.
          </p>

          <button
            className="back-button"
            onClick={() => navigate("/dashboard")}
          >
            ← Back to Dashboard
          </button>

        </div>
      </div>
    );
  }

  return (
    <div className="doctor-details-container">

      {/* ============================= */}
      {/* HEADER */}
      {/* ============================= */}

      <div className="doctor-details-header">

        <button
          className="back-button"
          onClick={() => navigate("/dashboard")}
        >
          ← Back
        </button>

        <div>
          <h1>My Profile</h1>

          <p className="header-subtitle">
            View your personal and professional information
          </p>
        </div>

      </div>


      {/* ============================= */}
      {/* PROFILE HEADER */}
      {/* ============================= */}

      <div className="doctor-main-card">

        <div className="doctor-avatar">
          👨‍⚕️
        </div>

        <div className="doctor-main-info">

          <h2>
            {doctor.doctorName || "Doctor"}
          </h2>

          <p className="doctor-id">
            Doctor ID:{" "}
            {doctor.doctorId || "Not available"}
          </p>

          <span className="doctor-status">
            ● {doctor.status || "Active"}
          </span>

        </div>

      </div>


      {/* ============================= */}
      {/* PERSONAL INFORMATION */}
      {/* ============================= */}

      <div className="details-card">

        <div className="card-title">

          <span className="title-icon">
            👤
          </span>

          <div>
            <h2>Personal Information</h2>

            <p>
              Your basic personal details
            </p>
          </div>

        </div>


        <div className="details-grid">

          {/* Doctor ID */}

          <div className="detail-item">

            <label>
              Doctor ID
            </label>

            <p>
              {doctor.doctorId || "Not available"}
            </p>

          </div>


          {/* Full Name */}

          <div className="detail-item">

            <label>
              Full Name
            </label>

            <p>
              {doctor.doctorName || "Not available"}
            </p>

          </div>


          {/* Gender */}

          <div className="detail-item">

            <label>
              Gender
            </label>

            <p>
              {doctor.gender || "Not available"}
            </p>

          </div>


          {/* Phone */}

          <div className="detail-item">

            <label>
              Phone Number
            </label>

            <p>
              {doctor.phone || "Not available"}
            </p>

          </div>


          {/* Email */}

          <div className="detail-item">

            <label>
              Email
            </label>

            <p>
              {doctor.email || "Not available"}
            </p>

          </div>

        </div>

      </div>


      {/* ============================= */}
      {/* PROFESSIONAL INFORMATION */}
      {/* ============================= */}

      <div className="details-card">

        <div className="card-title">

          <span className="title-icon">
            🩺
          </span>

          <div>

            <h2>
              Professional Information
            </h2>

            <p>
              Your professional details
            </p>

          </div>

        </div>


        <div className="details-grid">

          {/* Specialization */}

          <div className="detail-item">

            <label>
              Specialization
            </label>

            <p>
              {doctor.specialization || "Not available"}
            </p>

          </div>


          {/* Qualification */}

          <div className="detail-item">

            <label>
              Qualification
            </label>

            <p>
              {doctor.qualification || "Not available"}
            </p>

          </div>


          {/* Experience */}

          <div className="detail-item">

            <label>
              Experience
            </label>

            <p>
              {doctor.experience || "Not available"}
            </p>

          </div>


          {/* Status */}

          <div className="detail-item">

            <label>
              Professional Status
            </label>

            <p className="active-text">
              {doctor.status || "Active"}
            </p>

          </div>

        </div>

      </div>


      {/* ============================= */}
      {/* FOOTER */}
      {/* ============================= */}

      <div className="profile-footer">

        <button
          className="dashboard-button"
          onClick={() => navigate("/dashboard")}
        >
          Go to Dashboard
        </button>

      </div>

    </div>
  );
};

export default DoctorDetails;