import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';


function ReportAnalytics() {
    const trendChartRef = useRef(null);
    const incidentChartRef = useRef(null);
  
    const trendChartInstance = useRef(null);
    const incidentChartInstance = useRef(null);
  
    useEffect(() => {
      // Cleanup existing charts
      if (trendChartInstance.current) trendChartInstance.current.destroy();
      if (incidentChartInstance.current) incidentChartInstance.current.destroy();
  
      // Line Chart
      if (trendChartRef.current) {
        trendChartInstance.current = new Chart(trendChartRef.current, {
          type: 'line',
          data: {
            labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [
              {
                label: 'Safety Score',
                data: [92, 91, 92, 93, 94, 95],
                borderColor: '#3182CE',
                backgroundColor: 'rgba(49, 130, 206, 0.1)',
                pointBackgroundColor: '#3182CE',
                tension: 0.3,
                borderWidth: 2,
                fill: false
              },
              {
                label: 'Quality Score',
                data: [86, 87, 88, 89, 90, 91],
                borderColor: '#805AD5',
                backgroundColor: 'rgba(128, 90, 213, 0.1)',
                pointBackgroundColor: '#805AD5',
                tension: 0.3,
                borderWidth: 2,
                fill: false
              },
              {
                label: 'Progress Rate',
                data: [84, 85, 86, 87, 88, 89],
                borderColor: '#F6AD55',
                backgroundColor: 'rgba(246, 173, 85, 0.1)',
                pointBackgroundColor: '#F6AD55',
                tension: 0.3,
                borderWidth: 2,
                fill: false
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { position: 'bottom' }, tooltip: { enabled: false } },
            scales: {
              y: {
                min: 80,
                max: 100,
                ticks: {
                  callback: val => val + '%',
                  color: '#6c757d',
                  font: { size: 12 }
                },
                grid: { color: '#e9ecef' }
              },
              x: {
                ticks: { color: '#6c757d', font: { size: 12 } },
                grid: { display: false }
              }
            }
          }
        });
      }
  
      // Doughnut Chart
      if (incidentChartRef.current) {
        incidentChartInstance.current = new Chart(incidentChartRef.current, {
          type: 'doughnut',
          data: {
            labels: ['Falls', 'Equipment', 'Electrical', 'Chemical', 'Vehicle', 'Other'],
            datasets: [{
              data: [22, 18, 16, 14, 12, 18],
              backgroundColor: ['#3182CE', '#805AD5', '#F6AD55', '#38A169', '#E53E3E', '#A0AEC0'],
              borderWidth: 0
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '70%',
            plugins: { legend: { display: false }, tooltip: { enabled: false } }
          }
        });
      }
      const color = [ "primary", "success", "warning", "danger", "info", "dark" ];

      return () => {
        if (trendChartInstance.current) trendChartInstance.current.destroy();
        if (incidentChartInstance.current) incidentChartInstance.current.destroy();
      };
    }, []);
  
    const stats = [
      {
        title: "Safety Compliance",
        value: "98%",
        subtitle: "↑ 2% from last month",
        icon: <i className="fa-solid fa-shield-halved" style={{ fontSize: 22 }}></i>,
      },
      {
        title: "Open Incidents",
        value: "5",
        subtitle: "↓ 3 from last month",
        icon: <i className="fa-solid fa-triangle-exclamation" style={{  fontSize: 22 }}></i>,
      },
      {
        title: "Quality Score",
        value: "92%",
        subtitle: "↑ 1% from last month",
        icon: <i className="fa-solid fa-star" style={{  fontSize: 22 }}></i>,
      },
      {
        title: "Project Progress",
        value: "78%",
        subtitle: "On Schedule",
        icon: <i className="fa-solid fa-chart-line" style={{  fontSize: 22 }}></i>,
      },
    ];
  
  return (
<Container fluid className="py-4 bg-white">
  {/* Header */}
  <Row className="px-3 px-md-4 mb-4 g-2 align-items-center">
  {/* Heading */}
  <Col xs={12} md={6} className="text-center text-md-start">
    <h2 className="fw-bold mb-0">Reports & Analytics</h2>
  </Col>

  {/* Filters and Button */}
  <Col xs={12} md={6}>
    <div className="d-flex flex-wrap justify-content-center justify-content-md-end gap-2">
      <Form.Select className="border-0 shadow-sm w-auto" style={{ minWidth: '150px' }}>
        <option>Last 7 Days</option>
      </Form.Select>
      <Form.Select className="border-0 shadow-sm w-auto" style={{ minWidth: '150px' }}>
        <option>All Projects</option>
      </Form.Select>
      <Button variant="primary" className="shadow-sm text-nowrap">
        <i className="bi bi-download me-1" />
        Export Report
      </Button>
    </div>
  </Col>
</Row>


  {/* Top Stats */}
  <Row className="g-4 px-4 mb-4">
  {stats.map((stat, i) => (
    <div className="col-12 col-md-6 col-lg-3" key={i}>
      <div
        className="bg-white rounded-3 shadow-sm p-4 h-100 rounded-4 shadow-sm border"
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
            className="d-inline-flex align-items-center justify-content-center rounded-circle"
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
  </Row>

  {/* Charts */}
  <Row className="g-4 px-4 mb-4">
    <Col md={6}>
      <Card className="p-3 shadow-sm border-0">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="fw-bold mb-0">Trend Analysis</h4>
          <Form.Select className="w-auto" size="sm"><option>Last 6 Months</option></Form.Select>
        </div>
        <div style={{ height: '260px' }}>
          <canvas ref={trendChartRef}></canvas>
        </div>
      </Card>
    </Col>
    <Col md={6}>
      <Card className="p-3 shadow-sm border-0">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="fw-bold mb-0">Incident Distribution</h4>
          <Form.Select className="w-auto" size="sm"><option>By Category</option></Form.Select>
        </div>
        <div style={{ height: '260px' }}>
          <canvas ref={incidentChartRef}></canvas>
        </div>
        <div className="d-flex flex-wrap gap-3 mt-3">
          {['Falls', 'Equipment', 'Electrical', 'Chemical', 'Vehicle', 'Other'].map((label, i) => (
            <span key={label} className="d-flex align-items-center gap-2 small">
              <span style={{
                backgroundColor: ['#3182CE', '#805AD5', '#F6AD55', '#38A169', '#E53E3E', '#A0AEC0'][i],
                width: 12, height: 12, borderRadius: '50%', display: 'inline-block'
              }}></span>
              {label}
            </span>
          ))}
        </div>
      </Card>
    </Col>
  </Row>

  {/* Report Generator */}
  <Row className="px-4 mb-4">
    <Col>
      <Card className="p-4 shadow-sm border-0">
        <h4 className="fw-bold mb-4">Custom Report Generator</h4>
        <Row className="g-3">
          <Col md={4}>
            <Form.Label className="small mb-1">Report Type</Form.Label>
            <Form.Select><option>Safety Report</option></Form.Select>
          </Col>
          <Col md={4}>
            <Form.Label className="small mb-1">Date Range</Form.Label>
            <Form.Control placeholder="-/-" />
          </Col>
          <Col md={4}>
            <Form.Label className="small mb-1">Project</Form.Label>
            <Form.Select><option>All Projects</option></Form.Select>
            <div className="d-flex justify-content-end gap-2 mt-3">
              <Button variant="light" className="border">Preview</Button>
              <Button variant="primary">Generate Report</Button>
            </div>
          </Col>
        </Row>
      </Card>
    </Col>
  </Row>

  {/* Recent Reports */}
  <Row className="px-4">
    <Col>
      <Card className="p-4 shadow-sm border-0">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="fw-bold mb-0">Recent Reports</h4>
          <a href="#" className="text-primary small">View All</a>
        </div>
        {[
          ['Monthly Safety Report', 'Dec 1, 2023'],
          ['Quality Audit Report', 'Nov 28, 2023'],
        ].map(([title, date], index) => (
          <div key={index} className={`d-flex justify-content-between align-items-center py-3 ${index > 0 ? 'border-top' : ''}`}>
            <div>
              <strong>{title}</strong><br />
              <span className="text-muted small">Generated: {date}</span>
            </div>
            <div className="d-flex gap-2">
              <Button variant="outline-primary" size="sm">View</Button>
              <Button variant="outline-secondary" size="sm">Download</Button>
            </div>
          </div>
        ))}
      </Card>
    </Col>
  </Row>
</Container>

  )
}

export default ReportAnalytics
