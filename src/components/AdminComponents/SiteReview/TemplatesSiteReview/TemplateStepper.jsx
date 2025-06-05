import { useState } from 'react';


import { Link } from 'react-router-dom';

import AddSiteReview from '../AddSiteReview.jsx';
;
import AddTemplateSitereview from './AddTemplateSitereview.jsx';



export default function TemplateStepper() {


  const steps = [
  { label: 'SIte Review', component: AddSiteReview 
        },
    { label: 'Checklist', component: AddTemplateSitereview    },
   ,
];
  const [step, setStep] = useState(0);


  const goNext = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const goBack = () => setStep((s) => Math.max(s - 1, 0));
  const gotoStep = (step) => setStep(step);

  const StepComponent = steps[step].component;

  return (
    <div>
     
      <div   >
     
      <div className="flex items-center justify-center my-6 space-x-4">
        {steps.map((s, idx) => (
          <div key={s.label} className="flex items-center">
            <div 
              className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${
                idx === step
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-500 border-gray-300'
              }`}
              onClick={() => gotoStep(idx)}
            >
              {idx + 1}
            </div>
            {idx < steps.length - 1 && (
              <div className="w-8 h-1 bg-gray-300 mx-2 rounded" />
            )}
          </div>
        ))}
      </div>

      </div>
    

      <div>
        <StepComponent
          onNext={goNext}
          onBack={goBack}
          isFirstStep={step === 0}
          isLastStep={step === steps.length - 1}
        />
      </div>
    </div>
  );
}