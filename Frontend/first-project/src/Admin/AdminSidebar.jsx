import React from "react";
import { NavLink } from "react-router-dom";
import "./AdminSidebar.css";
import keycloak from "../keycloak";

const AdminSidebar = () => {
  return (
    <div className="admin-sidebar">

      <NavLink
        to="/admin/dashboard"
        className={({ isActive }) =>
          isActive ? "admin-link active" : "admin-link"
        }
      >
        🏠 Dashboard
      </NavLink>

      <NavLink
        to="/admin/patients"
        className={({ isActive }) =>
          isActive ? "admin-link active" : "admin-link"
        }
      >
        👥 Patient Management
      </NavLink>

      <NavLink
        to="/admin/doctors"
        className={({ isActive }) =>
          isActive ? "admin-link active" : "admin-link"
        }
      >
        👨‍⚕️ Doctor Management
      </NavLink>
     <NavLink
  to="/admin/model-management"
  className={({ isActive }) =>
    isActive ? "admin-link active" : "admin-link"
  }
>
  🤖 Model Management
</NavLink>

<NavLink
  to="/admin/alert-management"
  className={({ isActive }) =>
    isActive ? "admin-link active" : "admin-link"
  }
>
  🚨 Alert Management
</NavLink>
<NavLink
    to="/admin/careplans"
    className={({ isActive }) =>
        isActive ? "admin-link active" : "admin-link"
    }
>
    📋 Care Plan Monitoring
</NavLink>

      {/* <NavLink
        to="/"
        className="admin-link logout"
      >
        🚪 Logout
      </NavLink> */}
      <button
  onClick={() =>
    keycloak.logout({
      redirectUri: "http://localhost:5173",
    })
  }
>
  Logout
</button>

    </div>
  );
};

export default AdminSidebar;