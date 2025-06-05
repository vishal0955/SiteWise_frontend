import { useEffect, useState } from 'react';
import { ChevronDown, ArrowLeft } from 'lucide-react';

export default function SWMSFormStep3({formData, setFormData,onNext, onBack}) {
  const [expanded, setExpanded] = useState({});


  useEffect(() => {
    if (formData.hazardIdentification?.length > 0) {
      const initialExpanded = {};
      formData.hazardIdentification.forEach((hazard, index) => {
        initialExpanded[`hazard-${index}`] = false;
      });
      initialExpanded[`hazard-0`] = true; 
      setExpanded(initialExpanded);
    }
  }, [formData.hazardIdentification]);

  const toggleSection = (section) => {
    setExpanded(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };
  
    const handleHazardUpdate = (index, field, value) => {
    const updatedHazards = [...formData.hazardIdentification];
    updatedHazards[index] = {
      ...updatedHazards[index],
      [field]: value
    };
    setFormData(prev => ({
      ...prev,
      hazardIdentification: updatedHazards
    }));
  };

  return (
    <div className="flex flex-col min-h-screen ">


      <div className="flex-1 overflow-auto p-4 space-y-6 ">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-8 col-md-8 shadow-sm bg-white rounded border">
        {/* Activity Section */}
        <div className="bg-white border rounded-md shadow-sm mt-4">
          <div className="border-b p-4 flex justify-between items-center">
            <div className="flex items-center">
             
              <h3 className="font-medium">Working at Height</h3>
            </div>
            <div className="flex items-center">
           
             
            </div>
          </div>

           
            <div className="p-4">
              {/* Risk Matrix */}
              <div className="mb-6">
                <h4 className="text-sm font-medium mb-2">Risk Matrix</h4>
                <div className="grid grid-cols-5 gap-1 text-center text-white text-xs">
                  <div className="p-2 bg-gray-400">Impact</div>
                  <div className="p-2 bg-green-500">Low</div>
                  <div className="p-2 bg-yellow-500">Medium</div>
                  <div className="p-2 bg-orange-500">High</div>
                  <div className="p-2 bg-red-500">Extreme</div>
                  
                  <div className="p-2 bg-gray-400">Rare</div>
                  <div className="p-2 bg-green-500"></div>
                  <div className="p-2 bg-green-500"></div>
                  <div className="p-2 bg-yellow-500"></div>
                  <div className="p-2 bg-orange-500"></div>
                  
                  <div className="p-2 bg-gray-400">Unlikely</div>
                  <div className="p-2 bg-green-500"></div>
                  <div className="p-2 bg-yellow-500"></div>
                  <div className="p-2 bg-orange-500"></div>
                  <div className="p-2 bg-red-500"></div>
                  
                  <div className="p-2 bg-gray-400">Possible</div>
                  <div className="p-2 bg-green-500"></div>
                  <div className="p-2 bg-yellow-500 border-2 border-blue-600">3 x 2</div>
                  <div className="p-2 bg-orange-500"></div>
                  <div className="p-2 bg-red-500"></div>
                  
                  <div className="p-2 bg-gray-400">Likely</div>
                  <div className="p-2 bg-yellow-500"></div>
                  <div className="p-2 bg-orange-500"></div>
                  <div className="p-2 bg-red-500"></div>
                  <div className="p-2 bg-red-500"></div>
                </div>
              </div>

           
            </div>
          
        </div>


      {formData.hazardIdentification?.map((hazard, index) => (
              <div key={index} className="bg-white border rounded-md shadow-sm mt-2">
                <div className="border-b p-4 flex justify-between items-center">
                  <h2 className="font-medium">{hazard.hazardDescription}</h2>
                  <div className="flex items-center">
                    <span className={`bg-${hazard.severityLevel === 'High' ? 'orange' : 'yellow'}-100 
                      text-${hazard.severityLevel === 'High' ? 'orange' : 'yellow'}-800 
                      py-1 px-3 rounded-full text-xs font-medium mr-2`}>
                      {hazard.severityLevel}
                    </span>
                    <ChevronDown 
                      size={20} 
                      className={`transition-transform ${expanded[`hazard-${index}`] ? 'transform rotate-180' : ''}`}
                      onClick={() => toggleSection(`hazard-${index}`)}
                    />
                  </div>
                </div>
                
                {expanded[`${index}`] && (
                  <div className="p-4">
                    {/* Control Measures */}
                    <div className="mb-4">
                      <h3 className="text-sm font-medium mb-2">Control Measures</h3>
                      <div className="p-3 rounded-md border border-yellow-600 bg-yellow-50 text-dark">
                        <p className="text-sm">{hazard.controlMeasure}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Responsible Person</label>
                        <input
                          type="text"
                          value={hazard.responsiblePerson || ''}
                          onChange={(e) => handleHazardUpdate(index, 'responsiblePerson', e.target.value)}
                          placeholder="Enter name"
                          className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Control Verification</label>
                        <input
                          type="text"
                          value={hazard.controlVerification || ''}
                          onChange={(e) => handleHazardUpdate(index, 'controlMeasure', e.target.value)}
                          placeholder="Enter verification method"
                          className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                  <label className="block text-sm font-medium mb-1">Control Verification</label>
                  <select  className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500
             bg-white text-black dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
             value={hazard.controlVerification || ''} onChange={(e) => handleHazardUpdate(index, 'controlVerification', e.target.value)}
             >
                    <option value="implemented">Implemented</option>
                    <option value="pending">Pending</option>
                    <option value="not imlemented">Not Implemented</option>
                  </select>
                </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
  
       
      
     
         <div className="p-4 d-flex justify-between items-center gap-2 max-w-2xl mx-auto">
      <button
          onClick={onBack}
          className="btn btn-outline-secondary  rounded-md font-small"
        >
          Back
        </button>
        <button
          className=" btn btn-primary  rounded font-small"
          onClick={onNext}
        >
        Next
        </button>
      </div>
      </div>


     
      </div>
      </div>
    </div>
  );
}