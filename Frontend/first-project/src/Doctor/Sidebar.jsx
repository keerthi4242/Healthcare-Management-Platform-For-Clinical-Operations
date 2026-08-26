import React from 'react'
import { Link } from "react-router-dom";
import "./sidebar.css"
import { FaBell } from "react-icons/fa";
import keycloak from "../keycloak";
const Sidebar = () => {
  const handleLogout = () => {
  keycloak.logout({
    redirectUri: "http://localhost:5173/",
  });
};
  return (
    <div className='sidebar'>
      <ul>
   <li>   <Link to="/dashboard">🏠 Dashboard</Link></li>
   <li>
    <Link to="/doctor/profile">👤 My Profile</Link>
</li>
   <li> <Link to="/patients">👥 Patients</Link></li>
 <li>
  <Link to="/doctor/patients">❤️ My Patients</Link>
</li>
   <li>
  <Link to="/alert-management">
    <FaBell className="icon" />
    <span>  Critical Alert</span>
  </Link>
</li>
<li> <Link to="/doctor/care-plans"> 
<span className="menu-icon">📋</span> 
<span>Care Plans</span> </Link> </li>
<button onClick={handleLogout} className="logout-btn">
    🚪 Logout
  </button>
</ul>
    </div>
  )
}

export default Sidebar