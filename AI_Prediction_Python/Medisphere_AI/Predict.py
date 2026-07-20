from flask import Flask, request, jsonify
import tensorflow as tf
import numpy as np
import joblib
import pandas as pd

# Create Flask application
app = Flask(__name__)


# Load Heart Disease Model

heart_model = tf.keras.models.load_model("model/heart_model.keras")
heart_scaler = joblib.load("model/heart_scaler.pkl")

# Load Diabetes Model

diabetes_model = tf.keras.models.load_model("model/diabetes_model.keras")
diabetes_scaler = joblib.load("model/diabetes_scaler.pkl")


# HEART DISEASE PREDICTION

@app.route("/predict-heart", methods=["POST"])
def predict_heart():

    data = request.json

    values = [[
        data["age"],
        data["sex"],
        data["cp"],
        data["trestbps"],
        data["chol"],
        data["fbs"],
        data["restecg"],
        data["thalach"],
        data["exang"],
        data["oldpeak"],
        data["slope"],
        data["ca"],
        data["thal"]
    ]]

    values = heart_scaler.transform(values)

    prediction = heart_model.predict(values, verbose=0)[0][0]

    return jsonify({
        "probability": float(prediction),
        "prediction": "Heart Disease" if prediction >= 0.5 else "No Heart Disease"
    })


# DIABETES PREDICTION

@app.route("/predict-diabetes", methods=["POST"])
def predict_diabetes():

    data = request.json

    input_data = pd.DataFrame([{
        "gender": data["gender"],
        "age": data["age"],
        "hypertension": data["hypertension"],
        "heart_disease": data["heart_disease"],
        "smoking_history": data["smoking_history"],
        "bmi": data["bmi"],
        "HbA1c_level": data["HbA1c_level"],
        "blood_glucose_level": data["blood_glucose_level"]
    }])

    input_data = pd.get_dummies(
        input_data,
        columns=["gender", "smoking_history"]
    )

    # Match training columns
    train_columns = diabetes_scaler.feature_names_in_

    input_data = input_data.reindex(columns=train_columns, fill_value=0)

    input_data = diabetes_scaler.transform(input_data)

    prediction = diabetes_model.predict(input_data, verbose=0)[0][0]

    return jsonify({
        "probability": float(prediction),
        "prediction": "Diabetes" if prediction >= 0.5 else "No Diabetes"
    })


if __name__ == "__main__":
    app.run(debug=True, port=5000)