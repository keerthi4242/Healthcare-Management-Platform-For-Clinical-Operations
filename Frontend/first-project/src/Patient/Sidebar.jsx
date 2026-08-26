import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import keycloak from "../keycloak";

const Sidebar = () => {

  const logout = () => {
    keycloak.logout({
      redirectUri: "http://localhost:5173",
    });
  };

  return (
    <div className="patient-sidebar">

      <ul>

        <li>
          <Link to="/patient/dashboard">
            🏠 Dashboard
          </Link>
        </li>

        <li>
          <Link to="/patient/profile">
            👤 My Profile
          </Link>
        </li>

        <li>
          <Link to="/patient/ai-prediction">
            🤖 AI Prediction
          </Link>
        </li>

        <li>
          <Link to="/patient/health">
            🧬 Digital Health Twin
          </Link>
        </li>

        <li>
          <Link to="/patient/fhir">
            📄 FHIR Resources
          </Link>
        </li>

        <li>
          <Link to="/patient/consent">
            🔐 Consent
          </Link>
        </li>

        <li>
          <Link to="/patient/alerts">
            🚨 Alerts
          </Link>
        </li>
          <li>
    <Link to="/patient/care-plan">
      <span>📋</span>
      <span>Care Plan</span>
    </Link>
  </li>

        <li className="logout-item" onClick={logout}>
          🚪 Logout
        </li>

      </ul>

    </div>
  );
};

export default Sidebar;