import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  const [stats, setStats] = useState({
  myPatients: 0,
  pendingPredictions: 0,
  criticalAlerts: 0,
  highRiskPatients: 0,
  appointments: 0,
});
 const [doctor, setDoctor] = useState(null);

  useEffect(() => {
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
  // const myPatients = await fetchCount(
  //   "http://localhost:8080/patients/count"
  // );
  const doctorId = "6a6ec6b54a7e2bb852290339"; // Temporary

const response = await fetch(
  `http://localhost:8091/assignments/doctor/${doctorId}`
);

  const pendingPredictions = await fetchCount(
    "http://localhost:8089/predict/count"
  );

  const criticalAlerts = await fetchCount(
    "http://localhost:8092/alerts/count"
  );

  // Temporary values until you create APIs
  const highRiskPatients = 0;
  const appointments = 0;
  const assignments = await response.json();

  const myPatients = assignments.length;

  setStats({
    myPatients,
    pendingPredictions,
    criticalAlerts,
    highRiskPatients,
    appointments,
  });

  console.log("Setting Stats:", {
    myPatients,
    pendingPredictions,
    criticalAlerts,
    highRiskPatients,
    appointments,
  });
};

    loadDashboard();
  }, []);

  return (
    <div className="main-dashboard">

      <div className="dashboard-header">
        <div>
<h1>
  👨‍⚕️ Welcome, Dr. Ananya Reddy
</h1>
          <p>Monitor your assigned patients and health alerts.</p>

        </div>

        <Link to="/patients" className="view-btn">
          My Patients
        </Link>
      </div>

     <div className="stats-grid">

  <div className="dashboard-card blue">
    <h2>{stats.myPatients}</h2>
    <p>👥 My Patients</p>
  </div>

  <div className="dashboard-card red">
    <h2>{stats.criticalAlerts}</h2>
    <p>🚨 Critical Alerts</p>
  </div>

  <div className="dashboard-card orange">
    <h2>{stats.pendingPredictions}</h2>
    <p>🤖 Pending AI Predictions</p>
  </div>

  <div className="dashboard-card purple">
    <h2>{stats.highRiskPatients}</h2>
    <p>❤️ High-Risk Patients</p>
  </div>

  <div className="dashboard-card green">
    <h2>{stats.appointments}</h2>
    <p>📅 Today's Appointments</p>
  </div>

  <div className="dashboard-card cyan">
    <h2>🟢</h2>
    <p>Live Monitoring</p>
  </div>

</div>

    </div>
  );
};

export default Dashboard;