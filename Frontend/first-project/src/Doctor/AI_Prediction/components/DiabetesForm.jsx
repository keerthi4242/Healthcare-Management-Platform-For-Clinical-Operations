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
                gender: patient.patientGender,
                 hypertension: patient.hypertension,
    heart_disease: patient.heartDisease,
    smoking_history: patient.smokingHistory,
    bmi: patient.bmi,
    HbA1c_level: patient.hbA1cLevel,
    blood_glucose_level: ""
            }));

        })
        .catch(err => console.error(err));

}, [id]);
useEffect(() => {

    const loadVital = () => {

        fetch(`http://localhost:8085/vitals/latest/${id}`)
        .then(res => res.json())
        .then(vital => {

            setFormData(prev => ({
                ...prev,
                blood_glucose_level: vital.bloodGlucoseLevel
            }));

        })
        .catch(err => console.log(err));

    };


    loadVital();

    const interval = setInterval(loadVital,5000);

    return () => clearInterval(interval);

},[id]);

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
    const featureLabels = {
    age: "Age",
    hypertension: "Hypertension",
    heart_disease: "Heart Disease History",
    bmi: "BMI",
    HbA1c_level: "HbA1c Level",
    blood_glucose_level: "Blood Glucose Level",
    gender_Female: "Gender (Female)",
    gender_Male: "Gender (Male)",
    smoking_history_current: "Smoking - Current",
    smoking_history_ever: "Smoking - Ever",
    smoking_history_former: "Smoking - Former",
    smoking_history_never: "Smoking - Never",
    smoking_history_not_current: "Smoking - Not Current",
    smoking_history_No_Info: "Smoking - No Information"
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
    <input
        type="text"
        className="form-control readonly-field"
        value={formData.hypertension === 1 ? "Yes" : "No"}
        readOnly
    />
</div>

               <div className="col-md-6 mb-3">
    <label>❤️ Heart Disease</label>
    <input
        type="text"
        className="form-control readonly-field"
        value={formData.heart_disease === 1 ? "Yes" : "No"}
        readOnly
    />
</div>

               <div className="col-md-6 mb-3">
    <label>🚬 Smoking History</label>
    <input
        type="text"
        className="form-control readonly-field"
        value={formData.smoking_history}
        readOnly
    />
</div>

              <div className="col-md-6 mb-3">
    <label>⚖️ BMI</label>
    <input
        type="number"
        className="form-control readonly-field"
        value={formData.bmi}
        readOnly
    />
</div>

            <div className="col-md-6 mb-3">
    <label>🩸 HbA1c Level</label>
    <input
        type="number"
        className="form-control readonly-field"
        value={formData.HbA1c_level}
        readOnly
    />
</div>

                <div className="col-md-6 mb-3">
                   <label>💉 Blood Glucose Level</label>
               <input
    type="number"
    className="form-control readonly-field"
    name="blood_glucose_level"
    value={formData.blood_glucose_level}
    readOnly
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
            {result?.shap && (
    <div className="shap-card">

        <h4>🧠 Explainable AI (SHAP)</h4>

        <p className="shap-subtitle">
            The following values show how each feature influenced the AI prediction.
            Positive values increase the predicted diabetes risk, while negative values decrease it.
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

                            <td>
                                {featureLabels[feature] || feature}
                            </td>

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

export default DiabetesForm;