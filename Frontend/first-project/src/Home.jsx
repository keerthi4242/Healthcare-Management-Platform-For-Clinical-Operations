// import React from "react";
// import { Navigate } from "react-router-dom";
// import keycloak from "./keycloak";

// function Home() {
//   const roles = keycloak.tokenParsed?.realm_access?.roles || [];

//   if (roles.includes("DOCTOR")) {
//     return <Navigate to="/dashboard" replace />;
//   }

//   if (roles.includes("ADMIN")) {
//     return <Navigate to="/admin/dashboard" replace />;
//   }

//   if (roles.includes("PATIENT")) {
//     return <Navigate to="/patient/dashboard" replace />;
//   }

//   return <h2>Unauthorized</h2>;
// }

// export default Home;
import React from "react";
import { Navigate } from "react-router-dom";
import keycloak from "./keycloak";

function Home() {
  console.log(keycloak.tokenParsed);
  console.log(keycloak.tokenParsed?.realm_access?.roles);

  const roles = keycloak.tokenParsed?.realm_access?.roles || [];

  if (roles.includes("DOCTOR")) {
    return <Navigate to="/dashboard" replace />;
  }

  if (roles.includes("ADMIN")) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  if (roles.includes("PATIENT")) {
    return <Navigate to="/patient/dashboard" replace />;
  }

  return <h2>Unauthorized</h2>;
}

export default Home;