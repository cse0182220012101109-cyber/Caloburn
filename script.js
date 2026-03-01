const API_URL = "http://127.0.0.1:5000/predict";

function getInputValue(id){
  const v = document.getElementById(id).value;
  return v === "" ? null : parseFloat(v);
}

async function handleSubmit(e){
  e.preventDefault();

  const gender = getInputValue("gender");
  const age = getInputValue("age");
  const height = getInputValue("height");
  const weight = getInputValue("weight");
  const duration = getInputValue("duration");
  const heart_rate = getInputValue("heart_rate");
  const body_temp = getInputValue("body_temp");
  const model = document.getElementById("modelSelect").value;

  if ([gender,age,height,weight,duration,heart_rate,body_temp].some(x => x === null || isNaN(x))){
    alert("Please fill all input fields correctly.");
    return false;
  }

  const payload = {
    model: model,
    features: [gender, age, height, weight, duration, heart_rate, body_temp]
  };

  const submitBtn = document.getElementById("submitBtn");
  const predEl = document.getElementById("prediction");
  const accEl = document.getElementById("accuracy");

  submitBtn.disabled = true;
  submitBtn.textContent = "Predicting...";

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify(payload)
    });

    const data = await res.json();

    predEl.textContent = data.prediction.toFixed(2);

    accEl.innerHTML = `
      R²: <b>${data.r2}</b> |
      RMSE: <b>${data.rmse}</b> |
      MAE: <b>${data.mae}</b>
    `;

    // EXPLANATIONS (DYNAMIC VALUES)
    document.getElementById("maeExplain").textContent =
      `MAE shows the average error in calorie prediction. Here, the model is usually wrong by about ${data.mae} calories. Lower values mean better accuracy.`;

    document.getElementById("rmseExplain").textContent =
      `RMSE highlights larger prediction mistakes. A value of ${data.rmse} means the model rarely makes big errors, keeping predictions stable.`;

    document.getElementById("r2Explain").textContent =
      `R² shows how well the model understands workout data. A score of ${data.r2} means the model explains most of the calorie burn pattern.`;

  } catch (err) {
    alert("Prediction failed.");
    console.error(err);
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "SUBMIT";
  }

  return false;
}

