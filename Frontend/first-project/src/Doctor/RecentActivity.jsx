import React from "react";
import "./RecentActivity.css";

const RecentActivity = () => {
  const activities = [
    {
      title: "Patient Registered",
      description: "Patient profile created successfully.",
      time: "07 Jul 2026 • 10:30 AM",
    },
    {
      title: "FHIR Resource Generated",
      description: "Patient and Observation resources created.",
      time: "07 Jul 2026 • 11:15 AM",
    },
    {
      title: "Consent Granted",
      description: "Treatment consent is ACTIVE.",
      time: "08 Jul 2026 • 09:00 AM",
    },
    {
      title: "Vitals Updated",
      description: "Heart Rate and Blood Pressure updated.",
      time: "09 Jul 2026 • 04:45 PM",
    },
  ];

  return (
    <div className="activity-card">
      <h2>🕒 Recent Activity</h2>

      <div className="activity-list">
        {activities.map((activity, index) => (
          <div className="activity-item" key={index}>
            <div className="activity-dot"></div>

            <div className="activity-content">
              <h4>{activity.title}</h4>
              <p>{activity.description}</p>
              <span>{activity.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;