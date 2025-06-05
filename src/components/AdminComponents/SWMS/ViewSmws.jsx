import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getswmsbyId } from "../../../redux/slices/swmsSlice";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ChevronDown, ChevronUp, HardHat, Shield, FileText, Clipboard, UserCheck, Building2 } from 'lucide-react';

const ViewSwms = () => {
   const [expandedSections, setExpandedSections] = useState({
      'project-details': true,
      'required-ppe': false
    });
  
    const toggleSection = (section) => {
      setExpandedSections({
        ...expandedSections,
        [section]: !expandedSections[section]
      });
    };
  



  const dispatch = useDispatch();
  const { singleSwms, loading, error } = useSelector((state) => state.swms);


  const selectedSwms = singleSwms?.data;

  console.log("singleSwms", singleSwms);
  const { id } = useParams();
  const pdfRef = useRef();

  useEffect(() => {
    dispatch(getswmsbyId(id));
  }, [dispatch, id]);

  const downloadPdf = () => {
    const input = pdfRef.current;
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("swms-details.pdf");
    });
  };

  const renderPPE = (ppe) => {
    return Object.entries(ppe || {}).map(([key, value]) => (
      <li key={key} className="list-group-item ">
        {value ? "✅" : "❌"} {key.replace(/([A-Z])/g, ' $1')}
      </li>
    ));
  };

  const renderPermits = (permits) => {
    return Object.entries(permits || {}).map(([key, value]) => (
      <li key={key} className="list-group-item">
        {value ? "✅" : "❌"} {key.replace(/([A-Z])/g, ' $1')}
      </li>
    ));
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="mb-0">SWMS Details</h3>
        <div>
          <button
            className="btn me-2"
            onClick={downloadPdf}
            // style={{ backgroundColor: "#0d6efd", color: "white" }}
          >
            <i className="fa-solid fa-file-pdf"></i> Download PDF
          </button>

          <Link to="/swms">
            <button className="btn btn-secondary" style={{ backgroundColor: "#0d6efd", color: "white" }}>
              <i className="fa-solid fa-arrow-left me-2"></i> Back to Overview
            </button>
          </Link>
        </div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : (
        <div
          ref={pdfRef}
          style={{  padding: "20px", borderRadius: "8px" }}
        >
          <div className="row">
            <div className="mb-3 col-md-12"><strong>SWMS Name:</strong> {selectedSwms?.swmsName}</div>
            <div className="mb-3 col-md-6"><strong>Site Address:</strong> {selectedSwms?.siteAddress}</div>
            <div className="mb-3 col-md-6"><strong>Company Name:</strong> {selectedSwms?.companyName}</div>
           <div className="mb-3 col-md-6"><strong>Responsible Person:</strong> {selectedSwms?.responsiblePersonName}</div>
            <div className="mb-3 col-md-6">
              <strong>Date Created:</strong> {new Date(selectedSwms?.createdAt).toLocaleString()}
            </div>
          </div>



          <div className="">
          {/* Project Details Section */}
          <div className="bg-white border-b">
            <div 
              className="flex justify-between items-center p-4 cursor-pointer"
              onClick={() => toggleSection('project-details')}
            >
              <h2 className="font-medium">Company Information</h2>
              {expandedSections['project-details'] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </div>
            
            {expandedSections['project-details'] && (
              <div className="px-4 pb-4 space-y-4">
                <div>
                  <label className="block text-xs text-gray-500">Company Name</label>
                  <p className="font-medium">{selectedSwms?.companyInformation?.companyName}</p>
                </div>
                
           <div className="d-flex  justify-content-between align-items-center">
                  <div>
                    <label className="block text-xs text-gray-500">Site Address</label>
                    <p>{selectedSwms?.companyInformation?.address}</p>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500">abn</label>
                    <p>{selectedSwms?.companyInformation?.abn}</p>
                  </div>
                   <div>
                    <label className="block text-xs text-gray-500">Contact Number</label>
                    <p>{selectedSwms?.companyInformation?.contactNumber}</p>
                  </div>
                </div>
                
                <div className="d-flex  justify-content-between align-items-center">
                  <div>
                    <label className="block text-xs text-gray-500">Principal Contractor</label>
                    <p>{selectedSwms?.companyInformation?.principalContractor?.name}</p>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500">contact Person</label>
                    <p>{selectedSwms?.companyInformation?.principalContractor?.contactPerson}</p>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500">contact Number</label>
                    <p>{selectedSwms?.companyInformation?.principalContractor?.contactNumber}</p>
                  </div>
                </div>
                
                <div>
                  <label className="block text-xs text-gray-500">Scope of Works</label>
                  <p>Electrical system upgrade for floors 15-20 of commercial office building.</p>
                </div>
              </div>
            )}
          </div>
          
          {/* Tasks & Hazards Sections */}
          <div className="bg-white border-b">
            <div className="p-4">
              <h2 className="font-medium mb-4">Tasks & Hazards</h2>
              
            {selectedSwms?.hazardIdentification.map((task, index) => (

              <div key={index} className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  { console.log("task",task)}
                  <p className="font-medium">{task}</p>
                  <span className="bg-red-100 text-red-800 py-1 px-2 rounded-full text-xs font-medium">High Risk</span>
                </div>
    
              </div>
            ))}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">Electrical Panel Installation</h3>
                  <span className="bg-red-100 text-red-800 py-1 px-2 rounded-full text-xs font-medium">High Risk</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">Replacing existing distribution boards and circuits</p>
                
                <div className="mb-2">
                  <h4 className="text-sm font-medium">Hazards:</h4>
                  <ul className="list-disc pl-5 text-sm">
                    <li>Electrical shock</li>
                    <li>Fall from height</li>
                  </ul>
                </div>
              </div>
              
              {/* Task 2 */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">Cable Routing</h3>
                  <span className="bg-yellow-100 text-yellow-800 py-1 px-2 rounded-full text-xs font-medium">Medium Risk</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">Running new cables through ceiling</p>
                
                <div className="mb-2">
                  <h4 className="text-sm font-medium">Hazards:</h4>
                  <ul className="list-disc pl-5 text-sm">
                    <li>Working in confined spaces</li>
                    <li>Manual handling injuries</li>
                  </ul>
                </div>
              </div>
              
              {/* Task 3 */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">Testing & Commissioning</h3>
                  <span className="bg-red-100 text-red-800 py-1 px-2 rounded-full text-xs font-medium">High Risk</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">Final testing of installed systems</p>
                
                <div>
                  <h4 className="text-sm font-medium">Hazards:</h4>
                  <ul className="list-disc pl-5 text-sm">
                    <li>Electrical shock</li>
                    <li>Arc flash</li>
                    <li>Equipment damage</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          {/* Required PPE Section */}
          <div className="bg-white">
            <div 
              className="flex justify-between items-center p-4 cursor-pointer"
              onClick={() => toggleSection('required-ppe')}
            >
              <h2 className="font-medium">Required PPE</h2>
              {expandedSections['required-ppe'] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </div>
            
            {expandedSections['required-ppe'] && (
              <div className="p-4 grid grid-cols-3 gap-4">
                <div className="flex flex-col items-center">
                  <div className="bg-blue-100 p-3 rounded-lg mb-2">
                    <HardHat size={24} className="text-blue-600" />
                  </div>
                  <p className="text-xs text-center">Hard Hat<br />(Mandatory)</p>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="bg-blue-100 p-3 rounded-lg mb-2">
                    <Shield size={24} className="text-blue-600" />
                  </div>
                  <p className="text-xs text-center">Safety Glasses<br />(Mandatory)</p>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="bg-blue-100 p-3 rounded-lg mb-2">
                    <FileText size={24} className="text-blue-600" />
                  </div>
                  <p className="text-xs text-center">Insulated Gloves<br />(Mandatory)</p>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="bg-gray-100 p-3 rounded-lg mb-2">
                    <Clipboard size={24} className="text-gray-600" />
                  </div>
                  <p className="text-xs text-center">Safety Boots<br />(Mandatory)</p>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="bg-gray-100 p-3 rounded-lg mb-2">
                    <UserCheck size={24} className="text-gray-600" />
                  </div>
                  <p className="text-xs text-center">Dust Mask<br />(As Required)</p>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="bg-gray-100 p-3 rounded-lg mb-2">
                    <Building2 size={24} className="text-gray-600" />
                  </div>
                  <p className="text-xs text-center">High Vis<br />(Mandatory)</p>
                </div>
              </div>
            )}
          </div>
        </div>

          <div className="mb-4">
            <h5>Hazards and Controls</h5>
            {(selectedSwms?.hazardsandControls || []).map((hazard, index) => (
              <div key={hazard._id} className="card mb-3">
                <div className="card-body">
                  <h6>Hazard {index + 1}</h6>
                  <p><strong>Description:</strong> {hazard.hazardDescription}</p>
                  <p><strong>Risk Level:</strong> {hazard.riskLevel}</p>
                  <p><strong>Control Measures:</strong> {hazard.controlMeasures}</p>
                </div>
              </div>
            ))}
          </div>

          {/* <div className="row mb-4">
            <div className="col-md-6 rounded-md">
              <h5>PPE Requirements</h5>
              <ul className="list-group list-group-flush ">
                {renderPPE(singleSwms?.ppeRequirements)}
              </ul>
            </div>
            <div className="col-md-6">
              <h5>Required Permits</h5>
              <ul className="list-group list-group-flush ">
                {renderPermits(singleSwms?.requiredPermits)}
              </ul>
            </div>
          </div> */}
        </div>
      )}
    </div>
  );
};

export default ViewSwms;
