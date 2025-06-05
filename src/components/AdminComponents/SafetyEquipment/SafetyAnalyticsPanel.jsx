import { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';
import { AlertTriangle, TrendingUp, CheckCircle, Clock, FileText, Calendar } from 'lucide-react';

export default function SafetyAnalyticsPanel() {
  // Mock data - In a real app, this would come from your API
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
    <div className="bg-gray-50 p-4 md:p-6 rounded-lg shadow-sm border border-gray-200 mt-8">
      <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
        <TrendingUp size={20} className="mr-2 text-blue-600" />
        Safety Analytics Dashboard
      </h2>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Total Incidents</p>
              <p className="text-2xl font-bold text-gray-800">{analyticsData.totalReports}</p>
            </div>
            <FileText size={20} className="text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Most Common</p>
              <p className="text-2xl font-bold text-gray-800">{mostCommonIncident.name}</p>
              <p className="text-xs text-gray-500">{mostCommonIncident.value} incidents</p>
            </div>
            <AlertTriangle size={20} className="text-orange-500" />
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Case Resolution</p>
              <p className="text-2xl font-bold text-gray-800">{percentClosed}% Closed</p>
              <p className="text-xs text-gray-500">{analyticsData.closedCases} of {analyticsData.totalReports}</p>
            </div>
            <CheckCircle size={20} className="text-green-500" />
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Avg. Resolution Time</p>
              <p className="text-2xl font-bold text-gray-800">{analyticsData.averageResolutionDays} days</p>
            </div>
            <Clock size={20} className="text-purple-500" />
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Incidents by Category */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-md font-semibold text-gray-700 mb-4">Incidents by Category</h3>
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
          <h3 className="text-md font-semibold text-gray-700 mb-4">Monthly Incident Trends</h3>
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Case Status */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-md font-semibold text-gray-700 mb-4">Case Status</h3>
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
                  innerRadius={60}
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
          <h3 className="text-md font-semibold text-gray-700 mb-4">Incident Severity</h3>
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
          <h3 className="text-md font-semibold text-gray-700 mb-4">Resolution Time (Days)</h3>
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