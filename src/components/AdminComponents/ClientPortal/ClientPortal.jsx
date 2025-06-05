import React from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Card,
  ProgressBar,
} from "react-bootstrap";

function ClientPortal() {

  
  const color = [ "primary", "success", "warning", "danger", "info", "dark" ];
  const stats = [
    {
      title: "Active Sites",
      value: 12,
      subtitle: "4 in progress",
      icon: <i className="fa-solid fa-building" style={{ color: "#3490fa", fontSize: 22 }}></i>,
    },
    {
      title: "Compliance Status",
      value: "98%",
      subtitle: (
        <>
          <span>Safety <span className="fw-bold" style={{ color: "#16a34a" }}>98%</span></span><br />
          <span>Quality <span className="fw-bold" style={{ color: "#16a34a" }}>95%</span></span>
        </>
      ),
      icon: <i className="fa-solid fa-shield-halved" style={{ color: "#16a34a", fontSize: 22 }}></i>,
    },
    {
      title: "Pending Approvals",
      value: 8,
      subtitle: (
        <>
          <span>RFIs <span className="fw-bold" style={{ color: "#f59e42" }}>5</span></span><br />
          <span>Safety Reports <span className="fw-bold" style={{ color: "#f59e42" }}>3</span></span>
        </>
      ),
      icon: <i className="fa-solid fa-hourglass-half" style={{ color: "#f59e42", fontSize: 22 }}></i>,
    },
  ];

  return (
    <div
      className="p-2 p-md-4 bg-white m-1 m-md-3"
      style={{ borderRadius: "10px", fontFamily: "Poppins, sans-serif" }}
    >
      {/* Header */}
      <Row className="mb-4 px-2 px-md-4">
        <Col className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center justify-content-between gap-2">
          <h2 className="fw-bold mb-2 mb-sm-0">Client Portal</h2>
          <Form.Select className="w-100 w-sm-auto">
            <option>Project Alpha</option>
          </Form.Select>
        </Col>
      </Row>

      {/* Stats Cards */}
      <div className="row g-3 px-2 px-md-4 mb-4">
  {stats.map((stat, idx) => (
    <div key={idx} className="col-12 col-sm-6 col-lg-4">
      <div
        className="bg-white rounded-4 shadow-sm p-4 h-100 border"
        style={{
          minHeight: 150,
          boxShadow: "0 4px 16px 0 #e5e7eb",
          background: "#fff",
          border: "none"
        }}
      >
        <div className="d-flex justify-content-between align-items-start">
          <div>
            <div
              className="fw-bold mb-2"
              style={{
                
                fontSize: "1.05rem"
              }}
            >
              {stat.title}
            </div>
            <div
              className="fw-bold"
              style={{
                fontSize: "2rem",
                
                lineHeight: 1.1
              }}
            >
              {stat.value}
            </div>
            <div
              className="mt-2"
              style={{
                color: "#16a34a",
                fontSize: "1rem"
              }}
            >
              {stat.subtitle}
            </div>
          </div>
          <span
            className="d-inline-flex align-items-center justify-content-center rounded-circle"
            style={{
              background: "#e0edff",
              width: 44,
              height: 44,
              marginLeft: 8
            }}
          >
            {stat.icon}
          </span>
        </div>
      </div>
    </div>
  ))}
</div>

      {/* Approvals + Documents */}
      <Row className="g-3 px-2 px-md-4 mb-4">
  {/* Pending Approvals */}
  <Col xs={12} md={6}>
    <Card className="p-4 border-0 shadow-sm h-100">
      <h4 className="fw-bold mb-4">Pending Approvals</h4>

      <div className="mb-4">
        <div className="d-flex flex-column">
          <div className="fw-semibold">Design Change Request</div>
          <div className="text-muted small mb-2">Submitted 2 days ago</div>
          <Button variant="primary" size="sm" className="px-4 align-self-start">
            Review
          </Button>
        </div>
      </div>

      <div>
        <div className="d-flex flex-column">
          <div className="fw-semibold">Budget Amendment</div>
          <div className="text-muted small mb-2">Submitted 1 day ago</div>
          <Button variant="primary" size="sm" className="px-4 align-self-start">
            Review
          </Button>
        </div>
      </div>
    </Card>
  </Col>

  {/* Documents */}
  <Col xs={12} md={6}>
    <Card className="p-4 border-0 shadow-sm h-100">
      <h4 className="fw-bold mb-4">Documents</h4>

      <div className="mb-3 d-flex justify-content-between align-items-start">
        <div className="d-flex align-items-center gap-2">
          <i className="bi bi-file-earmark-pdf text-danger fs-5"></i>
          <span className="fw-normal">Construction Plans.pdf</span>
        </div>
        <i className="bi bi-download text-primary fs-5" role="button"></i>
      </div>

      <div className="d-flex justify-content-between align-items-start">
        <div className="d-flex align-items-center gap-2">
          <i className="bi bi-file-earmark-excel text-success fs-5"></i>
          <span className="fw-normal">Project Timeline.xlsx</span>
        </div>
        <i className="bi bi-download text-primary fs-5" role="button"></i>
      </div>
    </Card>
  </Col>
</Row>


      {/* Tasks & Approvals */}
    <Row className="g-3 px-2 px-md-4 mb-4">
  {/* Assigned Tasks */}
  <Col xs={12} md={6}>
    <Card className="p-4 border-0 shadow-sm h-100">
      <h4 className="fw-bold mb-2">Tasks & Approvals</h4>
      <h6 className="fw-bold mb-4">Assigned Tasks</h6>

      {[
        { title: "Site Inspection Review", due: "Dec 15, 2023", status: "In Progress", badge: "warning text-dark" },
        { title: "Quality Check Sign-off", due: "Dec 18, 2023", status: "Pending", badge: "secondary" },
        { title: "Safety Report Review", due: "Dec 20, 2023", status: "Completed", badge: "success" },
      ].map((task, index) => (
        <div
          key={index}
          className="p-3 rounded mb-3"
          style={{ backgroundColor: "#f9f9f9" }}
        >
          <div className="fw-semibold">{task.title}</div>
          <div className="text-muted small mb-2">Due: {task.due}</div>
          <span className={`badge bg-${task.badge}`}>{task.status}</span>
        </div>
      ))}
    </Card>
  </Col>

  {/* Approval Requests */}
  <Col xs={12} md={6}>
    <Card className="p-4 border-0 shadow-sm h-100">
      <h4 className="fw-bold mb-4">Approval Requests</h4>

      {[
        { title: "SWMS Approval #123", submitted: "Dec 12" },
        { title: "Defect Resolution #456", submitted: "Dec 13" },
      ].map((request, index) => (
        <div key={index} className="border rounded p-3 mb-4">
          <div className="mb-2">
            <div className="fw-semibold">{request.title}</div>
            <div className="small text-muted">Submitted: {request.submitted}</div>
          </div>

          <Form.Control
            as="textarea"
            rows={2}
            placeholder="Add your comments here..."
            className="mb-3"
          />

          <div className="d-flex gap-2 flex-wrap justify-content-end">
            <Button variant="danger" size="sm">Reject</Button>
            <Button variant="success" size="sm">Approve</Button>
          </div>
        </div>
      ))}
    </Card>
  </Col>
</Row>



      {/* Reports & Docs */}
     <Row className="g-3 px-2 px-md-4">
  <Col>
    <Card className="p-3 p-md-4 border-0 shadow-sm">
      <h4 className="fw-bold mb-4">Reports & Documents</h4>

      <Row className="g-3 mb-4">
        {/* Downloadable Reports */}
        <Col xs={12} sm={6} md={4}>
          <div className="border rounded p-3 h-100">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h6 className="fw-semibold mb-0">Downloadable Reports</h6>
              <i className="bi bi-file-earmark-text text-primary"></i>
            </div>

            <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
              <span className="small">Monthly Progress Report</span>
              <div className="d-flex gap-1 mt-2 mt-sm-0">
                <Button variant="outline-primary" size="sm">PDF</Button>
                <Button variant="outline-success" size="sm">Excel</Button>
              </div>
            </div>

            <div className="d-flex justify-content-between align-items-center flex-wrap">
              <span className="small">Safety Compliance Report</span>
              <div className="d-flex gap-1 mt-2 mt-sm-0">
                <Button variant="outline-primary" size="sm">PDF</Button>
                <Button variant="outline-success" size="sm">CSV</Button>
              </div>
            </div>
          </div>
        </Col>

        {/* Document Viewer */}
        <Col xs={12} sm={6} md={4}>
          <div className="border rounded p-3 h-100">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h6 className="fw-semibold mb-0">Document Viewer</h6>
              <i className="bi bi-file-earmark-text text-primary"></i>
            </div>

            <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
              <span className="small">Project Blueprints v2.1</span>
              <Button variant="outline-secondary" size="sm" className="mt-2 mt-sm-0">View</Button>
            </div>

            <div className="d-flex justify-content-between align-items-center flex-wrap">
              <span className="small">Site Safety Checklist</span>
              <Button variant="outline-secondary" size="sm" className="mt-2 mt-sm-0">View</Button>
            </div>
          </div>
        </Col>

        {/* Version Control */}
        <Col xs={12} sm={6} md={4}>
          <div className="border rounded p-3 h-100">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h6 className="fw-semibold mb-0">Version Control</h6>
              <i className="bi bi-arrow-clockwise text-primary"></i>
            </div>

            <div className="d-flex justify-content-between small">
              <span>Blueprint Rev. 2.1</span>
              <span className="text-muted">Dec 10, 2023</span>
            </div>

            <div className="d-flex justify-content-between small mt-2">
              <span>Blueprint Rev. 2.0</span>
              <span className="text-muted">Dec 1, 2023</span>
            </div>
          </div>
        </Col>
      </Row>

      <div className="d-flex flex-column flex-sm-row flex-wrap justify-content-center gap-2">
        <Button variant="primary" className="w-100 w-sm-auto">Download All</Button>
        <Button variant="light" className="border w-100 w-sm-auto">Manage Documents</Button>
      </div>
    </Card>
  </Col>
</Row>

    </div>
  );
}

export default ClientPortal;
