import React, { useState } from "react";


const SummaryPage = ({ siteReviewData, checklistData, onBack, onSubmit, onNext }) => {

  
  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-10">
          <div className="card shadow-sm mb-4">
            <div className="card-header bg-primary text-white">
              <h4 className="mb-0">Site Review Summary</h4>
            </div>
            <div className="card-body">
              {/* Site Review Details */}
              <h5 className="mb-3">Site Review Details</h5>
              <div className="row mb-4">
                <div className="col-md-6">
                  <p className="mb-1 text-muted">Site Name</p>
                  <p className="fw-bold">{siteReviewData?.siteName || "N/A"}</p>
                </div>
                <div className="col-md-6">
                  <p className="mb-1 text-muted">Site Location</p>
                  <p className="fw-bold">{siteReviewData?.siteLocation || "N/A"}</p>
                </div>
                <div className="col-md-6">
                  <p className="mb-1 text-muted">Reviewer Name</p>
                  <p className="fw-bold">{siteReviewData?.reviewerName || "N/A"}</p>
                </div>
                <div className="col-md-6">
                  <p className="mb-1 text-muted">Review Date</p>
                  <p className="fw-bold">{siteReviewData?.reviewDate || "N/A"}</p>
                </div>
              </div>

     
              <h5 className="mb-3">Checklist Summary</h5>
           
              <h5 className="mb-3">Recommendations</h5>
              <p>{siteReviewData?.recommendations || "No recommendations provided."}</p>
            </div>
          </div>

                <div className="flex justify-between gap-2 mt-4">
  <button type="button" className="btn btn-outline-secondary" onClick={onBack}>
    back
  </button>
  <div className="flex justify-between items-center gap-2">
    <button className="btn btn-primary" onClick={onNext}>Save Draft</button>
    <button className="btn btn-primary" onClick={onSubmit}>Submit</button>
  </div>
</div>
        </div>
      </div>
    </div>
  );
};

export default SummaryPage;