import React from 'react'
import { Link } from "react-router-dom";
import "./sidebar.css"
const Sidebar = () => {
  return (
    <div className='sidebar'>
      <ul>
   <li>   <Link to="/patients">🏠 Dashboard</Link></li>
   <li> <Link to="/patients">👥 Patients</Link></li>
<li>
    <Link to="/ai-prediction">
        🤖 AI Prediction
    </Link>
</li>
<li>
<Link to="/model-management">
    🧠 Model Management
</Link></li>
   <li>❤️ Vitals</li>
   <li>📄 FHIR</li>
   <li>🧬 Digital Twin</li>
   <li>📋 Consent</li>
   <li>📊 Reports</li>
</ul>
    </div>
  )
}

export default Sidebar