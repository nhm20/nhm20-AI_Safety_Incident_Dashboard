import { Severity, SortOrder } from "../types/Incident";
import "./FilterControls.css";
import { FiPlus, FiFilter, FiCalendar } from "react-icons/fi";

interface FilterControlsProps {
  severityFilter: Severity | "All";
  sortOrder: SortOrder;
  onSeverityChange: (severity: Severity | "All") => void;
  onSortChange: (order: SortOrder) => void;
  onAddNew: () => void;
}

const SeverityIndicator = ({ severity }: { severity: Severity }) => {
  return (
    <span className={`severity-indicator severity-${severity.toLowerCase()}`} />
  );
};

const FilterControls = ({
  severityFilter,
  sortOrder,
  onSeverityChange,
  onSortChange,
  onAddNew,
}: FilterControlsProps) => {
  return (
    <div className="filter-controls">
      <div className="filter-group">
        <label htmlFor="severity-filter">
          <FiFilter size={14} />
          Filter By
        </label>
        <select
          id="severity-filter"
          value={severityFilter}
          onChange={(e) => onSeverityChange(e.target.value as Severity | "All")}
        >
          <option value="All">All Incidents</option>
          <option value="Low">Low Severity</option>
          <option value="Medium">Medium Severity</option>
          <option value="High">High Severity</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="sort-order">
          <FiCalendar size={14} />
          Sort By
        </label>
        <select
          id="sort-order"
          value={sortOrder}
          onChange={(e) => onSortChange(e.target.value as SortOrder)}
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>

      <button className="add-incident-btn" onClick={onAddNew}>
        <FiPlus size={18} />
        <span>Report New Incident</span>
      </button>
    </div>
  );
};

export default FilterControls;
