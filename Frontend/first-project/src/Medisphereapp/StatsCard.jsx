import React from "react";
import "./StatsCard.css";

const StatsCard = ({ title, value, subtitle }) => {
  return (
    <div className="stat-card">
      <h5>{title}</h5>
      <h2>{value}</h2>
      <p>{subtitle}</p>
    </div>
  );
};

export default StatsCard;