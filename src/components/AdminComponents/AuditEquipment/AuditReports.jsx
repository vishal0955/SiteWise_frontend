

import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

import { fetchProjects } from "../../../redux/slices/projectSlice";
import { deleteAudit, fetchAudit } from "../../../redux/slices/auditSlice";
import { toast } from "react-toastify";

function AuditReports() {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

useEffect(() => {
    dispatch(fetchProjects());
    dispatch(fetchAudit());
  }, [dispatch]); 

  const { audit, loading, error } = useSelector((state) => state.audit);
  console.log("audit", audit.data)
  const projects = useSelector((state) => state.projects.data);

  const handleSearchChange = (e) => setSearch(e.target.value);

  // Make sure we handle the data structure correctly
  const auditData = audit?.data || [];
  console.log( auditData)
  console.log(auditData.length)
  
  const filteredReports = !loading && auditData.filter((report) =>
    report.auditedBy.toLowerCase().includes(search.toLowerCase())
  );
  

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteAudit(id))
          .then((response) => {
            console.log(response);
            if (response.success) {
             toast.success("Audit report deleted successfully!");
            }
          })
         .catch((error) => {
                       Swal.fire(
                         'Error!',
                         'Something went wrong.',
                         'error'
                       );
                     });
      }
      dispatch(fetchAudit());
    });
  };

  const getProjectName = (projectId) => {
    const project = projects.find((p) => p.id === projectId);
    return project ? project.name : "Unknown Project";
  };

  // Sample template data for audit reports
  const templates = [
    {
      id: 1,
      title: "Safety Compliance Audit",
      description: "Standard audit template for evaluating workplace safety compliance.",
    },
    {
      id: 2,
      title: "Environmental Audit",
      description: "Comprehensive checklist for environmental compliance and practices.",
    },
    {
      id: 3,
      title: "Quality Control Audit",
      description: "Framework for assessing quality control processes and standards.",
    },
    {
      id: 4,
      title: "Workplace Health Assessment",
      description: "Evaluation of health hazards and preventive measures in the workplace.",
    },
    {
      id: 5,
      title: "Site Inspection Audit",
      description: "Detailed inspection template for construction or work sites.",
    },
    {
      id: 6,
      title: "Equipment Safety Audit",
      description: "Checklist for machinery and equipment safety compliance.",
    },
  ];

  const handleUseTemplate = (title) => {
    navigate("/audit-template", { state: { title } });
  };

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch (error) {
      return 'Invalid Date';
    }
  };

  return (
    <Container
      fluid
      className="p-4"
      style={{ minHeight: "100vh" }}
    >
      {/* Header Section */}
      <div className="dashboard-header">
        <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Pre Start Checklist</h3>
         <Link to={"/audit-equipment"}>
            <Button
            className="btn-set-color"
            >
              + Create Audit Template
            </Button>
          </Link>
        </div>
        {/* <p>Manage and monitor your audit documentation</p> */}
      </div>
      
      {/* Search and Filter Section */}
    

      {/* Audit Reports Table */}
      <Card className="mb-5 border-0 shadow-sm">
        <Card.Header className="bg-white  border-0">
          <div className="row align-items-center g-3">
            <div className="col-12 col-md-6 ">
              <h4 className=" ">Audit Reports Overview</h4>
            </div>
  <Row className="align-items-center gx-3">
        <Col sm={12} md={3}>
          <Form.Control
            type="search"
            value={search}
            onChange={handleSearchChange}
            placeholder="Search Audit Reports..."
            style={{ borderRadius: "4px", border: "1px solid #dee2e6" }}
          />
        </Col>

        <Col sm={12} md={2}>
          <Form.Select
            style={{ borderRadius: "4px", border: "1px solid #dee2e6" }}
          >
            <option>All Status</option>
            <option>Draft</option>
            <option>Completed</option>
            <option>Pending</option>
          </Form.Select>
        </Col>

        <Col sm={12} md={2}>
          <Form.Select
            style={{ borderRadius: "4px", border: "1px solid #dee2e6" }}
          >
            <option>All</option>
            <option>Excavator</option>
            <option>Drill</option>
            <option>Forklane</option>
           
            <option>Crane</option>
          </Form.Select>
        </Col>
        
        <Col sm={12} md="auto" className="ms-md-auto">
         
        </Col>
      </Row>
     
          </div>
        </Card.Header>

        <Card.Body className="p-2">
          <div className="table-responsive">
            <table className="table table-hover  align-middle mb-0 " 
            style={{ border: '1px solid #dee2e6', borderRadius: '10px' }}>
              <thead className="bg-light">
                <tr>
                  <th className="ps-4">Audit Location/SiteName</th>
                  <th>Audited By</th>
                  <th>Date Created</th>
                  <th className="pe-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="5" className="text-center py-3">Loading...</td>
                  </tr>
                ) :  auditData.length > 0 ? (
                  auditData.map((item, index) => (
                    <tr key={index}>
                      <td className="ps-4">
                        <div className="d-flex align-items-center gap-3">
                          <div>
                            <div className="fw-medium">{item?.location || "Unknown Location"}</div>
                          </div>
                        </div>
                      </td>
                      <td>{item?.auditedBy || "Unknown"}</td>
                      <td>{formatDate(item?.auditDate)}</td>
                      <td className="pe-4">
                        <div className="d-flex gap-3">
                          <Link to={`/audit-equipmentview/${item?._id}`}>
                            <button variant="link" className="text-primary p-0">
                              <i className="fa-solid fa-eye"></i>
                            </button>
                          </Link>
                          <button 
                            variant="link" 
                            className="text-primary p-0" 
                            onClick={() => navigate(`/edit-audit-equipment/${item?._id}`)}
                          >
                            <i className="fa-solid fa-pencil"></i>
                          </button>
                          {/* <Button variant="link" className="text-primary p-0">
                            <i className="fa-solid fa-download"></i>
                          </Button> */}
                          <button 
                            className="text-danger p-0" 
                            onClick={() => handleDelete(item?._id)}
                          >
                            <i className="fa-solid fa-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-3">No audit reports found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="d-flex justify-content-end my-3">
            <Button size="sm" variant="outline-secondary" className="me-2">
              Previous
            </Button>
            <Button size="sm" variant="primary" className="ms-2">
              1
            </Button>
            <Button size="sm" variant="outline-secondary" className="ms-2">
              2
            </Button>
            <Button size="sm" variant="outline-secondary" className="ms-2">
              Next
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default AuditReports;