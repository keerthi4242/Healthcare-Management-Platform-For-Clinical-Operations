import pandas as pd
import joblib
import tensorflow as tf

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense

# Load dataset
data = pd.read_csv("dataset/heart_disease.csv")

# Features and target
X = data.drop("condition", axis=1)
y = data["condition"]
print(data["condition"].value_counts())
print(X.columns)

# Scale features
scaler = StandardScaler()
X = scaler.fit_transform(X)

# Save scaler
joblib.dump(scaler, "model/heart_scaler.pkl")

# Split dataset
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)

# Build Neural Network
model = Sequential()

model.add(Dense(32, activation="relu", input_shape=(X_train.shape[1],)))
model.add(Dense(16, activation="relu"))
model.add(Dense(8, activation="relu"))
model.add(Dense(1, activation="sigmoid"))

model.compile(
    optimizer="adam",
    loss="binary_crossentropy",
    metrics=["accuracy"]
)


model.fit(
    X_train,
    y_train,
    epochs=50,
    batch_size=16,
    validation_split=0.2
)


loss, accuracy = model.evaluate(X_test, y_test)

print(f"\nHeart Disease Model Accuracy: {accuracy * 100:.2f}%")


model.save("model/heart_model.keras")

print("\nHeart model saved successfully!")
print("Scaler saved successfully!")