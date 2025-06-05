




import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button } from "react-bootstrap";

import {  addEquipment, updateEquipment, getequipmentById } from "../../../redux/slices/equipmentSlice"; 
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddEquipment() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);
  const equipmentId = id;

  const [formData, setFormData] = useState({
    equipmentID: "",
    name: "",
    type: "",
    location: "",
    purchaseDate: "",
    purchaseCost: "",
    description: "",
    inspectionItems: [],
    image: [],
  });

  const [newInspectionItem, setNewInspectionItem] = useState("");

  useEffect(() => {
    if (equipmentId) {
      dispatch(getequipmentById(equipmentId)).then(({ payload }) => {
        console.log("in edit equipment ", payload);

        setFormData({
          equipmentID: payload.equipmentID || "",
          name: payload.name || "",
          type: payload.type || "",
          location: payload.location || "",
          purchaseDate: payload.purchaseDate ? payload.purchaseDate.slice(0, 10) : "",
          purchaseCost: payload.purchaseCost || "",
          description: payload.description || "",
          inspectionItems: payload.inspectionItems || [],
          image: payload.image || [],
        });
      });
    }
  }, [dispatch, equipmentId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prevData) => ({
      ...prevData,
      image: [...prevData.image, ...files],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("equipmentID", formData.equipmentID);
    form.append("name", formData.name);
    form.append("type", formData.type);
    form.append("location", formData.location);
    form.append("purchaseDate", formData.purchaseDate);
    form.append("purchaseCost", formData.purchaseCost);
    form.append("description", formData.description);
    form.append("inspectionItems", JSON.stringify(formData.inspectionItems));

    formData.image.forEach((img) => {
      if (typeof img === "string") {
        form.append("existingImageUrls", img);
      } else {
        form.append("image", img);
      }
    });

    try {
      if (equipmentId) {
        console.log("in edit equipment form ", form);
        await dispatch(updateEquipment({ id: equipmentId, equipmentData: form })).unwrap()
        .then(() => {
          toast.success("Equipment updated successfully!");
          navigate("/PlantMachinery");
        }).catch(() => {
          toast.error("Failed to update equipment!");
          navigate("/PlantMachinery");
        })
      } else {
        await dispatch(addEquipment(form));
      }
      navigate("/PlantMachinery");
    } catch (error) {
      console.error("Error saving equipment:", error);
    }
  };

  return (
    <div className="container d-flex justify-content-center py-4" style={{ fontSize: "14px" }}>
      <div className="bg-white p-4 rounded shadow-sm w-100">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="fw-semibold m-0">{equipmentId ? "Edit Equipment" : "Add New Equipment"}</h4>
          <button
            onClick={() => navigate(-1)}
            className="btn btn-outline-secondary"
          
          >
            <i className="fa-solid fa-arrow-left me-2"></i>Back 
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Equipment ID</label>
              <input
                type="text"
                className="form-control"
                name="equipmentID"
                value={formData.equipmentID}
                onChange={handleChange}
                placeholder="Enter Equipment ID"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Equipment Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter Equipment Name"
              />
            </div>
          </div>

          <div className="row g-3 mt-2">
            <div className="col-md-6">
              <label className="form-label">Type</label>
              <select
                className="form-select"
                name="type"
                value={formData.type}
                onChange={handleChange}
              >
                <option value="">Select Type</option>
                <option value="Power Tool">Power Tool</option>
                <option value="type2"> </option>
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label">Location</label>
              <select
                className="form-select"
                name="location"
                value={formData.location}
                onChange={handleChange}
              >
                <option value="">Select Location</option>
                <option value="Warehouse A">Warehouse A</option>
                <option value="Warehouse B">Warehouse B</option>
              </select>
            </div>
          </div>

          <div className="row g-3 mt-2">
            <div className="col-md-6">
              <label className="form-label">Purchase Date</label>
              <input
                type="date"
                className="form-control"
                name="purchaseDate"
                value={formData.purchaseDate}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Purchase Cost</label>
              <input
                type="number"
                className="form-control"
                name="purchaseCost"
                value={formData.purchaseCost}
                onChange={handleChange}
                placeholder="Enter Cost"
              />
            </div>
          </div>

          <div className="mt-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter equipment description"
              rows={4}
            />
          </div>

          <div className="mt-3">
            <label className="form-label">Upload Equipment Images</label>
            <input
              type="file"
              className="form-control"
              onChange={handleImageChange}
              multiple
              accept="image/png, image/jpeg, image/jpg, image/gif"
            />
          </div>

          <div className="mt-4 d-flex justify-content-end gap-2">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>
            <Button
              style={{ backgroundColor: "#0052CC", borderColor: "#0052CC" }}
              type="submit"
            >
              {equipmentId ? "Update Equipment" : "Save Equipment"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddEquipment;




