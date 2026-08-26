import React,{ useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./Adminpatient360dashboard.css";
import StatsCard from "../Doctor/StatsCard";
import PatientSummary from "../Doctor/PatientSummary";
import VitalCards from "../Doctor/VitalCards";
import HealthTwinCard from "../Doctor/HealthTwinCard";
import ConsentCard from "../Doctor/ConsentCard";
import FhirCard from "../Doctor/FhirCard";

const Adminpatient360dashboard = () => {
  const { id } = useParams();
  const [counts, setCounts] = useState({
  patients: 0,
  consents: 0,
  fhir: 0,
});
useEffect(() => {
  Promise.all([
    fetch("http://localhost:8080/patients/count").then(res => res.json()),
    fetch("http://localhost:8087/consents/count").then(res => res.json()),
    fetch("http://localhost:8084/fhir/count").then(res => res.json())
  ])
    .then(([patients, consents, fhir]) => {
      setCounts({
        patients,
        consents,
        fhir,
      });
    })
    .catch(err => console.error("Error fetching dashboard data:", err));
}, []);
  return (
    <div className="dashboard">

      <h2>Patient 360 Dashboard</h2>
      <div className="stats">

        <StatsCard
          title="👥 Patients Onboarded"
          value={counts.patients}
          subtitle="Registered patients"
        />
        <StatsCard
    title="📋 Active Consents"
    value={counts.consents}
    subtitle="Consents"
  />

        <StatsCard
          title="📄 FHIR Resources"
          value={counts.fhir}
          subtitle="Generated Resources"
        />

        <StatsCard
          title="❤️ Live Monitoring"
  value="Active"
  subtitle="Real-time Monitoring"
        />


      </div>
         
         <div className="dashboard-grid">
        <PatientSummary patientId={id} />
<VitalCards patientId={id} />
<HealthTwinCard patientId={id} />
<ConsentCard patientId={id} />
<FhirCard patientId={id} />
         </div>
    </div>
  );
};

export default Adminpatient360dashboard;