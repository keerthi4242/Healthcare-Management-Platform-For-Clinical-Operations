import React, { useEffect, useState } from "react";
import "./PatientFhir.css";
import keycloak from "../keycloak";

const PatientFhir = () => {
  const [patientResource, setPatientResource] = useState(null);
  const [observations, setObservations] = useState([]);

  useEffect(() => {
    const keycloakUserId = "70ded654-7985-4354-b95a-952aaf6088ca";
    // const keycloakUserId = keycloak.tokenParsed.sub;

    fetch(`http://localhost:8080/patients/profile/${keycloakUserId}`)
      .then((res) => res.json())
      .then((patient) => {
        const patientId = patient.patientId;

        fetch(`http://localhost:8084/fhir/patient/${patientId}`)
          .then((res) => res.json())
          .then((data) => setPatientResource(data));

        fetch(`http://localhost:8084/fhir/observation/${patientId}`)
          .then((res) => res.json())
          .then((data) => {
            if (Array.isArray(data)) {
              setObservations(data);
            } else {
              setObservations([]);
            }
          });
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="fhir-container">

      <div className="fhir-header">
        <h1>📄 FHIR Resources</h1>
        <p>View your healthcare data in FHIR format.</p>
      </div>

      {/* Patient Resource */}

      <div className="fhir-card">
        <h2>Patient Resource</h2>

        {patientResource ? (
          <table>
            <tbody>

              <tr>
                <td>FHIR Resource ID</td>
                <td>{patientResource.id}</td>
              </tr>

              <tr>
                <td>Name</td>
                <td>
                  {patientResource.name?.[0]?.given?.join(" ")}{" "}
                  {patientResource.name?.[0]?.family}
                </td>
              </tr>

              <tr>
                <td>Gender</td>
                <td>{patientResource.gender}</td>
              </tr>

              <tr>
                <td>Date of Birth</td>
                <td>{patientResource.birthDate}</td>
              </tr>

              <tr>
                <td>Address</td>
                <td>{patientResource.address?.[0]?.text}</td>
              </tr>

              <tr>
                <td>Phone</td>
                <td>{patientResource.telecom?.[0]?.value}</td>
              </tr>

            </tbody>
          </table>
        ) : (
          <p>Loading Patient Resource...</p>
        )}
      </div>

      {/* Observation Resources */}

      <div className="fhir-card">
        <h2>Observation Resources</h2>

        {observations.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Observation</th>
                <th>Value</th>
                <th>Unit</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {observations.map((obs) => (
                <tr key={obs.id}>
                  <td>{obs.code?.text}</td>
                  <td>{obs.valueQuantity?.value}</td>
                  <td>{obs.valueQuantity?.unit}</td>
                  <td>{obs.status}</td>
                  <td>{obs.effectiveDateTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No Observation Resources Available.</p>
        )}
      </div>

    </div>
  );
};

export default PatientFhir;