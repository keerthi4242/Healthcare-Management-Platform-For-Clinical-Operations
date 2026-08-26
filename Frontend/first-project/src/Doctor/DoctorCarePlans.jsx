import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./DoctorCarePlans.css";

const API_URL = "http://localhost:8093/careplan";

const DoctorCarePlans = () => {
    const { patientId } = useParams();
    const navigate = useNavigate();

    // --------------------------------------------------
    // STATES
    // --------------------------------------------------

    const [searchId, setSearchId] = useState("");
    const [carePlan, setCarePlan] = useState(null);

    const [loading, setLoading] = useState(false);
    const [generating, setGenerating] = useState(false);
    const [saving, setSaving] = useState(false);
    const [updatingVitals, setUpdatingVitals] = useState(false);

    const [errorMessage, setErrorMessage] = useState("");

    const [showModify, setShowModify] = useState(false);
    const [showOutcome, setShowOutcome] = useState(false);

    const [doctorNotes, setDoctorNotes] = useState("");

    // Modify form
    const [form, setForm] = useState({
        goal: "",
        medications: "",
        diet: "",
        exercise: "",
        sleep: ""
    });

    // Current health values
    const [outcomeForm, setOutcomeForm] = useState({
        currentRisk: "",
        currentWeight: "",
        currentBp: "",
        currentSugar: ""
    });

    // --------------------------------------------------
    // GET CARE PLAN
    // --------------------------------------------------

    const fetchCarePlan = async (id) => {
        if (!id) return;

        try {
            setLoading(true);
            setErrorMessage("");
            setCarePlan(null);

            const response = await axios.get(
                `${API_URL}/${encodeURIComponent(id)}`
            );

            const data = response.data;

            setCarePlan(data);

            setDoctorNotes(data?.doctorNotes || "");

            setForm({
                goal: data?.goal || "",

                medications:
                    Array.isArray(data?.medications)
                        ? data.medications.join(", ")
                        : "",

                diet: data?.diet || "",
                exercise: data?.exercise || "",
                sleep: data?.sleep || ""
            });

            setOutcomeForm({
                currentRisk:
                    data?.currentRisk ??
                    data?.predictionRisk ??
                    "",

                currentWeight:
                    data?.currentWeight ?? "",

                currentBp:
                    data?.currentBp ?? "",

                currentSugar:
                    data?.currentSugar ?? ""
            });

        } catch (error) {

            console.error(
                "Error fetching care plan:",
                error
            );

            if (
                error.response?.status === 404 ||
                error.response?.status === 500
            ) {
                setCarePlan(null);
            } else {
                setErrorMessage(
                    "Unable to load the care plan. Please check the Care Plan service."
                );
            }

        } finally {
            setLoading(false);
        }
    };

    // --------------------------------------------------
    // LOAD WHEN PATIENT ID EXISTS
    // --------------------------------------------------

    useEffect(() => {
        if (patientId) {
            fetchCarePlan(patientId);
        } else {
            setCarePlan(null);
            setErrorMessage("");
        }
    }, [patientId]);

    // --------------------------------------------------
    // SEARCH
    // --------------------------------------------------

    const handleSearch = (e) => {
        e.preventDefault();

        const id = searchId.trim();

        if (!id) {
            alert("Please enter a Patient ID.");
            return;
        }

        navigate(`/doctor/care-plans/${id}`);
    };

    // --------------------------------------------------
    // GENERATE CARE PLAN
    // --------------------------------------------------

    const generateCarePlan = async () => {
        if (!patientId) return;

        try {
            setGenerating(true);
            setErrorMessage("");

            await axios.post(
                `${API_URL}/generate`,
                {
                    patientId: Number(patientId)
                }
            );

            alert(
                "Care plan generated successfully."
            );

            await fetchCarePlan(patientId);

        } catch (error) {

            console.error(
                "Generate care plan error:",
                error
            );

            console.error(
                "Backend response:",
                error.response?.data
            );

            alert(
                typeof error.response?.data === "string"
                    ? error.response.data
                    : "Failed to generate care plan."
            );

        } finally {
            setGenerating(false);
        }
    };

    // --------------------------------------------------
    // GET CARE PLAN ID
    // --------------------------------------------------

    const getCarePlanId = () => {
        return (
            carePlan?.carePlanId ||
            carePlan?._id ||
            carePlan?.id
        );
    };

    // --------------------------------------------------
    // APPROVE CARE PLAN
    // --------------------------------------------------

    const approveCarePlan = async () => {

        const carePlanId = getCarePlanId();

        if (!carePlanId) {
            alert(
                "Care Plan ID not found."
            );
            return;
        }

        try {

            setSaving(true);

            await axios.put(
                `${API_URL}/approve`,
                {
                    carePlanId: String(carePlanId),
                    doctorNotes: doctorNotes || ""
                }
            );

            alert(
                "Care plan approved successfully."
            );

            setShowModify(false);

            await fetchCarePlan(patientId);

        } catch (error) {

            console.error(
                "Approve error:",
                error
            );

            console.error(
                "Backend response:",
                error.response?.data
            );

            alert(
                typeof error.response?.data === "string"
                    ? error.response.data
                    : "Failed to approve care plan."
            );

        } finally {
            setSaving(false);
        }
    };

    // --------------------------------------------------
    // MODIFY CARE PLAN
    // --------------------------------------------------

    const modifyCarePlan = async () => {

        const carePlanId = getCarePlanId();

        if (!carePlanId) {
            alert(
                "Care Plan ID not found."
            );
            return;
        }

        try {

            setSaving(true);

            const medications =
                form.medications
                    .split(",")
                    .map((item) =>
                        item.trim()
                    )
                    .filter(
                        (item) =>
                            item.length > 0
                    );

            await axios.put(
                `${API_URL}/modify`,
                {
                    carePlanId:
                        String(carePlanId),

                    goal:
                        form.goal,

                    medications:
                        medications,

                    diet:
                        form.diet,

                    exercise:
                        form.exercise,

                    sleep:
                        form.sleep,

                    doctorNotes:
                        doctorNotes
                }
            );

            alert(
                "Care plan modified successfully."
            );

            setShowModify(false);

            await fetchCarePlan(patientId);

        } catch (error) {

            console.error(
                "Modify error:",
                error
            );

            console.error(
                "Backend response:",
                error.response?.data
            );

            alert(
                typeof error.response?.data === "string"
                    ? error.response.data
                    : "Failed to modify care plan."
            );

        } finally {
            setSaving(false);
        }
    };

    // --------------------------------------------------
    // UPDATE PATIENT OUTCOME / VITALS
    // --------------------------------------------------

    const updateOutcome = async () => {

        const carePlanId = getCarePlanId();

        if (!carePlanId) {
            alert(
                "Care Plan ID not found."
            );
            return;
        }

        if (
            outcomeForm.currentRisk === "" &&
            outcomeForm.currentWeight === "" &&
            outcomeForm.currentBp === "" &&
            outcomeForm.currentSugar === ""
        ) {
            alert(
                "Please enter at least one current health value."
            );
            return;
        }

        try {

            setUpdatingVitals(true);

            /*
             * Important:
             * Backend OutcomeUpdateRequest uses Double.
             * Therefore convert values to Number.
             */

            const request = {
                carePlanId:
                    String(carePlanId),

                currentRisk:
                    outcomeForm.currentRisk === ""
                        ? null
                        : Number(
                            outcomeForm.currentRisk
                        ),

                currentWeight:
                    outcomeForm.currentWeight === ""
                        ? null
                        : Number(
                            outcomeForm.currentWeight
                        ),

                currentBp:
                    outcomeForm.currentBp === ""
                        ? null
                        : Number(
                            outcomeForm.currentBp
                        ),

                currentSugar:
                    outcomeForm.currentSugar === ""
                        ? null
                        : Number(
                            outcomeForm.currentSugar
                        )
            };

            await axios.put(
                `${API_URL}/updateOutcome`,
                request
            );

            alert(
                "Patient health details updated successfully."
            );

            setShowOutcome(false);

            await fetchCarePlan(patientId);

        } catch (error) {

            console.error(
                "Update outcome error:",
                error
            );

            console.error(
                "Backend response:",
                error.response?.data
            );

            alert(
                typeof error.response?.data === "string"
                    ? error.response.data
                    : "Failed to update patient health details."
            );

        } finally {
            setUpdatingVitals(false);
        }
    };

    // --------------------------------------------------
    // STATUS
    // --------------------------------------------------

    const status = String(
        carePlan?.doctorStatus ||
        carePlan?.status ||
        "Pending"
    )
        .trim()
        .toLowerCase();

    const isPending =
        status === "pending" ||
        status === "pending approval" ||
        status === "waiting for approval";

    const isApproved =
        status === "approved";

    // --------------------------------------------------
    // SEARCH PAGE
    // --------------------------------------------------

    if (!patientId) {

        return (
            <div className="careplan-page search-page">

                <div className="search-hero">

                    <div className="search-hero-icon">
                        🩺
                    </div>

                    <span className="eyebrow">
                        DOCTOR PORTAL
                    </span>

                    <h1>
                        Care Plan Management
                    </h1>

                    <p>
                        Search a patient to review,
                        generate and manage their
                        personalized care plan.
                    </p>

                    <form
                        className="patient-search"
                        onSubmit={handleSearch}
                    >

                        <div className="search-input">

                            <span>
                                🔎
                            </span>

                            <input
                                type="text"
                                placeholder="Enter Patient ID"
                                value={searchId}
                                onChange={(e) =>
                                    setSearchId(
                                        e.target.value
                                    )
                                }
                            />

                        </div>

                        <button
                            type="submit"
                            className="search-btn"
                        >
                            Search Patient
                        </button>

                    </form>

                    <div className="search-hint">
                        <span>🔐</span>
                        Secure clinical care plan
                        management
                    </div>

                </div>

            </div>
        );
    }

    // --------------------------------------------------
    // LOADING
    // --------------------------------------------------

    if (loading) {

        return (
            <div className="careplan-page">

                <div className="loading-card">

                    <div className="spinner"></div>

                    <h2>
                        Loading Patient Care Plan
                    </h2>

                    <p>
                        Retrieving clinical
                        information for Patient #
                        {patientId}
                    </p>

                </div>

            </div>
        );
    }

    // --------------------------------------------------
    // NO CARE PLAN
    // --------------------------------------------------

    if (!carePlan) {

        return (
            <div className="careplan-page">

                <div className="empty-card">

                    <div className="empty-icon">
                        📋
                    </div>

                    <span className="patient-badge">
                        PATIENT #{patientId}
                    </span>

                    <h2>
                        No Care Plan Found
                    </h2>

                    <p>
                        This patient does not have
                        an active care plan yet.
                        You can generate one using
                        the patient's latest
                        prediction data.
                    </p>

                    {errorMessage && (
                        <div className="error-box">
                            ⚠️ {errorMessage}
                        </div>
                    )}

                    <button
                        className="generate-btn"
                        onClick={generateCarePlan}
                        disabled={generating}
                    >
                        {generating
                            ? "⏳ Generating..."
                            : "✨ Generate Care Plan"}
                    </button>

                    <button
                        className="back-search-btn"
                        onClick={() =>
                            navigate(
                                "/doctor/care-plans"
                            )
                        }
                    >
                        ← Search Another Patient
                    </button>

                </div>

            </div>
        );
    }

    // --------------------------------------------------
    // MAIN PAGE
    // --------------------------------------------------

    return (
        <div className="careplan-page">

            {/* HEADER */}

            <div className="page-header">

                <div>

                    <div className="breadcrumb">
                        Doctor Portal
                        <span>›</span>
                        Care Plans
                        <span>›</span>
                        Patient #{patientId}
                    </div>

                    <h1>
                        Patient Care Plan
                    </h1>

                    <p>
                        Clinical assessment,
                        treatment plan and
                        patient health progress
                    </p>

                </div>

                <div className="patient-chip">

                    <div className="patient-avatar">
                        👤
                    </div>

                    <div>
                        <span>
                            PATIENT ID
                        </span>

                        <strong>
                            #{patientId}
                        </strong>
                    </div>

                </div>

            </div>

            {/* STATUS */}

            <div className="status-card">

                <div className="status-info">

                    <span>
                        CARE PLAN STATUS
                    </span>

                    <strong
                        className={
                            isApproved
                                ? "approved"
                                : "pending"
                        }
                    >
                        {isApproved
                            ? "✓ Approved"
                            : "⏳ Pending Approval"}
                    </strong>

                </div>

                <div className="status-divider"></div>

                <div className="review-info">

                    <span>
                        NEXT REVIEW
                    </span>

                    <strong>
                        {carePlan.nextReview
                            ? new Date(
                                carePlan.nextReview
                            ).toLocaleDateString(
                                "en-IN",
                                {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric"
                                }
                            )
                            : "Not scheduled"}
                    </strong>

                </div>

                <div className="status-divider"></div>


            </div>

            {/* CLINICAL ASSESSMENT */}

            <div className="section-heading">

                <div className="section-icon">
                    📊
                </div>

                <div>
                    <h2>
                        Clinical Risk Assessment
                    </h2>

                    <p>
                        AI prediction and current
                        patient risk profile
                    </p>
                </div>

            </div>

            <div className="risk-grid">

                <div className="info-card">

                    <div className="card-icon warning">
                        ⚠️
                    </div>

                    <div>
                        <span>
                            Prediction
                        </span>

                        <strong>
                            {carePlan.prediction ||
                                "N/A"}
                        </strong>
                    </div>

                </div>

                <div className="info-card">

                    <div className="card-icon target">
                        🎯
                    </div>

                    <div>
                        <span>
                            Risk Level
                        </span>

                        <strong>
                            {carePlan.riskLevel ||
                                "N/A"}
                        </strong>
                    </div>

                </div>

                <div className="info-card">

                    <div className="card-icon risk">
                        📈
                    </div>

                    <div>
                        <span>
                            Current Risk
                        </span>

                        <strong>
                            {carePlan.currentRisk ??
                                carePlan.predictionRisk ??
                                "—"}
                            %
                        </strong>
                    </div>

                </div>

                <div className="info-card">

                    <div className="card-icon adherence">
                        🔄
                    </div>

                    <div>
                        <span>
                            Adherence
                        </span>

                        <strong>
                            {carePlan.adherence ??
                                0}
                            %
                        </strong>
                    </div>

                </div>

            </div>

            {/* AI RECOMMENDATION */}

            <div className="recommendation">

                <div className="recommendation-icon">
                    💡
                </div>

                <div>

                    <span>
                        AI RECOMMENDATION
                    </span>

                    <p>
                        {carePlan.recommendation ||
                            "No recommendation available."}
                    </p>

                </div>

            </div>

            {/* TREATMENT PLAN */}

            <div className="section-heading">

                <div className="section-icon">
                    🩺
                </div>

                <div>
                    <h2>
                        Treatment & Lifestyle Plan
                    </h2>

                    <p>
                        Personalized care
                        recommendations
                    </p>
                </div>

            </div>

            <div className="plan-grid">

                {/* GOAL */}

                <div className="plan-card">

                    <div className="plan-title">
                        <span>🎯</span>
                        <h3>
                            Treatment Goal
                        </h3>
                    </div>

                    <p>
                        {carePlan.goal ||
                            "No goal specified."}
                    </p>

                </div>

                {/* MEDICATION */}

                <div className="plan-card">

                    <div className="plan-title">
                        <span>💊</span>
                        <h3>
                            Medications
                        </h3>
                    </div>

                    {Array.isArray(
                        carePlan.medications
                    ) &&
                    carePlan.medications.length >
                        0 ? (

                        <ul className="medicine-list">

                            {carePlan.medications.map(
                                (
                                    medicine,
                                    index
                                ) => (
                                    <li
                                        key={index}
                                    >
                                        <span>
                                            ✓
                                        </span>

                                        {medicine}
                                    </li>
                                )
                            )}

                        </ul>

                    ) : (
                        <p>
                            No medications
                            specified.
                        </p>
                    )}

                </div>

                {/* DIET */}

                <div className="plan-card">

                    <div className="plan-title">
                        <span>🥗</span>
                        <h3>
                            Diet
                        </h3>
                    </div>

                    <p>
                        {carePlan.diet ||
                            "No diet plan specified."}
                    </p>

                </div>

                {/* EXERCISE */}

                <div className="plan-card">

                    <div className="plan-title">
                        <span>🏃</span>
                        <h3>
                            Exercise
                        </h3>
                    </div>

                    <p>
                        {carePlan.exercise ||
                            "No exercise plan specified."}
                    </p>

                </div>

                {/* SLEEP */}

                <div className="plan-card">

                    <div className="plan-title">
                        <span>😴</span>
                        <h3>
                            Sleep
                        </h3>
                    </div>

                    <p>
                        {carePlan.sleep ||
                            "No sleep recommendation."}
                    </p>

                </div>

                {/* DOCTOR NOTES */}

                <div className="plan-card">

                    <div className="plan-title">
                        <span>📝</span>
                        <h3>
                            Doctor Notes
                        </h3>
                    </div>

                    <p>
                        {carePlan.doctorNotes ||
                            "No doctor notes added."}
                    </p>

                </div>

            </div>

            {/* PATIENT HEALTH PROGRESS */}

            <div className="section-heading">

                <div className="section-icon">
                    ❤️
                </div>

                <div>
                    <h2>
                        Patient Health Progress
                    </h2>

                    <p>
                        Previous and current
                        clinical measurements
                    </p>
                </div>

                <button
                    className="update-vitals-top-btn"
                    onClick={() =>
                        setShowOutcome(
                            !showOutcome
                        )
                    }
                >
                    ✏️ Update Details
                </button>

            </div>

            {/* VITAL CARDS */}

            <div className="vitals-grid">

                {/* WEIGHT */}

                <div className="vital-card">

                    <div className="vital-header">
                        <span>
                            ⚖️
                        </span>

                        <div>
                            <small>
                                WEIGHT
                            </small>

                            <strong>
                                {carePlan.currentWeight ??
                                    "—"}{" "}
                                <em>
                                    kg
                                </em>
                            </strong>
                        </div>
                    </div>

                    <div className="previous-value">
                        Previous
                        <strong>
                            {carePlan.previousWeight ??
                                "—"}{" "}
                            kg
                        </strong>
                    </div>

                </div>

                {/* BP */}

                <div className="vital-card">

                    <div className="vital-header">
                        <span>
                            🩸
                        </span>

                        <div>
                            <small>
                                BLOOD PRESSURE
                            </small>

                            <strong>
                                {carePlan.currentBp ??
                                    "—"}{" "}
                                <em>
                                    mmHg
                                </em>
                            </strong>
                        </div>
                    </div>

                    <div className="previous-value">
                        Previous
                        <strong>
                            {carePlan.previousBp ??
                                "—"}{" "}
                            mmHg
                        </strong>
                    </div>

                </div>

                {/* SUGAR */}

                <div className="vital-card">

                    <div className="vital-header">
                        <span>
                            🍬
                        </span>

                        <div>
                            <small>
                                BLOOD SUGAR
                            </small>

                            <strong>
                                {carePlan.currentSugar ??
                                    "—"}{" "}
                                <em>
                                    mg/dL
                                </em>
                            </strong>
                        </div>
                    </div>

                    <div className="previous-value">
                        Previous
                        <strong>
                            {carePlan.previousSugar ??
                                "—"}{" "}
                            mg/dL
                        </strong>
                    </div>

                </div>

                {/* RISK */}

                <div className="vital-card">

                    <div className="vital-header">
                        <span>
                            📈
                        </span>

                        <div>
                            <small>
                                RISK SCORE
                            </small>

                            <strong>
                                {carePlan.currentRisk ??
                                    carePlan.predictionRisk ??
                                    "—"}
                                <em>
                                    %
                                </em>
                            </strong>
                        </div>
                    </div>

                    <div className="previous-value">
                        Previous
                        <strong>
                            {carePlan.previousRisk ??
                                "—"}
                            %
                        </strong>
                    </div>

                </div>

            </div>

            {/* UPDATE DETAILS PANEL */}

            {showOutcome && (

                <div className="outcome-panel">

                    <div className="panel-header">

                        <div>
                            <span>
                                PATIENT MONITORING
                            </span>

                            <h2>
                                Update Health Details
                            </h2>

                            <p>
                                Enter the patient's
                                latest clinical
                                measurements.
                            </p>
                        </div>

                        <button
                            className="close-panel"
                            onClick={() =>
                                setShowOutcome(
                                    false
                                )
                            }
                        >
                            ✕
                        </button>

                    </div>

                    <div className="outcome-grid">

                        <div className="field">

                            <label>
                                📈 Current Risk (%)
                            </label>

                            <input
                                type="number"
                                step="0.01"
                                value={
                                    outcomeForm.currentRisk
                                }
                                onChange={(e) =>
                                    setOutcomeForm({
                                        ...outcomeForm,
                                        currentRisk:
                                            e.target.value
                                    })
                                }
                                placeholder="Example: 75.5"
                            />

                        </div>

                        <div className="field">

                            <label>
                                ⚖️ Current Weight (kg)
                            </label>

                            <input
                                type="number"
                                step="0.1"
                                value={
                                    outcomeForm.currentWeight
                                }
                                onChange={(e) =>
                                    setOutcomeForm({
                                        ...outcomeForm,
                                        currentWeight:
                                            e.target.value
                                    })
                                }
                                placeholder="Example: 78"
                            />

                        </div>

                        <div className="field">

                            <label>
                                🩸 Current BP (mmHg)
                            </label>

                            <input
                                type="number"
                                step="0.1"
                                value={
                                    outcomeForm.currentBp
                                }
                                onChange={(e) =>
                                    setOutcomeForm({
                                        ...outcomeForm,
                                        currentBp:
                                            e.target.value
                                    })
                                }
                                placeholder="Example: 120"
                            />

                        </div>

                        <div className="field">

                            <label>
                                🍬 Current Sugar (mg/dL)
                            </label>

                            <input
                                type="number"
                                step="0.1"
                                value={
                                    outcomeForm.currentSugar
                                }
                                onChange={(e) =>
                                    setOutcomeForm({
                                        ...outcomeForm,
                                        currentSugar:
                                            e.target.value
                                    })
                                }
                                placeholder="Example: 110"
                            />

                        </div>

                    </div>

                    <div className="panel-footer">

                        <button
                            className="cancel-btn"
                            onClick={() =>
                                setShowOutcome(
                                    false
                                )
                            }
                        >
                            Cancel
                        </button>

                        <button
                            className="save-outcome-btn"
                            onClick={updateOutcome}
                            disabled={
                                updatingVitals
                            }
                        >
                            {updatingVitals
                                ? "⏳ Updating..."
                                : "💾 Update Health Details"}
                        </button>

                    </div>

                </div>
            )}

            {/* DOCTOR ACTIONS */}

            <div className="doctor-action-section">

                <div>
                    <span>
                        DOCTOR ACTIONS
                    </span>

                    <h2>
                        Care Plan Management
                    </h2>

                    <p>
                        Review and manage this
                        patient's treatment plan.
                    </p>
                </div>

                <div className="action-buttons">

                    <button
                        className="modify-btn"
                        onClick={() =>
                            setShowModify(
                                !showModify
                            )
                        }
                    >
                        ✏️ Modify Care Plan
                    </button>

                    {isPending && (
                        <button
                            className="approve-btn"
                            onClick={
                                approveCarePlan
                            }
                            disabled={
                                saving
                            }
                        >
                            {saving
                                ? "⏳ Approving..."
                                : "✓ Approve Care Plan"}
                        </button>
                    )}

                    {isApproved && (
                        <span className="approved-message">
                            ✓ Care Plan Approved
                        </span>
                    )}

                </div>

            </div>

            {/* MODIFY PANEL */}

            {showModify && (

                <div className="modify-panel">

                    <div className="panel-header">

                        <div>

                            <span>
                                CARE PLAN EDITOR
                            </span>

                            <h2>
                                ✏️ Modify Care Plan
                            </h2>

                            <p>
                                Update treatment
                                recommendations.
                            </p>

                        </div>

                        <button
                            className="close-panel"
                            onClick={() =>
                                setShowModify(
                                    false
                                )
                            }
                        >
                            ✕
                        </button>

                    </div>

                    <div className="modify-grid">

                        <div className="field full">

                            <label>
                                🎯 Treatment Goal
                            </label>

                            <input
                                value={
                                    form.goal
                                }
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        goal:
                                            e.target.value
                                    })
                                }
                            />

                        </div>

                        <div className="field full">

                            <label>
                                💊 Medications
                            </label>

                            <input
                                value={
                                    form.medications
                                }
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        medications:
                                            e.target.value
                                    })
                                }
                                placeholder="Medicine 1, Medicine 2"
                            />

                            <small>
                                Separate medications
                                using commas.
                            </small>

                        </div>

                        <div className="field">

                            <label>
                                🥗 Diet
                            </label>

                            <textarea
                                value={
                                    form.diet
                                }
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        diet:
                                            e.target.value
                                    })
                                }
                            />

                        </div>

                        <div className="field">

                            <label>
                                🏃 Exercise
                            </label>

                            <textarea
                                value={
                                    form.exercise
                                }
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        exercise:
                                            e.target.value
                                    })
                                }
                            />

                        </div>

                        <div className="field">

                            <label>
                                😴 Sleep
                            </label>

                            <textarea
                                value={
                                    form.sleep
                                }
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        sleep:
                                            e.target.value
                                    })
                                }
                            />

                        </div>

                        <div className="section-title">
    <span>📝</span>
    Doctor Notes
</div>

<div className="doctor-notes-card">
    {isPending ? (
        <textarea
            value={doctorNotes}
            onChange={(e) => setDoctorNotes(e.target.value)}
            placeholder="Enter clinical notes for this patient..."
        />
    ) : (
        <div className="doctor-notes-display">
            {doctorNotes || "No doctor notes added."}
        </div>
    )}
</div>

                    </div>

                    <div className="panel-footer">

                        <button
                            className="cancel-btn"
                            onClick={() =>
                                setShowModify(
                                    false
                                )
                            }
                        >
                            Cancel
                        </button>

                        <button
                            className="save-btn"
                            onClick={
                                modifyCarePlan
                            }
                            disabled={
                                saving
                            }
                        >
                            {saving
                                ? "⏳ Saving..."
                                : "💾 Save Changes"}
                        </button>

                    </div>

                </div>
            )}

            {/* BOTTOM */}

            <div className="bottom-actions">

                <button
                    onClick={() =>
                        navigate(
                            "/doctor/care-plans"
                        )
                    }
                >
                    ← Search Another Patient
                </button>

            </div>

        </div>
    );
};

export default DoctorCarePlans;