import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminCarePlans.css";

const AdminCarePlans = () => {
    const [carePlans, setCarePlans] = useState([]);
    const [filteredPlans, setFilteredPlans] = useState([]);

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [riskFilter, setRiskFilter] = useState("ALL");

    const [selectedPlan, setSelectedPlan] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // ==========================================
    // FETCH ALL CARE PLANS
    // ==========================================

    useEffect(() => {
        fetchCarePlans();
    }, []);

    const fetchCarePlans = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await axios.get(
                "http://localhost:8093/careplan"
            );

            setCarePlans(response.data);
            setFilteredPlans(response.data);

        } catch (err) {
            console.error("Error fetching care plans:", err);

            setError(
                "Unable to load care plans."
            );
        } finally {
            setLoading(false);
        }
    };

    // ==========================================
    // FILTER CARE PLANS
    // ==========================================

    useEffect(() => {

        let filtered = [...carePlans];

        // Search Patient ID
        if (search.trim() !== "") {
            filtered = filtered.filter((plan) =>
                plan.patientId
                    ?.toString()
                    .toLowerCase()
                    .includes(search.toLowerCase())
            );
        }

        // Status Filter
        if (statusFilter !== "ALL") {
            filtered = filtered.filter(
                (plan) =>
                    plan.doctorStatus?.toUpperCase() ===
                    statusFilter
            );
        }

        // Risk Filter
        if (riskFilter !== "ALL") {
            filtered = filtered.filter(
                (plan) =>
                    plan.riskLevel?.toUpperCase() ===
                    riskFilter
            );
        }

        setFilteredPlans(filtered);

    }, [
        search,
        statusFilter,
        riskFilter,
        carePlans
    ]);

    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {
        return (
            <div className="admin-careplans-container">
                <div className="admin-careplans-loading">
                    Loading care plans...
                </div>
            </div>
        );
    }

    // ==========================================
    // ERROR
    // ==========================================

    if (error) {
        return (
            <div className="admin-careplans-container">
                <div className="admin-careplans-error">
                    {error}
                </div>
            </div>
        );
    }

    // ==========================================
    // MAIN UI
    // ==========================================

    return (
        <div className="admin-careplans-container">

            {/* HEADER */}

            <div className="admin-careplans-header">

                <div>
                    <h1>📋 Care Plan Monitoring</h1>

                    <p>
                        Monitor patient care plans and
                        their progress.
                    </p>
                </div>

                <button
                    className="refresh-button"
                    onClick={fetchCarePlans}
                >
                    🔄 Refresh
                </button>

            </div>


            {/* SUMMARY */}

            <div className="careplan-summary-grid">

                <div className="summary-card">
                    <span>Total Care Plans</span>

                    <strong>
                        {carePlans.length}
                    </strong>
                </div>


                <div className="summary-card pending">
                    <span>Pending</span>

                    <strong>
                        {
                            carePlans.filter(
                                (plan) =>
                                    plan.doctorStatus?.toUpperCase() ===
                                    "PENDING"
                            ).length
                        }
                    </strong>
                </div>


                <div className="summary-card approved">
                    <span>Approved</span>

                    <strong>
                        {
                            carePlans.filter(
                                (plan) =>
                                    plan.doctorStatus?.toUpperCase() ===
                                    "APPROVED"
                            ).length
                        }
                    </strong>
                </div>


                <div className="summary-card high-risk">
                    <span>High Risk</span>

                   <strong>
    {
        carePlans.filter(
            (plan) =>
                plan.riskLevel?.toUpperCase() ===
                "HIGH RISK"
        ).length
    }
</strong>
                </div>

            </div>


            {/* FILTERS */}

            <div className="careplan-filter-card">

                <div className="search-box">

                    <label>
                        Search Patient
                    </label>

                    <input
                        type="text"
                        placeholder="Enter Patient ID"
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                    />

                </div>


                <div className="filter-box">

                    <label>
                        Status
                    </label>

                    <select
                        value={statusFilter}
                        onChange={(e) =>
                            setStatusFilter(e.target.value)
                        }
                    >
                        <option value="ALL">
                            All Status
                        </option>

                        <option value="PENDING">
                            Pending
                        </option>

                        <option value="APPROVED">
                            Approved
                        </option>

                    </select>

                </div>


                <div className="filter-box">

                    <label>
                        Risk
                    </label>

                    <select
                        value={riskFilter}
                        onChange={(e) =>
                            setRiskFilter(e.target.value)
                        }
                    >
                        <option value="ALL">
                            All Risk
                        </option>

                        <option value="HIGH RISK">
    High Risk
</option>

                        <option value="MEDIUM">
                            Medium
                        </option>

                        <option value="LOW">
                            Low
                        </option>

                    </select>

                </div>

            </div>


            {/* TABLE */}

            <div className="careplan-table-card">

                <div className="table-header">

                    <h2>
                        Care Plans
                    </h2>

                    <span>
                        {filteredPlans.length} records
                    </span>

                </div>


                {filteredPlans.length === 0 ? (

                    <div className="empty-careplans">
                        No care plans found.
                    </div>

                ) : (

                    <div className="table-wrapper">

                        <table>

                            <thead>

                                <tr>

                                    <th>
                                        Patient ID
                                    </th>

                                    <th>
                                        Prediction
                                    </th>

                                    <th>
                                        Risk
                                    </th>

                                    <th>
                                        Risk Level
                                    </th>

                                    <th>
                                        Status
                                    </th>

                                    <th>
                                        Adherence
                                    </th>

                                    <th>
                                        Action
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {filteredPlans.map(
                                    (plan) => (

                                        <tr
                                            key={
                                                plan.id ||
                                                plan._id ||
                                                plan.patientId
                                            }
                                        >

                                            <td>
                                                <strong>
                                                    {plan.patientId}
                                                </strong>
                                            </td>


                                            <td>
                                                {plan.predictionType ||
                                                    "—"}
                                            </td>


                                            <td>
                                                {plan.predictionRisk != null
                                                    ? `${plan.predictionRisk.toFixed(2)}%`
                                                    : "—"}
                                            </td>


                                            <td>

                                                <span
    className={`risk-badge ${
        plan.riskLevel
            ?.toLowerCase()
            .replace(/\s+/g, "-") || ""
    }`}
>
    {plan.riskLevel || "—"}
</span>

                                            </td>


                                            <td>

                                                <span
                                                    className={`status-badge ${
                                                        plan.doctorStatus
                                                            ?.toLowerCase() || ""
                                                    }`}
                                                >
                                                    {plan.doctorStatus ||
                                                        "—"}
                                                </span>

                                            </td>


                                            <td>

                                                <div className="adherence-cell">

                                                    <div className="mini-progress">

                                                        <div
                                                            style={{
                                                                width: `${
                                                                    plan.adherence ||
                                                                    0
                                                                }%`
                                                            }}
                                                        />

                                                    </div>

                                                    <span>
                                                        {
                                                            plan.adherence ||
                                                            0
                                                        }%
                                                    </span>

                                                </div>

                                            </td>


                                            <td>

                                                <button
                                                    className="view-plan-button"
                                                    onClick={() =>
                                                        setSelectedPlan(
                                                            plan
                                                        )
                                                    }
                                                >
                                                    👁 View
                                                </button>

                                            </td>

                                        </tr>

                                    )
                                )}

                            </tbody>

                        </table>

                    </div>

                )}

            </div>


            {/* DETAILS MODAL */}

            {selectedPlan && (

                <div className="modal-overlay">

                    <div className="careplan-modal">

                        <div className="modal-header">

                            <div>

                                <h2>
                                    Care Plan Details
                                </h2>

                                <p>
                                    Patient ID:{" "}
                                    <strong>
                                        {
                                            selectedPlan.patientId
                                        }
                                    </strong>
                                </p>

                            </div>

                            <button
                                className="close-modal"
                                onClick={() =>
                                    setSelectedPlan(null)
                                }
                            >
                                ✕
                            </button>

                        </div>


                        {/* STATUS */}

                        <div className="modal-status-row">

                            <span
                                className={`status-badge ${
                                    selectedPlan.doctorStatus
                                        ?.toLowerCase() || ""
                                }`}
                            >
                                {
                                    selectedPlan.doctorStatus
                                }
                            </span>

                            <span
                                className={`risk-badge ${
                                    selectedPlan.riskLevel
                                        ?.toLowerCase() || ""
                                }`}
                            >
                                {
                                    selectedPlan.riskLevel
                                }
                            </span>

                        </div>


                        {/* RISK */}

                        <div className="modal-section">

                            <h3>
                                Prediction & Risk
                            </h3>

                            <div className="modal-grid">

                                <div>
                                    <span>
                                        Prediction
                                    </span>

                                    <strong>
                                        {
                                            selectedPlan.prediction ||
                                            "—"
                                        }
                                    </strong>
                                </div>


                                <div>
                                    <span>
                                        Prediction Type
                                    </span>

                                    <strong>
                                        {
                                            selectedPlan.predictionType ||
                                            "—"
                                        }
                                    </strong>
                                </div>


                                <div>
                                    <span>
                                        Risk
                                    </span>

                                    <strong>
                                        {
                                            selectedPlan.predictionRisk !=
                                            null
                                                ? `${selectedPlan.predictionRisk.toFixed(
                                                      2
                                                  )}%`
                                                : "—"
                                        }
                                    </strong>
                                </div>

                            </div>

                        </div>


                        {/* GOAL */}

                        <div className="modal-section">

                            <h3>
                                🎯 Care Goal
                            </h3>

                            <p>
                                {
                                    selectedPlan.goal ||
                                    "No goal specified."
                                }
                            </p>

                        </div>


                        {/* RECOMMENDATION */}

                        <div className="modal-section">

                            <h3>
                                💡 AI Recommendation
                            </h3>

                            <p>
                                {
                                    selectedPlan.recommendation ||
                                    "No recommendation available."
                                }
                            </p>

                        </div>


                        {/* CARE DETAILS */}

                        <div className="modal-section">

                            <h3>
                                Care Details
                            </h3>

                            <div className="modal-care-grid">

                                <div>

                                    <h4>
                                        💊 Medications
                                    </h4>

                                    {selectedPlan.medications
                                        ?.length > 0 ? (

                                        <ul>

                                            {
                                                selectedPlan.medications.map(
                                                    (
                                                        medicine,
                                                        index
                                                    ) => (

                                                        <li
                                                            key={
                                                                index
                                                            }
                                                        >
                                                            {
                                                                medicine
                                                            }
                                                        </li>

                                                    )
                                                )
                                            }

                                        </ul>

                                    ) : (

                                        <p>
                                            No medications
                                            specified.
                                        </p>

                                    )}

                                </div>


                                <div>

                                    <h4>
                                        🥗 Diet
                                    </h4>

                                    <p>
                                        {
                                            selectedPlan.diet ||
                                            "—"
                                        }
                                    </p>

                                </div>


                                <div>

                                    <h4>
                                        🚶 Exercise
                                    </h4>

                                    <p>
                                        {
                                            selectedPlan.exercise ||
                                            "—"
                                        }
                                    </p>

                                </div>


                                <div>

                                    <h4>
                                        😴 Sleep
                                    </h4>

                                    <p>
                                        {
                                            selectedPlan.sleep ||
                                            "—"
                                        }
                                    </p>

                                </div>

                            </div>

                        </div>


                        {/* OUTCOME */}

                        <div className="modal-section">

                            <h3>
                                📊 Health Outcome
                            </h3>

                            <div className="outcome-modal-grid">

                                <div>
                                    <span>
                                        Risk
                                    </span>

                                    <strong>
                                        {
                                            selectedPlan.previousRisk !=
                                            null
                                                ? `${selectedPlan.previousRisk.toFixed(
                                                      2
                                                  )}%`
                                                : "—"
                                        }

                                        {" → "}

                                        {
                                            selectedPlan.currentRisk !=
                                            null
                                                ? `${selectedPlan.currentRisk.toFixed(
                                                      2
                                                  )}%`
                                                : "—"
                                        }
                                    </strong>
                                </div>


                                <div>
                                    <span>
                                        Weight
                                    </span>

                                    <strong>
                                        {
                                            selectedPlan.previousWeight ??
                                            "—"
                                        }

                                        {" → "}

                                        {
                                            selectedPlan.currentWeight ??
                                            "—"
                                        }

                                        {" kg"}
                                    </strong>
                                </div>


                                <div>
                                    <span>
                                        Blood Pressure
                                    </span>

                                    <strong>
                                        {
                                            selectedPlan.previousBp ??
                                            "—"
                                        }

                                        {" → "}

                                        {
                                            selectedPlan.currentBp ??
                                            "—"
                                        }
                                    </strong>
                                </div>


                                <div>
                                    <span>
                                        Blood Sugar
                                    </span>

                                    <strong>
                                        {
                                            selectedPlan.previousSugar ??
                                            "—"
                                        }

                                        {" → "}

                                        {
                                            selectedPlan.currentSugar ??
                                            "—"
                                        }
                                    </strong>
                                </div>

                            </div>

                        </div>


                        {/* ADHERENCE */}

                        <div className="modal-section">

                            <h3>
                                📈 Patient Adherence
                            </h3>

                            <div className="modal-adherence">

                                <div className="modal-progress">

                                    <div
                                        style={{
                                            width: `${
                                                selectedPlan.adherence ||
                                                0
                                            }%`
                                        }}
                                    />

                                </div>

                                <strong>
                                    {
                                        selectedPlan.adherence ||
                                        0
                                    }%
                                </strong>

                            </div>

                        </div>


                        {/* DOCTOR NOTES */}

                        <div className="modal-section">

                            <h3>
                                👨‍⚕️ Doctor Notes
                            </h3>

                            <p>
                                {
                                    selectedPlan.doctorNotes ||
                                    "No doctor notes."
                                }
                            </p>

                        </div>


                        {/* REVIEW */}

                        <div className="modal-review">

                            <div>

                                <span>
                                    Next Review
                                </span>

                                <strong>
                                    {
                                        selectedPlan.nextReview ||
                                        "Not scheduled"
                                    }
                                </strong>

                            </div>

                        </div>

                    </div>

                </div>

            )}

        </div>
    );
};

export default AdminCarePlans;