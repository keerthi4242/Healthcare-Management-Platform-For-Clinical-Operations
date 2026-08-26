import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import "./App.css";

// Doctor
import Navbar from "./Doctor/Navbar";
import Sidebar from "./Doctor/Sidebar";
import Dashboard from "./Doctor/Dashboard";
import DoctorPatientDashboard from "./Doctor/PatientDashboard";
import Patients from "./Doctor/Patients";
import AIPrediction from "./Doctor/AI_Prediction/AIPrediction";

import AlertManagement from "./Doctor/AI_Prediction/components/AlertManagement";
import MyPatients from "./Doctor/MyPatients";
import DoctorProfile from "./Doctor/DoctorDetails";
import DoctorCarePlans from "./Doctor/DoctorCarePlans";


// Login
import Home from "./Home";

// Admin
import AdminLayout from "./Admin/AdminLayout";
import AdminDashboard from "./Admin/AdminDashboard";
import PatientManagement from "./Admin/PatientManagement";
import DoctorManagement from "./Admin/DoctorManagement";
import DoctorDetails from "./Admin/DoctorDetails";
import DoctorAssignment from "./Admin/DoctorAssignment";
import AdminModelManagement from "./Admin/AdminModelManagement";
import AdminAlertManagement from "./Admin/AdminAlertManagement";
import Adminpatient360dashboard from "./Admin/Adminpatient360dashboard";
import AdminCarePlans from "./Admin/AdminCarePlans";


//import PatientDashboardd from "./Patient/PatientDashboardd";
import PatientLayout from "./Patient/PatientLayout";
import PatientDashboard from "./Patient/PatientDashboard";
import PatientProfile from "./Patient/PatientProfile";
import PatientHealth from "./Patient/PatientHealthTwin";
import PatientFhir from "./Patient/PatientFhir";
import PatientConsent from "./Patient/PatientConsent";
import PatientAIPrediction from "./Patient/PatientAIPrediction";
import PatientAlerts from "./Patient/PatientAlerts";
import PatientCarePlan from "./Patient/PatientCarePlan";
function App() {
  const location = useLocation();

  const doctorRoutes = [
    "/dashboard",
    "/patients",
      "/doctor/patients",
    "/doctor/profile",
    "/alert-management",
     "/doctor/care-plans",
  ];

  // const showDoctorLayout =
  //   doctorRoutes.includes(location.pathname) ||
  //   location.pathname.startsWith("/patient/");
 const showDoctorLayout =
  doctorRoutes.includes(location.pathname) ||
  /^\/doctor\/care-plans\/[^/]+$/.test(location.pathname) ||
  /^\/patient\/[^/]+\/ai-prediction$/.test(location.pathname) ||
  (
    /^\/patient\/[^/]+$/.test(location.pathname) &&
    ![
      "/patient/dashboard",
      "/patient/profile",
      "/patient/health",
      "/patient/fhir",
      "/patient/consent",
      "/patient/ai-prediction",
      "/patient/alerts",
      "/patient/care-plan",
    ].includes(location.pathname)
  );

  if (showDoctorLayout) {
    return (
      <>
        <Navbar />

        <div className="app-layout">
          <Sidebar />

          <div className="main-content">
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/patients" element={<Patients />} />
              <Route path="/doctor/patients" element={<MyPatients />} />
              <Route
  path="/patient/:id"
  element={<DoctorPatientDashboard />}
/>
              <Route
                path="/patient/:id/ai-prediction"
                element={<AIPrediction />}
              />
              <Route
                path="/alert-management"
                element={<AlertManagement />}
              />
              <Route
    path="/doctor/profile"
    element={<DoctorProfile />}
/>
 <Route
    path="/doctor/care-plans"
    element={<DoctorCarePlans />}
  />
  <Route
    path="/doctor/care-plans/:patientId"
    element={<DoctorCarePlans />}
  />
            </Routes>
          </div>
        </div>
      </>
    );
  }

  // Login, Admin and Patient pages (No Doctor Navbar & Sidebar)
  return (
    <Routes>
     <Route path="/" element={<Home />} />
      
       {/* <Route path="/admin" element={<AdminLayout />}/>
      <Route path="/admin/dashboard" element={<AdminDashboard />} /> */}
      <Route path="/admin" element={<AdminLayout />}>
  <Route path="dashboard" element={<AdminDashboard />} />
   <Route path="patients" element={<PatientManagement />} />
    <Route path="doctors" element={<DoctorManagement />} />
       <Route
            path="doctor/:id"
            element={<DoctorDetails />}
            />
     <Route
    path="doctor/:doctorId/assign"
    element={<DoctorAssignment />}
  />
   <Route
    path="model-management"
    element={<AdminModelManagement />}
  />

  <Route
    path="alert-management"
    element={<AdminAlertManagement />}
  />
  <Route
  path="patient/:id"
  element={<Adminpatient360dashboard />}/>
  <Route
    path="/admin/careplans"
    element={<AdminCarePlans />}
/>
</Route>
<Route path="/patient" element={<PatientLayout />}>
  <Route path="dashboard" element={<PatientDashboard />} />
  <Route path="profile" element={<PatientProfile />} />
  <Route path="health" element={<PatientHealth />} />
  <Route path="fhir" element={<PatientFhir />} />
<Route path="consent" element={<PatientConsent />} />
  <Route
    path="ai-prediction"
    element={<PatientAIPrediction />}
  />
  <Route
    path="alerts"
    element={<PatientAlerts />}
  />
  <Route
    path="/patient/care-plan"
    element={<PatientCarePlan />}
/>
</Route>

      
    </Routes>
  );

}
export default App;