import React, { useEffect, useState } from "react";
import "./PatientAIPrediction.css";

const PatientAIPrediction = () => {
  const [predictions, setPredictions] = useState([]);

  // Replace with Keycloak later
  const patientId = 1;

  useEffect(() => {
    fetch(`http://localhost:8089/predict/patient/${patientId}`)
      .then((res) => res.json())
      .then((data) => setPredictions(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="prediction-container">

      <div className="prediction-header">
        <h1>🤖 AI Health Predictions</h1>
        <p>AI-generated insights based on your health data.</p>
      </div>

      {predictions.length === 0 ? (
        <div className="empty-card">
          No predictions available.
        </div>
      ) : (
        predictions.map((prediction) => (
          <div className="prediction-card" key={prediction.id}>

            <div className="prediction-row">
              <span>Prediction Type</span>
              <strong>{prediction.predictionType}</strong>
            </div>

            <div className="prediction-row">
              <span>Prediction</span>
              <strong>{prediction.prediction}</strong>
            </div>

            <div className="prediction-row">
              <span>Probability</span>
              <strong>{prediction.probability}%</strong>
            </div>

            <div className="prediction-row">
              <span>Risk Level</span>
              <strong className={prediction.riskLevel?.toLowerCase()}>
                {prediction.riskLevel}
              </strong>
            </div>

            <div className="prediction-row">
              <span>Recommendation</span>
              <strong>{prediction.recommendation}</strong>
            </div>

            <div className="prediction-row">
              <span>Predicted At</span>
              <strong>{prediction.predictedAt}</strong>
            </div>

          </div>
        ))
      )}

    </div>
  );
};

export default PatientAIPrediction;