import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createRFI } from "../../../redux/slices/rfiSlice";
import { fetchUsers } from "../../../redux/slices/userSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Modal, Button } from "react-bootstrap";
import { Stage, Layer, Circle } from "react-konva";
import { fetchDrawings } from "../../../redux/slices/drawingsSlice";

function AddRFIs() {
  const { data: users } = useSelector((state) => state.users);

  const { drawings_arr } = useSelector((state) => state.drawings);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    subject: "",
    priority: "",
    due_date: "",
    assignee: "",
    department: "",
    description: "",
    image: [],
    drawingMarkup: null, // Stores the drawing markup data
  });

  const [responses, setResponses] = useState([]); // Stores threaded responses
  const [newResponse, setNewResponse] = useState(""); // New response text
  const [showDrawingModal, setShowDrawingModal] = useState(false);
  const [drawingShapes, setDrawingShapes] = useState([]); // Stores shapes drawn on the canvas
  const [isDrawing, setIsDrawing] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#ff0000"); // Default color
  const [aiResponse, setAiResponse] = useState(""); // Stores the AI-generated response
  const [loadingAI, setLoadingAI] = useState(false); // Loading state for AI response
  const [showAIResponseModal, setShowAIResponseModal] = useState(false); // Modal for AI response
  const stageRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
dispatch(fetchDrawings()); 
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      image: [...prev.image, ...files],
    }));
  };


    const [selectedDrawingId, setSelectedDrawingId] = useState("");
    const [pin, setPin] = useState(null); // { x: 0-1, y: 0-1 }
    const imageRef = useRef(null);
  
    // ...existing code...
  
    // Find the selected drawing object
    const selectedDrawing = drawings_arr.drawingRegisters.find(
      (d) => d._id === selectedDrawingId
    );
  
    // Handle drawing selection
    const handleDrawingChange = (e) => {
      setSelectedDrawingId(e.target.value);
      setPin(null); // Reset pin when drawing changes
      setFormData((prev) => ({ ...prev, drawing: e.target.value }));
    };
  
    // Handle click on image to set pin
    const handleImageClick = (e) => {
      const rect = imageRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      setPin({ x, y });
      // Optionally, save pin to formData if needed
      setFormData((prev) => ({ ...prev, pin: { x, y } }));
    };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const submitData = new FormData();
    submitData.append("subject", formData.subject);
    submitData.append("priority", formData.priority);
    submitData.append("due_date", formData.due_date);
    submitData.append("assignee", formData.assignee);
    submitData.append("department", formData.department);
    submitData.append("description", formData.description);
    submitData.append("drawingMarkup", JSON.stringify(formData.drawingMarkup)); // Include drawing markup

    formData.image.forEach((file) => {
      submitData.append("image", file);
    });

    dispatch(createRFI(submitData))
      .unwrap()
      .then(() => {
        toast.success("RFI created successfully!");
        setAiResponse(""); // Clear AI response after submission
      })
      .catch(() => {
        toast.error("Failed to create RFI");
      });
  };

  const handleGenerateAIResponse = async () => {
    setLoadingAI(true);
    try {
      // Simulate an API call to generate AI response
      const response = await new Promise((resolve) =>
        setTimeout(
          () =>
            resolve(
              "This is an AI-generated response based on the attached documents and drawings."
            ),
          2000
        )
      );
      setAiResponse(response);
      setShowAIResponseModal(true); // Show the AI response modal
      toast.info("AI-generated suggestion is ready.");
    } catch (error) {
      toast.error("Failed to generate AI response.");
    } finally {
      setLoadingAI(false);
    }
  };

  const handleSaveAIResponse = () => {
    toast.success("AI response saved successfully!");
    setShowAIResponseModal(false); // Close the modal
  };

  const handleAddResponse = () => {
    if (!newResponse.trim()) {
      toast.error("Response cannot be empty.");
      return;
    }

    const response = {
      text: newResponse,
      role: "builder", // Example role, can be dynamic
      timestamp: new Date().toISOString(),
    };

    setResponses((prev) => [...prev, response]);
    setNewResponse(""); // Clear the input field
    toast.success("Response added successfully!");
  };

  const handleDrawingStart = () => {
    setIsDrawing(true);
  };

  const handleDrawingEnd = () => {
    setIsDrawing(false);
  };

  const handleDrawingMove = (e) => {
    if (!isDrawing) return;

    const stage = stageRef.current;
    const point = stage.getPointerPosition();
    setDrawingShapes((prev) => [
      ...prev,
      { x: point.x, y: point.y, type: "circle", radius: 5, color: selectedColor },
    ]);
  };

  const saveDrawing = () => {
    setFormData((prev) => ({
      ...prev,
      drawingMarkup: drawingShapes,
    }));
    setShowDrawingModal(false);
    toast.success("Drawing markup saved!");
  };

  return (
    <div className="container-fluid p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="fw-bold mb-0">New RFI</h5>
        <div className="d-flex gap-2 text-nowrap">
          <Link to="/rfis">
            <button className="btn btn-outline-secondary">
              <i className="fa-solid fa-arrow-left me-2"></i>Back
            </button>
          </Link>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-sm">
          {/* <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Project Name </label>
            <select
              className="form-select"
              name="priority"
              value={formData.priority}
              onChange={handleInputChange}
            >
              <option value="" disabled>
                Select priority
              </option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label">Due Date</label>
            <input
              type="date"
              className="form-control"
              name="due_date"
              value={formData.due_date}
              onChange={handleInputChange}
              required
            />
          </div>
        </div> */}
        <div className="mb-3">
          <label className="form-label">Subject</label>
          <input
            type="text"
            className="form-control"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            required
          />
        </div>


        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Priority</label>
            <select
              className="form-select"
              name="priority"
              value={formData.priority}
              onChange={handleInputChange}
            >
              <option value="" disabled>
                Select priority
              </option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label">Due Date</label>
            <input
              type="date"
              className="form-control"
              name="due_date"
              value={formData.due_date}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Assignee</label>
            <select
              className="form-select"
              name="assignee"
              value={formData.assignee}
              onChange={handleInputChange}
            >
              <option value="" disabled>
                Select assignee
              </option>
              {users?.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.firstName} {user.lastName}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label">Department</label>
            <select
              className="form-select"
              name="department"
              value={formData.department}
              onChange={handleInputChange}
            >
              <option value="engineering">Engineering</option>
              <option value="construction">Construction</option>
              <option value="design">Design</option>
            </select>
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows="4"
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="form-label">Attachments</label>
          <div
            className="border rounded p-3 text-center"
            style={{ cursor: "pointer" }}
          >
            <input
              type="file"
              className="d-none"
              id="fileUpload"
              multiple
              onChange={handleFileUpload}
            />
            <label
              htmlFor="fileUpload"
              className="mb-0"
              style={{ cursor: "pointer" }}
            >
              <i className="bi bi-cloud-upload fs-3 text-muted"></i>
              <p className="text-muted small mb-0 mt-2">
                Upload files or drag and drop
              </p>
              <p className="text-muted small mb-0">PNG, JPG, PDF up to 10MB</p>
            </label>
          </div>
        </div>

{/* 
<div className="mb-3">
  <label className="form-label">Drawing</label>
  <div className="d-flex gap-2 align-items-center">
    <select
      name="drawing"
      className="form-select"
      value={selectedDrawingId}
      onChange={handleDrawingChange}
    >
      <option value="">Select Drawing</option>
      {drawings_arr.drawingRegisters.map((drawing) => (
        <option key={drawing._id} value={drawing._id}>
          {drawing.documentTitle}
        </option>
      ))}
    </select>
    {selectedDrawing && (
      <Button
        variant="outline-primary"
        size="sm"
        onClick={() => setShowDrawingModal(true)}
      >
        Mark Area on Drawing
      </Button>
    )}
  </div>
</div> */}
       

             <div className="mb-3">
          <label className="form-label"> Drawings</label>
          <select
            name="drawing"
            className="form-select"
            value={selectedDrawingId}
            onChange={handleDrawingChange}
          >
            <option value="">Select Drawing</option>
            {drawings_arr.drawingRegisters.map((drawing) => (
              <option key={drawing._id} value={drawing._id}>
                {drawing.documentTitle}
              </option>
            ))}
          </select>
        </div>

        {/* Show selected drawing and allow pin drop */}
        {selectedDrawing && selectedDrawing.image && selectedDrawing.image[0] && (
          <div className="mt-3 position-relative" style={{ maxWidth: 500 }}>
            <div style={{ border: "1px solid #ddd", borderRadius: 8, overflow: "hidden", width: "100%", position: "relative" }}>
              <img
                ref={imageRef}
                src={selectedDrawing.image[0]}
                alt={selectedDrawing.documentTitle}
                style={{ width: "100%", height: "auto", display: "block", cursor: "crosshair" }}
                onClick={handleImageClick}
              />
              {pin && (
                <span
                  style={{
                    position: "absolute",
                    left: `${pin.x * 100}%`,
                    top: `${pin.y * 100}%`,
                    transform: "translate(-50%, -100%)",
                    color: "red",
                    fontSize: 32,
                    pointerEvents: "none",
                  }}
                  title={`Pin at (${Math.round(pin.x * 100)}%, ${Math.round(pin.y * 100)}%)`}
                >
                  📍
                </span>
              )}
            </div>
            <div className="text-muted mt-1" style={{ fontSize: 13 }}>
              Click on the drawing to mark the defect location.
            </div>
          </div>
        )}


        <div className="d-flex justify-content-end gap-2">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => window.history.back()}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Submit RFI
          </button>
        </div>
      </form>
     {/* Generate AI Response Section */}
     {/* <div className="mt-4">
        <h5>Generate AI Response</h5>
        <button
          className="btn btn-info"
          onClick={handleGenerateAIResponse}
          disabled={loadingAI}
        >
          {loadingAI ? "Generating..." : "Generate AI Response"}
        </button>
      </div> */}
      {/* Threaded Responses Section */}
      {/* <div className="mt-5">
        <h5>Responses</h5>
        <div className=" p-3 rounded">
          {responses.length > 0 ? (
            responses.map((response, index) => (
              <div key={index} className="mb-3">
                <strong>{response.role}</strong> ({new Date(response.timestamp).toLocaleString()}):
                <p>{response.text}</p>
              </div>
            ))
          ) : (
            <p>No responses yet.</p>
          )}
        </div>
        <div className="mt-3">
          <textarea
            className="form-control"
            rows="3"
            placeholder="Add a response..."
            value={newResponse}
            onChange={(e) => setNewResponse(e.target.value)}
          ></textarea>
          <button className="btn btn-primary mt-2" onClick={handleAddResponse}>
            Add Response
          </button>
        </div>
      </div> */}

 

      {/* AI Response Modal */}
      <Modal
        show={showAIResponseModal}
        onHide={() => setShowAIResponseModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>AI-Generated Response</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <textarea
            className="form-control"
            rows="6"
            value={aiResponse}
            onChange={(e) => setAiResponse(e.target.value)}
          ></textarea>
          <p className="text-muted mt-2">
            Disclaimer: AI-generated draft. Review before submission.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAIResponseModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveAIResponse}>
            Save Response
          </Button>
        </Modal.Footer>
      </Modal>


      {/* Drawing Modal */}
<Modal show={showDrawingModal} onHide={() => setShowDrawingModal(false)}>
  <Modal.Header closeButton>
    <Modal.Title>Mark Area on Drawing</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <div style={{ position: "relative", width: "100%", height: 400 }}>
      {selectedDrawing && selectedDrawing.image && (
        <img
          src={selectedDrawing.image[0]}
          alt="Drawing"
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "contain",
            zIndex: 1,
          }}
        />
      )}
      <Stage
        width={500}
        height={400}
        style={{ position: "absolute", top: 0, left: 0, zIndex: 2 }}
        onMouseDown={handleDrawingStart}
        onMouseUp={handleDrawingEnd}
        onMouseMove={handleDrawingMove}
        ref={stageRef}
      >
        <Layer>
          {drawingShapes.map((shape, idx) => (
            <Circle
              key={idx}
              x={shape.x}
              y={shape.y}
              radius={shape.radius}
              fill={shape.color}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  </Modal.Body>
  <Modal.Footer>
    <Button
      variant="secondary"
      onClick={() => {
        setShowDrawingModal(false);
        setDrawingShapes([]);
      }}
    >
      Cancel
    </Button>
    <Button variant="primary" onClick={saveDrawing}>
      Save Markup
    </Button>
  </Modal.Footer>
</Modal>

    
      
    </div>
  );
}

export default AddRFIs;