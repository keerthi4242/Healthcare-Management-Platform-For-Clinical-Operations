import React from "react";
import "./QuickActions.css";

const QuickActions = () => {
  return (
    <div className="actions-card">

      <h2>⚡ Quick Actions</h2>

      <div className="actions-grid">

        <button className="action-btn">
          ➕ Add Patient
        </button>

        <button className="action-btn">
          📋 View Consent
        </button>

        <button className="action-btn">
          📄 View FHIR
        </button>

        <button className="action-btn">
          ❤️ Update Vitals
        </button>

        <button className="action-btn">
          🧬 Health Twin
        </button>

        <button className="action-btn">
          📊 Generate Report
        </button>

      </div>

    </div>
  );
};

export default QuickActions;