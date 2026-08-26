import tensorflow as tf
import joblib
import numpy as np

# Load trained model and scaler
model = tf.keras.models.load_model("model/heart_model.keras")
scaler = joblib.load("model/heart_scaler.pkl")

# Known heart disease sample (target=1 from your dataset)
sample = np.array([[
    65,1,0,165,310,1,1,95,1,3.5,0,3,3   # thal
]])

# Apply same scaling used during training
sample = scaler.transform(sample)

# Prediction
result = model.predict(sample)

print("Model probability:", result[0][0])

if result[0][0] >= 0.5:
    print("Heart Disease")
else:
    print("No Heart Disease")