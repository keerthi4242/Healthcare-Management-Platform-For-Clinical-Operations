import React, { useEffect, useState } from "react";
import axios from "axios";
import "./PatientCarePlan.css";

const PatientCarePlan = () => {
  const [carePlan, setCarePlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Use your actual patient ID here
  const patientId = "1";

  useEffect(() => {
    fetchCarePlan();
  }, []);

  // ================================
  // GET CARE PLAN
  // ================================

  const fetchCarePlan = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(
        `http://localhost:8093/careplan/${patientId}`
      );

      setCarePlan(response.data);

    } catch (err) {
      console.error("Error fetching care plan:", err);

      if (err.response?.status === 404) {
        setError("No care plan found for this patient.");
      } else {
        setError("Unable to load care plan.");
      }

    } finally {
      setLoading(false);
    }
  };


  // ================================
  // UPDATE ACTIVITY
  // ================================

  const updateActivity = async (activity) => {

    if (!carePlan) {
      return;
    }

    const updatedPlan = {
      ...carePlan,
      [activity]: !carePlan[activity]
    };

    // Update UI immediately
    setCarePlan(updatedPlan);

    try {

      setSaving(true);

      const request = {
        carePlanId: carePlan.id,

        medicineTaken: updatedPlan.medicineTaken,

        exerciseDone: updatedPlan.exerciseDone,

        bpChecked: updatedPlan.bpChecked,

        sugarChecked: updatedPlan.sugarChecked
      };

      const response = await axios.put(
        "http://localhost:8093/careplan/updateProgress",
        request
      );

      // Use backend calculated adherence
      setCarePlan(response.data);

    } catch (err) {

      console.error(
        "Error updating adherence:",
        err
      );

      // Reload original data if update fails
      fetchCarePlan();

      alert("Unable to update progress.");

    } finally {

      setSaving(false);

    }
  };


  // ================================
  // LOADING
  // ================================

  if (loading) {

    return (
      <div className="careplan-container">

        <div className="careplan-loading">
          Loading your care plan...
        </div>

      </div>
    );
  }


  // ================================
  // ERROR
  // ================================

  if (error) {

    return (
      <div className="careplan-container">

        <div className="careplan-error">
          {error}
        </div>

      </div>
    );
  }


  if (!carePlan) {

    return (
      <div className="careplan-container">

        <div className="careplan-empty">
          No care plan available.
        </div>

      </div>
    );
  }


  // ================================
  // MAIN UI
  // ================================

  return (

    <div className="careplan-container">

      {/* HEADER */}

      <div className="careplan-header">

        <div>

          <h1>My Care Plan</h1>

          <p>
            Personalized care recommendations
            based on your health assessment.
          </p>

        </div>


        <div
          className={`careplan-status ${
            carePlan.doctorStatus?.toLowerCase()
          }`}
        >

          {carePlan.doctorStatus}

        </div>

      </div>



      {/* RISK SUMMARY */}

      <div className="careplan-risk-card">

        <div className="risk-info">

          <span className="section-label">
            Risk Level
          </span>

          <h2>
            {carePlan.riskLevel}
          </h2>

          <p>

            {carePlan.predictionType} Risk:

            <strong>
              {" "}
              {carePlan.predictionRisk?.toFixed(2)}%
            </strong>

          </p>

        </div>


        <div className="risk-prediction">

          <span className="section-label">
            Prediction
          </span>

          <strong>
            {carePlan.prediction}
          </strong>

        </div>

      </div>
      {/* ================================
    OUTCOME TRACKING
    ================================ */}

<div className="careplan-section">

    <h2>
        📊 Health Outcome Tracking
    </h2>

    <div className="outcome-patient-card">

        <div className="outcome-header">

            <div>
                <span className="section-label">
                    Your Health Progress
                </span>

                <p>
                    Compare your previous and current
                    health measurements.
                </p>
            </div>

        </div>


        <div className="outcome-grid">

            {/* RISK */}

            <div className="patient-outcome-card">

                <div className="outcome-icon">
                    ⚠️
                </div>

                <div className="outcome-title">
                    Risk
                </div>

                <div className="outcome-values">

                    <div>
                        <small>Previous</small>

                        <strong>
                            {carePlan.previousRisk != null
                                ? `${carePlan.previousRisk.toFixed(2)}%`
                                : "—"}
                        </strong>
                    </div>

                    <span className="outcome-arrow">
                        →
                    </span>

                    <div>
                        <small>Current</small>

                        <strong>
                            {carePlan.currentRisk != null
                                ? `${carePlan.currentRisk.toFixed(2)}%`
                                : "—"}
                        </strong>
                    </div>

                </div>

            </div>


            {/* WEIGHT */}

            <div className="patient-outcome-card">

                <div className="outcome-icon">
                    ⚖️
                </div>

                <div className="outcome-title">
                    Weight
                </div>

                <div className="outcome-values">

                    <div>
                        <small>Previous</small>

                        <strong>
                            {carePlan.previousWeight != null
                                ? `${carePlan.previousWeight} kg`
                                : "—"}
                        </strong>
                    </div>

                    <span className="outcome-arrow">
                        →
                    </span>

                    <div>
                        <small>Current</small>

                        <strong>
                            {carePlan.currentWeight != null
                                ? `${carePlan.currentWeight} kg`
                                : "—"}
                        </strong>
                    </div>

                </div>

            </div>


            {/* BLOOD PRESSURE */}

            <div className="patient-outcome-card">

                <div className="outcome-icon">
                    ❤️
                </div>

                <div className="outcome-title">
                    Blood Pressure
                </div>

                <div className="outcome-values">

                    <div>
                        <small>Previous</small>

                        <strong>
                            {carePlan.previousBp != null
                                ? carePlan.previousBp
                                : "—"}
                        </strong>
                    </div>

                    <span className="outcome-arrow">
                        →
                    </span>

                    <div>
                        <small>Current</small>

                        <strong>
                            {carePlan.currentBp != null
                                ? carePlan.currentBp
                                : "—"}
                        </strong>
                    </div>

                </div>

            </div>


            {/* BLOOD SUGAR */}

            <div className="patient-outcome-card">

                <div className="outcome-icon">
                    🩸
                </div>

                <div className="outcome-title">
                    Blood Sugar
                </div>

                <div className="outcome-values">

                    <div>
                        <small>Previous</small>

                        <strong>
                            {carePlan.previousSugar != null
                                ? carePlan.previousSugar
                                : "—"}
                        </strong>
                    </div>

                    <span className="outcome-arrow">
                        →
                    </span>

                    <div>
                        <small>Current</small>

                        <strong>
                            {carePlan.currentSugar != null
                                ? carePlan.currentSugar
                                : "—"}
                        </strong>
                    </div>

                </div>

            </div>

        </div>

    </div>

</div>



      {/* GOAL */}

      <div className="careplan-section">

        <h2>🎯 Care Goal</h2>

        <div className="careplan-card">

          <p>
            {carePlan.goal}
          </p>

        </div>

      </div>



      {/* DAILY CARE */}

      <div className="careplan-section">

        <h2>
          Today's Care Plan
        </h2>

        <div className="careplan-grid">


          {/* MEDICINE */}

          <div className="care-item">

            <div className="care-item-icon">
              💊
            </div>

            <div>

              <h3>Medicine</h3>

              {carePlan.medications?.length > 0 ? (

                <ul>

                  {carePlan.medications.map(
                    (medicine, index) => (

                      <li key={index}>
                        {medicine}
                      </li>

                    )
                  )}

                </ul>

              ) : (

                <p>
                  No medication specified.
                </p>

              )}

            </div>

          </div>



          {/* DIET */}

          <div className="care-item">

            <div className="care-item-icon">
              🥗
            </div>

            <div>

              <h3>Diet</h3>

              <p>
                {carePlan.diet ||
                  "No diet recommendation."}
              </p>

            </div>

          </div>



          {/* EXERCISE */}

          <div className="care-item">

            <div className="care-item-icon">
              🚶
            </div>

            <div>

              <h3>Exercise</h3>

              <p>
                {carePlan.exercise ||
                  "No exercise recommendation."}
              </p>

            </div>

          </div>



          {/* SLEEP */}

          <div className="care-item">

            <div className="care-item-icon">
              😴
            </div>

            <div>

              <h3>Sleep</h3>

              <p>
                {carePlan.sleep ||
                  "No sleep recommendation."}
              </p>

            </div>

          </div>

        </div>

      </div>



      {/* ================================
          ADHERENCE TRACKING
          ================================ */}

      <div className="careplan-section">

        <h2>
          📊 Today's Progress
        </h2>


        <div className="adherence-card">


          <div className="adherence-header">

            <div>

              <span className="section-label">
                Care Plan Adherence
              </span>

              <h2>
                {carePlan.adherence || 0}%
              </h2>

            </div>

            {saving && (

              <span className="saving-text">
                Saving...
              </span>

            )}

          </div>


          {/* PROGRESS BAR */}

          <div className="progress-bar">

            <div
              className="progress-fill"
              style={{
                width: `${carePlan.adherence || 0}%`
              }}
            />

          </div>


          {/* ACTIVITIES */}

          <div className="activity-list">


            {/* MEDICINE */}

            <label className="activity-item">

              <input
                type="checkbox"
                checked={
                  carePlan.medicineTaken || false
                }
                onChange={() =>
                  updateActivity(
                    "medicineTaken"
                  )
                }
              />

              <span>
                💊 Medicine Taken
              </span>

            </label>



            {/* EXERCISE */}

            <label className="activity-item">

              <input
                type="checkbox"
                checked={
                  carePlan.exerciseDone || false
                }
                onChange={() =>
                  updateActivity(
                    "exerciseDone"
                  )
                }
              />

              <span>
                🚶 Exercise Done
              </span>

            </label>



            {/* BP */}

            <label className="activity-item">

              <input
                type="checkbox"
                checked={
                  carePlan.bpChecked || false
                }
                onChange={() =>
                  updateActivity(
                    "bpChecked"
                  )
                }
              />

              <span>
                ❤️ BP Checked
              </span>

            </label>



            {/* SUGAR */}

            <label className="activity-item">

              <input
                type="checkbox"
                checked={
                  carePlan.sugarChecked || false
                }
                onChange={() =>
                  updateActivity(
                    "sugarChecked"
                  )
                }
              />

              <span>
                🩸 Sugar Checked
              </span>

            </label>

          </div>

        </div>

      </div>



      {/* DOCTOR NOTES */}

      <div className="careplan-section">

        <h2>
          👨‍⚕️ Doctor Notes
        </h2>

        <div className="doctor-notes-card">

          {carePlan.doctorNotes ? (

            <p>
              {carePlan.doctorNotes}
            </p>

          ) : (

            <p className="no-notes">
              No doctor notes available.
            </p>

          )}

        </div>

      </div>



      {/* RECOMMENDATION */}

      <div className="careplan-section">

        <h2>
          💡 Health Recommendation
        </h2>

        <div className="recommendation-card">

          <p>
            {carePlan.recommendation}
          </p>

        </div>

      </div>



      {/* REVIEW */}

      <div className="careplan-review">

        <div>

          <span className="section-label">
            Next Review
          </span>

          <strong>
            {carePlan.nextReview ||
              "Not scheduled"}
          </strong>

        </div>


        <div>

          <span className="section-label">
            Current Adherence
          </span>

          <strong>
            {carePlan.adherence || 0}%
          </strong>

        </div>

      </div>

    </div>

  );
};

export default PatientCarePlan;
