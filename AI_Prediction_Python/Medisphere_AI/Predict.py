from flask import Flask, request, jsonify
import tensorflow as tf
import numpy as np
import joblib
import pandas as pd
import shap

# Create Flask application
app = Flask(__name__)


# Load Heart Disease Model

heart_model = tf.keras.models.load_model("model/heart_model.keras")
heart_scaler = joblib.load("model/heart_scaler.pkl")

# Load Diabetes Model

diabetes_model = tf.keras.models.load_model("model/diabetes_model.keras")
diabetes_scaler = joblib.load("model/diabetes_scaler.pkl")

# Background data for SHAP
heart_background = np.zeros((1, 13))
diabetes_background = np.zeros((1, len(diabetes_scaler.feature_names_in_)))

# Explainers
heart_explainer = shap.GradientExplainer(heart_model, heart_background)
diabetes_explainer = shap.GradientExplainer(diabetes_model, diabetes_background)
heart_features = [
    "age",
    "sex",
    "cp",
    "trestbps",
    "chol",
    "fbs",
    "restecg",
    "thalach",
    "exang",
    "oldpeak",
    "slope",
    "ca",
    "thal"
]

# HEART DISEASE PREDICTION

@app.route("/predict-heart", methods=["POST"])
def predict_heart():

    data = request.json
    print("\nReceived JSON:")
    print(data)

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
    print("\nInput values:")
    print(values)

    values = heart_scaler.transform(values)
    print("\nScaled values:")
    print(values)

    prediction = heart_model.predict(values, verbose=0)[0][0]
    try:
      shap_values = heart_explainer.shap_values(values)
      print("\n========== HEART SHAP ==========")
      print(type(shap_values))
      print(np.array(shap_values).shape)
      print(shap_values)
      print("\nProbability:", prediction)
      explanation = {}
      for feature, value in zip(heart_features, shap_values[0, :, 0]):
        explanation[feature] = float(value)
    except Exception as e:
     print("SHAP Error:", e)
     explanation = {}
    return jsonify({
        "probability": float(prediction),
        "prediction": "Heart Disease" if prediction >= 0.5 else "No Heart Disease",
        "shap": explanation
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
    try:
      shap_values = diabetes_explainer.shap_values(input_data)
      print("\n========== DIABETES SHAP ==========")
      print(type(shap_values))
      print(np.array(shap_values).shape)
      print(shap_values)
      explanation = {}
      for feature, value in zip(train_columns, shap_values[0, :, 0]):
        explanation[feature] = float(value)
    except Exception as e:
     print("SHAP Error:", e)
     explanation = {}

    return jsonify({
        "probability": float(prediction),
        "prediction": "Diabetes" if prediction >= 0.5 else "No Diabetes",
         "shap": explanation
    })


if __name__ == "__main__":
    app.run(debug=True, port=5000)