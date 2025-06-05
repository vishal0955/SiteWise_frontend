

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import { addAudit, fetchAuditById, updateAudit } from "../../../redux/slices/auditSlice";
import { toast } from "react-toastify";

const AuditEquipment = () => {
  const [showChecklistModal, setShowChecklistModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { selectedAudit } = useSelector((state) => state.audit || {});

  const [formData, setFormData] = useState({
    auditDate: new Date().toISOString().split("T")[0],
    auditedBy: "",
    machineId: "",
    odometerReading: "",
    nextServiceDue: "",
    plantType: "",
    customPlantName: "",
    checklist: [],
    operatorSignature: "",
    status: "draft",
  });

  const [customChecklistItem, setCustomChecklistItem] = useState("");
  const [taskDetails, setTaskDetails] = useState({
    item: "",
    assignedTo: "",
    priority: "Low",
    dueDate: "",
  });

  const predefinedChecklists = {
    Excavator: [
      "Inspect hydraulic system",
      "Check tracks",
      "Test safety alarms",
    ],
    Forklift: ["Inspect forks", "Check tires", "Test brakes"],
    Crane: ["Inspect cables", "Check counterweights", "Test emergency stop"],
    "Concrete Pump": [
      "Inspect hoses",
      "Check pump pressure",
      "Test safety valves",
    ],
    "Scissor Lift": [
      "Inspect platform",
      "Check controls",
      "Test emergency descent",
    ],
    Loader: ["Inspect bucket", "Check hydraulic system", "Test steering"],
  };

  useEffect(() => {
    if (id) {
      setIsEditing(true);
      dispatch(fetchAuditById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (isEditing && selectedAudit && selectedAudit.data) {
      const formattedDate = selectedAudit.data.auditDate
        ? new Date(selectedAudit.data.auditDate).toISOString().split("T")[0]
        : "";
      setFormData({
        ...formData,
        auditDate: formattedDate,
        auditedBy: selectedAudit.data.auditedBy || "Logged-in User",
        machineId: selectedAudit.data.machineId || "",
        odometerReading: selectedAudit.data.odometerReading || "",
        nextServiceDue: selectedAudit.data.nextServiceDue || "",
        plantType: selectedAudit.data.plantType || "",
        customPlantName: selectedAudit.data.customPlantName || "",
        checklist: selectedAudit.data.checklist || [],
        operatorSignature: selectedAudit.data.operatorSignature || "",
      });
    }
  }, [selectedAudit, isEditing]);

  const handlePlantTypeChange = (e) => {
    const selectedPlantType = e.target.value;
    setFormData((prev) => ({
      ...prev,
      plantType: selectedPlantType,
      
      checklist: selectedPlantType === "Custom"
        ? []
        : (predefinedChecklists[selectedPlantType] || []).map(item => ({
            item,
            status: "",
            comment: "",
            photo: null
          }))
    }));
  };
  
  const handleAddCustomChecklistItem = () => {
    if (customChecklistItem.trim()) {
      setFormData((prev) => ({
        ...prev,
        checklist: [...prev.checklist, { 
          item: customChecklistItem, 
          status: "", 
          comment: "", 
          photo: null 
        }],
      }));
      setCustomChecklistItem("");
      setShowChecklistModal(false);
    }
  };
  
  const handleChecklistStatusChange = (index, status) => {
    const updatedChecklist = [...formData.checklist];
    updatedChecklist[index] = { 
      ...updatedChecklist[index], 
      status 
    };
    setFormData((prev) => ({ ...prev, checklist: updatedChecklist }));
    
   
    if (status === "Not OK") {
   
      setTaskDetails({
        ...taskDetails,
        item: typeof updatedChecklist[index].item === 'string' 
              ? updatedChecklist[index].item 
              : updatedChecklist[index].item || ""
      });
      setShowTaskModal(true);
    }
  };
  
  const handleChecklistCommentChange = (index, comment) => {
    const updatedChecklist = [...formData.checklist];
    updatedChecklist[index] = { 
      ...updatedChecklist[index], 
      comment 
    };
    setFormData((prev) => ({ ...prev, checklist: updatedChecklist }));
  };

  const handleChecklistPhotoUpload = (index, file) => {
    const updatedChecklist = [...formData.checklist];
    updatedChecklist[index] = { 
      ...updatedChecklist[index], 
      photo: file 
    };
    setFormData((prev) => ({ ...prev, checklist: updatedChecklist }));
  };

  const handleTaskCreation = () => {
    
    setShowTaskModal(false);
    toast.success("Task created successfully!");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const normalizedChecklist = formData.checklist.map(item => 
      typeof item === "string" 
        ? { item, status: "", comment: "", photo: null }
        : item
    );
    
    const submitData = new FormData();
    
    Object.keys(formData).forEach((key) => {
      if (key === "checklist") {
        submitData.append(key, JSON.stringify(normalizedChecklist));
      } else {
        submitData.append(key, formData[key]);
      }
    });

    
    if (formData.plantType === "Custom" && formData.customPlantName) {
      submitData.set("plantType", formData.customPlantName);
    }

    if (isEditing) {
      dispatch(updateAudit({ id, updatedForm: submitData }))
        .unwrap()
        .then(() => {
          toast.success("Audit updated successfully!");
          navigate("/auditreport");
        })
        .catch((error) => {
          toast.error(`Failed to update audit: ${error.message || "Unknown error"}`);
        });
    } else {
      dispatch(addAudit(submitData))
        .unwrap()
        .then(() => {
          toast.success("Audit created successfully!");
          navigate("/auditreport");
        })
        .catch((error) => {
          toast.error(`Failed to create audit: ${error.message || "Unknown error"}`);
        });
    }
  };

  const handleAddCustomItem = () => {
    setShowChecklistModal(true);
  };

  return (
    <div>
      <div className="container">
        <div className="d-flex align-items-center justify-content-between mb-3">
        <h3>{isEditing ? "Edit Audit Report" : "New Audit Report"}</h3>
        <button
              onClick={() => navigate(-1)}
              className="btn btn-outline-secondary"
             
            >
              <i class="fa-solid fa-arrow-left me-2"></i> Back 
            </button>
            </div>
        <form onSubmit={handleSubmit}
        className="bg-white p-4 rounded shadow-sm">
          {/* General Form Fields */}
          <div className="row mb-3">
            <div className="form-group col-md-6">
              <label htmlFor="plantType">Plant Type</label>
              <select
                id="plantType"
                className="form-control"
                value={formData.plantType}
                onChange={handlePlantTypeChange}
                required
              >
                <option value="">Select Plant Type</option>
                {Object.keys(predefinedChecklists).map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
                <option value="Custom">Custom</option>
              </select>
              {formData.plantType === "Custom" && (
                <input
                  type="text"
                  placeholder="Enter custom plant type"
                  className="form-control mt-2"
                  value={formData.customPlantName || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      customPlantName: e.target.value,
                    }))
                  }
                  required
                />
              )}
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="auditDate">Date of Pre-Start</label>
              <input
                type="date"
                id="auditDate"
                className="form-control"
                value={formData.auditDate}
                onChange={(e) =>
                  setFormData({ ...formData, auditDate: e.target.value })
                }
                required
              />
            </div>
          </div>
          
          <div className="row mb-3">
            <div className="form-group col-md-6">
              <label htmlFor="machineId">Machine ID or Asset Number</label>
              <input
                type="text"
                id="machineId"
                className="form-control"
                value={formData.machineId}
                onChange={(e) =>
                  setFormData({ ...formData, machineId: e.target.value })
                }
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="auditedBy">Checked By</label>
              <input
                type="text"
                id="auditedBy"
                className="form-control"
                value={formData.auditedBy}
                readOnly
              />
            </div>
          </div>
          
          <div className="row mb-3">
            <div className="form-group col-md-6">
              <label htmlFor="odometerReading">Odometer/Hours Reading</label>
              <input
                type="number"
                id="odometerReading"
                className="form-control"
                value={formData.odometerReading}
                onChange={(e) =>
                  setFormData({ ...formData, odometerReading: e.target.value })
                }
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="nextServiceDue">Next Service Due</label>
              <input
                type="date"
                id="nextServiceDue"
                className="form-control"
                value={formData.nextServiceDue}
                onChange={(e) =>
                  setFormData({ ...formData, nextServiceDue: e.target.value })
                }
              />
            </div>
          </div>

          {/* Checklist Table */}
          <div className="form-group">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h4>Checklist</h4>

            
              {formData.plantType === "Custom" && (
                <button
                  type="button"
                  className="btn btn-primary" 
                  onClick={handleAddCustomItem}
                >
                  Add Checklist Item
                </button>
              )}
            </div>
            
            <table className="table table-bordered "
             style={{ border: '1px solid #dee2e6', borderRadius: '4px' }}>
              <thead>
                <tr>
                  <th>Item/Check</th>
                  <th>Status</th>
                  <th>Comments</th>
                  <th>Photo Upload</th>
                </tr>
              </thead>
              <tbody>
                {formData.checklist.map((item, index) => (
                  <tr key={index}>
                    <td>
                      {typeof item === "string" ? item : item.item}
                    </td>
                    <td>
                      <div className="d-flex gap-2">
                        <label>
                          <input
                            type="radio"
                            name={`status-${index}`}
                            value="OK"
                            checked={typeof item === "object" && item.status === "OK"}
                            onChange={(e) =>
                              handleChecklistStatusChange(index, e.target.value)
                            }
                          />{" "}
                          OK
                        </label>
                        <label>
                          <input
                            type="radio"
                            name={`status-${index}`}
                            value="Not OK"
                            checked={typeof item === "object" && item.status === "Not OK"}
                            onChange={(e) =>
                              handleChecklistStatusChange(index, e.target.value)
                            }
                          />{" "}
                          Not OK
                        </label>
                        <label>
                          <input
                            type="radio"
                            name={`status-${index}`}
                            value="N/A"
                            checked={typeof item === "object" && item.status === "N/A"}
                            onChange={(e) =>
                              handleChecklistStatusChange(index, e.target.value)
                            }
                          />{" "}
                          N/A
                        </label>
                      </div>
                    </td>
                    <td>
                      <textarea
                        className="form-control"
                        placeholder="Add comments"
                        value={typeof item === "object" ? item.comment || "" : ""}
                        onChange={(e) =>
                          handleChecklistCommentChange(index, e.target.value)
                        }
                      ></textarea>
                    </td>
                    <td>
                      <input
                        type="file"
                        className="form-control"
                        onChange={(e) =>
                          handleChecklistPhotoUpload(index, e.target.files[0])
                        }
                      />
                    </td>
                  </tr>
                ))}
                {formData.checklist.length === 0 && (
                  <tr>
                    <td colSpan="4" className="text-center">
                      {formData.plantType ? "No checklist items available" : "Please select a plant type"}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Operator Signature */}
          <div className="form-group">
            <label htmlFor="operatorSignature">Operator Signature</label>
            <input
              type="text"
              id="operatorSignature"
              className="form-control"
              value={formData.operatorSignature}
              onChange={(e) =>
                setFormData({ ...formData, operatorSignature: e.target.value })
              }
              required
            />
            <small className="text-muted">
              Timestamp: {new Date().toLocaleString()}
            </small>
          </div>

          {/* Submission Buttons */}
          <div className="d-flex gap-3 mt-3">
            <button type="submit" className="btn btn-primary">
              Submit Checklist
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setFormData({ ...formData, status: "draft" });
                toast.info("Saved as draft");
              }}
            >
              Save as Draft
            </button>
            <button
              type="button"
              className="btn btn-info"
              onClick={() => toast.info("Printing checklist")}
            >
              Print Checklist
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      {/* Custom Checklist Modal */}
      <Modal
        show={showChecklistModal}
        onHide={() => setShowChecklistModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Custom Checklist Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            className="form-control"
            placeholder="Enter checklist item"
            value={customChecklistItem}
            onChange={(e) => setCustomChecklistItem(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowChecklistModal(false)}
          >
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddCustomChecklistItem}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showTaskModal}
        onHide={() => setShowTaskModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Create Follow-Up Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group mb-3">
            <label htmlFor="taskItem">Item</label>
            <input
              type="text"
              id="taskItem"
              className="form-control"
              value={taskDetails.item}
              readOnly
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="assignedTo">Assign To</label>
            <input
              type="text"
              id="assignedTo"
              className="form-control"
              value={taskDetails.assignedTo}
              onChange={(e) =>
                setTaskDetails({ ...taskDetails, assignedTo: e.target.value })
              }
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="priority">Priority</label>
            <select
              id="priority"
              className="form-control"
              value={taskDetails.priority}
              onChange={(e) =>
                setTaskDetails({ ...taskDetails, priority: e.target.value })
              }
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="dueDate">Due Date</label>
            <input
              type="date"
              id="dueDate"
              className="form-control"
              value={taskDetails.dueDate}
              onChange={(e) =>
                setTaskDetails({ ...taskDetails, dueDate: e.target.value })
              }
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowTaskModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleTaskCreation}>
            Create Task
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AuditEquipment;
