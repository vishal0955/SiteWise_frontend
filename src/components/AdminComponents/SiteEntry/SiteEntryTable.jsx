import React, { useEffect, useState } from "react";
import { Table, Button, InputGroup, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import QRCode from "react-qr-code";

import {
  deleteSiteEntry,
  fetchSiteEntries,
} from "../../../redux/slices/siteEntrySlice";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { CheckCircle, Clock, Users } from "lucide-react";

function SiteEntryTable() {
  const dispatch = useDispatch();
  const { entries } = useSelector((state) => state.entries);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSite, setSelectedSite] = useState("All");
  const [selectedRole, setSelectedRole] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  // console.log(entries);

  const overview = [
    {
      title: "Total People Entered",
      number: 9,
      color: "info",
      icon: <Users size={24} className="text-primary" />,
    },
    {
      title: "Avg Time Spent",
      number: 8,
      color: "warning",
      icon: <Clock size={24} className="text-primary" />,
    },
    {
      title: "Approved Site Entries",
      number: 6,
      color: "success",
      icon: <CheckCircle size={24} className="text-success" />,
    },
  ];

  const roles = [
    {
      id: 1,
      role: "All",
    },
    {
      id: 2,
      role: "Admin",
    },
    {
      id: 3,
      role: "supervisor",
    },

    {
      id: 4,
      role: "worker",
    },
  ];

  useEffect(() => {
    dispatch(fetchSiteEntries());
  }, [dispatch]);

  const HandleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteSiteEntry(id))
          .then(() => {
            Swal.fire("Deleted!", "The site entry has been deleted.", "success");
            dispatch(fetchSiteEntries()); // Refresh the table after delete
          })
          .catch((error) => {
            Swal.fire("Error!", "Something went wrong.", "error");
          });
      }
    });
  };

  const uniqueSites = [...new Set(entries.map((entry) => entry.siteName))];

  const filteredEntries = entries.filter((entry) => {
    const matchesSearch =
      entry.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.workerId?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSite =
      selectedSite === "All" || entry.siteName === selectedSite;

    return matchesSearch && matchesSite;
  });

  const totalPages = Math.ceil(filteredEntries.length / itemsPerPage);
  const paginatedEntries = filteredEntries.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const color = ["primary", "secondary", "success", "danger"];
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedSite]);

  return (
    <div className="container ">


      {/* Header */}
      <div className="d-flex justify-content-between mb-3 ">
        <h2>Site Entry</h2>
        <div className="">
          <Link to="/siteEntry">
            <Button className="btn-set-color">
              <i className="fa-solid fa-plus me-2"></i>Site Entry
            </Button>
          </Link>
        </div>
      </div>

       <div className="row g-3 mt-2 mb-4 ">
        {/* Total People Entered */}
        <div className="col-12 col-sm-6 col-md-4 col-lg-4  ">
          <div
            className="bg-white rounded-4 shadow-sm  border p-4  "
            style={{
              minHeight: 150,
              boxShadow: "0 4px 16px 0 #e5e7eb",
              background: "#fff",
              border: "none",
            }}
          >
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <div
                  className="fw-bold mb-2"
                  style={{
                   
                    fontSize: "1.05rem",
                  }}
                >
                  Total People Entered
                </div>
                <div
                  className="fw-bold"
                  style={{
                    fontSize: "2rem",
                   
                    lineHeight: 1.1,
                  }}
                >
                  9
                </div>
                {/* <div
                  className="mt-2"
                  style={{
                    
                    fontSize: "1rem",
                  }}
                >
     
                </div> */}
              </div>
              <span
                className="d-inline-flex align-items-center justify-content-center rounded-circle"
                style={{
                  background: "#e0edff",
                  width: 44,
                  height: 44,
                  marginLeft: 8,
                }}
              >
                <i
                  className="fa-solid fa-users"
                  style={{ color: "#3490fa", fontSize: 22 }}
                ></i>
              </span>
            </div>
          </div>
        </div>
        {/* Avg Time Spent */}
        <div className="col-12 col-sm-6 col-md-4 col-lg-3">
          <div
            className="bg-white rounded-4 shadow-sm  border   p-4 h-100"
            style={{
              minHeight: 150,
              boxShadow: "0 4px 16px 0 #e5e7eb",
              background: "#fff",
              border: "none",
            }}
          >
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <div
                  className="fw-bold mb-2"
                  style={{
                   
                    fontSize: "1.05rem",
                  }}
                >
                  Avg Time Spent
                </div>
                <div
                  className="fw-bold"
                  style={{
                    fontSize: "2rem",
                    
                    lineHeight: 1.1,
                  }}
                >
                  8
                </div>
                <div
                  className="mt-2"
                  style={{
                    
                    fontSize: "1rem",
                  }}
                >
                  {/* Optional subtitle */}
                </div>
              </div>
              <span
                className="d-inline-flex align-items-center justify-content-center rounded-circle"
                style={{
                  background: "#e0edff",
                  width: 44,
                  height: 44,
                  marginLeft: 8,
                }}
              >
                <i
                  className="fa-regular fa-clock"
                  style={{ color: "#3490fa", fontSize: 22 }}
                ></i>
              </span>
            </div>
          </div>
        </div>
        {/* Approved Site Entries */}
        <div className="col-12 col-sm-6 col-md-4 col-lg-4">
          <div
            className="bg-white rounded-4 shadow-sm p-4 h-100 border"
            style={{
              minHeight: 150,
              boxShadow: "0 4px 16px 0 #e5e7eb",
              background: "#fff",
              border: "none",
            }}
          >
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <div
                  className="fw-bold mb-2"
                  style={{
                   
                    fontSize: "1.05rem",
                  }}
                >
                  Approved Site Entries
                </div>
                <div
                  className="fw-bold"
                  style={{
                    fontSize: "2rem",
                    
                    lineHeight: 1.1,
                  }}
                >
                  6
                </div>
                <div
                  className="mt-2"
                  style={{
                    color: "#16a34a",
                    fontSize: "1rem",
                  }}
                >
                  {/* Optional subtitle */}
                </div>
              </div>
              <span
                className="d-inline-flex align-items-center justify-content-center rounded-circle"
                style={{
                  background: "#e0edff",
                  width: 44,
                  height: 44,
                  marginLeft: 8,
                }}
              >
                <i
                  className="fa-regular fa-circle-check"
                  style={{ color: "#3490fa", fontSize: 22 }}
                ></i>
              </span>
            </div>
          </div>
        </div>
           <div className="col-12 col-sm-6 col-md-4 col-lg-4">
          <div
            className="bg-white rounded-4 shadow-sm p-4 h-100 border"
            style={{
              minHeight: 150,
              boxShadow: "0 4px 16px 0 #e5e7eb",
              background: "#fff",
              border: "none",
            }}
          >
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <div
                  className="fw-bold mb-2"
                  style={{
                   
                    fontSize: "1.05rem",
                  }}
                >
                  Approved Site Entries
                </div>
                <div
                  className="fw-bold"
                  style={{
                    fontSize: "2rem",
                    
                    lineHeight: 1.1,
                  }}
                >
                  6
                </div>
                <div
                  className="mt-2"
                  style={{
                    color: "#16a34a",
                    fontSize: "1rem",
                  }}
                >
                  {/* Optional subtitle */}
                </div>
              </div>
              <span
                className="d-inline-flex align-items-center justify-content-center rounded-circle"
                style={{
                  background: "#e0edff",
                  width: 44,
                  height: 44,
                  marginLeft: 8,
                }}
              >
                <i
                  className="fa-regular fa-circle-check"
                  style={{ color: "#3490fa", fontSize: 22 }}
                ></i>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex flex-wrap gap-3 mb-3">
        <InputGroup style={{ maxWidth: "300px" }}>
          <Form.Control
            placeholder="Search by name or ID"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </InputGroup>

        <Form.Select
          style={{ maxWidth: "200px" }}
          value={selectedSite}
          onChange={(e) => setSelectedSite(e.target.value)}
        >
          <option value="All">All Sites</option>
          {uniqueSites.map((site, i) => (
            <option key={i} value={site}>
              {site}
            </option>
          ))}
        </Form.Select>

        <Form.Select
          className="w-100 w-md-auto"
          style={{ maxWidth: "200px" }}
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
        >
          {/* <option value="">All Roles</option> */}
          {roles.map((r, index) => (
            <option key={r.id} value={r.role}>
              {r.role}
            </option>
          ))}
        </Form.Select>

        <input type="date" className="form-control" style={{ maxWidth: "200px" }} />
      </div>

      {/* Table */}
      <div className="table-responsive shadow-sm bg-white rounded p-2">
        <Table
          className="mb-0 table-bordered table-striped align-middle"
          style={{ border: "1px solid #dee2e6", borderRadius: "8px" }}
        >
          <thead className="table-light p-2">
            <tr>
              <th className="ps-4">Full Name</th>
              {/* <th>Worker ID</th> */}
              <th>Phone Number</th>
              {/* <th>Email Address</th> */}
              <th>Site Name</th>
              {/* <th>Site Supervisor</th> */}
              <th>Time Spent</th>
              <th>Induction Date</th>
              <th>Site Location</th>
              {/* <th>QR Code</th> */}
              <th className="pe-4">Action</th>
            </tr>
          </thead>
          <tbody className="p-2">
            {paginatedEntries.length > 0 ? (
              paginatedEntries?.map((entry, index) => (
                <tr key={index} >
                  <td className="ps-4">{entry.fullName}</td>
                  {/* <td>{entry.workerId}</td> */}
                  <td>{entry.phoneNumber}</td>
                  {/* <td>{entry.emailAddress}</td> */}
                  <td>{entry.siteName}</td>
                  {/* <td>{entry.siteSupervisor}</td> */}
                  <td>8 hours</td>
                  <td>{new Date(entry.inductionDate).toLocaleDateString()}</td>
                  <td>{entry.siteLocation}</td>
                  {/* <td>
                    <QRCode
                      value={`https://yourwebsite.com/site-entry/${entry._id}`}
                      size={80}
                    />
                  </td> */}
                  <td className="pe-4">
                    <div className="d-flex gap-2">
                      <Link to={`/siteEntry/${entry._id}`}>
                        <button className=" text-primary p-0">
                          <i className="fa-solid fa-pen-to-square"></i>
                        </button>
                      </Link>
                      <button
                        className=" text-danger p-0"
                        onClick={() => HandleDelete(entry._id)}
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center py-3">
                  No site entries found.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-end mt-3">
          <Button
            size="sm"
            variant="outline-secondary"
            className="me-2"
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          {[...Array(totalPages)].map((_, i) => (
            <Button
              key={i}
              size="sm"
              variant={currentPage === i + 1 ? "primary" : "outline-secondary"}
              className="mx-1"
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </Button>
          ))}
          <Button
            size="sm"
            variant="outline-secondary"
            className="ms-2"
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}

     

      {/* <div className="row gx-3">
        {overview.map((item, idx) => {
          const isPositive = item.change >= 0;
          const changeText = isPositive
            ? `+${item.change}%`
            : `${item.change}%`;
          const changeColor = isPositive ? "text-success" : "text-danger";

          return (
            <div key={idx} className="col-12 col-sm-6 col-lg-4 mb-3">
              <div className="border rounded-3  shadow-sm  h-100 p-2 ">
            
                <div className="d-flex align-items-center px-3 py-2 ">
           
                  <div
                    className="border rounded-2 d-flex align-items-center justify-content-center"
                    style={{
                      width: "2rem",
                      height: "2rem",
                      borderRadius: "50%",
                      border: "1px solid ",
                    }}
                  >
                    {item.icon}
                  </div>

               
                  <div className="ms-3">
                    <h5 className="mb-1">{item.title}</h5>
                    <div className="d-flex align-items-center justify-content-between mb-1">
                      <div className="h5 mb-0 mr-2 font-semibold ">
                        {item.number}
                      </div>
                      <div className="ms-auto d-flex align-items-center">
                    <CheckCircle
                      size={12}
                      className={`${changeColor} me-1`}
                    />
                    <span className={`small ${changeColor}`}>
                      {changeText}
                    </span>
                  </div>
                    </div>
                  </div>

                </div>

              
              </div>
            </div>
          );
        })}
      </div> */}
    </div>
  );
}

export default SiteEntryTable;
