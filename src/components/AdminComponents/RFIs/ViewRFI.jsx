import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ViewRFI = () => {
  const { state } = useLocation();
  console.log(state.item)

  const navigate = useNavigate();
   


  const [comment, setComment] = useState('');

  const attachments = [
    {
      name: 'Foundation_Rebar_Photo.jpg',
      size: '2.4 MB',
      image: 'https://via.placeholder.com/200x150/f8f9fa/6c757d?text=Foundation+Rebar+Photo'
    },
    {
      name: 'Drawing_S-104_Extract.pdf',
      size: '856 KB',
      image: 'https://via.placeholder.com/200x150/f8f9fa/6c757d?text=Technical+Drawing'
    },
    {
      name: 'Specs_03_30_00_p14.pdf',
      size: '1.2 MB',
      image: 'https://via.placeholder.com/200x150/f8f9fa/6c757d?text=Specifications+Document'
    }
  ];

  const relatedDocuments = [
    { name: 'Structural Specifications', section: 'Section 03 30 00 - Cast-in-Place Concrete' },
    { name: 'Structural Drawings', section: 'S-104 West - Foundation Plans' },
    { name: 'Project Schedule', section: 'Rev. 4 - May 15, 2025' }
  ];

  const relatedRFIs = [
    { id: 'RFI #1024', description: 'Foundation waterproofing details', status: 'Closed' },
    { id: 'Submittal #057', description: 'Rebar Shop Drawings', status: 'Pending' },
    { id: 'RFI #1038', description: 'Concrete mix design approval', status: 'Closed' }
  ];

  const history = [
    {
      type: 'created',
      // user: 'James Wilson',
      action: `created this RFI and assigned it to ${state.item.assignee.firstName} ${state.item.assignee.lastName}` ,
      date: new Date(state.item.createdAt).toDateString()
    },
    // {
    //   type: 'comment',
    //   user: 'Emily Johnson',
    //   action: "I've reviewed this issue with the design team. Robert, please prioritize this response as it's on our critical path. We need to confirm if this affects the material order quantities.",
    //   date: 'May 25, 2025 - 11:45 AM'
    // },
    // {
    //   type: 'attachment',
    //   user: 'James Wilson',
    //   action: 'added 1 new attachment',
    //   attachment: 'Material_Quantities_Estimate.pdf',
    //   date: 'May 26, 2025 - 09:17 PM'
    // },
    // {
    //   type: 'update',
    //   user: 'Emily Johnson',
    //   action: 'updated the due date from June 3 to May 31',
    //   date: 'May 26, 2025 - 09:41 PM'
    // }
  ];

  return (
    <div className="container-fluid bg-light min-vh-100">
      {/* Header */}
      <div className=" border-bottom">
        <div className="container-xl">
          <div className="row align-items-center py-3">
            <div className="col">
              <div className="d-flex align-items-center">
                
                <div>
                  <h4 className="mb-0">RFI Details</h4>
                  
                </div>
              </div>
            </div>
            <div className="col-auto">
               <button
              onClick={() => navigate(-1)}
              className="btn btn-outline-secondary "
              
            >
              <i className="fa-solid fa-arrow-left me-2"></i> Back 
            </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container-xl py-4">
        <div className="row">
          {/* Main Content */}
          <div className="col-lg-12 mb-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title mb-3">
                 {state.item.subject}
                </h5>
                
                {/* RFI Details Grid */}
                <div className="row mb-4">
                  <div className="col-md-6">
                    <div className="row mb-2">
                      <div className="col-4 text-muted small">Submitted on</div>
                      <div className="col-8 small">{ new Date(state.item.createdAt).toLocaleDateString()}</div>
                    </div>
                    <div className="row mb-2">
                      {/* <div className="col-4 text-muted small">Submitted by</div>
                      <div className="col-8 small">
                        <strong>James Wilson</strong><br />
                        <span classNa
                        me="text-muted">Site Engineer</span>
                      </div> */}
                       <div className="col-4 text-muted small">Assigned to</div>
                       <div className="col-8 small">
                        <strong>{state.item.assignee?.firstName} {state.item.assignee?.lastName} </strong><br />
                        {/* <span className="text-muted">Structural Engineer</span> */}
                      </div>
                      
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="row mb-2">
                      <div className="col-4 text-muted small">Due date</div>
                      <div className="col-8 small">{ new Date(state.item.due_date).toLocaleDateString()}</div>
                    </div>
                    <div className="row mb-2">
                      {/* <div className="col-4 text-muted small">Assigned to</div>
                      <div className="col-8 small">
                        <strong>{state.item.assignee?.firstName} {state.item.assignee?.lastName} </strong><br />
                        <span className="text-muted">Structural Engineer</span>
                      </div> */}
                    </div>
                  </div>
                </div>

                {/* Question/Issue */}
                <div className="mb-4">
                  <h6 className="fw-bold mb-3">Question/Issue</h6>
                  <p className="mb-3">
                    {state.item.subject}
                    {/* The structural drawings for the West Wing foundation (drawing S-104) show #5 rebar at 12" O.C. each way, but the specifications document (Section 03 30 00, page 14) calls for #6 rebar at 10" O.C. for exterior foundation elements including exterior walls. */}
                  </p>
                  <p className="mb-3">
                     {state.item.description}
                  </p>
                  {/* <p className="text-muted">
                    Additionally, please confirm if this discrepancy affects any other foundation elements on the project.
                  </p> */}
                </div>

                {/* Attachments */}
                <div className="mb-4">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h6 className="fw-bold mb-0">Attachments (3)</h6>
                    <button className="btn btn-outline-primary btn-sm">
                      <i className="bi bi-plus"></i> Add more attachments
                    </button>
                  </div>
                  
                  {/* <div className="row g-3">
                    {state.item.image.map((attachment, index) => (
                 
                      <div key={index} className="col-md-4">
                            { console.log(attachment)}
                        <div className="card h-100">
                          <file 
                            src={attachment} 
                            className="card-img-top" 
                           
                            style={{ height: '120px', objectFit: 'cover' }}
                          />
                          <div className="card-body p-2">
                            <p className="card-text small mb-1 fw-medium">{attachment.name}</p>
                            <p className="card-text text-muted" style={{ fontSize: '0.75rem' }}>
                              {attachment.size}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div> */}

                  <div className="row g-3">
  {state.item.image.map((url, index) => {
    const extension = url.split('.').pop().split('?')[0].toLowerCase();

    const isImage = ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension);
    const isPDF = extension === 'pdf';
    const isDoc = ['doc', 'docx'].includes(extension);

    return (
      <div key={index} className="col-md-4">
        <a href={url} target="_blank" rel="noopener noreferrer" className="text-decoration-none">
          <div className="card h-100 text-center">
            {isImage ? (
              <img
                src={url}
                alt={`File ${index}`}
                className="card-img-top"
                style={{ height: '120px', objectFit: 'cover' }}
              />
            ) : isPDF ? (
              <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: '120px' }}>
                <i className="bi bi-file-earmark-pdf" style={{ fontSize: '2rem', color: '#d9534f' }}></i>
                <p className="small mt-1 mb-0">PDF File</p>
              </div>
            ) : isDoc ? (
              <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: '120px' }}>
                <i className="bi bi-file-earmark-word" style={{ fontSize: '2rem', color: '#337ab7' }}></i>
                <p className="small mt-1 mb-0">Word File</p>
              </div>
            ) : (
              <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: '120px' }}>
                <i className="bi bi-file-earmark" style={{ fontSize: '2rem', color: '#6c757d' }}></i>
                <p className="small mt-1 mb-0">Other File</p>
              </div>
            )}
          </div>
        </a>
      </div>
    );
  })}
</div>

                </div>

                {/* Response Section */}
                <div className="mb-4">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h6 className="fw-bold mb-0">Response</h6>
                    <span className="badge bg-warning">Pending</span>
                  </div>
                  
                  <div className="text-center py-5 bg-light rounded">
                    {/* <div className="spinner-border text-muted mb-3" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div> */}
                    <p className="text-muted mb-2">No response has been provided yet</p>
                    <small className="text-muted">Response due by { new Date(state.item.due_date).toLocaleDateString()}</small>
                  </div>
                  

                  <div className="text-center mt-3 d-flex justify-content-between">
                       <button className="btn-set-color">
                      <i className="bi bi-plus"></i> Generate AI Response
                    </button>
                    
                    <button className="btn-set-color">
                      <i className="bi bi-plus"></i> Add Response
                    </button>
                  </div>
                </div>

                {/* Forward Section */}
                <div className="mb-4">
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      {/* <span className="text-muted small me-2">Forward to:</span>
                      <button className="btn btn-link btn-sm p-0">Select Recipients</button> */}
                    </div>
                    <div>
                      <button className="btn btn-outline-secondary btn-sm me-2">
                        <i className="bi bi-printer"></i> Print
                      </button>
                      <button className="btn btn-outline-secondary btn-sm">
                        <i className="bi bi-share"></i> Share
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* History & Communication */}
            <div className="card shadow-sm mt-4">
              <div className="card-body">
                <h6 className="fw-bold mb-4">History & Communication</h6>
                
                <div className="timeline">
                  {history.map((item, index) => (
                    <div key={index} className="d-flex mb-4">
                      <div className="flex-shrink-0 me-3">
                        <div className={`rounded-circle d-flex align-items-center justify-content-center ${
                          item.type === 'created' ? 'bg-primary' : 
                          item.type === 'comment' ? 'bg-info' : 
                          item.type === 'attachment' ? 'bg-success' : 'bg-warning'
                        }`} style={{ width: '32px', height: '32px' }}>
                          <i className={`bi ${
                            item.type === 'created' ? 'bi-file-text' : 
                            item.type === 'comment' ? 'bi-chat' : 
                            item.type === 'attachment' ? 'bi-paperclip' : 'bi-clock'
                          } text-white`} style={{ fontSize: '14px' }}></i>
                        </div>
                      </div>
                      <div className="flex-grow-1">
                        <div className="d-flex justify-content-between align-items-start mb-1">
                          <strong className="text-capitalize">{item.type} {item.type === 'created' ? '' : item.type === 'comment' ? 'Added' : item.type === 'attachment' ? 'Added' : 'Updated'}</strong>
                          <small className="text-muted">{item.date}</small>
                        </div>
                        <p className="mb-1">
                          <span className="fw-medium">{item.user}</span> {item.action}
                        </p>
                        {item.attachment && (
                          <div className="mt-2">
                            <div className="d-inline-flex align-items-center bg-light px-2 py-1 rounded">
                              <i className="bi bi-file-pdf text-danger me-2"></i>
                              <span className="small">{item.attachment}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add Comment */}
                <div className="mt-4">
                  <h6 className="fw-bold mb-3">Add Comment</h6>
                  <div className="d-flex">
                    <div className="flex-shrink-0 me-3">
                      <div className="rounded-circle bg-secondary d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                        <i className="bi bi-person text-white"></i>
                      </div>
                    </div>
                    <div className="flex-grow-1">
                      <textarea
                        className="form-control mb-3"
                        rows="3"
                        placeholder="Type your comment here..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      ></textarea>
                      <div className="d-flex justify-content-between">
                        <button className="btn btn-outline-secondary">
                          <i className="bi bi-paperclip"></i> Attach Files
                        </button>
                        <button className="btn btn-primary">Post Comment</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
      
        </div>
      </div>

      {/* Footer Actions */}
      <div className="bg-white border-top py-3 mt-auto">
        <div className="container-xl">
          <div className="row justify-content-between align-items-center">
            <div className="col-auto">
              <small className="text-muted">Last updated: { new Date(state.item.updatedAt).toLocaleString() }</small>
            </div>
            <div className="col-auto">
              <button className="btn btn-outline-secondary me-2" onClick={() =>(navigate(-1))}>Cancel</button>
              <button className="btn btn-dark me-2">
                <i className="bi bi-pencil"></i> Edit RFI
              </button>
              <button className="btn btn-primary" onClick={() =>Alert('RFI Closed')}>
                <i className="bi bi-check"></i> Close RFI
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bootstrap Icons CDN */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.10.0/font/bootstrap-icons.min.css" />
    </div>
  );
};

export default ViewRFI;