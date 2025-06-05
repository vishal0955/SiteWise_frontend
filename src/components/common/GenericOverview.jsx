// components/common/GenericOverview.jsx
import React from 'react';

const GenericOverview = ({ 
  stats, 
  onCardClick, 
  activeFilter,
  icons = {} // Pass custom icons for each status
}) => {
  const getIcon = (filterValue) => {
    return icons[filterValue] || <i className="fas fa-chart-bar"></i>;
  };

  return (
    <div className="row g-3 mb-4">
      {stats.map((stat, idx) => (
        <div className="col-12 col-sm-6 col-md-6 col-lg-3" key={idx}>
          <div
            className={`overview-card shadow-sm rounded-4 border h-100 d-flex flex-column justify-content-between ${
              activeFilter === stat.filterValue ? 'border-primary bg-light' : ''
            }`}
            style={{
              minHeight: 120,
              boxShadow: "0 2px 8px 0 rgba(30, 30, 30, 0.1)",
              padding: "1.5rem",
              cursor: "pointer",
              transition: "all 0.3s ease",
              transform: activeFilter === stat.filterValue ? 'translateY(-2px)' : 'none'
            }}
            onClick={() => onCardClick(stat.filterValue)}
          >
            <div className="d-flex justify-content-between align-items-start mb-2">
              <div>
                <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 2 }}>
                  {stat.title}
                </div>
                <div style={{ fontWeight: 700, fontSize: 28, marginBottom: 2 }}>
                  {stat.number}
                </div>
                <div style={{ color: "#6c757d", fontSize: 14 }}>
                  {stat.subtitle}
                </div>
              </div>
              <span className={`border-0 p-2 rounded-full ${
                activeFilter === stat.filterValue 
                  ? 'bg-primary text-white' 
                  : 'bg-light text-primary'
              }`}>
                {stat.icon || getIcon(stat.filterValue)}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GenericOverview;