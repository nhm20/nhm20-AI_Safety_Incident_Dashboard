import { useState } from "react";
import { Incident } from "../types/Incident";
import "./IncidentCard.css";

interface IncidentCardProps {
  incident: Incident;
}

const IncidentCard = ({ incident }: IncidentCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const reportedDateTime = new Date(incident.reported_at);

  const formattedDate = reportedDateTime.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const formattedTime = reportedDateTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div
      className={`incident-card incident-${incident.severity.toLowerCase()}`}
    >
      <div className="incident-header">
        <div className="incident-title">
          <h3>{incident.title}</h3>
          <span
            className={`severity-badge severity-${incident.severity.toLowerCase()}`}
          >
            {incident.severity}
          </span>
        </div>
        <div className="incident-meta">
          <div className="reported-datetime">
            <span className="reported-date">Reported: {formattedDate}</span>
            <span className="reported-time">at {formattedTime}</span>
          </div>
          <button
            className="view-details-btn"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "Hide Details" : "View Details"}
          </button>
        </div>
      </div>
      {expanded && (
        <div className="incident-description">
          <p>{incident.description}</p>
        </div>
      )}
    </div>
  );
};

export default IncidentCard;
