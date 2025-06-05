// components/common/GenericFilterBar.jsx
import React from 'react';
import { Row, Col, Form, InputGroup, Button } from 'react-bootstrap';
import { Search, Filter, X } from 'lucide-react';

const GenericFilterBar = ({ 
  searchQuery, 
  onSearchChange, 
  activeFilter, 
  onStatusChange, 
  statusOptions,
  searchPlaceholder = "Search...",
  showStatusFilter = true,
  extraFilters = null // For additional custom filters
}) => {
  return (
    <Row className="mb-4 g-3 align-items-center">
      {/* Search Input */}
      <Col md={4}>
        <InputGroup>
          <InputGroup.Text className="bg-white border-end-0">
            <Search size={18} className="text-muted" />
          </InputGroup.Text>
          <Form.Control
            type="text"
            placeholder={searchPlaceholder}
            value={searchQuery}
            onChange={onSearchChange}
            className="border-start-0 ps-0"
          />
        </InputGroup>
      </Col>
      
      {/* Status Filter */}
      {showStatusFilter && statusOptions && (
        <Col md={2}>
          <Form.Select
            value={activeFilter}
            onChange={(e) => onStatusChange(e.target.value)}
            className="border"
          >
            <option value="all">All Status</option>
            {statusOptions.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </Form.Select>
        </Col>
      )}

      {/* Extra Filters */}
      {extraFilters && (
        <Col md={3}>
          {extraFilters}
        </Col>
      )}

      {/* Active Filter Display */}
      {activeFilter !== 'all' && (
        <Col md={3}>
          <div className="d-flex align-items-center">
            <span className="text-muted me-2">Filtered by:</span>
            <span className="badge bg-primary me-2">{activeFilter}</span>
            <Button 
              variant="outline-secondary"
              size="sm"
              onClick={() => onStatusChange('all')}
              className="d-flex align-items-center"
            >
              <X size={14} className="me-1" />
              Clear
            </Button>
          </div>
        </Col>
      )}
    </Row>
  );
};

export default GenericFilterBar;