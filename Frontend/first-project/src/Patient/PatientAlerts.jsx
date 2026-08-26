import React, { useEffect, useState } from "react";
import "./PatientAlerts.css";
import keycloak from "../keycloak";

const PatientAlerts = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const keycloakUserId = "70ded654-7985-4354-b95a-952aaf6088ca";
    // const keycloakUserId = keycloak.tokenParsed.sub;

    fetch(`http://localhost:8080/patients/profile/${keycloakUserId}`)
      .then((res) => res.json())
      .then((patient) => {
        return fetch(
          `http://localhost:8092/alerts/patient/${patient.patientId}`
        );
      })
      .then((res) => res.json())
      .then((data) => setAlerts(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="alerts-container">
      <div className="alerts-header">
        <h1>🚨 Health Alerts</h1>
        <p>Your latest health notifications and alerts.</p>
      </div>

      {alerts.length === 0 ? (
        <div className="no-alerts">
          No alerts available.
        </div>
      ) : (
        alerts.map((alert) => (
          <div
            className={`alert-card ${alert.severity?.toLowerCase()}`}
            key={alert.id}
          >
            <h3>{alert.alertType}</h3>

            <p>{alert.message}</p>

            <div className="alert-footer">
              <span>{alert.severity}</span>
              <span>{alert.createdAt}</span>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default PatientAlerts;