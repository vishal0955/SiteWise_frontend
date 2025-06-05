import React from 'react';
import { Row, Col, Form, InputGroup } from 'react-bootstrap';
import { Search, Filter } from 'lucide-react';

const TableFilterBar = ({ 
  searchQuery, 
  onSearchChange, 
  statusFilter, 
  onStatusChange, 
  statusOptions,
  activeFilter // Add this prop
}) => {
  return (
    <Row className="mb-4 g-3">
      <Col md={3}>
        <InputGroup>
          <InputGroup.Text className="bg-white border-end-0">
            <Search size={18} className="text-muted" />
          </InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={onSearchChange}
            className="border-start-0 ps-0"
          />
        </InputGroup>
      </Col>
      
      {statusOptions && (
        <Col md={2}>
          <Form.Select
            value={activeFilter} // Use activeFilter instead of statusFilter
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

    
    </Row>
  );
};

export default TableFilterBar;