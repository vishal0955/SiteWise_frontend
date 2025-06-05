import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { Bell, User, Calendar, AlertTriangle, CheckCircle, Clock, TrendingUp, TrendingDown, Activity, Users, Building, Shield } from 'lucide-react';

const D = () => {
  // Sample data
  const safetyPerformanceData = [
    { month: 'Jan', incidents: 5, nearMisses: 12, compliance: 23 },
    { month: 'Feb', incidents: 8, nearMisses: 15, compliance: 29 },
    { month: 'Mar', incidents: 3, nearMisses: 10, compliance: 25 },
    { month: 'Apr', incidents: 6, nearMisses: 8, compliance: 24 },
    { month: 'May', incidents: 4, nearMisses: 14, compliance: 28 },
    { month: 'Jun', incidents: 2, nearMisses: 7, compliance: 26 },
  ];

  const projectProgressData = [
    { phase: 'Planning', completed: 100, total: 100 },
    { phase: 'Foundation', completed: 100, total: 100 },
    { phase: 'Structure', completed: 72, total: 100 },
    { phase: 'Finishing', completed: 0, total: 100 },
  ];

  const defectStatusData = [
    { name: 'Resolved', value: 45, color: '#28a745' },
    { name: 'Open', value: 30, color: '#dc3545' },
    { name: 'In Progress', value: 15, color: '#ffc107' },
    { name: 'Reopened', value: 10, color: '#17a2b8' },
  ];

  const incidentsByHazardData = [
    { hazard: 'Burns', count: 35 },
    { hazard: 'Caught in Between', count: 29 },
    { hazard: 'Explosion', count: 8 },
    { hazard: 'Overexertion', count: 6 },
    { hazard: 'Electrical', count: 2 },
    { hazard: 'Struck By', count: 1 },
    { hazard: 'Fall', count: 1 },
  ];

  const monthlyProductivityData = [
    { month: 'Jan', productivity: 85, efficiency: 78 },
    { month: 'Feb', productivity: 89, efficiency: 82 },
    { month: 'Mar', productivity: 92, efficiency: 85 },
    { month: 'Apr', productivity: 88, efficiency: 80 },
    { month: 'May', productivity: 95, efficiency: 88 },
    { month: 'Jun', productivity: 93, efficiency: 86 },
  ];

  const equipmentStatusData = [
    { name: 'Operational', value: 65, color: '#28a745' },
    { name: 'Maintenance', value: 20, color: '#ffc107' },
    { name: 'Out of Service', value: 10, color: '#dc3545' },
    { name: 'Standby', value: 5, color: '#6c757d' },
  ];

  return (
    <div className="min-vh-100" style={{ backgroundColor: '#f8f9fa' }}>
      {/* Navigation */}
      

      <div className="container-fluid px-4 py-4">
        {/* Header */}
        <div className="row mb-4">
          <div className="col">
            <h2 className="fw-bold text-dark mb-1">Dashboard</h2>
            <p className="text-muted mb-0">Welcome back, John. Here's what's happening today.</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="row mb-4">
          <div className="col-lg-3 col-md-6 mb-3">
            <div className="card h-100 border border-primary" style={{ borderWidth: '2px !important' }}>
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <h6 className="text-muted mb-2">Active Projects</h6>
                    <h2 className="fw-bold text-primary mb-1">12</h2>
                    <small className="text-success">
                      <TrendingUp size={14} className="me-1" />
                      8% from last month
                    </small>
                  </div>
                  <div className="p-2 bg-primary bg-opacity-10 rounded">
                    <Building className="text-primary" size={24} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-lg-3 col-md-6 mb-3">
            <div className="card h-100 border border-success" style={{ borderWidth: '2px !important' }}>
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <h6 className="text-muted mb-2">Open Tasks</h6>
                    <h2 className="fw-bold text-success mb-1">64</h2>
                    <small className="text-success">
                      <TrendingUp size={14} className="me-1" />
                      12% from last week
                    </small>
                  </div>
                  <div className="p-2 bg-success bg-opacity-10 rounded">
                    <Activity size={24} className="text-success" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 mb-3">
            <div className="card h-100 border border-warning" style={{ borderWidth: '2px !important' }}>
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <h6 className="text-muted mb-2">Safety Incidents</h6>
                    <h2 className="fw-bold text-warning mb-1">3</h2>
                    <small className="text-danger">
                      <TrendingDown size={14} className="me-1" />
                      25% from last month
                    </small>
                  </div>
                  <div className="p-2 bg-warning bg-opacity-10 rounded">
                    <Shield size={24} className="text-warning" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 mb-3">
            <div className="card h-100 border border-danger" style={{ borderWidth: '2px !important' }}>
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <h6 className="text-muted mb-2">Overdue Milestones</h6>
                    <h2 className="fw-bold text-danger mb-1">7</h2>
                    <small className="text-danger">
                      <TrendingUp size={14} className="me-1" />
                      15% from last week
                    </small>
                  </div>
                  <div className="p-2 bg-danger bg-opacity-10 rounded">
                    <Clock size={24} className="text-danger" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Project Overview */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="card shadow-sm">
              <div className="card-header bg-white">
                <h5 className="mb-0 fw-bold">Project Overview</h5>
              </div>
              <div className="card-body">
                <div className="mb-4">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="text-muted">Overall Progress</span>
                    <span className="fw-bold">68%</span>
                  </div>
                  <div className="progress" style={{ height: '8px' }}>
                    <div className="progress-bar bg-primary" style={{ width: '68%' }}></div>
                  </div>
                </div>
                
                <div className="row text-center">
                  {projectProgressData.map((phase, index) => (
                    <div key={index} className="col-3">
                      <div className="mb-2">
                        <div className={`rounded-circle mx-auto mb-2 d-flex align-items-center justify-content-center ${
                          phase.completed === 100 ? 'bg-success' : phase.completed > 0 ? 'bg-warning' : 'bg-secondary'
                        }`} style={{ width: '12px', height: '12px' }}>
                        </div>
                        <h6 className="mb-1">{phase.phase}</h6>
                        <span className="fw-bold">{phase.completed}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="row mb-4">
          <div className="col-lg-6 mb-3">
            <div className="card shadow-sm h-100 border-start border-danger border-4">
              <div className="card-body">
                <div className="d-flex">
                  <div className="p-2 bg-danger bg-opacity-10 rounded me-3">
                    <AlertTriangle className="text-danger" size={20} />
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1">Safety Inspection Required</h6>
                    <p className="text-muted mb-2">West Tower scaffolding needs immediate inspection before work can continue.</p>
                    <small className="text-danger fw-bold">High Priority • Due Today</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-lg-6 mb-3">
            <div className="card shadow-sm h-100 border-start border-warning border-4">
              <div className="card-body">
                <div className="d-flex">
                  <div className="p-2 bg-warning bg-opacity-10 rounded me-3">
                    <Clock className="text-warning" size={20} />
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1">Equipment Maintenance</h6>
                    <p className="text-muted mb-2">Tower crane #3 scheduled for routine maintenance in 2 days.</p>
                    <small className="text-warning fw-bold">Medium Priority • Due Jun 2</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="row mb-4">
          {/* Safety Performance */}
          <div className="col-lg-8 mb-4">
            <div className="card shadow-sm h-100">
              <div className="card-header bg-white">
                <h5 className="mb-0 fw-bold">Safety Performance</h5>
              </div>
              <div className="card-body">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={safetyPerformanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="incidents" fill="#dc3545" name="Incidents" />
                    <Bar dataKey="nearMisses" fill="#ffc107" name="Near Misses" />
                    <Bar dataKey="compliance" fill="#28a745" name="Compliance" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Defect Status */}
          <div className="col-lg-4 mb-4">
            <div className="card shadow-sm h-100">
              <div className="card-header bg-white">
                <h5 className="mb-0 fw-bold">Defect Status</h5>
              </div>
              <div className="card-body">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={defectStatusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      dataKey="value"
                    >
                      {defectStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-3">
                  {defectStatusData.map((item, index) => (
                    <div key={index} className="d-flex justify-content-between align-items-center mb-2">
                      <div className="d-flex align-items-center">
                        <div className="rounded-circle me-2" style={{ width: '12px', height: '12px', backgroundColor: item.color }}></div>
                        <span className="small">{item.name}</span>
                      </div>
                      <span className="fw-bold">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Charts Row */}
        <div className="row mb-4">
          {/* Incidents by Hazard */}
          <div className="col-lg-6 mb-4">
            <div className="card shadow-sm h-100">
              <div className="card-header bg-white">
                <h5 className="mb-0 fw-bold">Incidents by Hazard</h5>
              </div>
              <div className="card-body">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={incidentsByHazardData} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="hazard" type="category" width={80} />
                    <Tooltip />
                    <Bar dataKey="count" fill="#6f42c1" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Monthly Productivity */}
          <div className="col-lg-6 mb-4">
            <div className="card shadow-sm h-100">
              <div className="card-header bg-white">
                <h5 className="mb-0 fw-bold">Monthly Productivity & Efficiency</h5>
              </div>
              <div className="card-body">
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={monthlyProductivityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="productivity" stackId="1" stroke="#0d6efd" fill="#0d6efd" fillOpacity={0.6} />
                    <Area type="monotone" dataKey="efficiency" stackId="2" stroke="#20c997" fill="#20c997" fillOpacity={0.6} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* Equipment Status and Additional Info */}
        <div className="row">
          <div className="col-lg-4 mb-4">
            <div className="card shadow-sm h-100">
              <div className="card-header bg-white">
                <h5 className="mb-0 fw-bold">Equipment Status</h5>
              </div>
              <div className="card-body">
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={equipmentStatusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      dataKey="value"
                    >
                      {equipmentStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-3">
                  {equipmentStatusData.map((item, index) => (
                    <div key={index} className="d-flex justify-content-between align-items-center mb-2">
                      <div className="d-flex align-items-center">
                        <div className="rounded-circle me-2" style={{ width: '12px', height: '12px', backgroundColor: item.color }}></div>
                        <span className="small">{item.name}</span>
                      </div>
                      <span className="fw-bold">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-8">
            <div className="row">
              <div className="col-md-6 mb-4">
                <div className="card shadow-sm border-start border-info border-4">
                  <div className="card-body">
                    <div className="d-flex">
                      <div className="p-2 bg-info bg-opacity-10 rounded me-3">
                        <Calendar className="text-info" size={20} />
                      </div>
                      <div>
                        <h6 className="fw-bold mb-1">Material Delivery</h6>
                        <p className="text-muted mb-2">Concrete delivery scheduled for tomorrow at 8:00 AM. Prepare unloading area.</p>
                        <small className="text-info fw-bold">Normal Priority • Due Jun 1</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-6 mb-4">
                <div className="card shadow-sm border-start border-success border-4">
                  <div className="card-body">
                    <div className="d-flex">
                      <div className="p-2 bg-success bg-opacity-10 rounded me-3">
                        <CheckCircle className="text-success" size={20} />
                      </div>
                      <div>
                        <h6 className="fw-bold mb-1">Inspection Passed</h6>
                        <p className="text-muted mb-2">Electrical wiring inspection for East Tower has been approved.</p>
                        <small className="text-success fw-bold">Completed • May 30</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12">
                <div className="card shadow-sm">
                  <div className="card-body">
                    <div className="row text-center">
                      <div className="col-3">
                        <div className="border rounded p-3">
                          <Users className="text-primary mb-2" size={24} />
                          <h5 className="fw-bold mb-1">245</h5>
                          <small className="text-muted">Active Workers</small>
                        </div>
                      </div>
                      <div className="col-3">
                        <div className="border rounded p-3">
                          <Building className="text-success mb-2" size={24} />
                          <h5 className="fw-bold mb-1">8</h5>
                          <small className="text-muted">Sites</small>
                        </div>
                      </div>
                      <div className="col-3">
                        <div className="border rounded p-3">
                          <Activity className="text-warning mb-2" size={24} />
                          <h5 className="fw-bold mb-1">92%</h5>
                          <small className="text-muted">Efficiency</small>
                        </div>
                      </div>
                      <div className="col-3">
                        <div className="border rounded p-3">
                          <Shield className="text-info mb-2" size={24} />
                          <h5 className="fw-bold mb-1">15</h5>
                          <small className="text-muted">Days Safe</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default D;