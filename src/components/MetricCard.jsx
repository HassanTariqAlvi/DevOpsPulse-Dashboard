import React, { useState } from "react";
import run from "../assets/icons/run.svg";
import plusIcon from "../assets/icons/plus.svg"; // Make sure this icon exists

const MetricCard = ({ title, color, centerIcon }) => {
  const [code, setCode] = useState(null); // Store code as string
  const [showModal, setShowModal] = useState(false);
  const [tempInput, setTempInput] = useState("");

  const handleAddClick = () => setShowModal(true);
  const handleSave = () => {
    setCode(tempInput);
    setTempInput("");
    setShowModal(false);
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

          {code && (
            <pre className="metric-card-code-block">
              <code>{code}</code>
            </pre>
          )}
        </div>

        {/* ➕ Bottom-left */}
        {!code && (
          <button
            className="metric-card-add-icon-button"
            onClick={handleAddClick}
            aria-label="Add Code"
          >
            <img src={plusIcon} alt="Add" />
          </button>
        )}

        {/* ▶️ Bottom-right */}
        <button className="metric-card-run-icon-button" aria-label="Run">
          <img src={run} alt="Run" className="metric-card-run-icon" />
        </button>
      </div>

      {/* Modal for Code */}
      {showModal && (
        <div className="metric-card-modal-overlay">
          <div className="metric-card-modal">
            <h4>Paste Python Code</h4>
            <textarea
              rows={6}
              value={tempInput}
              onChange={(e) => setTempInput(e.target.value)}
              placeholder="e.g. print('Hello, World!')"
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

export default MetricCard;
