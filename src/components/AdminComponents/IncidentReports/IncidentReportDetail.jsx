import React from 'react'
import { Badge, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

const IncidentReportDetail = () => {
  const navigate = useNavigate();

    const safetyProtocols = [
        { id: 1, text: "Initial containment measures implemented", completed: true },
        { id: 2, text: "Safety team notified", completed: true },
        { id: 3, text: "Model behavior analysis completed", completed: false },
        { id: 4, text: "Mitigation strategy implemented", completed: false },
      ];
      const timelineEvents = [
        {
          id: 1,
          title: "Incident Detected",
          time: "14:30 UTC",
          description: "Automated monitoring system flagged anomalous behavior",
        },
        {
          id: 2,
          title: "Safety Protocols Initiated",
          time: "14:35 UTC",
          description: "Emergency response team activated",
        },
        {
          id: 3,
          title: "Analysis In Progress",
          time: "14:40 UTC",
          description: "Technical team investigating root cause",
        },
      ];

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
  return (
    <div>
        <div className="row g-4 mb-4">
          <div className=" row g-4 mb-4">
            <div className="col-md-6">
              <div className="">
                <h4 className="mb-4 fw-semibold">Incident Report Detail</h4>
              </div>  
                  </div>

                   <div className="col-md-6 d-flex justify-content-end">
                      <button
              onClick={() => navigate(-1)}
              className="btn-set-color"
              
            >
              <i class="fa-solid fa-arrow-left me-2"></i> Back to Overview
            </button>
                   </div>


          </div>
                  
        <div className="col-md-6">
          <div className=" p-4 rounded shadow-sm h-100">
            <div className="d-flex justify-content-between mb-3">
            <h5 className="mb-4 fw-semibold">Incident Overview</h5>
  
            </div>
            <div className="mb-3">
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Severity Level:</span>
                <Badge bg="danger" className="rounded-pill">
                  Critical
                </Badge>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Status:</span>
                <Badge bg="warning" text="dark" className="rounded-pill">
                  In Progress
                </Badge>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Type:</span>
                <Badge bg="primary" text="white" className="rounded-pill">
                 Damage
                </Badge>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Location:</span>
                <Badge bg="warning" text="dark" className="rounded-pill">
                    site A
                </Badge>
              </div>
              <div className="">
                <span className="text-muted">Description:</span>
                <p className="mt-1">
                 inprogress protion of the site is damaged due to heavy rain and wind.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className=" p-4 rounded shadow-sm h-100">
            <h5 className="mb-4 fw-semibold">Safety Protocol Checklist</h5>
            <Form>
              {safetyProtocols.map((protocol) => (
                <Form.Check
                  key={protocol.id}
                  type="checkbox"
                  id={`protocol-${protocol.id}`}
                  label={protocol.text}
                  checked={protocol.completed}
                  className="mb-2"
                  disabled
                />
              ))}
            </Form>
          </div>
        </div>
      </div>

      {/* Timeline & Required Actions */}
      <div className="row g-4 mb-4">
        <div className="col-md-6">
          <div className="bg-white p-4 rounded shadow-sm h-100">
            <h5 className="mb-4 fw-semibold">Response Timeline</h5>
            <div className="timeline">
              {timelineEvents.map((event) => (
                <div key={event.id} className="timeline-item mb-3">
                  <div className="d-flex">
                    <div className="timeline-marker me-3">
                      <div className="marker"></div>
                    </div>
                    <div className="timeline-content">
                      <h6 className="mb-1">{event.title}</h6>
                      <small className="text-muted">{event.time}</small>
                      <p className="mb-0 mt-1">{event.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="bg-white p-4 rounded shadow-sm h-100">
            <h5 className="mb-4 fw-semibold">Required Actions</h5>
            {[
              {
                title: "Complete system diagnostic",
                priority: "danger",
                label: "High Priority",
              },
              {
                title: "Update safety parameters",
                priority: "warning",
                label: "Medium Priority",
              },
              {
                title: "Document incident findings",
                priority: "info",
                label: "Low Priority",
              },
            ].map((action, idx) => (
              <div
                key={idx}
                className="action-item mb-3 d-flex justify-content-between align-items-center"
              >
                <h6 className="mb-0">{action.title}</h6>
                <Badge bg={action.priority} className="me-2">
                  {action.label}
                </Badge>
              </div>
            ))}
          </div>

          {/* Compliance Section */}
          <div className="bg-white p-4 rounded shadow-sm mt-4">
            <h5 className="mb-4 fw-semibold">Compliance Status</h5>
            {[
              { label: "Safety Protocols", value: 50 },
              { label: "Documentation", value: 75 },
              { label: "Team Response", value: 90 },
            ].map((item, idx) => (
              <div className="mb-3" key={idx}>
                <div className="d-flex justify-content-between mb-2">
                  <span>{item.label}</span>
                  <span>{item.value}%</span>
                </div>
                <div className="progress" style={{ height: "8px" }}>
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{ width: `${item.value}%` }}
                    aria-valuenow={item.value}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default IncidentReportDetail