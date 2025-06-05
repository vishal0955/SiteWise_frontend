import React from "react";
import { Row, Col, Card, Button, Table } from "react-bootstrap";
import { FaDownload } from "react-icons/fa";
import { BsPlusCircle, BsUpload, BsPersonPlus } from "react-icons/bs"; 
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Link } from "react-router-dom";
import { FaBuilding, FaTasks, FaShoppingCart } from "react-icons/fa";
import { MdOutlineAssignmentLate } from "react-icons/md";

const ComplianceDashboard = () => {
  const workers = [
    {
      name: "John Smith",
      id: "WD 2015-1234",
      hours: "120 hours",
      supervisor: "Mike Johnson",
      status: "Complete",
    },
    {
      name: "Sarah Smith",
      id: "WD 2021-2324",
      hours: "65 hours",
      supervisor: "Mike Chen",
      status: "Not Complete",
    },
    {
      name: "David Brown",
      id: "WD 2012-6543",
      hours: "80 hours",
      supervisor: "Luke Chen",
      status: "Complete",
    },
    {
      name: "Emily Davis",
      id: "WD 2012-8467",
      hours: "160 hours",
      supervisor: "Lisa Chen",
      status: "Complete",
    },
    {
      name: "Michael Wilson",
      id: "WD 2015-9876",
      hours: "43 hours",
      supervisor: "Robert Taylor",
      status: "Not Complete",
    },
  ];

  const stats = [
    {
      icon: <FaBuilding size={28} className="text-primary mr-2" />,
      number: 12,
      title: "Active Projects",
      subtitle: "4 this week",
      color: "primary",
    },
    {
      icon: <FaTasks size={28} className="text-primary mr-2" />,
      number: 28,
      title: "Open Tasks",
      subtitle: "8 high priority",
      color: "primary",
    },
    {
      icon: <FaShoppingCart size={28} className="text-primary mr-2" />,
      number: 3,
      title: "Safety Incidents",
      subtitle: "1 needs immediate action",
      color: "primary",
    },
    {
      icon: <MdOutlineAssignmentLate size={28} className="text-primary mr-2" />,
      number: 3,
      title: "Overdue Milestones",
      subtitle: "2 overdue",
      color: "primary",
    },
  ];

  const activityData = [
    { date: "Apr 12", count: 3 },
    { date: "Apr 13", count: 5 },
    { date: "Apr 14", count: 6 },
    { date: "Apr 15", count: 8 },
    { date: "Apr 16", count: 7 },
    { date: "Apr 17", count: 6 },
    { date: "Apr 18", count: 4 },
  ];

  const certificationData = { current: 60, expiringSoon: 25, missing: 15 };

  return (
    <div className="container mt-4">
      {/* Top Stats Section */}
      <div className="flex items-center justify-between mb-4">
        <h3>Quality Compliance</h3>
        <Link to={"/AddNewWorker"}>
          <Button className="btn-set-color">+ Add Worker</Button>
        </Link>
      </div>

      <Row>
        <Col>
          <Card>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
              
                  <h4  >Workforce Compliance</h4>
              
              </div>

              <div className="table-responsive shadow-sm bg-white rounded">
                <Table
                  className="mb-0 table-bordered table-striped align-middle"
                  style={{ border: "1px solid #dee2e6", borderRadius: "8px" }}
                >
                  <thead className="table-light p-2">
                    <tr>
                      <th className="ps-4">Worker Name</th>
                      <th>With Card Number</th>
                      <th>Safe Access Hours</th>
                      <th>Supervisor</th>
                      <th>Status</th>
                      <th className="pe-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="p-2">
                    {workers.map((worker, index) => (
                      
                      <tr key={index} >
                        <td className="ps-4">{worker.name}</td>
                        <td>{worker.id}</td>
                        <td>{worker.hours}</td>
                        <td>{worker.supervisor}</td>
                        <td>
                          <span
                            className={`badge ${
                              worker.status === "Complete"
                                ? "bg-success"
                                : "bg-warning"
                            }`}
                          >
                            {worker.status}
                          </span>
                        </td>
                        <td className="pe-4">
                          <div className="d-flex gap-2">
                            <button className=" text-primary p-0">
                              <i className="fa-solid fa-pen-to-square"></i>
                            </button>
                            <button className=" text-danger p-0">
                              <i className="fa-solid fa-trash"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <div className="row g-3 mb-4 mt-2">
        {stats.map((stat, index) => (
          
          <div className="col-12 col-sm-6 col-md-6 col-lg-3" key={index}>
            <div className="stats-card p-4 shadow-sm rounded-3 h-100 d-flex flex-column justify-content-between">
            
              <div className="d-flex align-items-center mb-2">
  <span className="fw-bold fs-5 mr-2">{stat.title}</span>
                <span className="border-0 p-2 rounded-full bg-[#e0edff]" >{stat.icon}</span>
              </div>
              <div className="fw-bold fs-4 mb-1">{stat.number}</div>
              <div className="text-success small">{stat.subtitle}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Certification Distribution Chart */}
      <div className="stats-card p-3 mb-4 shadow rounded-3 bg-white mt-3">
        <h6 className="mb-3">Quick Actions</h6>
        <div className="d-flex flex-column gap-3">
          <Link to="/AddITPs">
            <button className="btn btn-primary d-flex align-items-center gap-2 shadow-sm p-3 w-100 rounded-3">
              <BsPlusCircle className="text-white" />
              <span>Add New ITPs</span>
            </button>
          </Link>
          <Link to="/AddChecklists">
            <button className="btn w-100 btn-warning text-white d-flex align-items-center gap-2 shadow-sm p-3 rounded-3">
              <BsUpload className="text-white" />
              <span>Upload Incident Checklists</span>
            </button>
          </Link>
        </div>
      </div>

      {/* Document Activity Graph */}
      <Row className="mb-4">
        <Col md={6} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title className="mb-4">
                <h4>Document Activity</h4>
              </Card.Title>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={activityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title className="mb-4">
                <h4>Certification Distribution</h4>
              </Card.Title>
              <div className="d-flex justify-content-center">
                <div style={{ width: "300px", height: "300px" }}>
                  <CircularProgressbar
                    value={certificationData.current}
                    text={`${certificationData.current}%`}
                    styles={buildStyles({
                      pathColor: "#4CAF50",
                      textColor: "#4CAF50",
                      trailColor: "#e0e0e0",
                    })}
                  />
                  <div className="mt-3 text-center">
                    <span>Current</span>
                  </div>
                </div>
                <div
                  style={{
                    width: "300px",
                    height: "300px",
                    marginLeft: "20px",
                  }}
                >
                  <CircularProgressbar
                    value={certificationData.expiringSoon}
                    text={`${certificationData.expiringSoon}%`}
                    styles={buildStyles({
                      pathColor: "#FFC107",
                      textColor: "#FFC107",
                      trailColor: "#e0e0e0",
                    })}
                  />
                  <div className="mt-3 text-center">
                    <span>Expiring Soon</span>
                  </div>
                </div>
                <div
                  style={{
                    width: "300px",
                    height: "300px",
                    marginLeft: "20px",
                  }}
                >
                  <CircularProgressbar
                    value={certificationData.missing}
                    text={`${certificationData.missing}%`}
                    styles={buildStyles({
                      pathColor: "#F44336",
                      textColor: "#F44336",
                      trailColor: "#e0e0e0",
                    })}
                  />
                  <div className="mt-3 text-center">
                    <span>Missing</span>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Workforce Compliance Table */}
    </div>
  );
};

export default ComplianceDashboard;
