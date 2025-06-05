import React, { useState } from "react";
import { Link } from "react-router-dom";

const DailySiteEntryForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    feeling: "",
    ppe: false,
    hazardsAware: false,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = {};

    if (!formData.name) validationErrors.name = "Name is required";
    if (!formData.feeling)
      validationErrors.feeling = "Please select your health status";

    if (formData.feeling === "unwell" || formData.feeling === "notfit") {
      alert(
        "⚠️ You are not fit for work. Entry blocked. Please contact admin."
      );
      return;
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      onSubmit(formData); // You can push this to table or API
      alert("✅ Entry checklist submitted successfully!");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 border rounded  shadow-sm"
    >
      <div className="d-flex align-items-center  justify-content-between">
        <h4 className="mb-3">📋 Daily Site Entry Checklist</h4>
        <Link to="/siteEntryTable">
          <button
            className="btn btn-secondary"
            style={{ backgroundColor: "#0d6efd", color: "white" }}
          >
            <i class="fa-solid fa-arrow-left me-2"></i>Back
          </button>
        </Link>
      </div>

      <div className="mb-3">
        <label className="form-label">Full Name *</label>
        <input
          type="text"
          className={`form-control ${errors.name ? "is-invalid" : ""}`}
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <div className="invalid-feedback">{errors.name}</div>}
      </div>

      <div className="mb-3">
        <label className="form-label">How are you feeling today? *</label>
        <select
          name="feeling"
          className={`form-select ${errors.feeling ? "is-invalid" : ""}`}
          value={formData.feeling}
          onChange={handleChange}
        >
          <option value="">-- Select --</option>
          <option value="well">I feel well</option>
          <option value="unwell">I feel unwell</option>
          <option value="notfit">Not fit for work</option>
        </select>
        {errors.feeling && (
          <div className="invalid-feedback">{errors.feeling}</div>
        )}
      </div>

      <div className="form-check mb-2">
        <input
          className="form-check-input"
          type="checkbox"
          name="ppe"
          checked={formData.ppe}
          onChange={handleChange}
        />
        <label className="form-check-label">
          I am wearing all required PPE
        </label>
      </div>

      <div className="form-check mb-4">
        <input
          className="form-check-input"
          type="checkbox"
          name="hazardsAware"
          checked={formData.hazardsAware}
          onChange={handleChange}
        />
        <label className="form-check-label">I am aware of site hazards</label>
      </div>

      <button type="submit" className="btn btn-primary">
        Submit Checklist
      </button>
    </form>
  );
};

export default DailySiteEntryForm;
