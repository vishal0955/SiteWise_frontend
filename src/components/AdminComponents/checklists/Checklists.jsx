import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchChecklists,
  fetchChecklistDetails,
  deleteChecklist,
} from "../../../redux/slices/checklistSlice";
import { Spinner } from "react-bootstrap";
import EditChecklistModal from "./EditChecklistModal";
import { apiUrl } from "../../../utils/config";
import { toast } from "react-toastify";
import axiosInstance from "../../../utils/axiosInstance";
import { FaClipboardList, FaCheckCircle, FaHourglassHalf, FaTimesCircle } from "react-icons/fa"; 

function Checklists() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProject, setSelectedProject] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const dispatch = useDispatch();

  const color = ["primary", "success", "warning", "danger", "info", "dark"];
  const { checklists, checklistDetails, loading, error } = useSelector(
    (state) => state.checklists
  );

  console.log("Checklists data:", checklists); 

  const projectOptions = [
    "All",
    ...new Set(checklists.map((d) => d.project?.name).filter(Boolean)),
  ];

  const statusOptions = [
    "All",
    ...new Set(checklists.map((d) => d.status).filter(Boolean)),
  ];

  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    dispatch(fetchChecklists());
  }, [dispatch]);

  const handleViewDetails = (id) => {
    dispatch(fetchChecklistDetails(id)); 
    setShowModal(true); 
  };

  const handleDelete = (id) => {
    dispatch(deleteChecklist(id)); 
    dispatch(fetchChecklists()); 
  };

  const handleCloseModal = () => {
    setShowModal(false); 
  };

  const filteredChecklist = checklists
    .filter((d) =>
      d.checklistName?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((d) =>
      selectedProject === "All" ? true : d.project?.name === selectedProject
    )
    .filter((d) =>
      selectedStatus === "All" ? true : d.status === selectedStatus
    );

  const paginatedChecklist = filteredChecklist.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredChecklist.length / itemsPerPage);

  if (loading) {
    return <Spinner animation="border" />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Approved":
        return "bg-success";
      case "Pending":
        return "bg-warning text-dark";
      case "Under Review":
        return "bg-primary";
      default:
        return "bg-secondary";
    }
  };

  const handleUpdateChecklist = async (updatedData) => {
    console.log("Updating checklist with data:", updatedData);

    try {
      const response = await axiosInstance.put(
        `${apiUrl}/checklists/${updatedData._id}`,
        updatedData
      );

      if (response.status === 200) {
        setShowEditModal(false);
        dispatch(fetchChecklists());
        toast.success("Checklist updated successfully!");
      } else {
        toast.error("Update failed, please try again.");
      }
    } catch (error) {
      console.error("Update failed", error);
      toast.error(
        error.response?.data?.message || "Something went wrong during update."
      );
    }
  };

  const stats = [
    {
      icon: <FaClipboardList size={28} className="text-primary " />,
      title: "Total CheckList",
      number: 40,
      subtitle: "",
      color: "primary",
    },
    {
      icon: <FaCheckCircle size={28} className="text-primary " />,
      title: "Approved",
      number: 25,
      subtitle: "",
      color: "success",
    },
    {
      icon: <FaHourglassHalf size={28} className="text-primary " />,
      title: "Pending",
      number: 5,
      subtitle: "",
      color: "warning",
    },
    {
      icon: <FaTimesCircle size={28} className="text-primary " />,
      title: "Rejected",
      number: 10,
      subtitle: "",
      color: "danger",
    },
  ];

  return (
    <>

      <div className=" p-3 p-md-4 rounded shadow-sm">
        {/* Heading + Button */}
        <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
          <h2 className="mb-2 mb-sm-0 ">All Checklists</h2>
          <Link to={"/AddChecklists"} className="text-decoration-none">
            <Button className="btn-set-color">
              <i className="fa-solid fa-plus me-2"></i>Create New Checklist
            </Button>
          </Link>
        </div>

         <div className="row g-4 mt-2 mb-4">
          {stats.map((stat, idx) => (
            // <div className="col-12 col-sm-6 col-md-3" key={idx}>
            //   <div className="stats-card p-4 shadow-sm rounded-3 h-100">
            //     <div className="d-flex align-items-center mb-2">
            //       {stat.icon}
            //       <span className="fw-bold fs-5">{stat.title}</span>
            //     </div>
            //     <div className="fw-bold fs-4 mb-1">{stat.number}</div>
            //     {stat.subtitle && (
            //       <div className="small text-success">{stat.subtitle}</div>
            //     )}
            //   </div>
            // </div>
             <div className="col-12 col-sm-6 col-md-6 col-lg-3" key={idx}>
      <div
        className="shadow-sm rounded-4 border  h-100 d-flex flex-column justify-content-between"
        style={{

          
          minHeight: 120,
          boxShadow: "0 2px 8px 0 rgba(60,72,88,.08)",
          padding: "1.5rem",
        }}
      >
        <div className="d-flex justify-content-between align-items-start mb-2">
          <div>
            <div
              style={{
                
                fontWeight: 600,
                fontSize: 16,
                marginBottom: 2,
              }}
            >
              {stat.title}
            </div>
            <div
              style={{
                fontWeight: 700,
                fontSize: 28,
                
                marginBottom: 2,
              }}
            >
              {stat.number}
            </div>
            <div style={{ color: "#1b8a3a", fontSize: 14 }}>
              {stat.subtitle}
            </div>
          </div>
          <span className="border-0 p-2 rounded-full bg-[#e0edff]">{stat.icon}</span>
        </div>
      </div>
    </div>
          ))}
        </div>

        {/* Filters */}
        <div className="row g-2 mb-3">
          <div className="col-12 col-sm-6 col-md-3">
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Search Checklists..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
          <div className="col-12 col-sm-6 col-md-3">
            <select
              className="form-select form-select-sm"
              value={selectedProject}
              onChange={(e) => {
                setSelectedProject(e.target.value);
                setCurrentPage(1);
              }}
            >
              {projectOptions.map((project, index) => (
                <option key={index} value={project}>
                  {project}
                </option>
              ))}
            </select>
          </div>
          <div className="col-12 col-sm-6 col-md-3">
            <select
              className="form-select form-select-sm"
              value={selectedStatus}
              onChange={(e) => {
                setSelectedStatus(e.target.value);
                setCurrentPage(1);
              }}
            >
              {statusOptions.map((status, index) => (
                <option key={index} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>
        

        {/* Table */}
        <div className="table-responsive  p-2">
          <table
            className="table table-bordered  align-middle mb-0"
            style={{ border: "1px solid #dee2e6", borderRadius: "8px" }}
          >
            <thead className="table-light p-2">
              <tr>
                <th className="ps-4 fw-medium fs-6">Checklist Name</th>
                <th className="fw-medium fs-6">Project</th>
                <th className="fw-medium fs-6">Assigned To</th>
                <th className="fw-medium fs-6">Status</th>
                <th className="fw-medium fs-6">Last Updated</th>
                <th className="pe-4 fw-medium fs-6">Actions</th>
              </tr>
            </thead>
            <tbody className="p-2">
              {paginatedChecklist.length > 0 ? (
                paginatedChecklist.map((checklist) => (
                  <tr key={checklist.id} className="align-middle py-3">
                    <td className="ps-4 py-3 fw-semibold fs-9">
                      {checklist.checklistName}
                    </td>
                    <td className="text-muted fs-9 py-3">
                      {checklist.project?.name}
                    </td>
                    <td className="text-muted fs-9 py-3">
                      {checklist.AssignTo?.firstName}{" "}
                      {checklist.AssignTo?.lastName}
                    </td>
                    <td className="py-3">
                      <span
                        className={`badge ${getStatusBadgeClass(
                          checklist.status
                        )}`}
                      >
                        {checklist?.status}
                      </span>
                    </td>
                    <td className="text-muted fs-9 py-3">
                      {new Date(checklist?.date).toLocaleDateString()}
                    </td>
                    <td className="pe-4 py-3">
                      <div className="d-flex gap-2">
                        <Link
                          to={`/editchecklist/${checklist._id}`}
                          className="text-decoration-none"
                        >
                          <button className=" text-primary p-0">
                            <i className="fa-solid fa-pen-to-square"></i>
                          </button>
                        </Link>
                        <button
                          className=" text-primary p-0"
                          onClick={() => handleViewDetails(checklist._id)}
                        >
                          <i className="fa-solid fa-eye"></i>
                        </button>
                        {/* <button className="btn text-success p-0">
                            <i className="fa-solid fa-circle-check"></i>
                          </button> */}
                        <button
                          className=" text-dark p-0"
                          onClick={() => handleDelete(checklist._id)}
                        >
                          <i className="fas fa-trash text-danger"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">
                    No checklists available
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Modal for Displaying Checklist Details */}
          <Modal
            show={showModal}
            onHide={handleCloseModal}
            centered
            size="lg"
          >
            <Modal.Header closeButton>
              <Modal.Title>Checklist Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {checklistDetails ? (
                <div className="container">
                  {/* Checklist Info */}
                  <div className="row mb-3">
                    <div className="col-md-6 mb-3">
                      <strong className="text-muted">Checklist Name:</strong>
                      <div className="fs-6 fw-semibold">
                        {checklistDetails.checklistName}
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <strong className="text-muted">Assigned To:</strong>
                      <div className="fs-6">
                        {checklistDetails.AssignTo?.firstName}{" "}
                        {checklistDetails.AssignTo?.lastName}
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <strong className="text-muted">Project:</strong>
                      <div className="fs-6">
                        {checklistDetails.project?.name}
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <strong className="text-muted">Date:</strong>
                      <div className="fs-6">
                        {new Date(checklistDetails.date).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <strong className="text-muted">Status:</strong>
                      <div>
                        <span
                          className={`badge ${getStatusBadgeClass(
                            checklistDetails.status
                          )} px-3 py-1`}
                        >
                          {checklistDetails.status === "true"
                            ? "Completed"
                            : "Pending"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <hr />

                  {/* Checklist Items */}
                  <div className="mb-3">
                    <strong className="text-muted">Checklist Items:</strong>
                    <ul className="list-group mt-2">
                      {checklistDetails.checklistItems.map((item, index) => (
                        <li key={item._id} className="list-group-item">
                          <i className="fa-regular fa-square-check me-2 text-success"></i>
                          {item.checklistItem}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Notes */}
                  {checklistDetails.additionalNotes && (
                    <div className="mb-3">
                      <strong className="text-muted">
                        Additional Notes:
                      </strong>
                      <div className="bg-light border rounded p-2 mt-1">
                        {checklistDetails.additionalNotes}
                      </div>
                    </div>
                  )}

                  {/* Timestamps */}
                  <div className="text-muted small mt-3">
                    <strong>Created At:</strong>{" "}
                    {new Date(checklistDetails.createdAt).toLocaleString()}{" "}
                    <br />
                    <strong>Last Updated:</strong>{" "}
                    {new Date(checklistDetails.updatedAt).toLocaleString()}
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <Spinner animation="border" />
                </div>
              )}
            </Modal.Body>
          </Modal>

          <EditChecklistModal
            show={showEditModal}
            handleClose={() => setShowEditModal(false)}
            checklistDetails={checklistDetails}
            onUpdate={handleUpdateChecklist}
          />

          {/* Pagination */}
          <div className="d-flex justify-content-end mt-3 mb-2 gap-2">
            <Button
              size="sm"
              variant="outline-secondary"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Previous
            </Button>

            {[...Array(totalPages).keys()].map((num) => (
              <Button
                key={num + 1}
                size="sm"
                variant={
                  currentPage === num + 1 ? "primary" : "outline-secondary"
                }
                onClick={() => setCurrentPage(num + 1)}
              >
                {num + 1}
              </Button>
            ))}

            <Button
              size="sm"
              variant="outline-secondary"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </Button>
          </div>
        </div>




       
      </div>

    </>
  );
}

export default Checklists;
