import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./DoctorManagement.css";
const DoctorManagement = () => {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
const [editing, setEditing] = useState(false);
const [viewDoctor, setViewDoctor] = useState(null);

const [formData, setFormData] = useState({
  doctorName: "",
  specialization: "",
  gender: "",
  email: "",
  phone: "",
  qualification: "",
  experience: "",
  status: "Active"
});

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8091/doctors")
      .then((res) => res.json())
      .then((data) => setDoctors(data))
      .catch((err) => console.error(err));
  }, []);

  const deleteDoctor = async (id) => {
    if (!window.confirm("Are you sure you want to delete this Doctor?")) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8091/doctors/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setDoctors((prev) =>
          prev.filter((doctor) => doctor.doctorId !== id)
        );
        alert("Doctor deleted successfully.");
      } else {
        alert("Failed to delete Doctor.");
      }
    } catch (error) {
      console.error(error);
      alert("Error deleting Doctor.");
    }
  };
   const saveDoctor = async () => {
  try {
   const url = editing
  ? `http://localhost:8091/doctors/${formData.doctorId}`
  : "http://localhost:8091/doctors";

const method = editing ? "PUT" : "POST";

    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Failed to save doctor");
    }
    alert(editing ? "Doctor updated successfully!" : "Doctor added successfully!");
     const res = await fetch("http://localhost:8091/doctors");
    const data = await res.json();
    setDoctors(data);
      setShowModal(false);
    setEditing(false);

  } catch (error) {
    console.error(error);
    alert("Error saving doctor.");
  }
};
const filteredDoctors = doctors.filter((doctor) =>
  doctor.doctorName.toLowerCase().includes(search.toLowerCase())
);
  return (
    <div className="patient-management">

     <div className="patient-header">

    <h1>👨‍⚕️ Doctor Management</h1>

    <div className="header-actions">

        <input
            type="text"
            placeholder="Search Doctor..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
        />

        <button
            className="add-btn"
            onClick={() => {
                setEditing(false);

                setFormData({
  doctorName: "",
  specialization: "",
  gender: "",
  email: "",
  phone: "",
  qualification: "",
  experience: "",
  status: "Active"
});

                setShowModal(true);
            }}
        >
            ➕ Add Doctor
        </button>

    </div>

</div>

      <table className="patient-table">

       <thead>
  <tr>
    <th>ID</th>
    <th>Doctor Name</th>
    <th>Specialization</th>
    <th>Status</th>
    <th>Actions</th>
  </tr>
</thead>

        <tbody>

          {filteredDoctors.map((doctor) => (

            <tr key={doctor.doctorId}>

             <td>{doctor.doctorId}</td>
           <td>{doctor.doctorName}</td>
<td>{doctor.specialization}</td>
<td>{doctor.status}</td>

              <td>

                <button
                  className="view-btn"
                  onClick={() =>
                   navigate(`/admin/doctor/${doctor.doctorId}`)
                  }
                >
                  View
                </button>

                <button
className="edit-btn"

onClick={() => {

setEditing(true);

setFormData(doctor);

setShowModal(true);

}}

>

Edit

</button>
<button
  className="assign-btn"
  onClick={() =>
    navigate(`/admin/doctor/${doctor.doctorId}/assign`)
  }
>
  Assign
</button>

                <button
                  className="delete-btn"
                  onClick={() => deleteDoctor(doctor.doctorId)}
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

{editing ? "Edit Doctor" : "Add Doctor"}

</h2>

<input
type="text"
placeholder="Doctor Name"
value={formData.doctorName}
onChange={(e)=>
setFormData({...formData,doctorName:e.target.value})
}
/>

<input
type="text"
placeholder="Specialization"
value={formData.specialization}
onChange={(e)=>
setFormData({...formData,specialization:e.target.value})
}
/>
<input
type="text"
placeholder="Gender"
value={formData.gender}
onChange={(e)=>
setFormData({...formData,gender:e.target.value})
}
/>

<input
type="text"
placeholder="Phone Number"
value={formData.phone}
onChange={(e)=>
setFormData({...formData,phone:e.target.value})
}
/>
<input
type="text"
placeholder="Email"
value={formData.email}
onChange={(e)=>
setFormData({...formData,email:e.target.value})
}
/>
<input
type="text"
placeholder="Qualification"
value={formData.qualification}
onChange={(e)=>
setFormData({...formData,qualification:e.target.value})
}
/>
<input
type="text"
placeholder="Experience"
value={formData.experience}
onChange={(e)=>
setFormData({...formData,experience:e.target.value})
}
/>
<select
  value={formData.status}
  onChange={(e) =>
    setFormData({
      ...formData,
      status: e.target.value
    })
  }
>
  <option value="Active">Active</option>
  <option value="Inactive">Inactive</option>
</select>

<div className="modal-buttons">

<button
  className="save-btn"
  onClick={saveDoctor}
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

export default DoctorManagement;