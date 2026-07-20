import React from "react";
import "./ModelManagement.css";

function ModelManagement() {

    const models = [
        {
            name: "Heart Disease Prediction",
            algorithm: "Random Forest Classifier",
            accuracy: "94.63%",
            version: "v1.0",
            status: "Active",
            lastTrained: "18 Jul 2026"
        },
        {
            name: "Diabetes Prediction",
            algorithm: "Random Forest Classifier",
            accuracy: "90.50%",
            version: "v1.0",
            status: "Active",
            lastTrained: "18 Jul 2026"
        }
    ];

    return (
        <div className="model-page">

            <h2>🤖 AI Model Management</h2>

            <p className="subtitle">
                Monitor and manage deployed AI prediction models.
            </p>

            <div className="model-grid">

                {models.map((model, index) => (

                    <div className="model-card" key={index}>

                        <h3>{model.name}</h3>

                        <p><strong>Algorithm:</strong> {model.algorithm}</p>

                        <p><strong>Accuracy:</strong> {model.accuracy}</p>

                        <p><strong>Version:</strong> {model.version}</p>

                        <p>
                            <strong>Status:</strong>
                            <span className="status">
                                {model.status}
                            </span>
                        </p>

                        <p><strong>Last Trained:</strong> {model.lastTrained}</p>

                        <button className="btn btn-primary">
                            View Details
                        </button>

                    </div>

                ))}

            </div>

        </div>
    );
}

export default ModelManagement;