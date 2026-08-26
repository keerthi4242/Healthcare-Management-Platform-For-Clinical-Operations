import React, { useEffect, useState } from "react";
import "./PatientConsent.css";
import keycloak from "../keycloak";

const PatientConsent = () => {
  const [consent, setConsent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const keycloakUserId = "70ded654-7985-4354-b95a-952aaf6088ca";
    // const keycloakUserId = keycloak.tokenParsed.sub;

    fetch(`http://localhost:8080/patients/profile/${keycloakUserId}`)
      .then((res) => res.json())
      .then((patient) => {
        return fetch(
          `http://localhost:8087/consents/patient/${patient.patientId}`
        );
      })
      .then((res) => res.json())
      .then((data) => {
        setConsent(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <h2>Loading Consent...</h2>;
  }

  return (
    <div className="consent-container">
      <div className="consent-header">
        <h1>🔐 Consent Management</h1>
        <p>View your healthcare data sharing consent.</p>
      </div>

      {consent ? (
       <div className="consent-card">

  <div className="consent-row">
    <span>Status</span>
    <span
      className={
        consent.status === "ACTIVE"
          ? "status granted"
          : "status revoked"
      }
    >
      {consent.status}
    </span>
  </div>

  <div className="consent-row">
    <span>Purpose</span>
    <span>{consent.purpose}</span>
  </div>

  <div className="consent-row">
    <span>Permission</span>
    <span>{consent.permission}</span>
  </div>

  <div className="consent-row">
    <span>Doctor ID</span>
    <span>{consent.doctorId}</span>
  </div>

  <div className="consent-row">
    <span>Start Date</span>
    <span>{new Date(consent.startDate).toLocaleDateString()}</span>
  </div>

  <div className="consent-row">
    <span>Expiry Date</span>
    <span>{new Date(consent.expiryDate).toLocaleDateString()}</span>
  </div>

</div>
      ) : (
        <div className="no-consent">
          <h3>No Consent Record Found</h3>
          <p>Please contact your healthcare provider.</p>
        </div>
      )}
    </div>
  );
};

export default PatientConsent;