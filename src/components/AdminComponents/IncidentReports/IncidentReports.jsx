import React, { useEffect, useState } from "react";
import { Table, Button, Form, InputGroup, Badge, Card } from "react-bootstrap";
import {
  FaSearch,
  FaFilter,
  FaPaperclip,
  FaUserPlus,
  FaFileExport,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import {
  deleteIncidentReport,
  getIncidentReports,
} from "../../../redux/slices/incidentReportSlice";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import SafetyAnalyticsPanel from "./SafetyAnalyticsPanel";

function IncidentReports() {
  const { reports } = useSelector((state) => state.reports);
  console.log(reports)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    dispatch(getIncidentReports());
  }, [dispatch]);

  const getSeverityBadge = (severity) => {
    switch (severity) {
      case "low":
        return <span className="badge bg-success">Low</span>;
      case "medium":
        return <span className="badge bg-warning text-dark">Medium</span>;
      case "high":
        return <span className="badge bg-danger">High</span>;
      case "critical":
        return <span className="badge bg-dark">Critical</span>;
      default:
        return <span className="badge bg-secondary">Unknown</span>;
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won’t be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteIncidentReport(id))
          .unwrap()
          .then(() => {
            Swal.fire("Deleted!", "Incident has been deleted.", "success");
          })
          .catch((err) => {
            Swal.fire("Error!", err, "error");
          });
      }
    });
  };

  // auto  task creation for high and critical severity incidents

  // const alertReports = reports.filter(
  //   (report) => {
  //     const severity = report.severityLevel?.toLowerCase().trim() || "";
  // if(
  //      severity === "high" || severity === "critical")
  //     return report;


  //   })

  const filteredReports = reports.filter((report) => {
    const incidentType = report?.incidentType?.toLowerCase().trim() || "";
    const location = report?.location?.toLowerCase().trim() || "";
    const search = searchQuery.toLowerCase().trim();
    const selected = selectedType.toLowerCase().trim();

    const matchesSearch =
      incidentType.includes(search) || location.includes(search);
    const matchesType = selected === "all" || incidentType === selected;

    return matchesSearch && matchesType;
  });

  const incidentTypes = [
    ...new Set(reports.map((r) => r.incidentType?.trim())),
  ].filter(Boolean);

  const totalPages = Math.ceil(filteredReports.length / itemsPerPage);

  const paginatedReports = filteredReports.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center ">
      <h2 className="mb-4 fw-semibold">Incident Reports</h2>
       <Link to="/AddIncidentReports">
            <Button className="btn-set-color">
              + New Incident Report
            </Button>
          </Link>
      </div>

      {/* Search + Filters + New Button */}
     

      {/* Top Action Buttons */}
      {/* <div className="d-flex flex-wrap gap-2 mb-4 px-2">
        <Button
          variant="outline-secondary"
          size="sm"
          className="border-0 shadow-sm px-3 py-2 rounded"
        >
          <FaPaperclip className="me-1" /> Attach Evidence
        </Button>
        <Button
          variant="outline-secondary"
          size="sm"
          className="border-0 shadow-sm px-3 py-2 rounded"
        >
          <FaUserPlus className="me-1" /> Assign Investigation
        </Button>
        <Button
          variant="outline-secondary"
          size="sm"
          className="border-0 shadow-sm px-3 py-2 rounded"
        >
          <FaFileExport className="me-1" /> Export Report
        </Button>
      </div> */}

      {/* Incident Table */}

         <SafetyAnalyticsPanel className="mb-2"/>

 <Card className="mb-5 border-0 shadow-sm card">
   <Card.Header className="bg-white border-0">
    <div className="d-flex justify-content-between align-items-center gap-3 px-2">
      <div className="d-flex flex-wrap gap-3 align-items-center">
        <InputGroup
          style={{ width: "300px" }}
          className="shadow-sm rounded-2"
        >
          <InputGroup.Text className="bg-white border-0 shadow-sm rounded-start">
            <FaSearch />
          </InputGroup.Text>
          <Form.Control
            placeholder="Search incidents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border-0 shadow-sm rounded-end"
          />
        </InputGroup>

        <Form.Select
          value={selectedType}
          onChange={(e) => {
            setSelectedType(e.target.value);
            setCurrentPage(1);
          }}
          style={{ width: "150px" }}
          className="shadow-sm rounded"
        >
          <option value="All">All Types</option>
          {incidentTypes.map((type, idx) => (
            <option key={idx} value={type?.trim()}>
              {type}
            </option>
          ))}
        </Form.Select>
      </div>

      <Button className="btn-set-color ms-auto">
        Generate Insights Report
      </Button>
    </div>
  </Card.Header>



          
      <div className="bg-white rounded-3 shadow-sm mb-3 p-2">
       
        <div
          className="table-responsive"
          style={{ border: "1px solid #dee2e6", borderRadius: "8px" }}
        >
          <Table hover className="shadow-sm bg-white mb-0 rounded mt-2">
            <thead className="table-light p-2">
              <tr>
                <th>#</th>
                <th>Type</th>
                <th>Location</th>
                <th>Status</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="p-2">
              {paginatedReports.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center">
                    No Reports Found
                  </td>
                </tr>
              ) : (
                paginatedReports?.map((incident, index) => (
                
                  <tr key={incident._id}  onClick={() => navigate(`/IncidentReportDetail/${incident._id}`)}>
                    <td>{index + 1}</td>
                    <td>{incident?.incidentType}</td>
                    <td>{incident?.location}</td>
                    <td>{getSeverityBadge(incident.severityLevel)}</td>
                    <td>{new Date(incident.dateTime).toLocaleString()}</td>
                    <td>
                      {/* {((incident?.incidentType === "property" &&
                        incident.severityLevel === "high") ||
                        incident.severityLevel === "critical") && (
                        <Button
                          variant="primary"
                          className="text-white p-0"
                          onClick={() => navigate("/itps")}
                        >
                          Add ITP
                        </Button>
                      )}

                      {(incident.severityLevel === "high" ||
                        incident.severityLevel === "critical") && (
                        <Button
                          variant="primary"
                          className="text-white p-0"
                          onClick={() => navigate("/create-task")}
                        >
                          Add Task
                        </Button>
                      )} */}

                      
                  
                        <button  className="text-primary p-0 me-2" onClick={() => navigate(`/IncidentReportDetail/${incident._id}`)}>
                          <i className="fa-solid fa-eye ps-2"></i>
                        </button>
                   

                      {/* <button
                        
                        className="text-primary p-0 ms-2"
                      
                      >
                        {" "}
                        Report
                      </button> */}
                      <button
                        
                        className="text-primary p-0"
                        onClick={() => handleDelete(incident._id)}
                      >
                        <i className="fas fa-trash  text-danger"></i>
                      </button>
                    </td>
                  </tr>
               
                ))
              )}
            </tbody>
          </Table>
        </div>
        <div className="d-flex justify-content-end mb-2 mt-3">
          <Button
            size="sm"
            variant="outline-secondary"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>

          {[...Array(totalPages)].map((_, idx) => (
            <Button
              key={idx}
              size="sm"
              variant={
                currentPage === idx + 1 ? "primary" : "outline-secondary"
              }
              onClick={() => setCurrentPage(idx + 1)}
              className="mx-1"
            >
              {idx + 1}
            </Button>
          ))}

          <Button
            size="sm"
            variant="outline-secondary"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
      </Card>

      {/* Safety Analytics Panel */}

   
      {/* Overview & Checklist */}
    </div>
  );
}

export default IncidentReports;
