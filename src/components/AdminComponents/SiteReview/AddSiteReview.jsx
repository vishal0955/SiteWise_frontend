import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  createsitereview,
  fetchsitereviewById,
  updatesitereview,
} from '../../../redux/slices/sitereviewSlice';
import { fetchSiteEntries } from '../../../redux/slices/siteEntrySlice';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchUsers } from '../../../redux/slices/userSlice';

function AddSiteReview({ onNext, onBack }) {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const reviewId = id;

  console.log("AddSiteReview:", location.pathname);

  const isTemplate = location.pathname === "/addsitereviewtemplate" || false;

  const { entries } = useSelector((state) => state.entries);
  const { data: users } = useSelector((state) => state.users);
  const { loading, error } = useSelector((state) => state.sitereview);

  const [formData, setFormData] = useState({
    siteName: '',
    siteLocation: '',
    reviewerName: '',
    reviewDate: '',
    complianceStatus: 'Compliant',
    checkedItems: {
      safetyEquipment: false,
      workAreaCleanliness: false,
      toolCondition: false,
    },
    image: [],
    recommendations: '',
    assignedTo: '',
    templateName: '',
    categories: [],
  });

  const [addquestion, setAddQuestion] = useState([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [ addque, setAddQue ] = useState(false);
  const [currentCategory, setCurrentCategory] = useState('');
  const [newCategory, setNewCategory] = useState('');

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchSiteEntries());

    if (reviewId) {
      dispatch(fetchsitereviewById(reviewId)).then(({ payload }) => {
        setFormData({
          siteName: payload.data.siteName,
          siteLocation: payload.data.siteLocation,
          reviewerName: payload.data.reviewerName,
          reviewDate: payload.data.reviewDate.slice(0, 16),
          complianceStatus: payload.data.complianceStatus,
          checkedItems: payload.data.checkedItems,
          image: payload.data.image || [],
          recommendations: payload.data.recommendations,
          assignedTo: payload.data.assignedTo,
          templateName: payload.data.templateName,
          categories: payload.data.categories || [],
        });
      });
    }
  }, [dispatch, reviewId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddQuestion = (e) => {
    e.preventDefault();
    if (newQuestion.trim() !== '') {
      setAddQuestion((prev) => [...prev, { text: newQuestion, mandatory: false }]);
      setNewQuestion('');
    } else {
      toast.error("Question cannot be empty!");
    }
  };

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (newCategory.trim() !== '') {
      const updatedCategories = [...formData.categories, { name: newCategory, questions: [] }];
      setFormData((prev) => ({
        ...prev,
        categories: updatedCategories,
      }));
      setNewCategory('');
    } else {
      toast.error("Category cannot be empty!");
    }
  };

  const handleDeleteQuestion = (categoryName, questionId) => {
    const updatedCategories = formData.categories.map((cat) => {
      if (cat.name === categoryName) {
        return {
          ...cat,
          questions: cat.questions.filter((q) => q.id !== questionId),
        };
      }
      return cat;
    });
    setFormData((prev) => ({
      ...prev,
      categories: updatedCategories,
    }));
  };

  const handleSaveTemplate = () => {
    // Dispatch an action to save the template
    // You need to create this action in your sitereviewSlice
    dispatch(createsitereview(formData))
      .unwrap()
      .then(() => {
        toast.success("Template saved successfully!");
        navigate('/siteReview');
      })
      .catch((err) => {
        toast.error("Failed to save template!");
        console.error(err);
      });
  };

  return (
    <div className="container py-4">
      <ToastContainer />

      <div className="col-md-8 mx-auto">
        <div className="d-flex justify-content-between">
          <h4 className="mb-4">{reviewId ? 'Edit Site Review' : 'Create New Site Review'}</h4>
          <Link to="/siteReview">
            <button className="btn btn-outline-secondary ">
              <i className="fa-solid fa-arrow-left me-2"></i>Back
            </button>
          </Link>
        </div>

        <form className="mx-auto bg-white p-4 rounded shadow-sm row g-3 mt-2">
           <div className="col-md-12">
            <label className="form-label">Template Name</label>
            <input
              type="text"
              className="form-control"
              name="templateName"
              placeholder="Enter Template Name"
              value={formData.templateName}
              onChange={handleInputChange}
            />
          </div>
         
          <div className="col-md-12">
            <label className="form-label">Site Name</label>
            <input
              type="text"
              className="form-control"
              name="siteName"
              value={formData.siteName}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-12">
            <label className="form-label">Site Location</label>
            <input
              type="text"
              className="form-control"
              name="siteLocation"
              value={formData.siteLocation}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-12 mt-3">
            <label className="form-label">Review Date & Time</label>
            <input
              type="datetime-local"
              className="form-control"
              name="reviewDate"
              value={formData.reviewDate}
              onChange={handleInputChange}
            />
          </div>

          <div className="col-md-12">
            <label className="form-label">Reviewer Name</label>
            <input
              type="text"
              className="form-control"
              name="reviewerName"
              value={formData.reviewerName}
              onChange={handleInputChange}
            />
          </div>

         { isTemplate && (
       <>
         
          <div className="col-md-12 mt-4">
            <div className="d-flex gap-2 mb-3">
              <select 
                className="form-select"
                value={currentCategory}
                onChange={(e) => setCurrentCategory(e.target.value)}
              >
                {formData.categories.map(cat => (
                  <option key={cat.name} value={cat.name}>{cat.name}</option>
                ))}
              </select>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="New Category"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                />
                <button 
                  className="btn btn-outline-primary"
                  onClick={handleAddCategory}
                  type="button"
                >
                  Add Category
                </button>
              </div>
            </div>
          </div>

        
          <div className="col-md-12">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Enter new question"
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
              />
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleAddQuestion}
              >
                Add Question
              </button>
            </div>
          </div>

          {/* Display Questions by Category */}
          {formData.categories.map(category => (
            <div key={category.name} className="col-md-12 mt-3">
              <h5>{category.name}</h5>
              <ul className="list-group">
                {category.questions.map((question, index) => (
                  <li 
                    key={question.id} 
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <div>
                      <span className="me-2">{index + 1}.</span>
                      {question.text}
                    </div>
                    <div className="d-flex gap-2 align-items-center">
                      <span className="badge bg-secondary">
                        Mandatory: {question.mandatory ? "Yes" : "No"}
                      </span>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDeleteQuestion(category.name, question.id)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          </>)
}

          <div className="d-flex justify-content-between gap-2 mt-4">
            <button type="button" className="btn btn-outline-secondary" onClick={onBack}>
              Back
            </button>

            {
             
                <button type="button" className="btn btn-success" onClick={onNext}>
                  Next
                </button>
             
            }
           
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddSiteReview;