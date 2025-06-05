import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Cell,
} from "recharts";
import {
  FaClipboard,
  FaClock,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

import { deleteRFI, fetchRFI } from "../../../redux/slices/rfiSlice";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import axiosInstance from "../../../utils/axiosInstance";
import { Modal } from "react-bootstrap";

import { Button, Col, Row,  Form } from "react-bootstrap";
import { fetchUsers } from "../../../redux/slices/userSlice";
import TableFilterBar from '../../common/TableFilterBar';

const lineChartData = [
  { month: "Jan", Submitted: 20, Resolved: 18 },
  { month: "Feb", Submitted: 30, Resolved: 25 },
  { month: "Mar", Submitted: 40, Resolved: 38 },
  { month: "Apr", Submitted: 50, Resolved: 48 },
  { month: "May", Submitted: 45, Resolved: 42 },
  { month: "Jun", Submitted: 30, Resolved: 28 },
];

const pieChartData = [
  { name: "< 24 hrs", value: 40, color: "#3366CC" },
  { name: "1-3 days", value: 30, color: "#109618" },
  { name: "3-7 days", value: 20, color: "#FF9900" },
  { name: "> 7 days", value: 10, color: "#DC3912" },
];

function RFIs() {
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [loading, setLoading] = useState(false);
     const [statusFilter, setStatusFilter] = useState("All");
      const [search, setSearch] = useState("");
       const handleSearchChange = (e) => setSearch(e.target.value);

  const dispatch = useDispatch();
  const { data: users } = useSelector((state) => state.users);
  const { rfi } = useSelector((state) => state.rfi);

  console.log("users", users);
  console.log(rfi);
  // Fetch RFIs when the component mounts
 console.log("statusFilter", statusFilter);

  useEffect(() => {

    dispatch(fetchRFI());
  }, [dispatch]);
  

   useEffect(() => {
    dispatch(fetchUsers());
  }, []);


    const filteredRfis = rfi.filter((item) => {
    // const matchesSearch = item.subject.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "All" || 
      (statusFilter === "Approved" && item.status === "Approved") ||
      (statusFilter === "Pending" && item.status === "pending" ) ||

      ( statusFilter === "Rejected" && item.status === "Rejected")
    
    return  matchesStatus;
    })

  const navigate = useNavigate();

    const handleCardClick = (status) => {
      setStatusFilter(status)

       document.querySelector('.swms-table')?.scrollIntoView({ behavior: 'smooth' });
     
  };

  const HandleDelete = (id) => {
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
        dispatch(deleteRFI(id));
        Swal.fire("Deleted!", "Your RFI has been deleted.", "success");
      }
    });
  };

  const stats = [
    {
      number: <FaClipboard size={24} className="text-primary" />,
      title: "Total RFIs",
      subtitle: "247",
      color: "primary",
      status: "All",
    },
    {
      number: <FaClock size={24}  className="text-primary"/>,
      title: "Pending",
      subtitle: "32",
          color: "primary",
      status: "Pending",
    },
    {
      number: <FaCheckCircle size={24}  className="text-primary"/>,
      title: "Resolve",
      subtitle: "189",
      color: "primary",
      status: "Approved",
    },
    {
      number: <FaExclamationCircle size={24} className="text-primary"/>,
      title: "Rejected",
      subtitle: "1",
            color: "primary",
      status: "Rejected",
    },
  ];

  const handleSubmit = async () => {
    if (!question.trim()) return;
    setLoading(true);
    try {
      const response = await axiosInstance.post(
        "https://constructionaimicroservice-production.up.railway.app/rfi_suggestions",
        {
          question: question,
        }
      );
      setSuggestion(response.data.rfi_suggestion || "No suggestion returned.");
    } catch (error) {
      console.error("Error fetching suggestion:", error);
      setSuggestion("Error fetching suggestion.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (item) =>
  {
    navigate( `/viewrfi/${item._id}`, { state: { item } } );
  }

  const statusOptions = ['Approved', 'Pending', 'Rejected'];
  const assigneeOptions = users.map(user => user.name);

  return (
    <div>
      {/* Dashboard Section */}
      <div className="container ">
        {/* Summary Cards */}

        {/* Top Stats Cards */}
        <div className="d-flex justify-content-between align-items-center mt-2 ">
          <h3 className="fw-semibold">RFI</h3>

          <div className="d-flex gap-2">
            <Button
              className="btn-set-color"
              onClick={() => setIsOpen(true)}
            >
              {" "}
              Ask RFI Question
            </Button>
            <Link to={"/AddRFIs"}>
              <Button
                className="btn-set-color"
              >
                <i className="fa-solid fa-plus me-2"></i> New RFI
              </Button>
            </Link>
          </div>
        </div>

        <Modal
          show={isOpen}
          onHide={() => setIsOpen(false)}
          centered
          backdrop="static"
        >
          <Modal.Header closeButton>
            <Modal.Title>Ask a Question</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="e.g., What are the specs for fire-resistant cables?"
              className="form-control mb-3"
            />

            <button
              onClick={handleSubmit}
              className="btn btn-primary w-100"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send"}
            </button>

            {suggestion && (
              <div
                className="mt-3 bg-light p-3 rounded text-muted"
                style={{ whiteSpace: "pre-wrap" }}
              >
                {suggestion}
              </div>
            )}
          </Modal.Body>
        </Modal>
        <div
          className="table-responsive mt-4  p-3 rounded-2 "
          style={{ border: "1px solid #dee2e6", borderRadius: "8px" }}
        >
            <Row className="mb-4 align-items-center g-3">
        <Col sm={12} md={3}>
          <Form.Control
            type="search"
            value={search}
            onChange={handleSearchChange}
            placeholder="Search ..."
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
            // style={{ borderRadius: "4px", border: "1px solid #dee2e6" }}
          >
            <option>All Users</option>
            {
              users && users.length > 0 ? (
                users.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.firstName} {user.lastName}
                  </option>
                ))
              ) : (
                <option disabled>No users found</option>
              )
            }
        
          </Form.Select>
        </Col>
        
        <Col sm={12} md="auto" className="ms-md-auto">
         
        </Col>
      </Row>
          <table className="table table-hover align-middle">
            <thead>
              <tr>
                <th className="ps-4">ID</th>
                <th>Subject</th>
                <th>Status</th>
                <th>Assignee</th>
                <th className="pe-4">Due Date</th>
                <th className="pe-4">Priority</th>
                <th className="pe-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredRfis && filteredRfis.length > 0 ? (
                filteredRfis.map((item, index) => (
                  <tr key={item._id} className="py-3">
                    <td className="fw-semibold ps-4 py-3">{index + 1}</td>
                    <td className="py-3">{item?.subject}</td>
                    <td className="py-3">
                      <span
                        className={`badge ${
                          item?.status === "pending"
                            ? "bg-warning text-dark"
                            : item?.status === "approved"
                            ? "bg-success"
                            : "bg-secondary"
                        }`}
                      >
                        {item?.status}
                      </span>
                    </td>
                    <td className="py-3">{item?.assignee.firstName}</td>
                    <td className="pe-4 py-3">
                      {new Date(item?.due_date).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="pe-4 py-3">
                      <span
                        className={`badge ${
                          item?.priority === "High"
                            ? "bg-danger"
                            : item?.priority === "Medium"
                            ? "bg-warning"
                            : "bg-success"
                        }`}
                      >
                        {item?.priority}
                      </span>
                    </td>
                    <td>
                      <div>
                      
                        <button variant="light" size="sm" className="me-2" onClick={() => handleEdit(item)}>
                          {" "}
                          <i className="fas fa-eye text-primary"></i>{" "}
                        </button>
                  
                        <button
                          variant="light"
                          size="sm"
                          onClick={() => HandleDelete(item._id)}
                        >
                          <i className="fas fa-trash text-danger"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-3">
                    No RFIs found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination (static for now, dynamic karni ho toh boliyo) */}
          <div className="d-flex justify-content-end">
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

        <div className="row g-3 mb-4">
  {[
    {
      title: "Total RFIs",
      value: 247,
      subtitle: "All RFIs",
      icon: <FaClipboard size={22} className="text-primary" />,
    },
    {
      title: "Pending",
      value: 32,
      subtitle: "Awaiting response",
      icon: <FaClock size={22} className="text-primary" />,
    },
    {
      title: "Resolved",
      value: 189,
      subtitle: "Approved RFIs",
      icon: <FaCheckCircle size={22}   />,
    },
    {
      title: "Rejected",
      value: 1,
      subtitle: "Not approved",
      icon: <FaExclamationCircle size={22} color="#e53e3e" />,
    },
  ].map((stat, idx) => (
    <div key={idx} className="col-12 col-sm-6 col-md-6 col-lg-3 mt-5">
      <div
        className="bg-white rounded-4 shadow-sm p-4 border h-100"
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
                color: "#2563eb",
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
            className="d-inline-flex align-items-center justify-content-center rounded-circle text-primary"
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

        <div className=" justify-content-between align-items-center mt-4">
          <h4 className="fw-semibold">RFI Statistics</h4>
          {/* <table className="table table-hover align-middle">
            <thead>
              <tr>
                <th className="ps-4">Project</th>
              <th>RFI Assistant </th>

                
              </tr>
            </thead>
           <tbody>
            <tr>
              <td className="fw-semibold ps-4 py-3">Project A</td>
              <td className="py-3">
                <span
                  className={`badge ${
                    "bg-success"
                  }`}
                >
                  {"RFI Assistant"}
                </span>
                </td>
            </tr>
           </tbody>
          </table> */}

          <table
            className="table table-hover align-middle"
            style={{ border: "1px solid #dee2e6", borderRadius: "8px" }}
          >
            <thead>
              <tr>
                <th className="ps-4">Project</th>
                <th>RFI Assistant</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="fw-semibold ps-4 py-3">Project A</td>
                <td className="py-3">
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="rfiToggleProjectA"
                      defaultChecked
                    />
                    <label
                      className="form-check-label"
                      htmlFor="rfiToggleProjectA"
                    ></label>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Charts Section */}
        {/* Charts Section */}
       <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
  {/* RFI Trends (takes 2/3 width on large screens) */}
  <div className="lg:col-span-2">
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h5 className="mb-4 font-semibold text-lg">RFI Trends</h5>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={lineChartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="Submitted"
            stroke="#3366CC"
            strokeWidth={2}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="Resolved"
            stroke="#109618"
            strokeWidth={2}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>

  {/* Resolution Time */}
  <div>
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h5 className="mb-4 font-semibold text-lg">Resolution Time</h5>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={pieChartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={90}
            innerRadius={50}
            label
          >
            {pieChartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  </div>
</div>

      </div>
    </div>
  );
}

export default RFIs;
