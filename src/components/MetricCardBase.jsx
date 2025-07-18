import React from 'react';

const MetricCardBase = ({ title, color, centerIcon, children }) => (
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
    {children}
  </div>
);

export default MetricCardBase;
