// SWMSAnalyticsSection.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { CheckCircle, Clock, AlertTriangle, Users, Activity, Check } from 'lucide-react';
import {
  User2,
  CalendarCheck,
  DollarSign,
  Briefcase,

} from 'lucide-react';
import Overview from '../../common/Overview';


const COLORS = ['#00C49F', '#FF8042', '#0088FE','#caba2d'];

const color = [ "primary", "success", "warning", "danger", "info", "dark" ];

const StatCard = ({ label, value }) => (
  <div className="bg-white rounded-2xl shadow p-4 md:w-1/5 text-center">
    <p className="text-sm text-gray-500">{label}</p>
    <h2 className="text-2xl font-bold text-blue-800">{value}</h2>
  </div>
);


const statsData = [
  {
    icon: <User2 size={16} />,        // patient icon
    title: 'Total Patients',
    value: 579,
    change: 15,
  },
  {
    icon: <CalendarCheck size={16} />, // appointment icon
    title: 'Total Appointment',
    value: 54,
    change: 10,
  },
  {
    icon: <DollarSign size={16} />,    // income icon
    title: 'Total Income',
    value: '$8,399.24',
    change: 28,
  },
  {
    icon: <Briefcase size={16} />,     // treatments icon
    title: 'Total Treatments',
    value: 112,
    change: 12,
  },
];


const stats = [
  {
    title: 'Total SWMS',
    number: 42,
    subtitle: 'Total number of SWMS created',
    color: 'blue',
    icon: <CheckCircle className="text-primary" />,
  },
 
  {
    title: 'Pending SWMS',
    number: 12,
    subtitle: 'SWMS pending review',
    color: 'yellow',
    icon:    <Clock className="text-primary"  />,
  }, 
  {
    title: 'Submitted ',
    number: 12,
    subtitle: 'SWMS pending review',
    color: 'yellow',
    icon: <Check className="text-primary"  />,
  },  
  {
    title: 'Approved ',
    number: 15,
    subtitle: 'SWMS approved and active',
    color: 'purple',
    icon: <AlertTriangle className="text-primary"  />,
  },

 
]




const SWMSAnalyticsSection = ({ statusFilter,setStatusFilter}) => {
const [analytics, setAnalytics] = useState(null);
const navigate = useNavigate();
    const handleCardClick = (status) => {
      setStatusFilter(status)

       document.querySelector('.swms-table')?.scrollIntoView({ behavior: 'smooth' });
     
  };

  // useEffect(() => {
  //   // Fetch analytics data from your backend
  //   fetch('/api/swms/analytics')
  //     .then(res => res.json())
  //     .then(data => setAnalytics(data))
  //     .catch(console.error);
  // }, []);

  useEffect(() => {
  
    const mockData = {
      totalSwms: 42,
      averageHazardsPerSwms: 3.7,
      statusBreakdown: {
        Pending: 12,
        Submitted: 15,
        Approved: 15,
      },
      complianceStatus: {
        Compliant: 25,
        NonCompliant: 10,
        UnderReview: 7,
      },
      commonHighRiskItems: [
        'Working at Heights',
        'Electrical Work',
        'Confined Spaces',
        'Asbestos Exposure',
        'Heavy Machinery'
      ]
    };
  
    setTimeout(() => {
      setAnalytics(mockData);
    }, 500);
  }, []);
  

  if (!analytics) return <div className="p-4">Loading analytics...</div>;

  const barData = Object.entries(analytics.statusBreakdown).map(([status, count]) => ({
    status,
    count
  }));

  const pieData = Object.entries(analytics.complianceStatus).map(([name, value]) => ({
    name,
    value
  }));

  return (
    <section className="  rounded-xl mt-4">

      <div className="flex gap-4 mb-8 mx-auto">

      </div>
      <Overview stats={ stats} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div className=" p-4 rounded-xl shadow-sm bg-white">
          <h3 className="text-md font-medium mb-2">SWMS by Status</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barData}>
              <XAxis dataKey="status" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#3182ce" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className=" p-4 rounded-xl shadow-sm bg-white">
          <h3 className="text-md font-medium mb-2">Compliance Breakdown</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                outerRadius={80}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Common High-Risk Hazards */}
      <div className="stats-card mt-8 p-4 rounded-xl shadow">
        <h3 className="text-md font-medium mb-3">Most Common High-Risk Hazards</h3>
        <ul className="list-disc pl-5 ">
          {analytics.commonHighRiskItems.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default SWMSAnalyticsSection;
