// import React from 'react'
// import keycloak from "../keycloak";
// import "./style.css"
// const Heading=()=>{
//     return (
//         <h2 className='heading'>MileStone1:FHIR Integration and Twin Foundation</h2>
//     )
// }
// const Rightside=()=>{
//     return(
//         <h4 className='right'>clinician|Logout</h4>
//     )
// }

// const Navbar = () => {
//   return (
//     <div className='navbar'>
//         <h1 className='logo'>MediSphere</h1>
//          <Heading/>
//          <Rightside/>
//     </div>

//   )
// }

// export default Navbar
import React from "react";
import keycloak from "../keycloak"; 
import "./style.css";

const Heading = () => {
  return (
    <h2 className="heading">
      Patient 360 Dashboard
    </h2>
  );
};

const Navbar = () => {
  const username = keycloak.tokenParsed?.preferred_username;
  const roles = keycloak.tokenParsed?.realm_access?.roles || [];
  const userRole = roles.find(role =>
  ["ADMIN", "DOCTER", "PATIENT"].includes(role)
);

  return (
    <div className="navbar">
      <h1 className="logo">MediSphere</h1>

      <Heading />

      <div className="right">
        {/* <span>
          {username} ({roles.join(", ")})
        </span> */}
        <span>
    👨‍⚕️ {username} ({userRole})
</span>
        <button
          onClick={() => keycloak.logout()}
          style={{ marginLeft: "15px" }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;