import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDriveUpload } from '../../hooks/useDriveUpload';

const FileUpload = ({
  label = 'Upload File',
  accept,
  value,
  onChange,
  allowMultiple = false,
  name,
  error,
  required = false
}) => {
  const handleFileChange = (e) => {
    const files = allowMultiple ? 
      Array.from(e.target.files) : 
      e.target.files[0];
    
    onChange({
      target: {
        name,
        value: files,
        source: 'local'
      }
    });
  };

  const { openDrivePicker, loading } = useDriveUpload({
    onSelect: (files) => {
      onChange({
        target: {
          name,
          value: files,
          source: 'drive'
        }
      });
    },
    allowMultiple,
    fileTypes: accept ? accept.split(',') : []
  });

  return (
    <Form.Group className="mb-3">
      <Form.Label>{label}</Form.Label>
      <div className="d-flex gap-2">
        <Form.Control
          type="file"
          onChange={handleFileChange}
          accept={accept}
          multiple={allowMultiple}
          required={required}
          className={error ? 'is-invalid' : ''}
        />
        <Button 
          variant="outline-primary"
          onClick={openDrivePicker}
          disabled={loading}
          className="d-flex align-items-center"
        >
          <i className="fab fa-google-drive me-2"></i>
          {loading ? 'Loading...' : 'Drive'}
        </Button>
      </div>
      {error && <div className="invalid-feedback">{error}</div>}
      {value && (
        <div className="mt-2">
          {Array.isArray(value) ? (
            <ul className="list-unstyled">
              {value.map((file, index) => (
                <li key={index} className="text-muted small">
                  <i className="fas fa-file me-2"></i>
                  {file.name || file.source === 'drive' ? file.name : file}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted small mb-0">
              <i className="fas fa-file me-2"></i>
              {value.name || value.source === 'drive' ? value.name : value}
            </p>
          )}
        </div>
      )}
    </Form.Group>
  );
};

export default FileUpload;