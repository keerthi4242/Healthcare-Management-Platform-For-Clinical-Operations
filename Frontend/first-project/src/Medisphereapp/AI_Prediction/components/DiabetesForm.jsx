import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./DiabetesForm.css";
import PredictionResult from "./PredictionResult";

function DiabetesForm() {

    const { id } = useParams();

    const [formData, setFormData] = useState({
        gender: "",
        age: "",
        hypertension: "",
        heart_disease: "",
        smoking_history: "",
        bmi: "",
        HbA1c_level: "",
        blood_glucose_level: ""
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
                gender: patient.patientGender
            }));

        })
        .catch(err => console.error(err));

}, [id]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const predict = async () => {

        try {

            const response = await axios.post(
                "http://localhost:8089/predict/diabetes",
                {
                    patientId: id,
                    gender: formData.gender,
                    age: Number(formData.age),
                    hypertension: Number(formData.hypertension),
                    heart_disease: Number(formData.heart_disease),
                    smoking_history: formData.smoking_history,
                    bmi: Number(formData.bmi),
                    HbA1c_level: Number(formData.HbA1c_level),
                    blood_glucose_level: Number(formData.blood_glucose_level)
                }
            );

            setResult(response.data);

        } catch (error) {

            console.error(error);
            alert("Prediction Failed");

        }

    };

    return (

        <div className="diabetes-card">

            <h3 className="form-title">
    🩺 AI Diabetes Risk Assessment
</h3>

<p className="form-subtitle">
    Enter the patient's clinical information below to predict the likelihood of diabetes using the trained AI model.
</p>

            <div className="row">

                <div className="col-md-6 mb-3">
    <label>Patient ID</label>
    <input
        type="text"
        className="form-control readonly-field"
        value={id}
        readOnly
    />
</div>

                <div className="col-md-6 mb-3">
                    <label>👤 Gender</label>
                    <input
    type="text"
    className="form-control readonly-field"
    value={formData.gender}
    readOnly
/>
                </div>

   <div className="col-md-6 mb-3">
    <label>🎂 Age</label>
   <input
    type="number"
    className="form-control readonly-field"
    value={formData.age}
    readOnly
/>
</div>

                <div className="col-md-6 mb-3">
                    <label>🩺 Hypertension</label>
                    <select
                        className="form-select"
                        name="hypertension"
                        onChange={handleChange}
                    >
                 <option value="">Select Status</option>
                        <option value="0">No</option>
                        <option value="1">Yes</option>
                    </select>
                </div>

                <div className="col-md-6 mb-3">
                    <label>❤️ Heart Disease</label>
                    <select
                        className="form-select"
                        name="heart_disease"
                        onChange={handleChange}
                    >
                        <option value="">Select Status</option>
                        <option value="0">No</option>
                        <option value="1">Yes</option>
                    </select>
                </div>

                <div className="col-md-6 mb-3">
                   <label>🚬 Smoking History</label>
                    <select
                        className="form-select"
                        name="smoking_history"
                        onChange={handleChange}
                    >
                        <option value="">Select Smoking History</option>
                        <option value="never">Never</option>
                        <option value="No Info">No Info</option>
                        <option value="former">Former</option>
                        <option value="current">Current</option>
                        <option value="ever">Ever</option>
                        <option value="not current">Not Current</option>
                    </select>
                </div>

                <div className="col-md-6 mb-3">
                   <label>⚖️ BMI</label>
                    <input
    type="number"
    step="0.1"
    className="form-control"
    name="bmi"
    placeholder="e.g. 24.5"
    onChange={handleChange}
/>
                </div>

                <div className="col-md-6 mb-3">
                    <label>🩸 HbA1c Level</label>
                    <input
    type="number"
    step="0.1"
    className="form-control"
    name="HbA1c_level"
    placeholder="e.g. 6.5"
    onChange={handleChange}
/>
                </div>

                <div className="col-md-6 mb-3">
                   <label>💉 Blood Glucose Level</label>
                    <input
    type="number"
    className="form-control"
    name="blood_glucose_level"
    placeholder="e.g. 140"
    onChange={handleChange}
/>
                </div>

            </div>

           <button
    className="btn btn-success predict-btn"
    onClick={predict}
>
    🧠 Predict Diabetes Risk
</button>

            {result && <PredictionResult result={result} />}

        </div>

    );

}

export default DiabetesForm;