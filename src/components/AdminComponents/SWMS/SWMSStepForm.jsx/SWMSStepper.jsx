import { useState } from 'react';
import SWMSForm from './SWMSForm.jsx';
import SWMSFormStep2 from './SWMSFormStep2.jsx';
import SWMSFormStep3 from './SWMSFormStep3.jsx';
import SWMSFormStep4 from './SWMSFormStep4.jsx';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SWMSForm4 from './SWMSForm4.jsx';
import { Button } from 'react-bootstrap';
import SWMSSubmissionPage from './SWMSSubmissionPage.jsx';
import axios from 'axios';
import { createSwms } from '../../../../redux/slices/swmsSlice.js';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

const steps = [
  { label: 'SWMS Details', component: SWMSForm  },
  { label: 'Task & Hazards', component: SWMSFormStep2 },
  { label: 'Risk Assessment', component: SWMSFormStep3 },
  { label: 'PPE' , component: SWMSForm4},
  { label: 'Review & Submit', component: SWMSFormStep4 },
    { label: 'SWMS Submitted Successfully', component: SWMSSubmissionPage },
];

export default function SWMSStepper() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
   const location = useLocation();

   const [step, setStep] = useState(0);
 

   const [formData, setFormData] = useState({
   swmsName: '',
    siteAddress: '',
    companyName: '',
    responsiblePersonName: '',
    dateCreated: '',
    companyInformation: {
      companyName: '',
      abn: '',
      address: '',
      contactNumber: '',
      principalContractor: {
        name: '',
        contactPerson: '',
        contactNumber: ''
      }
    },
     workActivities:location.state?.templateTitle || [],
    hazardIdentification: location.state?.hazards || [],
    requiredPPE: {
      predefined: location.state?.keyPPE || [],
      custom: []
    },
     status: "pending"
});

  const goNext = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const goBack = () => setStep((s) => Math.max(s - 1, 0));
  const gotoStep = (step) => setStep(step);




  const handleSubmit = async () => {
    try{
      const response = await dispatch(createSwms(formData)).then((response) => {
       ( response.success === "true") ? (toast.success("SWMs  created successfully")) : (toast.error("swms creation failed"))
      })
       console.log(response.data)
      return response.data ;
     
    }
    catch(error){
      console.log(error)
    }
  }

  
  const StepComponent = steps[step].component;

  return (
    <div>
   
      <div   >
      <div className="d-flex align-items-center justify-content-end ">
          {" "}
          <Button
            className="btn me-2 btn-set-color"
            style={{ backgroundColor: "#0d6efd", color: "white" }}
            // onClick={fetchAutofillData}
          >
            autoFill
          </Button>
        
        <button className=" btn btn-outline-secondary " onClick={() => navigate(-1)}>
  <i className="fa-solid fa-arrow-left me-2"></i>Back
</button>

    
        </div>
    <div className="flex flex-wrap justify-center items-center gap-2 my-6 sm:flex-nowrap ">
  {steps.map((s, idx) => (
    <div key={s.label} className="flex items-center">
      <div
        className={`w-8 h-8 flex items-center justify-center rounded-full border-2 cursor-pointer ${
          idx === step
            ? 'bg-blue-600 text-white border-blue-600'
            : 'bg-white text-gray-500 border-gray-300'
        }`}
        onClick={() => gotoStep(idx)}
      >
        {idx + 1}
      </div>
      {idx < steps.length - 1 && (
        <div className="hidden sm:block w-10 h-1 bg-gray-300 mx-2 rounded" />
      )}
    </div>
  ))}
</div>


      </div>
    
      {/* Step content */}
      <div>
        <StepComponent
          formData={formData}
      setFormData={setFormData}
          onNext={goNext}
          onBack={goBack}
          isFirstStep={step === 0}
          isLastStep={step === steps.length - 1}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}