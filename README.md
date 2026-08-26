# Medisphere – Digital Health Twin Platform

## 📌 Project Overview

Medisphere is a Digital Health Twin Platform that integrates patient
data, real-time vitals, AI-based disease prediction, health monitoring,
alerts, and personalized care plans.

## 🚀 Technologies Used

### Frontend
- React.js
- JavaScript
- HTML
- CSS

### Backend
- Java
- Spring Boot
- Spring Cloud
- REST APIs
- Apache Kafka
- MongoDB
- Keycloak

### AI/ML
- Python
- TensorFlow
- Scikit-learn
- Flask
- SHAP

---

# 🏗️ Project Milestones

## Milestone 1 – Foundation & Patient Management

### Features
- Patient registration and management
- Patient profile
- Authentication and authorization
- Keycloak integration
- Microservices architecture
- Eureka service discovery
- API Gateway
- FHIR integration

### Screenshots

![Patient Dashboard](screenshots/milestone-1/patient-dashboard.png)

---

## Milestone 2 – AI Prediction & Model Management

### Features
- Diabetes prediction
- Heart disease prediction
- Machine learning models
- Model management
- Prediction results
- Python Flask prediction service
- SHAP-based explainability

### Screenshots

![AI Prediction](screenshots/milestone-2/ai-prediction.png)

---

## Milestone 3 – Continuous Monitoring & Alerts

### Features
- Real-time vital monitoring
- Kafka-based streaming
- Health Twin updates
- Alert generation
- Alert management
- Real-time health monitoring

### Screenshots

![Health Monitoring](screenshots/milestone-3/health-monitoring.png)

---

## Milestone 4 – Personalized Care Plans & Role-Based Dashboards

### Features
- Personalized care plans
- AI-assisted care plan generation
- Doctor dashboard
- Patient dashboard
- Admin dashboard
- Doctor-patient assignment
- Care plan approval
- Progress tracking
- Outcome management

### Screenshots

![Admin Dashboard](screenshots/milestone-4/admin-dashboard.png)

---

# 🏛️ Architecture

```text
                    ┌───────────────┐
                    │    React      │
                    │   Frontend    │
                    └───────┬───────┘
                            │
                     API Gateway
                            │
       ┌────────────────────┼────────────────────┐
       │                    │                    │
 Patient Service      Doctor Service       Auth Service
       │                    │                 Keycloak
       │                    │
       └──────────────┬─────┘
                      │
                   Kafka
                      │
        ┌─────────────┼──────────────┐
        │             │              │
   Vital Service Health Twin   Alert Service
        │             │
        │             │
        └─────────────┼──────────────┘
                      │
              Prediction Service
                      │
                 Python / Flask
                      │
               ML Models
                      │
                 CarePlan
                   Service