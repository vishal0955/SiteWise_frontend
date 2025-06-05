import { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';
import { AlertTriangle, TrendingUp, CheckCircle, Clock, FileText, Calendar } from 'lucide-react';

export default function SafetyAnalyticsPanel() {


  const color = [ "primary", "success", "warning", "danger", "info", "dark" ];
 
  const [analyticsData, setAnalyticsData] = useState({
    totalReports: 143,
    openCases: 23,
    closedCases: 120,
    averageResolutionDays: 7.2,
    incidentsByCategory: [
      { name: 'Falls', value: 42 },
      { name: 'Electrical', value: 28 },
      { name: 'Machinery', value: 35 },
      { name: 'Manual Handling', value: 21 },
      { name: 'Chemical', value: 17 }
    ],
    incidentTrends: [
      { month: 'Jan', incidents: 12 },
      { month: 'Feb', incidents: 15 },
      { month: 'Mar', incidents: 18 },
      { month: 'Apr', incidents: 13 },
      { month: 'May', incidents: 22 },
      { month: 'Jun', incidents: 17 },
      { month: 'Jul', incidents: 16 },
      { month: 'Aug', incidents: 14 },
      { month: 'Sep', incidents: 11 },
      { month: 'Oct', incidents: 5 }
    ],
    severityDistribution: [
      { name: 'Low', value: 56 },
      { name: 'Medium', value: 48 },
      { name: 'High', value: 31 },
      { name: 'Critical', value: 8 }
    ],
    incidentsByLocation: [
      { name: 'Site A', value: 43 },
      { name: 'Site B', value: 38 },
      { name: 'Site C', value: 29 },
      { name: 'Site D', value: 19 },
      { name: 'Other', value: 14 }
    ],
    resolutionTime: [
      { day: '1-2', count: 48 },
      { day: '3-5', count: 35 },
      { day: '6-10', count: 22 },
      { day: '11-20', count: 28 },
      { day: '21+', count: 10 }
    ]
  });

  const categoryColors = ['#4299e1', '#f6ad55', '#fc8181', '#68d391', '#9f7aea'];
  const severityColors = ['#68d391', '#f6ad55', '#fc8181', '#e53e3e'];
  const statusColors = ['#4299e1', '#a0aec0'];

  // Calculate percentages
  const percentClosed = Math.round((analyticsData.closedCases / analyticsData.totalReports) * 100);
  const percentOpen = 100 - percentClosed;

  // Find most common incident type
  const mostCommonIncident = [...analyticsData.incidentsByCategory].sort((a, b) => b.value - a.value)[0];

  return (
    <div className=" p-4 md:p-6 rounded-lg shadow-sm border border-gray-200 mt-8 mb-4">
    
      <div className="row g-3 mb-4">

  <div className="col-12 col-sm-6 col-md-6 col-lg-3">
    <div className="bg-white rounded-4 shadow-sm p-4 h-100 border" style={{ minHeight: 150, boxShadow: "0 4px 16px 0 #e5e7eb" }}>
      <div className="d-flex justify-content-between align-items-start" >
        <div>
          <div className="fw-bold mb-2" style={{ fontSize: "1.05rem" }}>
            Total Incidents
          </div>
          <div className="fw-bold" style={{ fontSize: "2rem", color: "#222", lineHeight: 1.1 }}>
            {analyticsData.totalReports}
          </div>
          <div className="mt-2" style={{ color: "#16a34a", fontSize: "1rem" }}>
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
          <FileText size={22} color="#3490fa" />
        </span>
      </div>
    </div>
  </div>
  {/* Most Common Incident */}
  <div className="col-12 col-sm-6 col-md-6 col-lg-3">
    <div className="bg-white rounded-4 shadow-sm p-4 h-100 border" style={{ minHeight: 150, boxShadow: "0 4px 16px 0 #e5e7eb" }}>
      <div className="d-flex justify-content-between align-items-start">
        <div>
          <div className="fw-bold mb-2" style={{ fontSize: "1.05rem" }}>
            Most Common Incident
          </div>
          <div className="fw-bold" style={{ fontSize: "2rem", lineHeight: 1.1 }}>
            {mostCommonIncident.value}
          </div>
          <div className="mt-2" style={{ color: "#16a34a", fontSize: "1rem" }}>
            {mostCommonIncident.name}
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
          <AlertTriangle size={22} color="#3490fa" />
        </span>
      </div>
    </div>
  </div>
  {/* Case Resolution */}
  <div className="col-12 col-sm-6 col-md-6 col-lg-3">
    <div className="bg-white rounded-4 shadow-sm p-4 h-100 border" style={{ minHeight: 150, boxShadow: "0 4px 16px 0 #e5e7eb" }}>
      <div className="d-flex justify-content-between align-items-start">
        <div>
          <div className="fw-bold mb-2" style={{ fontSize: "1.05rem" }}>
            Case Resolution
          </div>
          <div className="fw-bold" style={{ fontSize: "2rem",  lineHeight: 1.1 }}>
            {percentClosed}%
          </div>
          <div className="mt-2" style={{ color: "#16a34a", fontSize: "1rem" }}>
            {analyticsData.closedCases} of {analyticsData.totalReports}
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
          <CheckCircle size={22} color="#3490fa" />
        </span>
      </div>
    </div>
  </div>
  {/* Resolution Time */}
  <div className="col-12 col-sm-6 col-md-6 col-lg-3">
    <div className="bg-white rounded-4 shadow-sm p-4 h-100 border" style={{ minHeight: 150, boxShadow: "0 4px 16px 0 #e5e7eb" }}>
      <div className="d-flex justify-content-between align-items-start">
        <div>
          <div className="fw-bold mb-2" style={{ fontSize: "1.05rem" }}>
            Resolution Time
          </div>
          <div className="fw-bold" style={{ fontSize: "2rem",  lineHeight: 1.1 }}>
            {analyticsData.averageResolutionDays}
          </div>
          <div className="mt-2" style={{ color: "#16a34a", fontSize: "1rem" }}>
            days
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
          <Clock size={22} color="#3490fa" />
        </span>
      </div>
    </div>
  </div>
</div>
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Incidents by Category */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <h4 className="text-md font-semibold text-gray-700 mb-4">Incidents by Category</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analyticsData.incidentsByCategory} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={80} />
                <Tooltip />
                <Bar dataKey="value" fill="#4299e1" radius={[0, 4, 4, 0]}>
                  {analyticsData.incidentsByCategory.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={categoryColors[index % categoryColors.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Monthly Trends */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <h4 className="text-md font-semibold text-gray-700 mb-4">Monthly Incident Trends</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analyticsData.incidentTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="incidents" stroke="#4299e1" fill="#ebf5ff" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Case Status */}
        <div className="bg-white p-2  rounded-lg shadow-sm border border-gray-100">
          <h4 className="text-md font-semibold text-gray-700 mb-4">Case Status</h4>
          <div className="h-64 flex flex-col items-center justify-center">
            <ResponsiveContainer width="100%" height="80%">
              <PieChart>
                <Pie
                  data={[
                    { name: 'Closed', value: analyticsData.closedCases },
                    { name: 'Open', value: analyticsData.openCases }
                  ]}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  <Cell fill="#4299e1" />
                  <Cell fill="#a0aec0" />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-4 mt-2">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-1"></div>
                <span className="text-xs text-gray-600">Closed ({percentClosed}%)</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-gray-400 rounded-full mr-1"></div>
                <span className="text-xs text-gray-600">Open ({percentOpen}%)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Incident Severity */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <h4 className="text-md font-semibold text-gray-700 mb-4">Incident Severity</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="80%">
              <PieChart>
                <Pie
                  data={analyticsData.severityDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {analyticsData.severityDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={severityColors[index % severityColors.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Resolution Time */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <h4 className="text-md font-semibold text-gray-700 mb-4">Resolution Time (Days)</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analyticsData.resolutionTime}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#9f7aea" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}