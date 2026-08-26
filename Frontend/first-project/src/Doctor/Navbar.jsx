
import React from "react";
import keycloak from "../keycloak"; 
import "./style.css";

const Heading = () => {
  return (
    <h2 className="heading">
      Doctor Portal
    </h2>
  );
};

const Navbar = () => {
 const username = keycloak.tokenParsed?.preferred_username;
const userRole = "DOCTOR";

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
      </div>
    </div>
  );
};

export default Navbar;