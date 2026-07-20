import pandas as pd
import joblib
import tensorflow as tf

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense

print("Loading diabetes dataset...")


data = pd.read_csv("dataset/diabetes_disease.csv")
print(data["diabetes"].value_counts())


data = pd.get_dummies(
    data,
    columns=["gender", "smoking_history"],
    drop_first=True
)


X = data.drop("diabetes", axis=1)
y = data["diabetes"]


scaler = StandardScaler()
X = scaler.fit_transform(X)


joblib.dump(scaler, "model/diabetes_scaler.pkl")


X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)



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

print("Training model...")


model.fit(
    X_train,
    y_train,
    epochs=30,
    batch_size=32,
    validation_split=0.2,
)


loss, accuracy = model.evaluate(X_test, y_test)

print(f"\nDiabetes Model Accuracy: {accuracy * 100:.2f}%")


model.save("model/diabetes_model.keras")

print("\nDiabetes model saved successfully!")
print("Scaler saved successfully!")