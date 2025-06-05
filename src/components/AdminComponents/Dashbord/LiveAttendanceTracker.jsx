import React, { useState } from "react";
import { Table, Form, Row, Col, Pagination } from "react-bootstrap";
const sampleData = [
  {
    site: "Site A",
    name: "John Doe",
    role: "Worker",
    scanInTime: "08:00 AM",
    inductionStatus: "✔ Valid",
    timeOnSite: "02:30 hrs",
    date: "2025-05-06",
  },
  {
    site: "Site B",
    name: "Jane Smith",
    role: "Supervisor",
    scanInTime: "07:45 AM",
    inductionStatus: "⚠ Pending",
    timeOnSite: "03:15 hrs",
    date: "2025-05-06",
  },
  {
    site: "Site A",
    name: "Robert Wilson",
    role: "Manager",
    scanInTime: "09:00 AM",
    inductionStatus: "✔ Valid",
    timeOnSite: "01:00 hrs",
    date: "2025-05-06",
  },
  {
    site: "Site A",
    name: "Emily Davis",
    role: "Electrician",
    scanInTime: "08:15 AM",
    inductionStatus: "❌ Expired",
    timeOnSite: "02:45 hrs",
    date: "2025-05-06",
  },
  {
    site: "Site B",
    name: "Michael Brown",
    role: "Plumber",
    scanInTime: "07:30 AM",
    inductionStatus: "✔ Valid",
    timeOnSite: "03:30 hrs",
    date: "2025-05-06",
  },
  {
    site: "Site C",
    name: "Sarah Lee",
    role: "Engineer",
    scanInTime: "09:30 AM",
    inductionStatus: "✔ Valid",
    timeOnSite: "01:15 hrs",
    date: "2025-05-06",
  },
  {
    site: "Site A",
    name: "Chris Evans",
    role: "Worker",
    scanInTime: "06:45 AM",
    inductionStatus: "✔ Valid",
    timeOnSite: "04:15 hrs",
    date: "2025-05-06",
  },
  {
    site: "Site B",
    name: "Natalie Portman",
    role: "Safety Officer",
    scanInTime: "10:00 AM",
    inductionStatus: "⚠ Pending",
    timeOnSite: "00:45 hrs",
    date: "2025-05-06",
  },
  {
    site: "Site C",
    name: "Tom Holland",
    role: "Supervisor",
    scanInTime: "08:50 AM",
    inductionStatus: "✔ Valid",
    timeOnSite: "02:10 hrs",
    date: "2025-05-06",
  },
  {
    site: "Site A",
    name: "Tony Stark",
    role: "Engineer",
    scanInTime: "09:10 AM",
    inductionStatus: "❌ Expired",
    timeOnSite: "01:50 hrs",
    date: "2025-05-06",
  },
  {
    site: "Site B",
    name: "Bruce Banner",
    role: "Scientist",
    scanInTime: "07:00 AM",
    inductionStatus: "✔ Valid",
    timeOnSite: "03:00 hrs",
    date: "2025-05-06",
  },
  {
    site: "Site A",
    name: "Clark Kent",
    role: "Worker",
    scanInTime: "06:30 AM",
    inductionStatus: "✔ Valid",
    timeOnSite: "04:30 hrs",
    date: "2025-05-06",
  },
  {
    site: "Site C",
    name: "Diana Prince",
    role: "Architect",
    scanInTime: "09:20 AM",
    inductionStatus: "⚠ Pending",
    timeOnSite: "01:10 hrs",
    date: "2025-05-06",
  },
  {
    site: "Site B",
    name: "Peter Parker",
    role: "Electrician",
    scanInTime: "08:40 AM",
    inductionStatus: "✔ Valid",
    timeOnSite: "02:20 hrs",
    date: "2025-05-06",
  },
  {
    site: "Site A",
    name: "Steve Rogers",
    role: "Supervisor",
    scanInTime: "07:50 AM",
    inductionStatus: "✔ Valid",
    timeOnSite: "03:10 hrs",
    date: "2025-05-06",
  },
  {
    site: "Site C",
    name: "Natasha Romanoff",
    role: "Safety Officer",
    scanInTime: "10:10 AM",
    inductionStatus: "❌ Expired",
    timeOnSite: "00:40 hrs",
    date: "2025-05-06",
  },
  {
    site: "Site B",
    name: "Wanda Maximoff",
    role: "Worker",
    scanInTime: "08:20 AM",
    inductionStatus: "✔ Valid",
    timeOnSite: "02:40 hrs",
    date: "2025-05-06",
  },
  {
    site: "Site C",
    name: "Scott Lang",
    role: "Plumber",
    scanInTime: "09:40 AM",
    inductionStatus: "✔ Valid",
    timeOnSite: "01:20 hrs",
    date: "2025-05-06",
  },
  {
    site: "Site A",
    name: "Stephen Strange",
    role: "Doctor",
    scanInTime: "06:40 AM",
    inductionStatus: "✔ Valid",
    timeOnSite: "04:20 hrs",
    date: "2025-05-06",
  },
  {
    site: "Site C",
    name: "Nick Fury",
    role: "Manager",
    scanInTime: "07:20 AM",
    inductionStatus: "✔ Valid",
    timeOnSite: "03:40 hrs",
    date: "2025-05-06",
  },
];

const LiveAttendanceTracker = () => {
  const [filters, setFilters] = useState({ site: "", role: "", name: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

 
  const filteredData = sampleData.filter((row) => {
    return (
      (!filters.site || row.site === filters.site) &&
      (!filters.role || row.role === filters.role) &&
      (!filters.name ||
        row.name.toLowerCase().includes(filters.name.toLowerCase())) 
    );
  });

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const currentData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div>
      <h4 className="mb-3">Live Site Attendance</h4>

    
      <Form className="mb-3">
        <Row>
          <Col md={4}>
            <Form.Select
              value={filters.site}
              onChange={(e) => setFilters({ ...filters, site: e.target.value })}
            >
              <option value="">All Sites</option>
              {[...new Set(sampleData.map((item) => item.site))].map((site) => (
                <option key={site} value={site}>
                  {site}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Col md={4}>
            <Form.Select
              value={filters.role}
              onChange={(e) => setFilters({ ...filters, role: e.target.value })}
            >
              <option value="">All Roles</option>
              {[...new Set(sampleData.map((item) => item.role))].map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Col md={4}>
            <Form.Control
              placeholder="Search by Name"
              value={filters.name}
              onChange={(e) => setFilters({ ...filters, name: e.target.value })}
            />
          </Col>
        </Row>
      </Form>

      {/* Scrollable Table with Sticky Header */}
      <div style={{ maxHeight: "400px", overflowY: "auto", overflowX: "auto" }}>
        <Table
          bordered
          responsive
          hover
          size="sm"
          style={{ tableLayout: "auto",border: '1px solid #dee2e6'}} 
         
        >
          <thead
            className="table-light sticky-top"
            style={{ top: 0, zIndex: 1 }}
          >
            <tr>
              <th>Site</th>
              <th>Date</th>
              <th>Name</th>
              <th>Role</th>
              <th>Scan-In</th>
              <th>Induction Status</th>
              <th>Time on Site</th>
            </tr>
          </thead>
          <tbody>
            {currentData.length > 0 ? (
              currentData.map((row, i) => (
                <tr key={i}>
                  <td>{row.site}</td>
                  <td>{row.date}</td>
                  <td>{row.name}</td>
                  <td>{row.role}</td>
                  <td>{row.scanInTime}</td>
                  <td>{row.inductionStatus}</td>
                  <td>{row.timeOnSite}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">
                  No results found for "{filters.name}"
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>

      {/* Pagination */}
      <Pagination className="justify-content-center mt-3">
        <Pagination.Prev
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
        />
        {[...Array(totalPages)].map((_, i) => (
          <Pagination.Item
            key={i}
            active={i + 1 === currentPage}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
        />
      </Pagination>
    </div>
  );
};

export default LiveAttendanceTracker;
