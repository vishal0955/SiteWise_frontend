import React from "react";
import { CheckCircle, Download, Share2, FileText } from "lucide-react";
import { Button } from "react-bootstrap";
import PdfViewer from "../../pdf/PDFViewer";

const SWMSSubmissionPage = () => {
  const dummyData = {
    title: "Safety Work Statement",
    documentCode: "CmpgEng 34/2018",
    customer: "Westfield Construction Site",
    location: "Line 1/2",
    content: "lorem50",
    riskassessment:
      " Heavy machinery, operation Working at heights, Manual handling risks, Weather conditions",
    safetyNotes: [
      "Always wear helmet and gloves inside plant.",
      "Do not operate machinery without proper authorization.",
      "Report incidents to the supervisor immediately.",
    ],
    approvedBy: "John Safetyofficer",
  };

  const documentDetails = [
    { label: "Reference:", value: "SWMS-2025-04-14-0023" },
    { label: "Submitted:", value: "April 14, 2025" },
    { label: "Project:", value: "Westfield Construction Site" },
    { label: "Valid until:", value: "October 14, 2025" },
  ];

  return (
    <div className="min-vh-100 bg-light">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-8 col-md-8">
            <div className="bg-white rounded-3 shadow-sm">
              {/* Success Header */}
              <div className="p-4 text-center border-bottom">
                <div className="d-flex align-items-center justify-content-center mb-3">
                  <CheckCircle className="text-success me-2" size={24} />
                  <h5 className="mb-0 fw-bold text-success">
                    SWMS Submitted Successfully
                  </h5>
                </div>
              </div>

              {/* Document Preview */}
              <div className="p-4">
                <PdfViewer {...dummyData} />

                {/* Document Details */}
                <div className="mb-4">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h6 className="fw-bold mb-0">Document Details</h6>
                    <span className="badge bg-success">Approved</span>
                  </div>

                  <div className="row">
                    {documentDetails.map((detail, index) => (
                      <div key={index} className="col-12 col-md-6 mb-3">
                        <div className="d-flex justify-content-between">
                          <span className="text-muted">{detail.label}</span>
                          <span className="fw-medium">{detail.value}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="d-flex flex-wrap gap-2 justify-content-start">
                  <Button className="btn-set-color d-flex align-items-center">
                    <Download size={20} className="me-2" />
                    Download PDF
                  </Button>

                  <Button className="btn-set-color d-flex align-items-center">
                    <Share2 size={15} className="me-2" />
                    Share Document
                  </Button>
                </div>

                {/* Additional Info */}
                <div className="mt-4 p-3 bg-light rounded-3">
                  <div className="d-flex align-items-start">
                    <FileText className="text-primary me-2 mt-1" size={20} />
                    <div>
                      <small className="fw-medium d-block">
                        Document Successfully Processed
                      </small>
                      <small className="text-muted">
                        Your SWMS has been reviewed and approved. You can now
                        proceed with the planned work activities.
                      </small>
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

export default SWMSSubmissionPage;
