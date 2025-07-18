import React, { useState } from "react";
import run from "../assets/icons/run.svg";
import plusIcon from "../assets/icons/plus.svg";
import editIcon from "../assets/icons/edit.svg";
import { LAMBDA_API } from "../utils/api";

const LambdaCard = ({ title, color, centerIcon }) => {
  const [accessKey, setAccessKey] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [lambdaCode, setLambdaCode] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleSave = async () => {
    try {
      const response = await fetch(LAMBDA_API.save, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          awsAccessKeyId: accessKey,
          awsSecretAccessKey: secretKey,
          lambdaCode,
        }),
      });

      const data = await response.json();
      alert(data.message || "Saved");
      setShowModal(false);
    } catch (err) {
      alert("Error saving Lambda: " + err.message);
    }
  };

  const handleRun = async () => {
    try {
      const response = await fetch(LAMBDA_API.trigger, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          awsAccessKeyId: accessKey,
          awsSecretAccessKey: secretKey,
        }),
      });

      const data = await response.json();
      alert(data.message || "Triggered");
    } catch (err) {
      alert("Error triggering Lambda: " + err.message);
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
        >
          <img src={run} alt="Run Icon" className="metric-card-run-icon" />
        </button>
      </div>

      {/* Modal Form */}
      {showModal && (
        <div className="metric-card-modal-overlay">
          <div className="metric-card-modal">
            <h4>Configure Lambda</h4>

            <input
              type="text"
              placeholder="AWS Access Key ID"
              value={accessKey}
              onChange={(e) => setAccessKey(e.target.value)}
            />
            <input
              type="password"
              placeholder="AWS Secret Access Key"
              value={secretKey}
              onChange={(e) => setSecretKey(e.target.value)}
            />
            <textarea
              placeholder="Write your Lambda code here..."
              rows={6}
              value={lambdaCode}
              onChange={(e) => setLambdaCode(e.target.value)}
            />

            <div className="modal-actions">
              <button onClick={() => setShowModal(false)}>Cancel</button>
              <button onClick={handleSave}>Save</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LambdaCard;
