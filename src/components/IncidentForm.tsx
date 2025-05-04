import { useState } from "react";
import { Severity } from "../types/Incident";
import "./IncidentForm.css";

interface IncidentFormProps {
  onSubmit: (incident: {
    title: string;
    description: string;
    severity: Severity;
  }) => void;
  onCancel: () => void;
}

type ErrorFields = {
  title?: string;
  description?: string;
};

const IncidentForm = ({ onSubmit, onCancel }: IncidentFormProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [severity, setSeverity] = useState<Severity>("Medium");
  const [errors, setErrors] = useState<ErrorFields>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: ErrorFields = {};
    if (!title.trim()) newErrors.title = "Title is required";
    if (!description.trim()) newErrors.description = "Description is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit({ title, description, severity });
    setTitle("");
    setDescription("");
    setSeverity("Medium");
    setErrors({});
  };

  const handleBlur = (field: "title" | "description") => {
    const newErrors: ErrorFields = { ...errors };
    if (!field.trim())
      newErrors[field] = `${
        field.charAt(0).toUpperCase() + field.slice(1)
      } is required`;
    else delete newErrors[field];
    setErrors(newErrors);
  };

  return (
    <form className="incident-form" onSubmit={handleSubmit}>
      <h3>Report New Incident</h3>

      <div className="form-group">
        <label htmlFor="title">Title*</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={() => handleBlur("title")}
          className={errors.title ? "error" : ""}
          aria-invalid={errors.title ? "true" : "false"}
        />
        {errors.title && <span className="error-message">{errors.title}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="description">Description*</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onBlur={() => handleBlur("description")}
          className={errors.description ? "error" : ""}
          aria-invalid={errors.description ? "true" : "false"}
        />
        {errors.description && (
          <span className="error-message">{errors.description}</span>
        )}
      </div>

      <div className="form-group">
        <label>Severity</label>
        <div className="severity-options">
          {(["Low", "Medium", "High"] as Severity[]).map((level) => (
            <label key={level} className="severity-option">
              <input
                type="radio"
                name="severity"
                checked={severity === level}
                onChange={() => setSeverity(level)}
              />
              {level}
            </label>
          ))}
        </div>
      </div>

      <div className="form-actions">
        <button type="button" className="cancel-btn" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="submit-btn">
          Submit Incident
        </button>
      </div>
    </form>
  );
};

export default IncidentForm;
