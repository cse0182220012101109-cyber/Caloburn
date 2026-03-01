from flask import Flask, request, jsonify
import joblib
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

models = {
    "linear_model": joblib.load("models/linear_model.pkl"),
    "ridge_model": joblib.load("models/ridge_model.pkl"),
    "lasso_model": joblib.load("models/lasso_model.pkl"),
    "svr_model": joblib.load("models/svr_model.pkl"),
    "random_forest_model": joblib.load("models/random_forest_model.pkl"),
    "gradient_boosting_model": joblib.load("models/gradient_boosting_model.pkl"),
    "xgboost_model": joblib.load("models/xgboost_model.pkl"),
}

scaler = joblib.load("models/scaler.pkl")

model_metrics = {
    "linear_model": {"mae": 8.509237, "rmse": 11.466581, "r2": 0.966206},
    "ridge_model": {"mae": 8.510727, "rmse": 11.475229, "r2": 0.966155},
    "lasso_model": {"mae": 8.509620, "rmse": 11.468142, "r2": 0.966197},
    "svr_model": {"mae": 2.339589, "rmse": 5.098801, "r2": 0.993318},
    "random_forest_model": {"mae": 1.735910, "rmse": 2.706832, "r2": 0.998117},
    "gradient_boosting_model": {"mae": 2.692154, "rmse": 3.712670, "r2": 0.996457},
    "xgboost_model": {"mae": 1.095851, "rmse": 1.629084, "r2": 0.999318}
}

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json

    model_name = data["model"]
    features = np.array(data["features"]).reshape(1, -1)
    features = scaler.transform(features)

    prediction = models[model_name].predict(features)[0]
    metrics = model_metrics[model_name]

    return jsonify({
        "prediction": float(prediction),
        "mae": metrics["mae"],
        "rmse": metrics["rmse"],
        "r2": metrics["r2"]
    })

if __name__ == "__main__":
    app.run(debug=True)
