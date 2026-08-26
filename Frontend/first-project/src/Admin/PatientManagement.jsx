import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PatientManagement.css";
const PatientManagement = () => {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
const [editing, setEditing] = useState(false);
const [viewPatient, setViewPatient] = useState(null);

const [formData, setFormData] = useState({
  patientId:"",
  patientName: "",
  patientDisease: "",
  patientGender: "",
  patientNumber: ""
});

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/patients")
      .then((res) => res.json())
      .then((data) => setPatients(data))
      .catch((err) => console.error(err));
  }, []);

  const deletePatient = async (id) => {
    if (!window.confirm("Are you sure you want to delete this patient?")) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/patients/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setPatients((prev) =>
          prev.filter((patient) => patient.patientId !== id)
        );
        alert("Patient deleted successfully.");
      } else {
        alert("Failed to delete patient.");
      }
    } catch (error) {
      console.error(error);
      alert("Error deleting patient.");
    }
  };
   const savePatient = async () => {
  try {
 const url = editing
  ? `http://localhost:8080/patients/${formData.patientId}`
  : "http://localhost:8080/patients";

    const response = await fetch(url, {
      method: editing ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Failed to save patient");
    }
    alert(editing ? "Patient updated successfully!" : "Patient added successfully!");

  } catch (error) {
    console.error(error);
    alert("Error saving patient.");
  }
};
const filteredPatients = patients.filter((patient) =>
  patient.patientName.toLowerCase().includes(search.toLowerCase())
);
  

  return (
    <div className="patient-management">

     <div className="patient-header">

    <h1>👥 Patient Management</h1>

    <div className="header-actions">

        <input
            type="text"
            placeholder="Search patient..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
        />

        <button
            className="add-btn"
            onClick={() => {
                setEditing(false);

                setFormData({
                  patientId:"",
                    patientName: "",
                    patientDisease: "",
                    patientGender: "",
                    patientNumber: ""
                });

                setShowModal(true);
            }}
        >
            ➕ Add Patient
        </button>

    </div>

</div>

      <table className="patient-table">

        <thead>

          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Disease</th>
            <th>Gender</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>

        </thead>

        <tbody>

          {filteredPatients.map((patient) => (

            <tr key={patient.patientId}>

              <td>{patient.patientId}</td>

              <td>{patient.patientName}</td>

              <td>{patient.patientDisease}</td>

              <td>{patient.patientGender}</td>

              <td>{patient.patientNumber}</td>

              <td>

                <button
                  className="view-btn"
                  onClick={() =>
                   // navigate(`/patient/${patient.patientId}`)
                    navigate(`/admin/patient/${patient.patientId}`)
                  }
                >
                  View
                </button>

                <button
className="edit-btn"

onClick={() => {

setEditing(true);

setFormData(patient);

setShowModal(true);

}}

>

Edit

</button>

                <button
                  className="delete-btn"
                  onClick={() => deletePatient(patient.patientId)}
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>
      {showModal && (

<div className="modal">

<div className="modal-content">

<h2>

{editing ? "Edit Patient" : "Add Patient"}

</h2>
<input
  type="text"
  placeholder="Patient ID"
  value={formData.patientId}
  onChange={(e) =>
    setFormData({
      ...formData,
      patientId: e.target.value,
    })
  }
/>

<input
type="text"
placeholder="Patient Name"
value={formData.patientName}
onChange={(e)=>
setFormData({...formData,patientName:e.target.value})
}
/>

<input
type="text"
placeholder="Disease"
value={formData.patientDisease}
onChange={(e)=>
setFormData({...formData,patientDisease:e.target.value})
}
/>

<input
type="text"
placeholder="Gender"
value={formData.patientGender}
onChange={(e)=>
setFormData({...formData,patientGender:e.target.value})
}
/>

<input
type="text"
placeholder="Phone Number"
value={formData.patientNumber}
onChange={(e)=>
setFormData({...formData,patientNumber:e.target.value})
}
/>

<div className="modal-buttons">

<button
  className="save-btn"
  onClick={savePatient}
>
  {editing ? "Update" : "Save"}
</button>

<button
className="cancel-btn"
onClick={()=>setShowModal(false)}
>

Cancel

</button>

</div>

</div>

</div>

)}

    </div>
  );
};

export default PatientManagement;