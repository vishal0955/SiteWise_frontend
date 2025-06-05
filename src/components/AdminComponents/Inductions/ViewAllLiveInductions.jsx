import React, { useState } from "react";
import { Container, Table, Form, Button } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";

function ViewAllLiveInductions() {

  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState({ siteLocation: "", role: "", supervisor: "" });

  const liveInductions = [
    // Example data
    { name: "John Smith", role: "Electrician", siteLocation: "Site A", supervisor: "Supervisor 1" },
    { name: "Emily Johnson", role: "Welder", siteLocation: "Site B", supervisor: "Supervisor 2" },
    { name: "Michael Brown", role: "Site Manager", siteLocation: "Site A", supervisor: "Supervisor 1" },
  ];

  const filteredInductions = liveInductions.filter((induction) => {
    return (
      induction.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (filter.siteLocation ? induction.siteLocation === filter.siteLocation : true) &&
      (filter.role ? induction.role === filter.role : true) &&
      (filter.supervisor ? induction.supervisor === filter.supervisor : true)
    );
  });

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
      <h3 className="fw-bold mb-4">All Live Inductions</h3>
      <button className="btn btn-outline-secondary" onClick={() => navigate(-1)}>
        <i className="bi bi-arrow-left"></i>
             Back
      </button>
      </div>

      {/* Filters */}
      <div className="d-flex flex-wrap gap-3 mb-4">
        <Form.Control
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ maxWidth: "200px" }}
        />
        <Form.Select
          value={filter.siteLocation}
          onChange={(e) => setFilter({ ...filter, siteLocation: e.target.value })}
          style={{ maxWidth: "200px" }}
        >
          <option value="">Filter by Site Location</option>
          <option value="Site A">Site A</option>
          <option value="Site B">Site B</option>
        </Form.Select>
        <Form.Select
          value={filter.role}
          onChange={(e) => setFilter({ ...filter, role: e.target.value })}
          style={{ maxWidth: "200px" }}
        >
          <option value="">Filter by Role</option>
          <option value="Electrician">Electrician</option>
          <option value="Welder">Welder</option>
          <option value="Site Manager">Site Manager</option>
        </Form.Select>
        <Form.Select
          value={filter.supervisor}
          onChange={(e) => setFilter({ ...filter, supervisor: e.target.value })}
          style={{ maxWidth: "200px" }}
        >
          <option value="">Filter by Supervisor</option>
          <option value="Supervisor 1">Supervisor 1</option>
          <option value="Supervisor 2">Supervisor 2</option>
        </Form.Select>
      </div>

      {/* Table */}
      <Table striped bordered hover style={{ border: '1px solid #dee2e6', borderRadius: '8px' }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Site Location</th>
            <th>Supervisor</th>
          </tr>
        </thead>
        <tbody>
          {filteredInductions.length > 0 ? (
            filteredInductions.map((induction, index) => (
              <tr key={index}>
                <td>{induction.name}</td>
                <td>{induction.role}</td>
                <td>{induction.siteLocation}</td>
                <td>{induction.supervisor}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                No inductions found.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
}

export default ViewAllLiveInductions;