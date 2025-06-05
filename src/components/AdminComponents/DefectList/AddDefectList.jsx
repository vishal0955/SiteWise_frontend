import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import axiosInstance from "../../../utils/axiosInstance";
import { apiUrl } from "../../../utils/config";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects } from "../../../redux/slices/projectSlice";
import { Modal } from "react-bootstrap";
import { fetchUsers } from "../../../redux/slices/userSlice"; 
import { fetchDefectDetails, updateDefectList } from "../../../redux/slices/defectSlice";
import { fetchDrawings } from "../../../redux/slices/drawingsSlice";


function AddDefectList() {
  const { id } = useParams();
  console.log(id, "id");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    project: "",
    location: "",
    category: "",
    assigned: "",
    priority: "Low",
    description: "",
    status: "Open",
    comments: "",
    date: "",
    trade: "",
    area: "",
    images: [],

  });

  const dispatch = useDispatch();

  const { drawings_arr } = useSelector((state) => state.drawings);
  console.log(drawings_arr, "drawing");
  const { data: projects, loading } = useSelector((state) => state.projects);
  const [categories, setCategories] = useState([]);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  const users = useSelector((state) => state.users.data);

  const [image, setImage] = useState(null);

  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get(`${apiUrl}/category`);
      // console.log("Categories:", response.data);
      const categoryList = response.data?.data || [];
      setCategories(categoryList);
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Failed to fetch categories.");
    }
  };

  useEffect(() => {
    dispatch(fetchDrawings()); 
    dispatch(fetchProjects()); 
    fetchCategories(); 
    dispatch(fetchUsers());
    
    if(id) {
      dispatch(fetchDefectDetails(id)).then(({ payload }) => {
        console.log(payload);
        console.log(payload.title, "title");
        setFormData({
          title: payload?.title,
          project: payload?.project?._id,
          location: payload.location,          
          category: payload.category?._id,
          assigned: payload.assigned?._id,
          priority: payload.priority,
          description: payload.description,
          status: payload.status,
          comments: payload.comments,
          date: new Date(payload.date).toISOString().split("T")[0],
          image: payload.image || [],
          trade: payload.trade,
        });
      });
    }

  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddCategory = async () => {
    const trimmed = newCategory.trim();
    if (!trimmed || categories.includes(trimmed)) {
      toast.warn("Category is either empty or already exists.");
      return;
    }

    try {
      const response = await axiosInstance.post(`${apiUrl}/category`, {
        category: trimmed,
      });

      setCategories((prev) => [...prev, trimmed]);
      setFormData((prev) => ({ ...prev, category: trimmed }));
      toast.success("Category added successfully!");
    } catch (error) {
      console.error("Category add error:", error);
      toast.error(error.response?.data?.message || "Failed to add category.");
    } finally {
      setNewCategory("");
      setShowCategoryModal(false);
    }
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async () => {
    const payload = new FormData();
    payload.append("title", formData.title);
    payload.append("date", formData.date);
    payload.append("project", formData.project);
    payload.append("location", formData.location);
    payload.append("category", formData.category);
    payload.append("assigned", formData.assigned);
    payload.append("priority", formData.priority);
    payload.append("description", formData.description);
    payload.append("status", formData.status);
    payload.append("comments", formData.comments);
    if (image) payload.append("image", image);

    try {
      if (id) {
        const result = await dispatch(updateDefectList({ 
          id, 
          updatedDefect: payload 
        })).unwrap();
        
        toast.success("Defect updated successfully!");
        navigate('/defects');
      }
       else {
        try {
          const response = await axiosInstance.post(
            `${apiUrl}/defectlists`,
            payload,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          toast.success("Defect created successfully!");
          navigate(-1);
        } catch (error) {
          toast.error(
            error.response?.data?.message || "Failed to create defect."
          );
        }
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error(error?.message || "Failed to process defect.");
    }
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

  return (
    <div
      className="container d-flex justify-content-center py-4"
      style={{ fontFamily: "Inter, sans-serif", fontSize: "14px" }}
    >
      <div className="bg-white p-4 rounded shadow-sm w-100">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="fw-semibold m-0">Log New Defect</h4>
          <button
            onClick={() => navigate(-1)}
            className="btn btn-outline-secondary btn-set-back"
          
          >
            <i className="fa-solid fa-arrow-left me-2"></i> Back 
          </button>
        </div>

        {/* Form Inputs */}
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Defect Title</label>
            <input
              type="text"
              name="title"
              className="form-control"
              placeholder="Enter defect title"
              onChange={handleChange}
              value={formData.title}
            />
          </div>


          <div className="col-md-6">
            <label className="form-label">Trade</label>
            <input
              type="text"
              name="title"
              className="form-control"
              placeholder="Enter Trade"
              onChange={handleChange}
              value={formData.trade}
            />
          </div>
          {/* <div className="col-md-6">
            <label className="form-label">
              Project Name{" "}
              <Link to={"/add-project"}>
                <i
                  className="fa fa-plus ms-2"
                  style={{ cursor: "pointer", color: "#0d6efd" }}
                ></i>
              </Link>
            </label>
            {loading ? (
              <div>Loading projects...</div>
            ) : (
              <select
                className="form-select"
                name="project"
                value={formData.project}
                onChange={handleChange}
                required
              >
                <option value="">Select Project</option>
                {projects?.map((project) => (
                  <option key={project._id} value={project._id}>
                    {project.name}
                  </option>
                ))}
              </select>
            )}
          </div> */}
        </div>



        <div className="row g-3 mt-2">

          {/*  TODO =>  show image form Drawing and user can mark location or drop pin */}
          <div className="col-md-6">
            <label className="form-label">Location</label>
            <input
              type="text"
              name="location"
              className="form-control"
              placeholder="Enter location"
              onChange={handleChange}
              value={formData.location}
            />
          </div>
          {/* <div className="col-md-6">
            <label className="form-label d-flex justify-content-between align-items-center">
              <span>Category</span>
              <i
                className="fa fa-plus"
                style={{ cursor: "pointer", color: "#0d6efd" }}
                onClick={() => setShowCategoryModal(true)}
              ></i>
            </label>

            <select
              name="category"
              className="form-select"
              onChange={handleChange}
              value={formData.category}
              // onClick={fetchCategories}
            >
              <option value="">Select Category</option>
              {categories.map((cat, index) => (
                <option key={cat._id} value={cat._id}>
                  {cat.category}
                </option>
              ))}
            </select>
          </div> */}
        </div>
{/* 
        <Modal
          show={showCategoryModal}
          onHide={() => setShowCategoryModal(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add New Category</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input
              type="text"
              className="form-control"
              placeholder="Enter new category"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowCategoryModal(false)}
            >
              Cancel
            </Button>
            <Button variant="primary" onClick={handleAddCategory}>
              Save
            </Button>
          </Modal.Footer>
        </Modal> */}
            <div className="mt-3">
          <label className="form-label">Description</label>
          <textarea
            name="description"
            className="form-control"
            placeholder="Describe the defect in detail"
            rows={4}
            onChange={handleChange}
            value={formData.description}
          />
        </div>

            {/* <div className="mt-3">
          <label className="form-label">Drawing</label>
          <select
            name="drawing"
            className="form-select"
            
            placeholder="Describe the defect in detail"
            rows={4}
            >
            <option value="">Select Drawing</option>
            {drawings_arr.drawingRegisters.map((drawing) => (
              <option key={drawing._id} value={drawing._id}>
                {drawing.documentTitle}
             {drawing.image && drawing.image.map ((image,index) => (
                <img src={image[index]} alt={drawing.documentTitle} style={{ width: '50px', height: '50px', marginLeft: '10px' }} 
              />
              )
             )
             } 
              </option>
            ))}
            </select>
        </div> */}


          <div className="mt-3">
          <label className="form-label">Drawing</label>
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

        <div className="mt-3">
          <label className="form-label">Attachments</label>
          <input
            type="file"
            className="form-control"
            onChange={handleFileChange}
          />
        </div>



        <div className="row g-3 mt-2">
          <div className="col-md-6">
           <label className="form-label">Assigned To Subcontractor</label>
            <select
              name="assigned"
              className="form-select"
              value={formData.assigned}
              onChange={handleChange}
              required
            >
              <option value="">Select User</option>
              {users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.name || `${user.firstName} ${user.lastName}`}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label">Priority</label>
            <select
              name="priority"
              className="form-select"
              onChange={handleChange}
              value={formData.priority}
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>
        </div>

    
{/*  isme add ke time status by defalt open hoga 
Har defect ka status update step-by-step hona chahiye:

Open – Jab raise hota hai

In Progress – Jab kisi subcontractor ko diya gaya

Ready for Review – Jab kaam complete hokar QA ke liye ready hai

Closed – Jab QA/Reviewer approve kar deta */}

        <div className="row g-3 mt-3">
          <div className="col-md-6">
            <label className="form-label">Status</label>
            <select
              name="status"
              className="form-select"
              onChange={handleChange}
              value={formData.status}
            >
              <option>Open</option>
              <option>In Progress</option>
              <option>Ready for Review </option>
              <option>Closed</option>
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label">Due Date</label>
            <input
              type="date"
              className="form-control"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
        </div>

      

        {formData.image?.length > 0 && (
  <div className="mt-2">
    <label className="form-label">Uploaded Files:</label>
    <ul>
      {formData.image.map((url, idx) => (
        <li key={idx}>
          <a href={url} target="_blank" rel="noopener noreferrer">{url.split('/').pop()}</a>
        </li>
      ))}
    </ul>
  </div>
)}

       

        <div className="mt-4 d-flex gap-2">
          <Button className="btn-set-color">Save as Draft</Button>
          <Button className="btn-set-color" onClick={handleSubmit}>
            { id ? "Update Defect" : "Create Defect"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AddDefectList;
