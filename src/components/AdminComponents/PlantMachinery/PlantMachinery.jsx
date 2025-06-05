import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import RescheduleModal from "./RescheduleModal";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deletetool, getalltool } from "../../../redux/slices/toolSlice";
import {
  fetchEquipment,
  deleteEquipment,
} from "../../../redux/slices/equipmentSlice";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";

function PlantMachinery() {

  const stats = [
    {
      id: "T001",
     title : "Total Tools",
      value: 120,
      color: "primary",
      icon: <i className="fa-solid fa-tools"></i>,
    },
    {
      id: "T001",
     title : "Total Equipment",
      value: 120,
      color: "primary",
      icon: <i className="fa-solid fa-cogs"></i>,
    },
    {
      id: "T002",
      title: "Checked Out",
      value: 30,
      color: "success",
      icon: <i className="fa-solid fa-check"></i>,
    },
    {
      id: "T003",
      title: "In Maintenance",
      value: 15,
      color: "warning",
      icon: <i className="fa-solid fa-wrench"></i>,
    },

  ]



  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSite, setSelectedSite] = useState("Main Construction Site");
  const [status, setStatus] = useState("All Status");
  const [activeTab, setActiveTab] = useState("Tool Registry");
  const [showModal, setShowModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tools, loading, error } = useSelector((state) => state.tools);
  const { equipments } = useSelector((state) => state.equipments);

  console.log("equipment", equipments);

  useEffect(() => {
    if (activeTab === "Tool Registry") {
      dispatch(getalltool());
    } else if (activeTab === "Equipment") {
      dispatch(fetchEquipment());
    }
  }, [dispatch, activeTab]);

  const filteredTools = Array.isArray(tools)
    ? tools.filter((tool) =>
        tool.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const handleEquipmentDelete = (id) => {
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
        dispatch(deleteEquipment(id))
          .then((response) => {
            if (response.meta.requestStatus === "fulfilled") {
              toast.success("Tool deleted successfully!");
              dispatch(fetchEquipment());
            } else {
              toast.error("Failed to delete tool!");
            }
          })
          .catch(() => {
            toast.error("Something went wrong!");
          });
      }
    });
  };

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
        dispatch(deletetool(id))
          .then((response) => {
            if (response.meta.requestStatus === "fulfilled") {
              toast.success("Tool deleted successfully!");
              dispatch(getalltool());
            } else {
              toast.error("Failed to delete tool!");
            }
          })
          .catch(() => {
            toast.error("Something went wrong!");
          });
      }
    });
  };

  const handleViewService = (service) => {
    navigate("/view-service", { state: { service } });
  };

  // const handleViewDetails = (equipment) => {
  //   navigate("/equipment-details/:id", { state: { equipment } });
  // };

  const handleShowModal = (service) => {
    setSelectedService(service);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleReschedule = (serviceId, newServiceDate, comments) => {
    console.log(
      `Rescheduling service ${serviceId} to ${newServiceDate} with comments: ${comments}`
    );
   
  };

  const color = ["primary", "success", "warning", "danger", "info", "dark"];

  const equipmentData = [
    {
      id: "E001",
      name: "Excavator - CAT",
      status: "Active",
      operator: "Mike Johnson",
      location: "Site A",
      nextMaintenance: "2024-03-15",
    },
    {
      id: "E002",
      name: "Crane - Liebherr",
      status: "Maintenance",
      operator: "",
      location: "Workshop",
      nextMaintenance: "2024-02-25",
    },
  ];

  const services = [
    {
      id: "S001",
      name: "Equipment Maintenance",
      provider: "TechServ Inc.",
      schedule: "Weekly",
      lastService: "2024-02-15",
      nextService: "2024-02-22",
    },
    {
      id: "S002",
      name: "Safety Inspection",
      provider: "SafetyFirst Ltd.",
      schedule: "Monthly",
      lastService: "2024-02-01",
      nextService: "2024-03-01",
    },
  ];

  const renderEquipmentSection = () => (
    <div className="bg-white p-4 rounded shadow-sm">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-semibold mb-0">Equipment Management</h4>
        <Link to={"/AddEquipment"}>
          <Button className="btn-set-color">
            <i className="fa-solid fa-plus me-2"></i> Add Equipment
          </Button>
        </Link>
      </div>
      <div className="d-flex gap-2 mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search equipment..."
          style={{ maxWidth: "250px" }}
        />
        {/* <select className="form-select" style={{ width: "150px" }}>
          <option>All Status</option>
          <option>Active</option>
          <option>Maintenance</option>
          <option>Out of Service</option>
        </select> */}
      </div>
      <div className="table-responsive">
        <table
          className="table table-hover align-middle mb-0"
          style={{ border: "1px solid #dee2e6", borderRadius: "8px" }}
        >
          <thead className="bg-light">
            <tr>
              <th className="ps-4">Equipment ID</th>
              <th>Equipment Name</th>
              <th>Type</th>
              {/* <th>Status</th> */}
              <th>Location</th>
              {/* <th>Last Inspection</th> */}
              <th className="pe-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(equipments) && equipments.length > 0 ? (
              equipments.map((item) => (
                <tr key={item._id} className="py-3">
                  <td className="ps-4 py-3">{item.equipmentID}</td>
                  <td className="py-3">{item.name}</td>
                  <td className="py-3">Heavy Equipment</td>
                  {/* <td className="py-3">
                  <span
                    className={`badge ${
                      item.status === "Active"
                        ? "bg-success"
                        : "bg-warning text-dark"
                    }`}
                  >
                    {item.status}
                  </span>
                </td> */}
                  <td className="py-3">{item.location}</td>
                  {/* <td className="py-3">{item.nextMaintenance}</td> */}
                  <td className="pe-4 py-3">
                    <div className="d-flex gap-2">
                      <button
                        onClick={() =>
                          navigate(`/equipment-details/${item._id}`)
                        }
                        className="text-primary"
                      >
                       <i className="fa-solid fa-eye"></i>
                      </button>
                      <Link to={`/AddEquipment/${item._id}`}>
                        <button className=" text-primary p-0">
                          <i className="fa-solid fa-pen-to-square"></i>
                        </button>
                      </Link>
                      <button
                        className=" text-danger p-0"
                        onClick={() => handleEquipmentDelete(item._id)}
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                      {/* <button
                      onClick={() => handleShowModal(item)}
                      id="btn_itp"
                      className="btn btn-sm btn-dark"
                    >
                      Schedule
                    </button> */}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  No equipment found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {/* Pagination */}
        <div className="d-flex justify-content-end mt-3 mb-2">
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
      </div>
    </div>
  );

  const renderServicesSection = () => (
    <div className="bg-white p-4 rounded shadow-sm">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h6 className="fw-semibold mb-0">Service Schedule</h6>
        {/* <Link to={"/AddServices"}>
          {" "}
          <button id="btn_itp" className="btn btn-dark">
            + Schedule Service
          </button>
        </Link> */}
      </div>
      <div className="d-flex gap-2 mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search services..."
          style={{ maxWidth: "250px" }}
        />
        <select className="form-select" style={{ width: "150px" }}>
          <option>All Services</option>
          <option>Maintenance</option>
          <option>Inspection</option>
          <option>Repair</option>
        </select>
      </div>
      <div className="table-responsive">
        <table className="table table-hover align-middle mb-0">
          <thead className="bg-light">
            <tr>
              <th className="ps-4">ID</th>
              <th>Service Name</th>
              <th>Provider</th>
              <th>Schedule</th>
              <th>Last Service</th>
              <th>Next Service</th>
              <th className="pe-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service.id} className="py-3">
                <td className="ps-4 py-3">{service.id}</td>
                <td className="py-3">{service.name}</td>
                <td className="py-3">{service.provider}</td>
                <td className="py-3">{service.schedule}</td>
                <td className="py-3">{service.lastService}</td>
                <td className="py-3">{service.nextService}</td>
                <td className="pe-4 py-3">
                  <div className="d-flex gap-2">
                    <button
                      onClick={() => handleViewService(service)}
                      className="text-primary "
                    >
                     <i className="fa-solid fa-eye"></i>
                    </button>
                    <button
                      onClick={() => handleShowModal(service)}
                      className="text-primary p-0"
                    >
                      <i className="fa-solid fa-calendar"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="d-flex justify-content-end mt-3">
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

        {/* Reschedule Modal */}
        {selectedService && (
          <RescheduleModal
            show={showModal}
            handleClose={handleCloseModal}
            serviceData={selectedService}
            handleReschedule={handleReschedule}
          />
        )}
      </div>
    </div>
  );
  const renderContent = () => {
    switch (activeTab) {
      case "Equipment":
        return renderEquipmentSection();
      case "Services":
        return renderServicesSection();
      default:
        return (
          <div className="bg-white p-4 rounded shadow-sm">
            {/* Header Section: Title + Site Dropdown */}
            <div className="row align-items-center mb-4 g-3">
              <div className="col-12 col-md-6">
                <h4 className="mb-0 text-center text-md-start">
                  Tool Registry
                </h4>
              </div>
              <div className="col-12 col-md-6 d-flex justify-content-center justify-content-md-end">
                <select
                  className="form-select"
                  value={selectedSite}
                  onChange={(e) => setSelectedSite(e.target.value)}
                  style={{ maxWidth: "200px", width: "100%" }}
                >
                  <option>Main Construction Site</option>
                  <option>Secondary Site</option>
                </select>
              </div>
            </div>

            {/* Filter/Search/Add Button */}
            <div className="row g-3 align-items-center mb-4">
              <div className="col-12 col-md-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search tools..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="col-12 col-md-3">
                <select
                  className="form-select"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option>All Status</option>
                  <option>Available</option>
                  <option>In Use</option>
                  <option>Maintenance</option>
                </select>
              </div>

              <div className="col-12 col-md-5 d-flex justify-content-center justify-content-md-end">
                <Link to="/AddToolRegistry">
                  <Button
                    className="btn-set-color"
                  >
                    <i className="fa-solid fa-plus me-2"></i>Add New Tool
                  </Button>
                </Link>
              </div>
            </div>

            {/* Tools Table */}
            <div className="table-responsive shadow-sm bg-white rounded">
              <table
                className="table table-hover table-bordered table-striped align-middle mb-0"
                style={{ border: "1px solid #dee2e6", borderRadius: "8px" }}
              >
                <thead className=" p-2">
                  <tr>
                    <th className="ps-4">Tool ID</th>
                    <th>Tool Name</th>
                    <th> category</th>
                    <th>Manufacturer</th>
                    <th>Condition</th>
                    <th>location</th>
                    <th className="pe-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="p-2">
                  {filteredTools.map((tool) => (
                    <tr key={tool._id} className="py-3">
                      <td className="ps-4 py-3">
                        {tool.toolID || tool.equipmentID}
                      </td>
                      <td className="py-3">{tool.name}</td>
                      <td className="py-3">
                        <span
                          className={`badge rounded-pill ${
                            tool.status === "Available"
                              ? "bg-success"
                              : "bg-warning text-dark"
                          }`}
                        >
                          {tool.category?.category}
                        </span>
                      </td>
                      <td className="py-3">{tool.manufacturer || "-"}</td>
                      <td className="py-3">{tool.condition || "-"}</td>
                      <td className="py-3">{tool.location || "-"}</td>
                      <td className="pe-4 py-3">
                        <div className="d-flex gap-2">
                          {tool.status === "Available" ? (
                            <button
                              id="btn_itp"
                              className="btn btn-sm btn-dark"
                            >
                              Check Out
                            </button>
                          ) : (
                            <>
                              {/* <i className="fa fa-eye" ></i> */}

                              <i
                                className="fa fa-edit text-primary"
                                onClick={() =>
                                  navigate(`/AddToolRegistry/${tool._id}`)
                                }
                              ></i>
                              <i
                                className="fas fa-trash  text-danger"
                                onClick={() => {
                                  handleDelete(tool._id);
                                }}
                              ></i>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Pagination */}
              <div className="d-flex justify-content-end mt-2 mb-3">
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
            </div>
          </div>
        );
    }
  };

  return (
    <div className="container-fluid px-4 py-4">
      <h3 className="mb-4">Plant & Machinery</h3>

      {/* Tab Navigation */}
      <div className="nav nav-tabs mb-4">
        <button
          className= {`tabclass ${activeTab === "Tool Registry" ? "active" : ""}`}
          // style={{
          //   backgroundColor: activeTab === "Tool Registry" ? "#fff" : "",
          //   color: activeTab === "Tool Registry" ? "#181818" : "",
          //   borderRadius: "4px 4px 0 0",
          // }}
          onClick={() => setActiveTab("Tool Registry")}
        >
          Tool Registry
        </button>
        <button
            className= {`tabclass ${activeTab === "Equipment"? "active" : ""}`}
          // style={{
          //   backgroundColor: activeTab === "Equipment" ? "#fff" : "",
          //   color: activeTab === "Equipment" ? "#181818" : "",
          //   borderRadius: "4px 4px 0 0",
          // }}
          onClick={() => setActiveTab("Equipment")}
        >
          Equipment
        </button>
        <button
           className= {`tabclass ${activeTab === "Services" ? "active" : ""}`}
          // style={{
          //   backgroundColor: activeTab === "Services" ? "#fff" : "",
          //   color: activeTab === "Services" ? "#181818" : "",
          //   borderRadius: "4px 4px 0 0",
          // }}
          onClick={() => setActiveTab("Services")}
        >
          Services
        </button>
      </div>

      {/* Dynamic Content */}
      {renderContent()}

     


        <div className="row g-3 mb-4 mt-4">
        {stats.map((stat, idx) => (
//             <div className="col-lg-3 col-md-6 mb-4">
//   <div className="card h-100 shadow rounded-4">
//     <div className="card-body">
//       {/* Heading row with icon and title */}
//       <div className="d-flex justify-content-between align-items-center mb-3">
//         <div className="d-flex align-items-center ">
        
//           <h5 className="mb-0 fs-5 fw-semibold mr-2">{stat.title}</h5>

//             <div className=" fs-5 p-2 rounded-full bg-[#e0edff]">{stat.icon}</div>
//         </div>
//       </div>

//       {/* Number and subtitle */}
//       <div > 
//         <h2 className="fw-bold h4 mb-1">{stat.value}</h2>
//         {/* <small className="text-success">{stat.subtitle}</small> */}
//       </div>
//     </div>
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
              {stat?.title}
            </div>
            <div
              style={{
                fontWeight: 700,
                fontSize: 28,
                
                marginBottom: 2,
              }}
            >
              {stat?.value}
            </div>
            <div style={{ color: "#1b8a3a", fontSize: 14 }}>
              {stat?.subtitle}
            </div>
          </div>
          <span className="border-0 p-2 rounded-full bg-[#e0edff] text-primary">{stat?.icon}</span>
        </div>
      </div>
    </div>

        ))}
      </div>
    </div>
  );
}

export default PlantMachinery;
