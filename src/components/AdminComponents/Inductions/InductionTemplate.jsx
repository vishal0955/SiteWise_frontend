import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createInduction } from "../../../redux/slices/inductionSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTheme } from "../../../context/ThemeContext";



function InductionTemplate() {

    const [questions, setQuestions] = useState([]);
const [addQuestion, setAddQuestion] = useState([
  { question: "Are you fit to work today?", checked: false },
  { question: "Do you have the required PPE?", checked: false },
  { question: "Do you understand today’s work tasks?", checked: false },
]);

const handleAddQuestionCheckbox = (index) => {
  setAddQuestion((prev) => {
    const updated = [...prev];
    updated[index].checked = !updated[index].checked;
    const selectedQuestions = updated.filter(q => q.checked).map(q => q.question);
    setQuestions(selectedQuestions);
    return updated;
  });
};

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    fullName: "",
    contactNumber: "",
    emailAddress: "",
    whiteCardNumber: "",
    siteLocation: "",
    siteSupervisor: "",
    inductionDate: "",
    accessStartTime: "",
    accessEndTime: "",
    acknowledgements: {
      siteSafetyPlan: false,
      complyOperatingHours: false,
      emergencyProcedures: false,
    },
    image: [], // should be array as per your data structure
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      acknowledgements: {
        ...prev.acknowledgements,
        [name]: checked,
      },
    }));
  };


  const handleAddQuestion = (e) => {
    const { id ,  checked} = e.target;
   
    setQuestions((prev) => ({
      ...prev, 
      questions: [...prev.questions,  addQuestion.filter((q ) => (q.ckecked === true))]
      

    }))
  }

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      image: [...prev.image, ...files],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.fullName ||
      !formData.emailAddress ||
      !formData.contactNumber
    ) {
      alert("Please fill in all required fields");
      return;
    }

    const submissionData = new FormData();
    submissionData.append("fullName", formData.fullName);
    submissionData.append("contactNumber", formData.contactNumber);
    submissionData.append("emailAddress", formData.emailAddress);
    submissionData.append("whiteCardNumber", formData.whiteCardNumber);
    submissionData.append("siteLocation", formData.siteLocation);
    submissionData.append("siteSupervisor", formData.siteSupervisor);
    submissionData.append("inductionDate", formData.inductionDate);
    submissionData.append("accessStartTime", formData.accessStartTime);
    submissionData.append("accessEndTime", formData.accessEndTime);
    submissionData.append(
      "acknowledgements",
      JSON.stringify(formData.acknowledgements)
    );

    if (formData.image.length > 0) {
      formData.image.forEach((file) => {
        submissionData.append("image", file);
      });
    }

    try {
      await dispatch(createInduction(submissionData)).unwrap();
      toast.success("Induction created successfully!");
      navigate("/inductions");
    } catch (error) {
      toast.error("Failed to create induction. Please try again.");
      console.error(error);
    }
  };

  // ... rest of your component remains the same ...
  return (
    <>
      <ToastContainer />
      <div className="container py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Add New Induction Template    </h2>
          <button
            onClick={() => navigate(-1)}
            className="btn btn-outline-secondary"
           
          >
            <i class="fa-solid fa-arrow-left me-2"></i> Back
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          style={{
            
            padding: "20px",
            borderRadius: "8px",
          }}
          className="bg-white shadow-sm"
        >
          <div className="row g-4">
            <div className="col-md-6">
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="fullName"
                  placeholder="Enter full name"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label className="form-label">Contact Number</label>
                <input
                  type="tel"
                  className="form-control"
                  name="contactNumber"
                  placeholder="Enter contact number"
                  value={formData.contactNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  className="form-control"
                  name="emailAddress"
                  placeholder="Enter email address"
                  value={formData.emailAddress}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label className="form-label">White Card Number</label>
                <input
                  type="text"
                  className="form-control"
                  name="whiteCardNumber"
                  placeholder="Enter white card number"
                  value={formData.whiteCardNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
                <div className="col-md-6">
              <div className="form-group">
                <label className="form-label">Project Name</label>
                <select
                  className="form-select"
                  name="siteLocation"
                
                  onChange={handleInputChange}
                >
                  <option value="">Select Project</option>
                  <option value="site1">Project 1</option>
                  <option value="site2">Project 2</option>
                </select>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label className="form-label">Site Location</label>
                <select
                  className="form-select"
                  name="siteLocation"
                  value={formData.siteLocation}
                  onChange={handleInputChange}
                >
                  <option value="">Select site location</option>
                  <option value="site1">Site 1</option>
                  <option value="site2">Site 2</option>
                </select>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label className="form-label">Site Supervisor</label>
                <select
                  className="form-select"
                  name="siteSupervisor"
                  value={formData.siteSupervisor}
                  onChange={handleInputChange}
                >
                  <option value="">Select site supervisor</option>
                  <option value="sup1">Supervisor 1</option>
                  <option value="sup2">Supervisor 2</option>
                </select>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label className="form-label">Induction Date</label>
                <input
                  type="date"
                  className="form-control"
                  name="inductionDate"
                  value={formData.inductionDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label className="form-label">Site Access Hours</label>
                <div className="d-flex gap-2">
                  <input
                    type="time"
                    className="form-control"
                    name="accessStartTime"
                    value={formData.accessStartTime}
                    onChange={handleInputChange}
                    required
                  />
                  <span className="align-self-center">to</span>
                  <input
                    type="time"
                    className="form-control"
                    name="accessEndTime"
                    value={formData.accessEndTime}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>
               <div className="col-md-6">
              <div className="form-group">
                <label className="form-label">Induction Validity Period  </label>
                <input
                  type="text"
                  className="form-control"
                  name="expiriesin"
                  placeholder="7 Days"
                //   value={formData.inductionDate}
                //   onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            
          </div>


          <div className="mt-4">
             <h3 className="h5 mb-3">Questions</h3>
            <div className="form-check mb-2">
              <input
                type="checkbox"
                className="form-check-input"
                name="siteSafetyPlan"
                checked={formData.acknowledgements.siteSafetyPlan}
                onChange={handleCheckboxChange}
                required
              />
              <label className="form-check-label">
                I have reviewed and understand the site safety plan
              </label>
            </div>
            <div className="form-check mb-2">
              <input
                type="checkbox"
                className="form-check-input"
                name="operatingHours"
                checked={formData.acknowledgements.operatingHours}
                onChange={handleCheckboxChange}
              />
              <label className="form-check-label">
                I agree to comply with site operating hours
              </label>
            </div>
            <div className="form-check mb-2">
              <input
                type="checkbox"
                className="form-check-input"
                name="emergencyProcedures"
                checked={formData.acknowledgements.emergencyProcedures}
                onChange={handleCheckboxChange}
              />
              <label className="form-check-label">
                I understand emergency procedures and contact protocols
              </label>
            </div>



       <div>
      <h3 className="h5 mb-3">Select Questions</h3>
      <div
        className="border rounded p-2"
        style={{
          maxHeight: "180px",
          overflowY: "auto",
          minWidth: "260px",
          background: "#fff",
          boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
        }}
      >
        <ul className="list-unstyled mb-0">
          {addQuestion.map((item, idx) => (
            <li key={idx}>
              <div className="form-check mb-2">
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={item.checked}
                  onChange={() => handleAddQuestionCheckbox(idx)}
                  id={`add-question-${idx}`}
                />
                <label className="form-check-label" htmlFor={`add-question-${idx}`}>
                  {item.question}
                </label>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-2">
        <strong>Selected:</strong>{" "}
        {questions.length > 0 ? questions.join(", ") : "None"}
      </div>
    </div>
          </div>


        


        
          <div className="mt-4">
            <h3 className="h5 mb-3">Upload Documents</h3>
            <div className="upload-box border rounded p-4 text-center">
              <input
                type="file"
                onChange={handleFileUpload}
                accept=".pdf,.png,.jpg,.jpeg"
                multiple // ← allow multiple files
                className="form-control"
                style={{ opacity: 0, position: "absolute" }}
              />

              <div className="py-3">
                <i className="fas fa-cloud-upload-alt fa-2x mb-2"></i>
                <p className="mb-1">Upload a file (drag and drop)</p>
                <p className="text-muted small">PDF, PNG, JPG up to 10MB</p>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-end gap-2 mt-4">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-dark">
              Create Induction
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default InductionTemplate;
