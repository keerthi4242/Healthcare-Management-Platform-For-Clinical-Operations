import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./PatientNavbar";
import Sidebar from "./Sidebar";

const PatientLayout = () => {
  return (
    <>
      <Navbar />

      <div style={{ display: "flex" }}>
        <Sidebar />

        <div
          style={{
            marginLeft: "250px",
            marginTop: "70px",
            padding: "30px",
            width: "100%",
            background: "#f5f7fb",
            minHeight: "100vh",
          }}
        >
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default PatientLayout;