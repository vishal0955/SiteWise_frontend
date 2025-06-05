import { useState } from 'react';
import { ChevronDown, ChevronUp, HardHat, Shield, FileText, Clipboard, UserCheck, Building2 } from 'lucide-react';
import { Button } from 'react-bootstrap';

export default function SWMSFormStep4({ onNext, onBack, onSubmit }) {
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

  return (
    <div className="flex flex-col min-h-screen ">
   

      <div className="flex-1 ">
        <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-8 col-md-8">
          {/* Project Details Section */}
          <div className="bg-white border-b">
            <div 
              className="flex justify-between items-center p-4 cursor-pointer"
              onClick={() => toggleSection('project-details')}
            >
              <h2 className="font-medium">Project Details</h2>
              {expandedSections['project-details'] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </div>
            
            {expandedSections['project-details'] && (
              <div className="px-4 pb-4 space-y-4">
                <div>
                  <label className="block text-xs text-gray-500">Project Name</label>
                  <p className="font-medium">Westfield Commercial Tower</p>
                </div>
                
                <div className="flex space-x-8">
                  <div>
                    <label className="block text-xs text-gray-500">Site Address</label>
                    <p>250 Collins St, Melbourne</p>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500">Date</label>
                    <p>April 14, 2023</p>
                  </div>
                </div>
                
                <div className="flex space-x-8">
                  <div>
                    <label className="block text-xs text-gray-500">Supervisor</label>
                    <p>Michael Thompson</p>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500">Project ID</label>
                    <p>WCT-2023-5414</p>
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
              
              {/* Task 1 */}
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
            <div className="d-flex justify-content-between p-4 gap-2 ">
        <button className=" btn btn-outline-secondary " onClick={onBack}>
          Back
        </button>
     <div> <button className='btn btn-warning me-2 text-white'>Draft</button>
        <Button className="btn-set-color " onClick={onSubmit}>
          Submit SWMS
        </Button>
        </div>
      </div>
        </div>
        
        </div>
        
      </div>


    
    </div>
  );
}