import React from "react";
import MetricCardBase from "./MetricCardBase";

const UptimeCard = ({ title, value, color, centerIcon }) => (
  <MetricCardBase title={title} color={color} centerIcon={centerIcon}>
    <div className="metrics-card-code-block">
      <strong>Uptime:</strong> {value}
    </div>
  </MetricCardBase>
);

export default UptimeCard;
