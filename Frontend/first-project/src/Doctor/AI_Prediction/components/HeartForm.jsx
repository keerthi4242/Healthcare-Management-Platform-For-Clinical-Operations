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
                sex: patient.patientGender === "Male" ? 1 : 0,
                 cp: patient.cp,
    chol: patient.chol,
    fbs: patient.fbs,
    restecg: patient.restecg,
    exang: patient.exang,
    oldpeak: patient.oldpeak,
    slope: patient.slope,
    ca: patient.ca,
    thal: patient.thal
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
useEffect(() => {

    const loadVitals = () => {

        fetch(`http://localhost:8085/vitals/latest/${id}`)
            .then(res => res.json())
            .then(vital => {

                setFormData(prev => ({
                    ...prev,
                    trestbps: vital.systolicBP,
                    thalach: vital.heartRate
                }));

            })
            .catch(err => console.error(err));

    };

    loadVitals();

    const interval = setInterval(loadVitals, 5000);

    return () => clearInterval(interval);

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
    const featureLabels = {
    age: "Age",
    sex: "Gender",
    cp: "Chest Pain Type",
    trestbps: "Resting Blood Pressure",
    chol: "Cholesterol",
    fbs: "Fasting Blood Sugar",
    restecg: "Rest ECG",
    thalach: "Maximum Heart Rate",
    exang: "Exercise Angina",
    oldpeak: "Old Peak",
    slope: "Slope",
    ca: "Major Vessels",
    thal: "Thalassemia"
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
    className="form-control readonly-field"
    value={formData.cp}
    readOnly
/>
</div>
<div className="col-md-6 mb-3">
    <label>🩸 Resting Blood Pressure</label>

   {/* <input
   type="number"
   className="form-control readonly-field"
   value={formData.trestbps}
   readOnly
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

    {/* <input
        type="number"
        className="form-control"
        name="chol"
        placeholder="e.g. 210"
        onChange={handleChange}
    /> */}
    <input
    type="number"
    className="form-control readonly-field"
    value={formData.chol}
    readOnly
/>
</div>

               <div className="col-md-6 mb-3">
    <label>🍬 Fasting Blood Sugar</label>

   <input
    type="text"
    className="form-control readonly-field"
    value={formData.fbs === 1 ? "Yes" : "No"}
    readOnly
/>
</div>
<div className="col-md-6 mb-3">
    <label>📈 Rest ECG</label>

   <input
    type="number"
    className="form-control readonly-field"
    value={formData.restecg}
    readOnly
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

   <input
    type="text"
    className="form-control readonly-field"
    value={formData.exang === 1 ? "Yes" : "No"}
    readOnly
/>
</div>

                <div className="col-md-6 mb-3">
    <label>📉 Old Peak</label>

   <input
    type="number"
    className="form-control readonly-field"
    value={formData.oldpeak}
    readOnly
/>
</div>

              <div className="col-md-6 mb-3">
    <label>📊 Slope</label>

    <input
    type="number"
    className="form-control readonly-field"
    value={formData.slope}
    readOnly
/>
</div>
<div className="col-md-6 mb-3">
    <label>🫀 Major Vessels (CA)</label>

   <input
    type="number"
    className="form-control readonly-field"
    value={formData.ca}
    readOnly
/>
</div>

              <div className="col-md-6 mb-3">
    <label>🧬 Thal</label>

   <input
    type="number"
    className="form-control readonly-field"
    value={formData.thal}
    readOnly
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
            {result?.shap && (
    <div className="shap-card">

        <h4>🧠 Explainable AI (SHAP)</h4>

        <p className="shap-subtitle">
            The following values show how each feature influenced the AI prediction.
            Positive values increase the predicted risk, while negative values decrease it.
        </p>

        <table className="table table-bordered table-striped mt-3">
            <thead>
                <tr>
                    <th>Feature</th>
                    <th>Contribution</th>
                    <th>Impact</th>
                </tr>
            </thead>

            <tbody>

                {Object.entries(result.shap)
                    .sort((a, b) => Math.abs(b[1]) - Math.abs(a[1]))
                    .map(([feature, value]) => (

                        <tr key={feature}>

                            <td>{featureLabels[feature] || feature}</td>

                            <td
                                style={{
                                    color: value >= 0 ? "#dc3545" : "#198754",
                                    fontWeight: "bold"
                                }}
                            >
                                {value.toFixed(4)}
                            </td>

                            <td>
                                {value >= 0
                                    ? "🔴 Increased Risk"
                                    : "🟢 Reduced Risk"}
                            </td>

                        </tr>

                    ))}

            </tbody>

        </table>

    </div>
)}

        </div>

    );

}

export default HeartForm;