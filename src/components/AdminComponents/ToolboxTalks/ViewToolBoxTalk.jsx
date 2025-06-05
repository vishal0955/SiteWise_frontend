import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchToolboxTalks } from '../../../redux/slices/toolboxTalkSlice';

const ViewInductions = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { talks} = useSelector((state) => state.toolboxTalks);
  console.log(talks)
//   const { inductions } = useSelector((state) => state.inductions);

  useEffect(() => {
    dispatch(fetchToolboxTalks());
  }, [dispatch]);

  const inductionData = talks.find((item) => item._id === id);

  if (!inductionData) {
    return (
      <div className="container py-4">
        <h4>Loading induction details...</h4>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Induction Details</h2>
        <Link to="/inductions">
          <Button className="btn-set-color">← Back</Button>
        </Link>
      </div>

      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}>
        <div className="row g-4">
          <div className="col-md-6">
            <p><strong>Title:</strong> {inductionData.title}</p>
          </div>
          <div className="col-md-6">
      <p><strong>Date:</strong> {new Date(inductionData.date).toLocaleString()
}</p>
          </div>
          <div className="col-md-6">
            <p><strong>Presenter:</strong> {inductionData.presenter.firstName  } {inductionData.presenter.lastName } </p>
          </div>
          <div className="col-md-6">
            <p><strong>White Card Number:</strong> {inductionData.whiteCardNumber}</p>
          </div>
          <div className="col-md-6">
            <p><strong>Site Location:</strong> {inductionData.siteLocation}</p>
          </div>
          <div className="col-md-6">
            <p><strong>Site Supervisor:</strong> {inductionData.siteSupervisor}</p>
          </div>
          <div className="col-md-6">
            <p><strong>Induction Date:</strong> {new Date(inductionData.inductionDate).toLocaleDateString()}</p>
          </div>
          <div className="col-md-6">
            <p><strong>Site Access Hours:</strong> {inductionData.accessStartTime} - {inductionData.accessEndTime}</p>
          </div>
        </div>

        {inductionData.image && inductionData.image.length > 0 && (
          <div className="mt-4">
            <h5 className="mb-3">Uploaded Files</h5>
            {inductionData.image.map((img, index) => (
              <div key={index}>
                <a href={img} target="_blank" rel="noopener noreferrer">View File {index + 1}</a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewInductions;
