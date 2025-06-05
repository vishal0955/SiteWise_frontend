import React, { useState } from 'react';
import { Check, ShieldCheck, HardHat, Eye, Volume2, Filter, Plus } from 'lucide-react';

const SWMSForm4 = ({onNext, onBack}) => {
  const [selectedPPE, setSelectedPPE] = useState({
    safetyFootwear: false,
    hardHat: false,
    eyeProtection: false,
    hearingProtection: false
  });
  
  const [showFilter, setShowFilter] = useState(false);

  const handlePPEToggle = (type) => {
    setSelectedPPE(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const ppeItems = [
    {
      id: 'safetyFootwear',
      label: 'Safety Footwear',
      icon: <ShieldCheck size={24} className="text-primary" />,
      bgColor: 'bg-light'
    },
    {
      id: 'hardHat',
      label: 'Hard Hat',
      icon: <HardHat size={24} className="text-warning" />,
      bgColor: 'bg-warning',
      bgOpacity: 'bg-opacity-10'
    },
    {
      id: 'eyeProtection',
      label: 'Eye Protection',
      icon: <Eye size={24} className="text-success" />,
      bgColor: 'bg-success',
      bgOpacity: 'bg-opacity-10'
    },
    {
      id: 'hearingProtection',
      label: 'Hearing Protection',
      icon: <Volume2 size={24} className="text-danger" />,
      bgColor: 'bg-danger',
      bgOpacity: 'bg-opacity-10'
    }
  ];

  return (
    <div className="">
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-8 col-md-8">
            <div className="bg-white min-vh-100 shadow-sm">
           
              <div className="p-4 border-bottom">
              
                <div className="d-flex align-items-center text-muted small">
                 
                </div>
              
              </div>

             
              <div className="p-4">
                <h6 className="fw-bold mb-4">Required Personal Protective Equipment</h6>
                
                <div className="space-y-3">
                  {ppeItems.map((item) => (
                    <div key={item.id} className="mb-3">
                      <div 
                        className={`d-flex align-items-center p-3 rounded-3 border ${
                          selectedPPE[item.id] ? 'border-primary bg-primary bg-opacity-10' : 'border-light'
                        } cursor-pointer`}
                        onClick={() => handlePPEToggle(item.id)}
                        style={{ cursor: 'pointer' }}
                      >
                        <div className={`rounded-circle p-2 me-3 ${item.bgColor} ${item.bgOpacity || ''}`}>
                          {item.icon}
                        </div>
                        <span className="flex-grow-1 fw-medium">{item.label}</span>
                        <div className={`rounded-circle border ${
                          selectedPPE[item.id] 
                            ? 'border-primary bg-primary text-white' 
                            : 'border-secondary'
                        }`} style={{ width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          {selectedPPE[item.id] && <Check size={14} />}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Filter Section */}
                <div className="mt-4">
                  <div 
                    className="d-flex align-items-center justify-content-between p-3 bg-light rounded-3 cursor-pointer"
                    onClick={() => setShowFilter(!showFilter)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="d-flex align-items-center">
                      <Plus size={20} className="text-primary me-2" />
                      <span className="fw-medium">Add custom PPE here</span>
                    </div>
                  
                  </div>
                  
                  {showFilter && (
                    <div className="mt-3 p-3 bg-light rounded-3">
                      <div className="form-group">
                        <input 
                          type="text" 
                          className="form-control" 
                          placeholder="Search for custom PPE..."
                        />
                      </div>
                    </div>
                  )}
                </div>

                
                <div className='mt-4'>

                </div>
              </div>

              {/* Footer Button */}
             <div className="p-4 border-t d-flex justify-between items-center bg-white gap-2 max-w-2xl mx-auto">
      <button
          onClick={onBack}
          className="btn btn-outline-secondary  rounded-md font-small "
        >
          Back
        </button>
        <div>
         
        <button
          className=" btn btn-primary  rounded font-small"
          onClick={onNext}
        >
          Review Summary
        </button>
        </div>
      </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SWMSForm4;