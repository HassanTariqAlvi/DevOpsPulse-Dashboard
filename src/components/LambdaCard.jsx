import React, { useState } from "react";
import MetricCardBase from "./MetricCardBase";
import run from "../assets/icons/run.svg";
import plusIcon from "../assets/icons/plus.svg";
import editIcon from "../assets/icons/edit.svg";

const LambdaCard = ({ title, color, centerIcon }) => {
  const [awsAccessKeyId, setAwsAccessKeyId] = useState("");
  const [awsSecretAccessKey, setAwsSecretAccessKey] = useState("");
  const [lambdaCode, setLambdaCode] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleSave = () => {
    console.log("Deploying Lambda:", awsAccessKeyId, awsSecretAccessKey, lambdaCode);
    setShowModal(false);
  };

  return (
    <>
      <MetricCardBase title={title} color={color} centerIcon={centerIcon}>
        <button
          className="metric-card-add-icon-button"
          onClick={() => setShowModal(true)}
        >
          <img
            src={
              awsAccessKeyId && awsSecretAccessKey && lambdaCode
                ? editIcon
                : plusIcon
            }
            alt="Add/Edit Lambda Config"
          />
        </button>

        <button
          className="metric-card-run-icon-button"
          onClick={() => alert("Triggering Lambda...")}
        >
          <img src={run} alt="Run Icon" className="metric-card-run-icon" />
        </button>
      </MetricCardBase>

      {showModal && (
        <div className="metric-card-modal-overlay">
          <div className="metric-card-modal">
            <h4>AWS Lambda Configuration</h4>

            <input
              type="text"
              placeholder="AWS Access Key ID"
              value={awsAccessKeyId}
              onChange={(e) => setAwsAccessKeyId(e.target.value)}
            />
            <input
              type="password"
              placeholder="AWS Secret Access Key"
              value={awsSecretAccessKey}
              onChange={(e) => setAwsSecretAccessKey(e.target.value)}
            />
            <textarea
              rows={6}
              placeholder="Enter Lambda code..."
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
