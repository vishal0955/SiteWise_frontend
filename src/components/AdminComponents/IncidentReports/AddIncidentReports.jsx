import React, { useRef, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createIncidentReport } from "../../../redux/slices/incidentReportSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddIncidentReports() {
  const [formData, setFormData] = useState({
    incidentType: "",
    dateTime: "",
    location: "",
    description: "",
    severityLevel: "",
    witnesses: "",
    immediateActions: "",
    image: null,
    injuredPersonName: "",
    injuredPersonJobTitle: "",
    injuryNature: "",
    affectedBodyParts: "",
   damagedProperty: "",
        damageDetails: "",
    environmentalImpact: "",
    responsibleperson: "",
    fireCause: "",
    fireDamage: "",
  });

  const INCIDENT_TYPES = [
    { value: "", label: "Select Type" },
    { value: "injury", label: "Injury" },
    { value: "property", label: "Property Damage" },
    { value: "nearmiss", label: "Near Miss" },
    { value: "environmental", label: "Environmental" },
    { value: "fire", label: "Fire" },
  ];

  const dispatch = useDispatch();
  const navigate = useNavigate();


  const [evidencePreview, setEvidencePreview] = useState(null); 

   const fileInputRef = useRef(null);

  // Handle div click to trigger file input
  const handleDivClick = () => {
    fileInputRef.current.click();
  };

  // Optional: handle drag and drop
  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileChange({ target: { files: e.dataTransfer.files } });
    }
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

 const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, image: file }));
    if (file && file.type.startsWith("image/")) {
      setEvidencePreview(URL.createObjectURL(file));
    } else {
      setEvidencePreview(null);
    }
  };

 const handleSubmit = (e) => {
    e.preventDefault();
    const submissionData = new FormData();
    Object.keys(formData).forEach((key) => {
      submissionData.append(key, formData[key]);
    });

    dispatch(createIncidentReport(submissionData))
      .unwrap()
      .then((createdIncident) => {
        toast.success("Incident Report Created Successfully!");
        // If severity is high or critical, trigger task creation
        if (
          formData.severityLevel === "high" ||
          formData.severityLevel === "critical"
        ) {
          navigate("/create-task", {
            state: {
              payload: {
                incidentId: createdIncident._id,
                incidentType: formData.incidentType,
                severityLevel: formData.severityLevel,
                taskName: `Incident: ${formData.incidentType}`,
                taskCategory: formData.incidentType,
                description: formData.description,
              },
            },
          });
        } else {
          navigate("/incidentReports");
        }
      })
      .catch((error) => {
        toast.error("Failed to create incident report: " + error);
      });
  };

  return (
    <>
      <ToastContainer />
      <div className="container py-4">
        <div className="d-flex justify-content-between align-items-center text-nowrap mb-4">
          <h3>New Incident Report</h3>
          <div className="gap-2 d-flex align-items-center">
            <button
              onClick={() => navigate(-1)}
              className="btn btn-outline-secondary "
              
            >
              <i className="fa-solid fa-arrow-left me-2"></i> Back 
            </button>
          </div>
        </div>

        <Form onSubmit={handleSubmit}>
          <div className="bg-white p-4 rounded shadow-sm">
            <div className="row mb-3">
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Incident Type</Form.Label>
                  <Form.Select
                    name="incidentType"
                    value={formData.incidentType}
                    onChange={handleInputChange}
                    required
                  >
                    {INCIDENT_TYPES.map((item) => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </div>

              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Date & Time</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    name="dateTime"
                    value={formData.dateTime}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </div>
            
 <div className="col-md-6">
            <Form.Group className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                name="location"
                placeholder="Enter incident location"
                value={formData.location}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            </div>
         
             <div className="col-md-6">
                <Form.Group>
                  <Form.Label>Responsible Person</Form.Label>
                  <Form.Control
                    type="text"
                    name="responsibleperson"
                    placeholder="Enter responsible Person name"
                    value={formData.responsibleperson}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </div>

              
            {/* Conditional Fields Based on Incident Type */}
            {formData.incidentType === "injury" && (
              <div className=" p-3 rounded mb-3">
                <h5>Injury Details</h5>
                <Form.Group className="mb-3">
                  <Form.Label>Name of Injured Person</Form.Label>
                  <Form.Control
                    type="text"
                    name="injuredPersonName"
                    placeholder="Enter name and job title"
                    value={formData.injuredPersonName}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                 <Form.Group className="mb-3">
                  <Form.Label> Job Title of Injured Person</Form.Label>
                  <Form.Control
                    type="text"
                    name="injuredPersonJobTitle"
                    placeholder="Enter name and job title"
                    value={formData.injuredPersonJobTitle}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Nature and Extent of Injury</Form.Label>
                  <Form.Control
                    type="text"
                    name="injuryNature"
                    placeholder="Describe the injury"
                    value={formData.injuryNature}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Body Part(s) Affected</Form.Label>
                  <Form.Control
                    type="text"
                    name="affectedBodyParts"
                    placeholder="Enter affected body parts"
                    value={formData.affectedBodyParts}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </div>
            )}

            {formData.incidentType === "property" && (
              <div className=" p-3 rounded mb-3">
                <h5>Property Damage Details</h5>
                <Form.Group className="mb-3">
                  <Form.Label> Damaged Property</Form.Label>
                  <Form.Control
                    type="text"
                    name="damagedProperty"
                    placeholder="Enter property description"
                    value={formData.damagedProperty}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Detailed Description of the Damage</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="damageDetails"
                    placeholder="Describe the damage"
                    value={formData.damageDetails}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </div>
            )}

            {formData.incidentType === "environmental" && (
              <div className=" p-3 rounded mb-3">
                <h5>Environmental Incident Details</h5>
                <Form.Group className="mb-3">
                  <Form.Label>Environmental Impact</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="environmentalImpact"
                    placeholder="Describe the environmental impact"
                    value={formData.environmentalImpact}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </div>
            )}

            {formData.incidentType === "fire" && (
              <div className=" p-3 rounded mb-3">
                <h5>Fire Incident Details</h5>
                <Form.Group className="mb-3">
                  <Form.Label>Cause of Fire</Form.Label>
                  <Form.Control
                    type="text"
                    name="fireCause"
                    placeholder="Enter cause of fire"
                    value={formData.fireCause}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Damage Caused by Fire</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="fireDamage"
                    placeholder="Describe the damage caused by fire"
                    value={formData.fireDamage}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </div>
            )}

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                name="description"
                placeholder="Describe what happened..."
                value={formData.description}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <div className="row mb-3">
              <div className="col-md-6">
                <Form.Group>
                  <Form.Label>Severity Level</Form.Label>
                  <Form.Select
                    name="severityLevel"
                    value={formData.severityLevel}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Severity</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </Form.Select>
                </Form.Group>
              </div>

              <div className="col-md-6">
                <Form.Group>
                  <Form.Label>Witnesses</Form.Label>
                  <Form.Control
                    type="text"
                    name="witnesses"
                    placeholder="Enter witness names"
                    value={formData.witnesses}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </div>
            </div>

            
            </div>

            <Form.Group className="mb-3">
              <Form.Label>Immediate Actions Taken</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="immediateActions"
                placeholder="Describe immediate actions taken..."
                value={formData.immediateActions}
                onChange={handleInputChange}
                required
              />
            </Form.Group>


      <Form.Group className="mb-4">
              <Form.Label>Upload Evidence</Form.Label>
              <div
                className="border rounded p-3 text-center"
                style={{ cursor: "pointer" }}
                onClick={handleDivClick}
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
              >
                <i className="fas fa-cloud-upload-alt fa-2x mb-2"></i>
                <p className="mb-2">Upload files or drag and drop</p>
                <small className="text-muted">(PNG, JPG, PDF up to 10MB)</small>
                {/* Hidden file input */}
                <Form.Control
                  type="file"
                  name="image"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                  style={{ display: "none" }}
                />
                {/* Show image preview if available */}
                {evidencePreview && (
                  <div className="mt-3">
                    <img
                      src={evidencePreview}
                      alt="Evidence Preview"
                      style={{ maxWidth: "200px", maxHeight: "200px", borderRadius: "8px" }}
                    />
                  </div>
                )}
              </div>
            </Form.Group>

            <div className="d-flex justify-content-end gap-2">
              <Button variant="secondary" onClick={() => navigate(-1)}>
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                Submit Report
              </Button>
            </div>
          </div>
        </Form>


     
      </div>
    </>
  );
}

export default AddIncidentReports;