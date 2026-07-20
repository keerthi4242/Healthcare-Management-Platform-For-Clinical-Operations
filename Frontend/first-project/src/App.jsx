import { Routes, Route } from "react-router-dom";
import React from "react";

import Navbar from "./Medisphereapp/Navbar";
import Sidebar from "./Medisphereapp/Sidebar";

import Dashboard from "./Medisphereapp/Dashboard";
import Patients from "./Medisphereapp/Patients";
import AIPrediction from "./Medisphereapp/AI_Prediction/AIPrediction";
import ModelManagement from "./Medisphereapp/components/ModelManagement";

import "./App.css";

function App() {
  return (
    <>
      <Navbar />

      <div className="app-layout">
        <Sidebar />

        <Routes>
          <Route path="/patient/:id" element={<Dashboard />} />
          <Route path="/patients" element={<Patients />} />
        {/* <Route
  path="/patient/:id/ai-prediction"
  element={<AIPrediction />}
/> */}
<Route
    path="/patient/:id/ai-prediction"
    element={<AIPrediction />}
/>
  <Route path="/model-management" element={<ModelManagement />} />
        </Routes>
      </div>
    </>
  );
}

export default App;