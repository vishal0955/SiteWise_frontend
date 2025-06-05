import React, { useState } from "react";
import "./Dashbord.css"; 
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Doughnut } from "react-chartjs-2";
import {
  BsPlusCircle,
  BsUpload,
  BsPersonPlus,
  BsExclamationCircle,
  BsExclamationTriangle,
  BsCheckCircle,
} from "react-icons/bs";
import { Link, Links, useNavigate } from "react-router-dom";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

import {
  Tab,
  Nav,
  Row,
  Col,
  Card,
  Button,
  ProgressBar,
  Modal,
  Form,
} from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import LiveAttendanceTracker from "./LiveAttendanceTracker";
import DailyEntryAnalytics from "./DailyEntryAnalytics";
import { useGlobalShortcuts } from "../../../hooks/useGlobalShortcuts";
import { Building, TrendingUp, Users, ShoppingCart, CheckCircle, AlertTriangle } from "lucide-react";
import Overview from "../../common/Overview";

function Dashboard() {

  const navigate = useNavigate();

  const rfiData = [
  { code: "RFI-001", status: "high", statusText: "pending", title: "Foundation Specifications", location: "Metro Tower", author: "John Smith", duration: "3d open" },
  { code: "RFI-002", status: "medium", statusText: "approved", title: "HVAC Layout Changes", location: "Office Complex", author: "Mike Davis", duration: "1d open" },
  { code: "RFI-003", status: "low", statusText: "review", title: "Material Substitution", location: "Retail Center", author: "Lisa Brown", duration: "7d open" },
  { code: "RFI-004", status: "high", statusText: "pending", title: "Electrical Panel Location", location: "Metro Tower", author: "Tom Wilson", duration: "2d open" },
  { code: "RFI-005", status: "medium", statusText: "approved", title: "Ceiling Height Clarification", location: "Office Complex", author: "Sarah Johnson", duration: "0d open" }
];

const swmsData = [
  { code: "SWMS-001", status: "high", statusText: "active", title: "Excavation Safety", location: "Metro Tower", workers: 12, updated: "2 hours ago" },
  { code: "SWMS-002", status: "medium", statusText: "pending", title: "Height Work Protocol", location: "Office Complex", workers: 8, updated: "1 day ago" },
  { code: "SWMS-003", status: "high", statusText: "expired", title: "Electrical Safety", location: "Retail Center", workers: 6, updated: "3 days ago" },
  { code: "SWMS-004", status: "medium", statusText: "active", title: "Concrete Pouring Safety", location: "Metro Tower", workers: 15, updated: "4 hours ago" }
];


   const projects = [
    {
      name: 'Metro Tower',
      details: 'Structural • $2.4M • Due Dec 2024',
      progress: 75,
      status: { text: 'On Track', variant: 'on-track' },
    },
    {
      name: 'Office Complex',
      details: 'Foundation • $1.8M • Due Feb 2025',
      progress: 45,
      status: { text: 'Delayed', variant: 'delayed' },
    },
    {
      name: 'Retail Center',
      details: 'Finishing • $950K • Due Nov 2024',
      progress: 90,
      status: { text: '', variant: '' },
    },
  ];

  const tasks = [
    { title: 'Site Survey - Tower B', time: 'Tomorrow • 9:00 AM' },
    { title: 'Budget Review - Office Complex', time: 'Wed • 2:00 PM' },
    { title: 'Client Presentation - Retail Center', time: 'Fri • 11:30 AM' },
  ];


  useGlobalShortcuts({
    "ctrl+alt+n": () => navigate("/ProjectDashboard"), // Custom shortcut
    "ctrl+h": () => alert("Help triggered"), // Example shortcut
    "ctrl+shift+d": () => console.log("Dev tools or debug opened"), // Example shortcut
  });
  const [key, setKey] = useState("projectInfo");
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      title: "Safety Incident Reported",
      description: "Site A: Equipment malfunction",
      type: "danger",
      time: "15m ago",
    },
    {
      id: 2,
      title: "Project Deadline Approaching",
      description: "Downtown Project - Due in 3 days",
      type: "warning",
      time: "25m ago",
    },
    {
      id: 3,
      title: "Document Approved",
      description: "Site Safety Protocol v2.1",
      type: "success",
      time: "45m ago",
    },
  ]);

  const stats = [
    {
      number: "12",
      title: "Active Projects",
      subtitle: "4 this week",
      color: "primary",
      path: "/ProjectDashboard",
       icon: <Building size={22} className="text-primary" />
    },
    {
      number: "28",
      title: "Open Tasks",
      subtitle: "8 high priority",
      color: "info",
      path: "/TaskDashboard",
      icon: <Users size={22} className="text-primary" />
    },
    {
      number: "3",
      title: "Safety Incidents",
      subtitle: "1 needs immediate action",
      color: "danger",
      path: "/incidentReports",
       icon: <ShoppingCart size={22} className="text-primary" />
    },

    {
      number: "3",
      title: "Overdue Milestones",
      subtitle: "2 overdue",
      color: "warning",
      path: "/TaskDashboard",
      icon: <CheckCircle size={22} className="text-primary" />
    },
    // {
    //   number: "15",
    //   title: "Monthly Reports",
    //   subtitle: "2 pending review",
    //   color: "success",
    //   path: ""
    // },
  ];

  const safetyData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Incidents",
        data: [5, 4, 3, 2, 1],
        borderColor: "#4361ee",
        backgroundColor: "rgba(67, 97, 238, 0.1)",
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: "#4361ee",
        borderWidth: 2,
        fill: true,
      },
      {
        label: "Near Misses",
        data: [6, 5, 4, 3, 2],
        borderColor: "#3a0ca3",
        backgroundColor: "rgba(58, 12, 163, 0.1)",
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: "#3a0ca3",
        borderWidth: 2,
        fill: true,
      },
    ],
  };

  const defectData = {
    labels: ["Critical", "High", "In Progress", "Resolved", "Closed"],
    datasets: [
      {
        data: [30, 25, 20, 15, 10],
        backgroundColor: [
          "#ef233c",
          "#fb8500",
          "#4361ee",
          "#2a9d8f",
          "#6c757d",
        ],
        hoverBackgroundColor: [
          "#d90429",
          "#e76f51",
          "#3a0ca3",
          "#264653",
          "#495057",
        ],
        borderWidth: 2,
        borderColor: "#ffffff",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 8,
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
          drawBorder: false,
          borderDash: [5, 5],
        },
        ticks: {
          stepSize: 2,
          font: {
            size: 12,
          },
          color: "#666",
        },
        title: {
          display: true,
          text: "Number of Incidents",
          color: "#666",
          font: {
            size: 14,
            weight: "bold",
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 12,
          },
          color: "#666",
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
        align: "start",
        labels: {
          padding: 20,
          font: {
            size: 12,
          },
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
      tooltip: {
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        titleColor: "#333",
        bodyColor: "#666",
        borderColor: "rgba(0, 0, 0, 0.1)",
        borderWidth: 1,
        padding: 12,
        displayColors: true,
        mode: "index",
        intersect: false,
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "75%",
    plugins: {
      legend: {
        position: "right",
        labels: {
          padding: 20,
          font: {
            size: 12,
          },
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
      tooltip: {
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        titleColor: "#333",
        bodyColor: "#666",
        borderColor: "rgba(0, 0, 0, 0.1)",
        borderWidth: 1,
        padding: 12,
        callbacks: {
          label: function (context) {
            const label = context.label || "";
            const value = context.formattedValue;
            return `${label}: ${value}%`;
          },
        },
      },
    },
  };

  const role = localStorage.getItem("userRole");

  const handleAddTask = () => {
    console.log("Adding new task");
  };

  const handleUploadDocument = () => {
    console.log("Uploading document");
  };

  const handleAssignUser = () => {
    console.log("Assigning user");
  };

  return (
    <div className="container-fluid p-4 ">
      <div className="d-flex justify-content-between align-items-center mb-4">
      <h2 className="  mb-1">Dashboard</h2>
      {role !== "admin" && ( 
      <Link to="/dailySiteEntryForm">
            <button className="btn btn-primary me-2">
              <i className="fa-solid fa-plus me-2"></i>Daily Site Entry
            </button>
          </Link>)
        }
      </div>

    

          <div className="row g-3 mb-4">
        {stats.map((stat, idx) => (

  <div className="col-12 col-sm-6 col-md-6 col-lg-3 " key={idx} onClick={() => navigate(stat.path)}>
      <div
        className="overview-card shadow-sm rounded-4  h-100 d-flex flex-column justify-content-between"
        style={{

          
          minHeight: 120,
          boxShadow: "0 2px 8px 0 #1E1E1E",
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
              {stat.title}
            </div>
            <div
              style={{
                fontWeight: 700,
                fontSize: 28,
                
                marginBottom: 2,
              }}
            >
              {stat.number}
            </div>
            <div style={{ color: "#1b8a3a", fontSize: 14 }}>
              {stat.subtitle}
            </div>
          </div>
          <span className="border-0 p-2 rounded-full bg-[#e0edff]">{stat.icon}</span>
        </div>
      </div>
    </div>
   
))}
      </div>

        




    

    <div className="stats-card p-3 shadow-sm rounded-3 ">
        <h6 className="mb-3">Recent Alerts</h6>
        <div className="d-flex flex-column gap-3">
          {alerts.map((alert, index) => (
            <div className="col-12" key={alert.id}>
              <div
                className={`alert alert-${alert.type} d-flex align-items-center gap-3 shadow-sm border-0 mb-0`}
              >
                <div className="alert-icon rounded-circle bg-white p-2">
                  {alert.type === "danger" && (
                    <BsExclamationCircle className="text-danger" />
                  )}
                  {alert.type === "warning" && (
                    <BsExclamationTriangle className="text-warning" />
                  )}
                  {alert.type === "success" && (
                    <BsCheckCircle className="text-success" />
                  )}
                </div>
                <div className="flex-grow-1">
                  <h6 className="alert-heading mb-1">{alert.title}</h6>
                  <p className="mb-0 small">{alert.description}</p>
                </div>
                <small className="text-muted">{alert.time}</small>
              </div>
            </div>
          ))}
        </div>
      </div>


<div className="row g-4 my-3">
  {/* Left Card: Recent RFIs */}
  <div className="col-12 col-md-6">
      <div className="left-section bg-white p-4 shadow-sm rounded-3 h-100">
        <h5 className="section-title mb-3"> Project Progress</h5>
        {projects.map((project, index) => (
          <div key={index} className="project-entry mb-4">
            <div className="project-top d-flex justify-content-between align-items-center">
              <h6 className="project-name mb-0">{project.name}</h6>
              {project.status.text && (
                <span className={`badge-status ${project.status.variant}`}>
                  {project.status.text}
                </span>
              )}
            </div>
            <small className="text-muted d-block mb-2">{project.details}</small>
            <p className="progress-label mb-1">Progress</p>
            <ProgressBar
              now={project.progress}
              label={`${project.progress}%`}
              className="project-progressbar"
            />
          </div>
        ))}
      </div>
    </div>

 <div className="col-12 col-md-6">
      <div className="right-section bg-white p-4 shadow-sm rounded-3 h-100">
        <h5 className="section-title mb-3">Upcoming Tasks</h5>
        {tasks.map((task, index) => (
          <div key={index} className="task-entry mb-3">
            <h6 className="task-title mb-1">{task.title}</h6>
            <small className="text-muted">{task.time}</small>
          </div>
        ))}
      </div>
    </div>
</div>



   
     <div className="row my-3">
        <div className="col-lg-8 mb-4">
          <div className="chart-container p-4 shadow-sm rounded-3 ">
            <h5 className="mb-4">Safety Performance</h5>
            <div style={{ height: "250px" }}>
              <Line data={safetyData} options={chartOptions} />
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="chart-container p-4 shadow-sm rounded-3 ">
            <h6 className="mb-4">Defect Status</h6>
            <div style={{ height: "250px" }}>
              <Doughnut data={defectData} options={doughnutOptions} />
            </div>
          </div>
        </div>
      </div>

<div className="row g-4">
  {/* Left Card: Recent RFIs */}
  <div className="col-12 col-md-6">
    <div className="custom-card1 white-card h-100">
      <div className="card-header d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0">📋 Recent RFIs</h5>
        <span className="badge-count">5 active</span>
      </div>
      {rfiData.map((item, index) => (
        <div className="item-box mb-3" key={index}>
          <div className="item-header d-flex justify-content-between align-items-center">
            <span className="item-code">{item.code}</span>
            <span className={`badge-status ${item.status}`}>{item.statusText}</span>
          </div>
          <h6 className="mt-2 mb-1">{item.title}</h6>
          <small className="text-muted d-block">
            {item.location} &nbsp; By {item.author} &nbsp; {item.duration}
          </small>
        </div>
      ))}
    </div>
  </div>

  {/* Right Card: Active SWMS */}
  <div className="col-12 col-md-6">
    <div className="custom-card1 white-card h-100">
      <div className="card-header d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0">🛡️ Active SWMS</h5>
        <span className="badge-count">4 documents</span>
      </div>
      {swmsData.map((item, index) => (
        <div className="item-box mb-3" key={index}>
          <div className="item-header d-flex justify-content-between align-items-center">
            <span className="item-code">{item.code}</span>
            <span className={`badge-status ${item.status}`}>{item.statusText}</span>
          </div>
          <h6 className="mt-2 mb-1">{item.title}</h6>
          <small className="text-muted d-block">
            {item.location} &nbsp; {item.workers} workers &nbsp; Updated {item.updated}
          </small>
        </div>
      ))}
    </div>
  </div>
</div>



    </div>
  );
}

export default Dashboard;


