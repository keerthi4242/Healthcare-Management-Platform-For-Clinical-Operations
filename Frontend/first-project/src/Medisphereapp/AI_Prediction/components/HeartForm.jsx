import { useState, useEffect } from "react";
import axios from "axios";
import "./HeartForm.css";
import PredictionResult from "./PredictionResult";
import { useParams } from "react-router-dom";

function HeartForm() {
    const { id } = useParams();

    const [formData, setFormData] = useState({
        patientId: id,
        age: "",
        sex: "",
        cp: "",
        trestbps: "",
        chol: "",
        fbs: "",
        restecg: "",
        thalach: "",
        exang: "",
        oldpeak: "",
        slope: "",
        ca: "",
        thal: ""
    });

    const [result, setResult] = useState(null);
    useEffect(() => {

    fetch(`http://localhost:8080/patients/${id}`)
        .then(res => res.json())
        .then(patient => {

            const birthYear = new Date(patient.patientbirthDate).getFullYear();
            const currentYear = new Date().getFullYear();
            const age = currentYear - birthYear;

            setFormData(prev => ({
                ...prev,
                age: age,
                sex: patient.patientGender === "Male" ? 1 : 0
            }));

        })
        .catch(err => console.error(err));

}, [id]);
// useEffect(() => {

//     const loadVitals = () => {

//         fetch(`http://localhost:8084/fhir/observation/${id}`)
//             .then(res => res.json())
//             .then(data => {

//                 const systolic = data.find(
//                     v => v.code?.text === "Systolic Blood Pressure"
//                 );

//                 const heartRate = data.find(
//                     v => v.code?.text === "Heart Rate"
//                 );

//                 setFormData(prev => ({
//                     ...prev,
//                     trestbps: systolic ? systolic.valueQuantity.value : "",
//                     thalach: heartRate ? heartRate.valueQuantity.value : ""
//                 }));

//             })
//             .catch(err => console.error(err));

//     };

//     loadVitals();

// }, [id]);

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const predict = async () => {

        try {

            const response = await axios.post(
                "http://localhost:8089/predict/heart",
                {
                     patientId: id,
                    age: Number(formData.age),
                    sex: Number(formData.sex),
                    cp: Number(formData.cp),
                    trestbps: Number(formData.trestbps),
                    chol: Number(formData.chol),
                    fbs: Number(formData.fbs),
                    restecg: Number(formData.restecg),
                    thalach: Number(formData.thalach),
                    exang: Number(formData.exang),
                    oldpeak: Number(formData.oldpeak),
                    slope: Number(formData.slope),
                    ca: Number(formData.ca),
                    thal: Number(formData.thal)
                }
            );

            setResult(response.data);

        } catch (error) {

            console.error(error);
            alert("Prediction Failed");

        }

    };

    return (

        <div className="heart-card">

            <h3 className="form-title">
    ❤️ AI Heart Disease Risk Assessment
</h3>

<p className="form-subtitle">
    Enter the patient's clinical information below to estimate the risk of heart disease using the trained AI model.
</p>

            <div className="row">
<div className="col-md-6 mb-3">
    <label>🆔 Patient ID</label>
    <input
        type="text"
        className="form-control readonly-field"
        value={id}
        readOnly
    />
</div>

               <div className="col-md-6 mb-3">
    <label>🎂 Age</label>
    <input
    type="number"
    className="form-control readonly-field"
    name="age"
    value={formData.age}
    readOnly
/>
</div>

              <div className="col-md-6 mb-3">
    <label>👤 Gender</label>

   <input
    type="text"
    className="form-control readonly-field"
    value={
    formData.sex === ""
        ? ""
        : formData.sex === 1
        ? "Male"
        : "Female"
}
    readOnly
/>
</div>

              <div className="col-md-6 mb-3">
    <label>💓 Chest Pain Type</label>

    <input
        type="number"
        className="form-control"
        name="cp"
        placeholder="0 - 3"
        onChange={handleChange}
    />
</div>
<div className="col-md-6 mb-3">
    <label>🩸 Resting Blood Pressure</label>

   {/* <input
 //   type="number"
  //  className="form-control readonly-field"
  //  value={formData.trestbps}
  //  readOnly
/> */}
<input
    type="number"
    className="form-control"
    name="trestbps"
    placeholder="e.g. 120"
    value={formData.trestbps}
    onChange={handleChange}
/>
</div>

              <div className="col-md-6 mb-3">
    <label>🧪 Cholesterol</label>

    <input
        type="number"
        className="form-control"
        name="chol"
        placeholder="e.g. 210"
        onChange={handleChange}
    />
</div>

               <div className="col-md-6 mb-3">
    <label>🍬 Fasting Blood Sugar</label>

    <select
        className="form-select"
        name="fbs"
        onChange={handleChange}
    >
        <option value="">Select Status</option>
        <option value="0">No</option>
        <option value="1">Yes</option>
    </select>
</div>
<div className="col-md-6 mb-3">
    <label>📈 Rest ECG</label>

    <input
        type="number"
        className="form-control"
        name="restecg"
        placeholder="0 - 2"
        onChange={handleChange}
    />
</div>
<div className="col-md-6 mb-3">
    <label>❤️ Maximum Heart Rate</label>

   {/* <input
    type="number"
    className="form-control readonly-field"
    value={formData.thalach}
    readOnly
/> */}
<input
    type="number"
    className="form-control"
    name="thalach"
    placeholder="e.g. 170"
    value={formData.thalach}
    onChange={handleChange}
/>
</div>

                <div className="col-md-6 mb-3">
    <label>🏃 Exercise Angina</label>

    <select
        className="form-select"
        name="exang"
        onChange={handleChange}
    >
        <option value="">Select Status</option>
        <option value="0">No</option>
        <option value="1">Yes</option>
    </select>
</div>

                <div className="col-md-6 mb-3">
    <label>📉 Old Peak</label>

    <input
        type="number"
        step="0.1"
        className="form-control"
        name="oldpeak"
        placeholder="e.g. 1.2"
        onChange={handleChange}
    />
</div>

              <div className="col-md-6 mb-3">
    <label>📊 Slope</label>

    <input
        type="number"
        className="form-control"
        name="slope"
        placeholder="0 - 2"
        onChange={handleChange}
    />
</div>
<div className="col-md-6 mb-3">
    <label>🫀 Major Vessels (CA)</label>

    <input
        type="number"
        className="form-control"
        name="ca"
        placeholder="0 - 4"
        onChange={handleChange}
    />
</div>

              <div className="col-md-6 mb-3">
    <label>🧬 Thal</label>

    <input
        type="number"
        className="form-control"
        name="thal"
        placeholder="0 - 3"
        onChange={handleChange}
    />
</div>
            </div>

            <button
                className="btn btn-primary predict-btn"
                onClick={predict}
            >
               🧠 Predict Heart Disease Risk
            </button>

            {result && <PredictionResult result={result} />}

        </div>

    );

}

export default HeartForm;