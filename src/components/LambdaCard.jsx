import React, { useState } from "react";
import run from "../assets/icons/run.svg";
import plusIcon from "../assets/icons/plus.svg";
import editIcon from "../assets/icons/edit.svg";
import { LAMBDA_API } from "../utils/api";

const LambdaCard = ({ title = "Deploy Lambda", color = "green", centerIcon }) => {
  const [accessKey, setAccessKey] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [lambdaCode, setLambdaCode] = useState(
    'exports.handler = async (event) => {\n  return { statusCode: 200, body: "Hello from Lambda!" };\n};'
  );
  const [lambdaName, setLambdaName] = useState(""); // <-- new state
  const [showModal, setShowModal] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);
  const [loadingRun, setLoadingRun] = useState(false);

  const isFormValid = () =>
    accessKey.trim() !== "" &&
    secretKey.trim() !== "" &&
    lambdaCode.trim() !== "" &&
    lambdaName.trim() !== "";

  const handleSave = async () => {
    if (!isFormValid()) {
      alert("Please fill all fields (including Lambda name) before saving.");
      return;
    }
    setLoadingSave(true);
    try {
      const response = await fetch(LAMBDA_API.save, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          awsAccessKeyId: accessKey,
          awsSecretAccessKey: secretKey,
          lambdaCode,
          lambdaName, // <-- send lambdaName
        }),
      });

      const data = await response.json();
      alert(data.message || "Lambda configuration saved successfully.");
      setShowModal(false);
    } catch (err) {
      alert("Error saving Lambda: " + err.message);
    } finally {
      setLoadingSave(false);
    }
  };

  const handleRun = async () => {
    if (!accessKey || !secretKey || !lambdaName) {
      alert("Please provide AWS credentials and Lambda name to run.");
      return;
    }
    setLoadingRun(true);
    try {
      const response = await fetch(LAMBDA_API.trigger, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          awsAccessKeyId: accessKey,
          awsSecretAccessKey: secretKey,
          lambdaName, // <-- send lambdaName
        }),
      });

      const data = await response.json();
      alert(data.message || "Lambda triggered successfully.");
    } catch (err) {
      alert("Error triggering Lambda: " + err.message);
    } finally {
      setLoadingRun(false);
    }
  };

  return (
    <>
      <div className={`metric-card ${color}`}>
        <div className="metric-card-content">
          <h3 className="metric-card-title">{title}</h3>

          {centerIcon && (
            <img
              src={centerIcon}
              alt="center icon"
              className="metric-card-icon-center"
            />
          )}
        </div>

        {/* Edit/Add button - bottom-left */}
        <button
          className="metric-card-add-icon-button"
          onClick={() => setShowModal(true)}
          aria-label="Configure Lambda"
          title="Configure Lambda"
        >
          <img src={lambdaCode ? editIcon : plusIcon} alt="Edit/Add" />
        </button>

        {/* Run button - bottom-right */}
        <button
          className="metric-card-run-icon-button"
          onClick={handleRun}
          aria-label="Run Lambda"
          title="Run Lambda"
          disabled={loadingRun}
        >
          <img src={run} alt="Run Icon" className="metric-card-run-icon" />
          {loadingRun && <span className="loading-text">Running...</span>}
        </button>
      </div>

      {/* Modal Form */}
      {showModal && (
        <div className="metric-card-modal-overlay">
          <div className="metric-card-modal">
            <h4>Configure Lambda</h4>

            <input
              type="text"
              placeholder="Lambda Function Name"
              value={lambdaName}
              onChange={(e) => setLambdaName(e.target.value)}
              autoComplete="off"
              required
            />
            <input
              type="text"
              placeholder="AWS Access Key ID"
              value={accessKey}
              onChange={(e) => setAccessKey(e.target.value)}
              autoComplete="off"
              required
            />
            <input
              type="password"
              placeholder="AWS Secret Access Key"
              value={secretKey}
              onChange={(e) => setSecretKey(e.target.value)}
              autoComplete="off"
              required
            />
            <textarea
              placeholder="Write your Lambda code here..."
              rows={8}
              value={lambdaCode}
              onChange={(e) => setLambdaCode(e.target.value)}
              required
            />

            <div className="modal-actions">
              <button
                onClick={() => setShowModal(false)}
                disabled={loadingSave}
              >
                Cancel
              </button>
              <button onClick={handleSave} disabled={loadingSave}>
                {loadingSave ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LambdaCard;
