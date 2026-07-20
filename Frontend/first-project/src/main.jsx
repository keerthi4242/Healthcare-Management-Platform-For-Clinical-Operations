import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.jsx'
import keycloak from "./keycloak";

keycloak
  .init({
    onLoad: "login-required",
    checkLoginIframe: false,
  })
  .then((authenticated) => {
    if (!authenticated) {
      console.log("User is not authenticated");
    }

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
          <App />
        </BrowserRouter>
  </StrictMode>,
);
  })
  .catch((err) => {
    console.error("Keycloak initialization failed:", err);
  });