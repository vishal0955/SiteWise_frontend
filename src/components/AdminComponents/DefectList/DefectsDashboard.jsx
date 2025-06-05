import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, LineChart, Line, CartesianGrid, Legend, ResponsiveContainer } from "recharts";
import { FaBug, FaExclamationCircle, FaCheckCircle, FaClock, FaTimesCircle } from "react-icons/fa"; // Add at the top

const StatCard = ({ colorClass, title, value, changeText, icon }) => {
  return (
    <div className={`card p-3 ${colorClass}`} style={{ width: '10rem', height: '12rem' }}>
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <h6 className="text-muted mb-1">{title}</h6>
          <h2 className="fw-bold">{value}</h2>
          <p className="text-muted small mb-0">{changeText}</p>
        </div>
        <div className="fs-2">{icon}</div>
      </div>
    </div>
  );
};

const tradeData = [
  { name: "Electrical", value: 30 },
  { name: "Plumbing", value: 25 },
  { name: "Civil", value: 40 },
];

const locationData = [
  { name: "Block A", value: 20 },
  { name: "Block B", value: 35 },
  { name: "Block C", value: 15 },
];

const trendData = [
  { week: "Week 1", defects: 12 },
  { week: "Week 2", defects: 18 },
  { week: "Week 3", defects: 10 },
  { week: "Week 4", defects: 15 },
];

const color = ["primary", "success", "warning", "danger", "info", "dark"];

const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

const stats = [
  {
    icon: <FaBug size={28} className="text-primary " />,
    title: "Total Defects",
    number: 120,
    subtitle: "vs last month: 102 ↑",
    color: "primary",
  },
  {
    icon: <FaExclamationCircle size={28} className="text-primary " />,
    title: "Open Defects",
    number: 55,
    subtitle: "vs last month: 55% ↓",
    color: "warning",
  },
  {
    icon: <FaCheckCircle size={28} className="text-primary " />,
    title: "Resolved This Week",
    number: 18,
    subtitle: "vs last week: 14 ↑",
    color: "success",
  },
  {
    icon: <FaClock size={28} className="text-primary " />,
    title: "Avg. Time to Close",
    number: 3.8,
    subtitle: "vs last month: 4.1 ↓",
    color: "info",
  },
  {
    icon: <FaTimesCircle size={28} className="text-primary " />,
    title: "Overdue Defects",
    number: 9,
    subtitle: "vs last month: 5 ↑",
    color: "danger",
  },
];

const DefectsDashboard = () => {
  return (
    <div className="p-4 space-y-8">
   



      <div className="row g-3 mb-4">
        {stats.map((stat, idx) => (
       
           <div className="col-12 col-sm-6 col-md-6 col-lg-4" key={idx}>
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

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Pie Chart by Trade */}
        <div className="bg-white p-4 rounded-2xl shadow-sm">
          <h3 className="mb-2 font-semibold text-lg">Breakdown by Trade</h3>
          <div className="flex justify-center items-center h-64">
            <PieChart width={300} height={250}>
              <Pie
                data={tradeData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {tradeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </div>
        </div>


        {/* Pie Chart by Location */}
        <div className="bg-white p-4 rounded-2xl shadow-sm">
          <h3 className="mb-2 font-semibold text-lg">Breakdown by Location</h3>
          <div className="flex justify-center items-center h-64">
            <PieChart width={300} height={250}>
              <Pie data={locationData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#82ca9d" label>
                {locationData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </div>
        </div>

        {/* Trendline Chart */}
        <div className="bg-white p-4 rounded-2xl shadow-sm">
          <h3 className="mb-3 fw-semibold fs-5">Defect Trend Over Time</h3>
          <div style={{ width: '100%', height: 250 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="defects" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DefectsDashboard;