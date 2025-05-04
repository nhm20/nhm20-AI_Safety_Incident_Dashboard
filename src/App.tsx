import { useState } from "react";
import { Incident, Severity, SortOrder } from "./types/Incident";
import IncidentCard from "./components/IncidentCard";
import IncidentForm from "./components/IncidentForm";
import FilterControls from "./components/FilterControls";
import "./index.css";

const initialIncidents: Incident[] = [
  {
    id: 1,
    title: "Biased Recommendation Algorithm",
    description: "Algorithm consistently favored certain demographics...",
    severity: "Medium",
    reported_at: "2025-03-15T10:00:00Z",
  },
  {
    id: 2,
    title: "LLM Hallucination in Critical Info",
    description: "LLM provided incorrect safety procedure information...",
    severity: "High",
    reported_at: "2025-04-01T14:30:00Z",
  },
  {
    id: 3,
    title: "Minor Data Leak via Chatbot",
    description: "Chatbot inadvertently exposed non-sensitive user metadata...",
    severity: "Low",
    reported_at: "2025-03-20T09:15:00Z",
  },
];

function App() {
  const [incidents, setIncidents] = useState<Incident[]>(initialIncidents);
  const [severityFilter, setSeverityFilter] = useState<Severity | "All">("All");
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");
  const [showForm, setShowForm] = useState(false);

  const filteredIncidents = incidents.filter((incident) => {
    if (severityFilter === "All") return true;
    return incident.severity === severityFilter;
  });

  const sortedIncidents = [...filteredIncidents].sort((a, b) => {
    const dateA = new Date(a.reported_at).getTime();
    const dateB = new Date(b.reported_at).getTime();
    return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
  });

  const handleAddIncident = (newIncident: {
    title: string;
    description: string;
    severity: Severity;
  }) => {
    const incidentWithId: Incident = {
      ...newIncident,
      id: Math.max(...incidents.map((i) => i.id), 0) + 1,
      reported_at: new Date().toISOString(),
    };
    setIncidents([...incidents, incidentWithId]);
    setShowForm(false);
  };

  return (
    <div className="container">
      <h1 style={{ textAlign: "center" }}>AI Safety Incident Dashboard</h1>

      <FilterControls
        severityFilter={severityFilter}
        sortOrder={sortOrder}
        onSeverityChange={setSeverityFilter}
        onSortChange={setSortOrder}
        onAddNew={() => setShowForm(!showForm)}
      />
      {showForm && (
        <IncidentForm
          onSubmit={handleAddIncident}
          onCancel={() => setShowForm(false)}
        />
      )}

      <div className="incidents-list">
        {sortedIncidents.length > 0 ? (
          sortedIncidents.map((incident) => (
            <IncidentCard key={incident.id} incident={incident} />
          ))
        ) : (
          <p>No incidents found matching your criteria.</p>
        )}
      </div>
    </div>
  );
}

export default App;
