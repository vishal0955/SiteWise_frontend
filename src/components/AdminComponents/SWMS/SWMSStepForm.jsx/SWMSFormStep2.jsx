



import { useState } from 'react';
import { ChevronDown, PlusCircle, AlertCircle } from 'lucide-react';
import { Modal, Button, Form } from "react-bootstrap";
import HazardForm from './HazardForm';

export default function SWMSFormStep2({formData, setFormData, onNext, onBack }) {

  console.log(formData)


  const activityOptions = [
    "Scaffolding",
    "Welding",
    "Painting",
    "Electrical",
    "Plumbing"
  ];
 const isEmpty =
    formData.workActivities === "" ||
    (Array.isArray(formData.workActivities) && formData.workActivities.length === 0);

    
    const [selectedActivities, setSelectedActivities] = useState(
    Array.isArray(formData.workActivities)
      ? formData.workActivities
      : formData.workActivities === "" ? [] : [formData.workActivities]
  );


  const [hazards, setHazards] = useState(
    (formData.hazardIdentification || []).map((item, idx) => ({
      id: idx + 1,
      item,
      selected: true
    }))
  );

  console.log("hazards", hazards)
  

 
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleActivity = (activity) => {
    setSelectedActivities((prev) =>
      prev.includes(activity)
        ? prev.filter((item) => item !== activity)
        : [...prev, activity]
    );
  };

   const handleActivityInput = (e) => {
    setFormData(prev => ({
      ...prev,
      workActivities: e.target.value
    }));
  };



  const [showHazardModal, setShowHazardModal] = useState(false);

  const addNewHazard = () => {
    setShowHazardModal(true);
  };

  const closeHazardModal = () => {
    setShowHazardModal(false);
  };

  const toggleHazard = (id) => {
    setHazards(hazards.map(hazard =>
      hazard._id === id ? { ...hazard, selected: !hazard.selected } : hazard
    ));
  };

 
  return (
    <div className="flex flex-col min-h-screen  dark:border-solid  dark:border-gray-700 ">
      {/* Header */}
      <div className="row justify-content-center ">
        <div className="col-12 col-md-8 col-lg-8 col-md-8 shadow-sm bg-white rounded border">
      <header className="p-4 border-b">
        <h3 className="text-lg font-medium">Task & Hazards</h3>
        <div className="mt-1 text-sm text-gray-500">Step 2 of 4</div>
      </header>

      <div className="flex-1 overflow-auto p-4 space-y-6">
        {/* Work Activity Section */}
        <div>
          <label className="block text-sm font-medium mb-2">Work Activity</label>
          {/* <p className="text-xs text-gray-500 mb-2">Select all that apply</p> */}
{!isEmpty ? (
  <div className="flex items-center bg-blue-100 font-semibold px-2 py-1">
    {formData.workActivities}
  </div>
) : (
<>
  <div className="form-group">
                
                  <input
                    type="text"
                    name="selectedActivities"
                    value={formData.workActivities}
                    onChange={handleActivityInput}
                    className="form-control"
                  />
                </div>
 
  </>
)}

 
         
        </div>

        
        <div>
          <h4 className="text-base font-medium mb-3">Hazard Identification</h4>

          <div className="space-y-2">
            {hazards.map(hazard => (
              <div
                key={hazard._id}
                className="flex items-center justify-between p-3 bg-white border rounded-md cursor-pointer"
                onClick={() => toggleHazard(hazard._id)}

              >
                { console.log("new",hazard)}
                <span>{hazard?.item?.hazardDescription}</span>
                <div
                  className={`w-6 h-6 border rounded ${
                    hazard.selected ? 'bg-blue-500 border-blue-500' : 'bg-white border-gray-300'
                  }`}
                >
                  {hazard.selected && (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6" viewBox="0 0 24 24">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </div>
              </div>
            ))}

    
            <button
              onClick={addNewHazard}
              className="flex items-center justify-center w-full p-3 border border-blue-500 rounded-md text-primary"
            >
              <PlusCircle size={20} className="mr-2" />
              Add New Hazard
            </button>
          </div>
        </div>
      </div>

   
      <div className="flex p-4 border-t mt-auto gap-2 max-w-2xl mx-auto justify-content-between">
        <button
          onClick={onBack}
          className=" btn btn-outline-secondary  rounded-md font-small"
        >
          Back
        </button>
        <button
          onClick={onNext}
          className=" btn btn-primary  rounded-md font-small"
        >
          Next
        </button>
      </div>
      </div>
      </div>

      {showHazardModal && (
       
        <Modal show={showHazardModal} onHide={closeHazardModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>Add New Hazard</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <HazardForm />
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
}
