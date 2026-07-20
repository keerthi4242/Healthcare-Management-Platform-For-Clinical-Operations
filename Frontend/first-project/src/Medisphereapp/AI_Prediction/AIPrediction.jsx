import { useState } from "react";
import "./AIPrediction.css";
import HeartForm from "./components/HeartForm";
import DiabetesForm from "./components/DiabetesForm";

function AIPrediction() {

  const [disease, setDisease] = useState("");

  return (
    <div className="ai-prediction-page">
      <div className="ai-card">

        <h2 className="ai-title">AI Disease Prediction</h2>

        <p className="ai-subtitle">
          Select an AI model to predict the patient's health condition.
        </p>

        <label className="ai-label">
          Select Disease Model
        </label>

        <select
          className="form-select ai-select"
          value={disease}
          onChange={(e) => setDisease(e.target.value)}
        >
          <option value="">Choose a model</option>
          <option value="heart">Heart Disease</option>
          <option value="diabetes">Diabetes</option>
        </select>

        <hr />
{disease === "diabetes" && (
    <DiabetesForm />
)}

{disease === "heart" && (
    <HeartForm />
)}

      </div>
    </div>
  );
}

export default AIPrediction;