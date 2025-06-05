import React from 'react';

const Overview = ({ stats, onStatusClick, activeStatus }) => {
  return (
    <div>
      <div className="row g-3 mb-4">
        {stats.map((stat, idx) => (
          <div className="col-12 col-sm-6 col-md-6 col-lg-3" key={idx}>
            <div
              className={`overview-card shadow-sm rounded-4 border h-100 d-flex flex-column justify-content-between ${
                activeStatus === stat.filterValue ? 'border-primary' : ''
              }`}
              style={{
                minHeight: 120,
                boxShadow: "0 2px 8px 0 #1E1E1E",
                padding: "1.5rem",
                cursor: "pointer",
                transition: "all 0.3s ease"
              }}
              onClick={() => onStatusClick(stat.filterValue)}
            >
              <div className="d-flex justify-content-between align-items-start mb-2">
                <div>
                  <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 2 }}>
                    {stat.title}
                  </div>
                  <div style={{ fontWeight: 700, fontSize: 28, marginBottom: 2 }}>
                    {stat.number}
                  </div>
                  <div style={{ color: "#1b8a3a", fontSize: 14 }}>
                    {stat.subtitle}
                  </div>
                </div>
                <span className={`border-0 p-2 rounded-full ${
                  activeStatus === stat.filterValue ? 'bg-primary text-white' : 'bg-[#e0edff] text-primary'
                }`}>
                  {stat.icon}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Overview;
