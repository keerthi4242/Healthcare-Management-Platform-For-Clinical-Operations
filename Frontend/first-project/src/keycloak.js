import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: "http://localhost:9090",
  realm: "medisphere",
  clientId: "medisphere-client",
});

export default keycloak;