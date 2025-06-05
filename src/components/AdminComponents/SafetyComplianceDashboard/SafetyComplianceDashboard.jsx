import React, { useState } from "react";
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
  BsBuilding,
} from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { FileCheck, FilePlus,File, User } from "lucide-react";

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

function SafetyComplianceDashboard() {
  const navigate = useNavigate();
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
      title: "Total Inductions",
      subtitle: "4 this week",
      color: "primary",
      path: "/inductions",
      icon: <User size={22}  />,
    },
    {
      number: "28",
      title: "SWMS ",
      subtitle: "8 high priority",
      color: "info",
      path: "/swms",
      icon: <File size={22}  />,
    },
    {
      number: "3",
      title: "Site Review",
      subtitle: "1 needs immediate action",
      color: "danger",
      path: "/siteReview",
       icon: <FileCheck  size={22}  />,
    },
    {
      number: "15",
      title: "Incident  Reports",
      subtitle: "2 pending review",
      color: "success",
      path: "/incidentReports",
        icon: <FilePlus  size={22}  />,
    },
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

  return (
    <div className="container-fluid p-4 ">
      <h3 className=" font-bold mb-4">Safety Compliance Dashboard</h3>
      <div className="row g-3 mb-4">
        {stats.map((stat, index) => (
          <div className="col-12 col-sm-6 col-md-6 col-lg-3 " key={index}>
            
               <div
        className="shadow-sm  rounded-4 border  h-100 d-flex flex-column justify-content-between "
        onClick={() => navigate(stat.path)}
        style={{

          
          minHeight: 120,
          boxShadow: "0 2px 8px 0 rgba(60,72,88,.08)",
          padding: "1.5rem",
        }}
      >
        <div className="d-flex justify-content-between align-items-start mb-2">
          <div>
            <div className="  fw-semibold mb-2"
              // style={{
                
              //   fontWeight: 600,
              //   fontSize: 16,
              //   marginBottom: 2,
              // }}
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
          <span className="border-0 p-2 rounded-full bg-[#e0edff]">{stat?.icon}</span>
        </div>
      </div>
            {/* </Link> */}
          </div>
        ))}
      </div>


      <div className="stats-card p-3 mb-4 shadow rounded-3 ">
        <h6 className="mb-3">Quick Actions</h6>
        <div className="d-flex flex-column gap-3">
          <Link to="/SWMSStepper">
            <button className="btn btn-primary d-flex align-items-center gap-2 shadow-sm p-3 w-100 rounded-3">
              <BsPlusCircle className="text-white" />
              <span>Add New SWMS</span>
            </button>
          </Link>
          <Link to="/AddIncidentReports">
            {" "}
            <button
              className="btn w-100 btn-warning text-white d-flex align-items-center gap-2 shadow-sm p-3 rounded-3"
              // onClick={handleUploadDocument}
            >
              <BsUpload className="text-white" />
              <span>Upload Incident Report</span>
            </button>
          </Link>
          <button
            className="btn btn-success d-flex align-items-center gap-2 shadow-sm p-3 rounded-3"
            // onClick={handleAssignUser}
          >
            <BsPersonPlus className="text-white" />
            <span>Assign User</span>
          </button>
        </div>
      </div>

      <div className="stats-card p-3 mb-4 shadow-sm rounded-3">
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

      <div className="row">
        <div className="col-lg-8 mb-4">
          <div className="chart-container p-4 shadow-sm rounded-3 ">
            <h6 className="mb-4">Safety Performance</h6>
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
    </div>
  );
}

export default SafetyComplianceDashboard;
