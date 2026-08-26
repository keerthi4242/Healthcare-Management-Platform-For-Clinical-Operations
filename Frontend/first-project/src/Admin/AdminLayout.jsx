import React from "react";
import { Outlet } from "react-router-dom";

import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = () => {
  return (
    <>
      <AdminNavbar />

      <div className="app-layout">
        <AdminSidebar />

        <div
          className="main-content"
          style={{
            marginLeft: "250px",
            marginTop: "70px",
            padding: "20px",
            width: "100%",
          }}
        >
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default AdminLayout;