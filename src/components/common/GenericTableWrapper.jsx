// components/common/GenericTableWrapper.jsx
import React from 'react';
import { Card, Button } from 'react-bootstrap';

const GenericTableWrapper = ({
  title,
  activeFilter,
  children, // Table content
  currentPage,
  totalPages,
  onPageChange,
  filteredDataLength,
  loading = false,
  className = ""
}) => {
  return (
    <Card className={`mb-5 border-0 shadow-sm filtered-table ${className}`}>
      <Card.Header className="bg-white py-3 border-0">
        <div className="row align-items-center g-3">
          <div className="col-12">
            <h4 className="mb-0 fw-semibold">
              {title}
              {activeFilter !== 'all' && (
                <span className="badge bg-primary ms-2">
                  Filtered by: {activeFilter}
                </span>
              )}
            </h4>
          </div>
        </div>
      </Card.Header>
      
      <Card.Body className="p-2">
        {children}

        {/* Pagination */}
        {!loading && filteredDataLength > 0 && totalPages > 1 && (
          <div className="d-flex justify-content-end my-3 align-items-center gap-2">
            <Button
              size="sm"
              variant="outline-secondary"
              onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>

            {[...Array(totalPages)].map((_, idx) => (
              <Button
                key={idx}
                size="sm"
                variant={currentPage === idx + 1 ? "primary" : "outline-secondary"}
                onClick={() => onPageChange(idx + 1)}
              >
                {idx + 1}
              </Button>
            ))}

            <Button
              size="sm"
              variant="outline-secondary"
              onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default GenericTableWrapper;