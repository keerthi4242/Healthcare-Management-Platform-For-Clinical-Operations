import React, { useEffect, useState } from "react";
import "./ConsentCard.css";

const ConsentCard = ({ patientId }) => {
  const [consent, setConsent] = useState(null);

  useEffect(() => {
  fetch(`http://localhost:8087/consents/patient/${patientId}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to fetch consent");
      }
      return res.json();
    })
    .then((data) => setConsent(data))
    .catch((err) => console.error(err));
}, []);

  if (!consent) {
    return <h2>Loading Consent...</h2>;
  }

  return (
    <div className="consent-card">
      <h2>📋 Consent Status</h2>

      <div className="consent-grid">

        <div className="consent-box">
          <h4>Status</h4>
          <p className="active">{consent.status}</p>
        </div>

        <div className="consent-box">
          <h4>Permission</h4>
          <p>{consent.permission}</p>
        </div>

        <div className="consent-box">
          <h4>Purpose</h4>
          <p>{consent.purpose}</p>
        </div>

        <div className="consent-box">
          <h4>Start Date</h4>
          <p>{consent.startDate}</p>
        </div>

        <div className="consent-box">
          <h4>Expiry Date</h4>
          <p>{consent.expiryDate}</p>
        </div>

      </div>
    </div>
  );
};

export default ConsentCard;