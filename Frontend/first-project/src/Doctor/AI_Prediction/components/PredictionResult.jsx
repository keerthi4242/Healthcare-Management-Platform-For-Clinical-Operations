import "./PredictionResult.css";

function PredictionResult({ result }) {

    return (
        <div className="result-card">

            <h3 className="result-title">
                📊 AI Prediction Result
            </h3>

            <div className="result-row">
                <span className="label">Prediction</span>
                <span className="value prediction">
                    {result.prediction}
                </span>
            </div>

            <div className="result-row">
                <span className="label">Probability</span>
                <span className="value">
                    {(result.probability * 100).toFixed(2)}%
                </span>
            </div>

            <div className="result-row">
                <span className="label">Risk Level</span>
                <span className={`badge ${result.riskLevel?.toLowerCase().replace(" ", "-")}`}>
                    {result.riskLevel}
                </span>
            </div>

            <div className="result-row recommendation">
                <span className="label">Recommendation</span>
                <span className="value">
                    {result.recommendation}
                </span>
            </div>

        </div>
    );

}

export default PredictionResult;