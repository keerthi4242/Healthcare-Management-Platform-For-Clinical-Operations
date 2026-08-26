import React from "react";
import "./AdminNavbar.css";

const AdminNavbar = () => {
  return (
    <nav className="admin-navbar">
      <div className="admin-logo">
        <h2>Medisphere Admin</h2>
      </div>

      <div className="admin-profile">
        <span>Welcome, Admin</span>

        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt="Admin"
        />
      </div>
    </nav>
  );
};

export default AdminNavbar;