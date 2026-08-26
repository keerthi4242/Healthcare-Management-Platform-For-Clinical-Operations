import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [recentAlerts, setRecentAlerts] = useState([]);
  const [recentPatients, setRecentPatients] = useState([]);
  const [predictionSummary, setPredictionSummary] = useState({
  heart: 0,
  diabetes: 0,
  lowRisk: 0,
});
  const [stats, setStats] = useState({
    patients: 0,
    consents: 0,
     carePlans: 0,
    predictions: 0,
    alerts: 0,
  });

  useEffect(() => {
    // const fetchCount = async (url) => {
    //   try {
    //     const response = await fetch(url);

    //     if (!response.ok) {
    //       throw new Error(`HTTP Error: ${response.status}`);
    //     }

    //     const data = await response.json();

    //     // If API returns { count: 10 }
    //     if (typeof data === "object" && data.count !== undefined) {
    //       return data.count;
    //     }

    //     // If API returns just 10
    //     return data;
    //   } catch (error) {
    //     console.error(`Failed to fetch ${url}`, error);
    //     return 0;
    //   }
    // };
    const fetchCount = async (url) => {
  try {
    const response = await fetch(url);

    console.log("URL:", url);
    console.log("Status:", response.status);

    const text = await response.text();
    console.log("Response:", text);

    // Convert response to number
    const data = JSON.parse(text);

    if (typeof data === "object" && data.count !== undefined) {
      return data.count;
    }

    return data;
  } catch (error) {
    console.error(`Failed to fetch ${url}`, error);
    return 0;
  }
};

    const loadDashboard = async () => {
      const patients = await fetchCount(
        "http://localhost:8080/patients/count"
      );

      const consents = await fetchCount(
        "http://localhost:8087/consents/count"
      );

     const carePlans = await fetchCount(
    "http://localhost:8093/careplan/count"
);
        const predictions = await fetchCount(
        "http://localhost:8089/predict/count"
      );
        const alerts = await fetchCount(
        "http://localhost:8092/alerts/count"
      );
      const alertsResponse = await fetch("http://localhost:8092/alerts");
      const alertsData = await alertsResponse.json();

      setRecentAlerts(alertsData.slice(0, 5));
      const patientResponse = await fetch("http://localhost:8080/patients");
const patientData = await patientResponse.json();

setRecentPatients(patientData.slice(-5).reverse());
const predictionResponse = await fetch("http://localhost:8089/predict");
const predictionData = await predictionResponse.json();

const heart = predictionData.filter(
  (p) => p.predictionType === "Heart"
).length;

const diabetes = predictionData.filter(
  (p) => p.predictionType === "Diabetes"
).length;

const lowRisk = predictionData.filter(
  (p) => p.riskLevel === "LOW"
).length;

setPredictionSummary({
  heart,
  diabetes,
  lowRisk,
});

      setStats({
        patients,
        consents,
      carePlans,
        predictions,
        alerts,
      });
      console.log("Setting Stats:", {
  patients,
  consents,
  fhir,
});
    };

    loadDashboard();
  }, []);

  return (
    <div className="main-dashboard">

      <div className="dashboard-header">
        <div>
          <h1>🏥 Medisphere Dashboard</h1>
          <p>Digital Health Twin Platform</p>
        </div>

        <Link to="/patients" className="view-btn">
          View Patients
        </Link>
      </div>

      <div className="stats-grid">

  <div className="dashboard-card blue">
    <h2>{stats.patients}</h2>
    <p>👥 Total Patients</p>
  </div>

  <div className="dashboard-card green">
    <h2>{stats.consents}</h2>
    <p>📄 Active Consents</p>
  </div>

  <div className="dashboard-card purple">
    <h2>{stats.fhir}</h2>
    <p>❤️ FHIR Resources</p>
  </div>

  <div className="dashboard-card orange">
    <h2>{stats.predictions}</h2>
    <p>🤖 AI Predictions</p>
  </div>

  <div className="dashboard-card red">
    <h2>{stats.alerts}</h2>
    <p>🚨 Critical Alerts</p>
  </div>

  <div className="dashboard-card cyan">
    <h2>🟢</h2>
    <p>Live Monitoring</p>
  </div>

</div>
<div className="dashboard-section">
  <h2>🚨 Recent Alerts</h2>

  {recentAlerts.length === 0 ? (
    <p>No alerts available.</p>
  ) : (
    recentAlerts.map((alert) => (
      <div className="alert-item" key={alert.id}>
        <div>
          <h4>{alert.patientId}</h4>
          <p>{alert.message}</p>
        </div>

        <span className={alert.severity.toLowerCase()}>
          {alert.severity}
        </span>
      </div>
    ))
  )}
</div>
<div className="dashboard-section">
  <h2>🤖 AI Prediction Summary</h2>

  <div className="prediction-grid">

    <div className="prediction-card heart-card">
    <div className="prediction-top">
        <div>
            <h4>Heart Disease</h4>
            <h2>{predictionSummary.heart}</h2>
        </div>
        <span className="prediction-icon">❤️</span>
    </div>
    <small>Total Predictions</small>
</div>

    <div className="prediction-card diabetes-card">
    <div className="prediction-top">
        <div>
            <h4>Diabetes</h4>
            <h2>{predictionSummary.diabetes}</h2>
        </div>

        <span className="prediction-icon">🩸</span>
    </div>

    <small>Total Predictions</small>
</div>

    <div className="prediction-card risk-card">
    <div className="prediction-top">
        <div>
            <h4>Low Risk</h4>
            <h2>{predictionSummary.lowRisk}</h2>
        </div>

        <span className="prediction-icon">🛡️</span>
    </div>

    <small>Healthy Patients</small>
</div>

  </div>
</div>
<div className="dashboard-section">

</div>
<div className="dashboard-section">
  <h2>👥 Recently Added Patients</h2>

  {recentPatients.map((patient) => (
    <div className="patient-item" key={patient.patientId}>
      <div>
        <h4>{patient.patientName}</h4>
        <p>ID: {patient.patientId}</p>
      </div>
    </div>
  ))}
</div>
    </div>
  );
};

export default AdminDashboard;