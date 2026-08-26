import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminAlertManagement.css";

const AdminAlertManagement = () => {
  const [alerts, setAlerts] = useState([]);
  const [filteredAlerts, setFilteredAlerts] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [loading, setLoading] = useState(true);

  const API_URL = "http://localhost:8092/alerts";

  // Fetch Alerts
  const fetchAlerts = async () => {
    try {
      const response = await axios.get(API_URL);
      setAlerts(response.data);
      setFilteredAlerts(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching alerts:", error);
      setLoading(false);
    }
  };
  const acknowledgeAlert = async (id) => {
  try {
    await axios.put(`http://localhost:8092/alerts/${id}/acknowledge`);
    fetchAlerts();
  } catch (error) {
    console.error(error);
  }
};

const closeAlert = async (id) => {
  try {
    await axios.put(`http://localhost:8092/alerts/${id}/close`);
    fetchAlerts();
  } catch (error) {
    console.error(error);
  }
};

  // Auto Refresh Every 5 Seconds
  useEffect(() => {
    fetchAlerts();

    const interval = setInterval(() => {
      fetchAlerts();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Search & Filter
  useEffect(() => {
    let temp = [...alerts];

    if (search !== "") {
      temp = temp.filter((alert) =>
        alert.patientId.toString().includes(search)
      );
    }

    if (statusFilter !== "ALL") {
      temp = temp.filter((alert) => alert.status === statusFilter);
    }

    setFilteredAlerts(temp);
  }, [search, statusFilter, alerts]);

  // Severity Badge
  const severityClass = (severity) => {
    switch (severity) {
      case "CRITICAL":
        return "critical";
      case "HIGH":
        return "high";
      default:
        return "normal";
    }
  };

  // Status Badge
  const statusClass = (status) => {
    switch (status) {
      case "NEW":
        return "new";
      case "ACKNOWLEDGED":
        return "ack";
      case "CLOSED":
        return "closed";
      default:
        return "";
    }
  };

  // Dashboard Counts
  const totalAlerts = alerts.length;
  const criticalAlerts = alerts.filter(
    (a) => a.severity === "CRITICAL"
  ).length;
  const highAlerts = alerts.filter((a) => a.severity === "HIGH").length;
  const newAlerts = alerts.filter((a) => a.status === "NEW").length;

  return (
    <div className="alert-container">

      <h2>Alert Management</h2>

      {/* Dashboard Cards */}

      <div className="alert-cards">

        <div className="card">
          <h3>Total Alerts</h3>
          <p>{totalAlerts}</p>
        </div>

        <div className="card critical-card">
          <h3>Critical</h3>
          <p>{criticalAlerts}</p>
        </div>

        <div className="card high-card">
          <h3>High</h3>
          <p>{highAlerts}</p>
        </div>

        <div className="card new-card">
          <h3>New</h3>
          <p>{newAlerts}</p>
        </div>

      </div>

      {/* Search & Filter */}

      <div className="alert-toolbar">

        <input
          type="text"
          placeholder="Search by Patient ID"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="ALL">All Status</option>
          <option value="NEW">NEW</option>
          <option value="ACKNOWLEDGED">ACKNOWLEDGED</option>
          <option value="CLOSED">CLOSED</option>
        </select>

      </div>

      {/* Table */}

      {loading ? (
        <h3>Loading Alerts...</h3>
      ) : (
        <table className="alert-table">

          <thead>
            <tr>
              <th>Patient ID</th>
              <th>Severity</th>
              <th>Message</th>
              <th>Heart Rate</th>
              <th>SpO₂</th>
              <th>Temperature</th>
              <th>BP</th>
              <th>Resp. Rate</th>
              <th>Status</th>
              <th>Created At</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {filteredAlerts.length === 0 ? (
              <tr>
                <td colSpan="11">No Alerts Found</td>
              </tr>
            ) : (
              filteredAlerts.map((alert) => (
                <tr key={alert.id}>

                  <td>{alert.patientId}</td>

                  <td>
                    <span className={`severity ${severityClass(alert.severity)}`}>
                      {alert.severity}
                    </span>
                  </td>

                  <td>{alert.message}</td>

                  <td>{alert.heartRate}</td>

                  <td>{alert.spo2}%</td>

                  <td>{alert.temperature.toFixed(1)} °C</td>

                  <td>
                    {alert.systolicBP}/{alert.diastolicBP}
                  </td>

                  <td>{alert.respiratoryRate}</td>

                  <td>
                    <span className={`status ${statusClass(alert.status)}`}>
                      {alert.status}
                    </span>
                  </td>

                  <td>
                    {new Date(alert.createdAt).toLocaleString()}
                  </td>
                  <td>
  {alert.status === "NEW" && (
    <button
      className="btn btn-warning btn-sm"
      onClick={() => acknowledgeAlert(alert.id)}
    >
      Acknowledge
    </button>
  )}

  {alert.status === "ACKNOWLEDGED" && (
    <button
      className="btn btn-success btn-sm"
      onClick={() => closeAlert(alert.id)}
    >
      Close
    </button>
  )}

  {alert.status === "CLOSED" && (
    <span>Completed</span>
  )}
</td>

                </tr>
              ))
            )}

          </tbody>

        </table>
      )}

    </div>
  );
};

export default AdminAlertManagement;