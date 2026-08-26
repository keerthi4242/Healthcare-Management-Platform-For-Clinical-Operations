import React from "react";
import "./PatientNavbar.css";

const Navbar = () => {
  return (
    <div className="patient-navbar">

      <div className="logo">
        🏥 <span>MediSphere</span>
      </div>

      <div className="patient-title">
        Patient Portal
      </div>

    </div>
  );
};

export default Navbar;