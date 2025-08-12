import React, { useState } from "react";
import run from "../assets/icons/run.svg";
import plusIcon from "../assets/icons/plus.svg";
import editIcon from "../assets/icons/edit.svg";
import copyIcon from "../assets/icons/link-open.svg"; // temporarily reuse editIcon, replace with copy icon later
import { LAMBDA_API } from "../utils/api";

const LambdaCard = ({ title, color, centerIcon }) => {
  const [accessKey, setAccessKey] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [lambdaCode, setLambdaCode] = useState("");
  const [lambdaName, setLambdaName] = useState("");
  const [functionUrl, setFunctionUrl] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch(LAMBDA_API.save, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          awsAccessKeyId: accessKey,
          awsSecretAccessKey: secretKey,
          lambdaCode,
          lambdaName,
        }),
      });
      const data = await response.json();

      if (response.ok) {
        setFunctionUrl(data.functionUrl || "");
        setShowModal(false);
      } else {
        alert(data.error || "Error saving Lambda");
      }
    } catch (err) {
      alert("Error saving Lambda: " + err.message);
    } finally {
      setSaving(false);
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
          lambdaName,
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
      <div className={`metric-card ${color}`} style={{ position: "relative" }}>
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

        {/* Bottom-left buttons container */}
        <div
          style={{
            position: "absolute",
            bottom: "10px",
            left: "10px",
            display: "flex",
            gap: "8px",
            alignItems: "center",
            zIndex: 10,
          }}
        >
          <button
            className="metric-card-add-icon-button"
            onClick={() => setShowModal(true)}
            aria-label="Configure Lambda"
            title="Configure Lambda"
            style={{ padding: 0, background: "none", border: "none", cursor: "pointer" }}
          >
            <img
              src={lambdaCode ? editIcon : plusIcon}
              alt="Edit/Add"
              style={{ display: "block", width: 24, height: 24 }}
            />
          </button>
        </div>

        {/* Function URL button on top-right */}
        {functionUrl && (
          <button
            
            onClick={() => window.open(functionUrl, "_blank")}
            title="Open Lambda Function URL"
            aria-label="Open Lambda Function URL"
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              padding: 0,
              background: "none",
              border: "none",
              cursor: "pointer",
              zIndex: 20,
              filter: "invert(1)",
            }}
          >
            <img
              src={copyIcon}
              alt="Open URL"
              style={{ display: "block", width: 24, height: 24 }}
            />
          </button>
        )}

        {/* Run button bottom-right */}
        <button
          className="metric-card-run-icon-button"
          onClick={handleRun}
          aria-label="Run Lambda"
          title="Run Lambda"
          disabled={!lambdaName}
          style={{
            position: "absolute",
            bottom: "10px",
            right: "10px",
            padding: 0,
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          <img
            src={run}
            alt="Run Icon"
            className="metric-card-run-icon"
            style={{ display: "block", width: 24, height: 24 }}
          />
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

            <input
              type="text"
              placeholder="Lambda Function Name"
              value={lambdaName}
              onChange={(e) => setLambdaName(e.target.value)}
              style={{ marginTop: "10px" }}
            />

            <textarea
              placeholder="Write your Lambda code here..."
              rows={6}
              value={lambdaCode}
              onChange={(e) => setLambdaCode(e.target.value)}
              style={{ marginTop: "10px" }}
            />

            <div
              className="modal-actions"
              style={{
                marginTop: "10px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <button onClick={() => setShowModal(false)}>Cancel</button>
              <button
                onClick={handleSave}
                disabled={
                  !lambdaName || !lambdaCode || !accessKey || !secretKey || saving
                }
              >
                Save
              </button>
              {saving && (
                <span style={{ color: "#0b76ef", fontWeight: "bold" }}>
                  Saving...
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LambdaCard;
