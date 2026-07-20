import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Patients.css";

const Patients = () => {

    const [patients, setPatients] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {

        fetch("http://localhost:8080/patients")
            .then(res => res.json())
            .then(data => setPatients(data))
            .catch(err => console.error(err));

    }, []);

    return (
        <div className="patients-page">

            <h2>Patients</h2>

            <table>

                <thead>

                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Gender</th>
                        <th>Date of Birth</th>
                        <th>Action</th>
                    </tr>

                </thead>

                <tbody>

                    {patients.map(patient => (

                        <tr key={patient.patientId}>

                            <td>{patient.patientId}</td>

                            <td>{patient.patientName}</td>

                            <td>{patient.patientGender}</td>

                            <td>{patient.patientbirthDate}</td>

                            <td>
<button onClick={() => navigate(`/patient/${patient.patientId}`)}>
    View
</button>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );

};

export default Patients;