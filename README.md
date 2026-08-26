# Healthcare Management Platform for Clinical Operations

## 📌 Project Overview

The **Healthcare Management Platform for Clinical Operations** is a full-stack healthcare platform designed to streamline clinical workflows and provide centralized management of patients, doctors, health data, AI-powered predictions, real-time monitoring, alerts, and personalized care plans.

The platform follows a **microservices architecture** and integrates modern technologies such as **Spring Boot, React, Apache Kafka, MongoDB, Keycloak, Python, TensorFlow, and Flask**.

The system supports three primary roles:

* **Admin**
* **Doctor**
* **Patient**

Each role has a dedicated dashboard and access to features based on role-specific responsibilities.

---

# 🎯 Objectives

The main objectives of the platform are:

* Centralize clinical and patient information.
* Improve communication between patients, doctors, and administrators.
* Enable real-time monitoring of patient health data.
* Provide AI-powered disease risk predictions.
* Generate and manage personalized care plans.
* Provide automated health alerts.
* Implement secure authentication and role-based authorization.
* Build a scalable microservices-based healthcare architecture.

---

# 🏗️ System Architecture

The platform consists of multiple independent services that communicate through REST APIs and Apache Kafka.

```text
                         ┌──────────────────────┐
                         │      React.js        │
                         │      Frontend        │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │     API Gateway      │
                         └──────────┬───────────┘
                                    │
              ┌─────────────────────┼─────────────────────┐
              │                     │                     │
              ▼                     ▼                     ▼
       Patient Service       Doctor Service         Auth Service
                                                     (Keycloak)
              │                     │
              └──────────────┬──────┘
                             │
                             ▼
                        Apache Kafka
                             │
             ┌───────────────┼────────────────┐
             │               │                │
             ▼               ▼                ▼
       Vital Service    Health Twin       Alert Service
                             │
                             ▼
                    Prediction Service
                             │
                             ▼
                      Python / Flask
                             │
                             ▼
                       ML Models
                             │
                             ▼
                     CarePlan Service
                             │
                             ▼
                           MongoDB
```

---

# 🛠️ Technology Stack

## Frontend

* React.js
* JavaScript
* HTML5
* CSS3
* Axios
* React Router

## Backend

* Java
* Spring Boot
* Spring Cloud
* REST APIs
* Spring Data JPA
* Hibernate
* Apache Kafka
* MongoDB
* Eureka Service Discovery
* API Gateway

## Authentication & Security

* Keycloak
* OAuth 2.0
* JWT
* Role-Based Access Control

## AI / Machine Learning

* Python
* TensorFlow
* Scikit-learn
* Pandas
* NumPy
* Flask
* SHAP
* Joblib

## Development Tools

* Git
* GitHub
* Postman
* Spring Tool Suite / IntelliJ IDEA
* Visual Studio Code
* Docker

---

# 👥 User Roles

## 👨‍💼 Admin

The administrator manages the overall clinical platform.

### Responsibilities

* Manage doctors
* Manage patients
* Assign doctors to patients
* Monitor alerts
* Manage AI models
* Monitor care plans
* Access administrative dashboards

---

## 👨‍⚕️ Doctor

Doctors can monitor and manage their assigned patients.

### Responsibilities

* View assigned patients
* View patient profiles
* Monitor patient vitals
* View health twin information
* Perform AI disease predictions
* Review alerts
* Review and manage care plans
* Monitor patient health status

---

## 🧑‍🤝‍🧑 Patient

Patients can access their personal healthcare information.

### Features

* View personal profile
* View health information
* View health twin
* View AI predictions
* View alerts
* View personalized care plans
* View care plan progress
* View assigned doctor information

---

# 🚀 Project Milestones

## Milestone 1 — Foundation & Patient Management

### Objective

Establish the basic healthcare platform architecture, authentication, patient management, and core microservices.

### Features

* Microservices architecture
* Eureka service discovery
* API Gateway
* Patient management
* Patient registration
* Patient profile management
* Patient dashboard
* Doctor and patient roles
* Keycloak authentication
* JWT-based authorization
* Role-based access control
* FHIR integration
* REST API communication
* MongoDB integration

### Key Components

* Patient Service
* FHIR Service
* API Gateway
* Eureka Server
* Authentication Service
* React Frontend

### Outcome

The foundation of the healthcare management platform was established with secure authentication and centralized patient management.

---

# Milestone 2 — AI Prediction & Model Management

### Objective

Integrate artificial intelligence and machine learning capabilities into the healthcare platform.

### Features

* Diabetes disease prediction
* Heart disease prediction
* Machine learning model training
* Model management
* Prediction API
* Prediction result management
* Python Flask prediction service
* TensorFlow models
* Model evaluation
* SHAP-based explainability

### AI Models

The platform currently includes models for:

### 🩺 Diabetes Prediction

A machine learning model is used to estimate diabetes risk based on patient health parameters.

### ❤️ Heart Disease Prediction

A machine learning model evaluates patient health parameters to estimate heart disease risk.

### AI Architecture

```text
React Frontend
       │
       ▼
Prediction Service
       │
       ▼
Python Flask API
       │
       ├── Diabetes Model
       │
       └── Heart Disease Model
       │
       ▼
Prediction Result
       │
       ▼
MongoDB
```

### Outcome

AI-powered disease prediction capabilities were integrated into the healthcare platform to support clinical decision-making.

---

# Milestone 3 — Continuous Monitoring & Alerts

### Objective

Enable continuous patient health monitoring and automated alert generation.

### Features

* Real-time vital monitoring
* Vital data collection
* Kafka-based event streaming
* Health Twin updates
* Automated alert generation
* Alert management
* Patient health monitoring
* Event-driven communication

### Monitoring Architecture

```text
Vital Data
    │
    ▼
Vital Service
    │
    ▼
Apache Kafka
    │
    ▼
Health Twin Service
    │
    ├──────────────► Health Status
    │
    └──────────────► Alert Producer
                           │
                           ▼
                     Alert Service
                           │
                           ▼
                    Alert Management
```

### Outcome

The platform was enhanced with continuous monitoring and event-driven alerts, allowing healthcare teams to respond to important changes in patient health conditions.

---

# Milestone 4 — Personalized Care Plans & Role-Based Dashboards

### Objective

Provide personalized healthcare management through role-specific dashboards and AI-assisted care planning.

### Features

* Admin dashboard
* Doctor dashboard
* Patient dashboard
* Doctor-patient assignment
* Personalized care plans
* Care plan generation
* Care plan approval
* Care plan modification
* Progress tracking
* Outcome tracking
* AI-assisted recommendations
* Alert management
* Model management
* Patient-specific healthcare information

### Care Plan Workflow

```text
Patient Health Data
        │
        ▼
AI Prediction
        │
        ▼
Risk Level
        │
        ▼
Care Plan Generation
        │
        ▼
Doctor Review
        │
        ▼
Approval / Modification
        │
        ▼
Patient Care Plan
        │
        ▼
Progress Tracking
        │
        ▼
Outcome Management
```

### AI-Assisted Care Plans

The platform can use prediction results and patient information to generate recommendations related to:

* Healthcare goals
* Medication
* Diet
* Exercise
* Sleep
* Lifestyle management

The platform also integrates **Ollama/local LLM capabilities** for AI-assisted care plan generation.

### Outcome

The final milestone transformed the platform into a role-based clinical operations system with personalized care planning and dedicated workflows for administrators, doctors, and patients.

---

# 🔄 Overall Clinical Workflow

```text
Patient Registration
        │
        ▼
Patient Health Data
        │
        ▼
Continuous Monitoring
        │
        ▼
Health Twin
        │
        ▼
AI Disease Prediction
        │
        ▼
Risk Assessment
        │
        ▼
Alerts
        │
        ▼
Personalized Care Plan
        │
        ▼
Doctor Review
        │
        ▼
Patient
        │
        ▼
Progress Monitoring
        │
        ▼
Outcome Tracking
```

---

# 📊 Microservices

The backend is divided into independent services for scalability and maintainability.

| Service             | Responsibility                      |
| ------------------- | ----------------------------------- |
| Eureka Server       | Service discovery                   |
| API Gateway         | Central API routing                 |
| Auth Service        | Authentication and authorization    |
| Patient Service     | Patient management                  |
| Doctor Service      | Doctor management and assignments   |
| FHIR Service        | Healthcare data integration         |
| Vital Service       | Vital data collection and streaming |
| Health Twin Service | Digital health twin processing      |
| Prediction Service  | AI prediction and model management  |
| Alert Service       | Health alerts and notifications     |
| CarePlan Service    | Personalized care plan management   |

---

# 🔐 Security

The platform uses **Keycloak** for authentication and authorization.

Security features include:

* User authentication
* JWT-based security
* Role-based access control
* Admin authorization
* Doctor authorization
* Patient authorization
* Protected backend APIs

---

# 📡 Event-Driven Architecture

Apache Kafka is used for real-time communication between services.

Kafka enables:

* Vital data streaming
* Health Twin updates
* Alert generation
* Asynchronous service communication
* Event-driven processing

This architecture helps the platform handle continuously changing health information without tightly coupling the individual services.

---

# 🧠 Digital Health Twin

The Health Twin component maintains a dynamic representation of a patient's health state.

It processes information such as:

* Patient information
* Vital signs
* Health observations
* AI prediction results
* Risk levels
* Alerts

The Health Twin can therefore act as a centralized representation of the patient's current health condition.

---

# 📁 Project Structure

```text
Healthcare-Management-Platform-for-Clinical-Operations/
│
├── Backend/
│   ├── alertservice/
│   ├── careplan/
│   ├── doctorservice/
│   ├── fhirservice/
│   ├── healthtwin/
│   ├── medisphereapp/
│   ├── predictionService/
│   └── vitalservice/
│
├── AI_Prediction_Python/
│   └── Medisphere_AI/
│       ├── dataset/
│       ├── model/
│       ├── Predict.py
│       ├── train_diabetes.py
│       ├── train_heart_model.py
│       └── requirements.txt
│
├── Frontend/
│   └── first-project/
│
├── screenshots/
│   ├── milestone-1/
│   ├── milestone-2/
│   ├── milestone-3/
│   └── milestone-4/
│
├── README.md
└── .gitignore
```

---

# 📸 Screenshots

Screenshots demonstrating the functionality of each milestone will be added to the following directories:

```text
screenshots/
├── milestone-1/
├── milestone-2/
├── milestone-3/
└── milestone-4/
```

Screenshots will include the major Admin, Doctor, Patient, AI Prediction, Monitoring, Alert, and Care Plan interfaces.

---

# ⚙️ How to Run the Project

## Backend

Open each Spring Boot microservice in **Spring Tool Suite / IntelliJ IDEA** and configure the required environment.

Start the services in an appropriate order:

```text
1. Eureka Server
2. Keycloak
3. API Gateway
4. Patient Service
5. Doctor Service
6. FHIR Service
7. Vital Service
8. Health Twin Service
9. Prediction Service
10. Alert Service
11. CarePlan Service
```

## AI Prediction Service

Create and activate the Python virtual environment:

```bash
python -m venv tf_env
```

Activate it on Windows:

```bash
tf_env\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Start the Flask prediction API:

```bash
python Predict.py
```

## Frontend

Navigate to the frontend directory:

```bash
cd Frontend/first-project
```

Install dependencies:

```bash
npm install
```

Start the React application:

```bash
npm run dev
```

---

# 🧪 Testing

The project uses tools such as:

* Postman for REST API testing
* Spring Boot tests
* Python model testing
* Frontend testing through the React development environment

---

# 📈 Future Enhancements

Potential future improvements include:

* Wearable device integration
* Mobile healthcare application
* Cloud deployment
* Advanced disease prediction models
* Additional healthcare datasets
* Real-time notification services
* Advanced analytics dashboards
* Improved explainable AI
* Electronic Health Record integration
* Healthcare provider integration
* Advanced patient risk scoring
* Automated clinical workflow optimization

---

# 🎓 Project Outcome

The **Healthcare Management Platform for Clinical Operations** demonstrates the integration of:

* Full-stack development
* Microservices architecture
* Event-driven architecture
* Healthcare data integration
* Artificial intelligence
* Machine learning
* Real-time monitoring
* Role-based security
* Personalized healthcare management

The platform provides a foundation for managing clinical operations while combining traditional healthcare management with modern AI and real-time data processing technologies.

---

# 👨‍💻 Development

This project was developed as a full-stack healthcare technology project combining **Java Spring Boot, React.js, Python AI/ML, Apache Kafka, MongoDB, and Keycloak**.

---

## ⭐ Project Highlights

* ✅ Microservices-based architecture
* ✅ React-based frontend
* ✅ Spring Boot backend
* ✅ AI-powered disease prediction
* ✅ Real-time health monitoring
* ✅ Kafka event streaming
* ✅ Digital Health Twin
* ✅ Automated alerts
* ✅ Personalized care plans
* ✅ Admin, Doctor, and Patient dashboards
* ✅ Keycloak authentication
* ✅ Role-based authorization
* ✅ AI-assisted care plan generation
