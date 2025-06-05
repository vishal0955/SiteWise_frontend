// // 


// import { useState } from 'react';
// import { Plus, Trash2, AlertCircle, CheckCircle, } from 'lucide-react';
// import { Button } from 'react-bootstrap';

// import { ChevronDown, ChevronUp, HardHat, Shield, FileText, Clipboard, UserCheck, Building2 } from 'lucide-react';
// import { Link } from 'react-router-dom';
// import { addhazardTemplate } from '../../../redux/slices/HazardTemplate';

// export default function HazardTemplateForm() {
//   const [formData, setFormData] = useState({
//     workActivity: '',
//     hazards: [
//       {
//         hazardDescription: '',
//         severityLevel: 'Medium',
//         likelihood: 'Possible',
//         controlMeasure: '',
//         responsiblePerson: '',
//         implementationDate: '',
//         additionalNotes: '',
//         status: '',

//       }
//     ],
//  requiredPPE: []
//   });

//   const handleWorkActivityChange = (e) => {
//     setFormData({
//       ...formData,
//       workActivity: e.target.value
//     });
//   };


//   const ppeItems = [
//     {
//       key: "hardHat",
//       title: "Hard Hat",
//       icon: <HardHat />,
//       mandatory: false
//     },
//     {
//       key: "safetyGlasses",
//       title: "Safety Glasses",
//       icon:   <Shield size={24}  />,
//       mandatory: false,
//     },
//     {
//       key: "gloves",
//       title: " Gloves",
//       icon:     <FileText size={24} className="text-blue-600" />,
//       mandatory: false,
//     },
//      {
//             key: "safetyBoots",
//       title: "Safety Boots",
//       icon:      <Clipboard size={24} className="text-gray-600" />,
//       mandatory: false,
//     },
//      {
//             key: "respirator",
//       title: "Dust Mask",
//       icon:   <UserCheck size={24} className="text-gray-600" />,
//       mandatory: false,
//     },

//   ]
//   const handleHazardChange = (index, field, value) => {
//     const updatedHazards = [...formData.hazards];
//     updatedHazards[index] = {
//       ...updatedHazards[index],
//       [field]: value
//     };
//     setFormData({
//       ...formData,
//       hazards: updatedHazards
//     });
//   };

//   const addHazard = () => {
//     setFormData({
//       ...formData,
//       hazards: [
//         ...formData.hazards,
//         {
//           description: '',
//           severityLevel: 'Medium',
//           likelihood: 'Possible'
//         }
//       ]
//     });
//   };

//   const removeHazard = (index) => {
//     if (formData.hazards.length === 1) return;
//     const updatedHazards = [...formData.hazards];
//     updatedHazards.splice(index, 1);
//     setFormData({
//       ...formData,
//       hazards: updatedHazards
//     });
//   };

//   const togglePPE = (item, field) => {
//     setFormData({
//       ...formData,
//       ppe: {
//         ...formData.ppe,
//         [item]: {
//           ...formData.ppe[item],
//           [field]: !formData.ppe[item][field]
//         }
//       }
//     });
//   };

//   const handleSubmit = () => {
//     e.preventDefault();
//     dispatch(addhazardTemplate(formData));
//     console.log('Form submitted:', formData);
//     alert('Hazard assessment saved successfully!');
//   };

//   const statuscolors = {
//     Pending: 'bg-red-500 text-white',
//     InProgress: 'bg-yellow-500 text-white',
//     Completed: 'bg-green-500 text-white',
//   };

//   const severityColors = {
//     Low: 'bg-green-500',
//     Medium: 'bg-yellow-500',
//     High: 'bg-orange-500',
//     Critical: 'bg-red-500'
//   };

//   const likelihoodColors = {
//     Unlikely: 'bg-gray-300',
//     Possible: 'bg-yellow-500',
//     Likely: 'bg-orange-400',
//     Certain: 'bg-red-500'
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow">
//       <div className=" flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
//         <h1 className="text-xl font-bold text-gray-800">Construction Hazard Assessment</h1>
//         <Link to="/swms">
//                   <Button
                    
//                     className="btn-set-color"
//                     style={{ backgroundColor: "#0d6efd", color: "white" }}
//                   >
//                     <i class="fa-solid fa-arrow-left me-2"></i> Back to Overview
//                   </Button>
//                   </Link>
//       </div>

//       {/* Work Activity Section */}
//       <div className="mb-6">
//         <label className="block text-sm font-medium mb-2">Work Activity</label>
//         <textarea
//           value={formData.workActivity}
//           onChange={handleWorkActivityChange}
//           placeholder="Describe the work activity in detail..."
//           className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-400"
//           rows="3"
//         />
//       </div>

//       {/* Hazards Section */}
//       <div className="mb-6">
//         <div className="flex items-center justify-between mb-2">
//           <h2 className="text-lg font-medium text-gray-800">Hazards</h2>
//           <Button
//             onClick={addHazard}
//             className="btn-set-color"
//           >
//              Add Hazard
//           </Button>
//         </div>

//         {formData.hazards.map((hazard, index) => (
//           <div key={index} className="mb-4 p-4 border border-gray-200 rounded ">
//             <div className="flex justify-between">
//               <h3 className="font-medium text-gray-700 mb-2">Hazard #{index + 1}</h3>
//               {formData.hazards.length > 1 && (
//                 <button
//                   onClick={() => removeHazard(index)}
//                   className="text-red-500 hover:text-red-700"
//                 >
//                   <Trash2 size={18} />
//                 </button>
//               )}
//             </div>
            
//             <div className="mb-3">
//               <label className="block text-sm text-gray-600 mb-1">Hazard Description</label>
//               <textarea
//                 value={hazard.description}
//                 onChange={(e) => handleHazardChange(index, 'description', e.target.value)}
//                 placeholder="Describe the potential hazard in detail..."
//                 className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-400"
//                 rows="2"
//               />
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm text-gray-600 mb-2">Severity Level</label>
//                 <div className="grid grid-cols-2 gap-2">
//                   {['Low', 'Medium', 'High', 'Critical'].map(level => (
//                     <button
//                       key={`${index}-severity-${level}`}
//                       type="button"
//                       className={`py-1 rounded text-white text-center ${severityColors[level]} ${
//                         hazard.severityLevel === level ? 'ring-2 ring-blue-500' : ''
//                       }`}
//                       onClick={() => handleHazardChange(index, 'severityLevel', level)}
//                     >
//                       {level}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm text-gray-600 mb-2">Likelihood</label>
//                 <div className="grid grid-cols-2 gap-2">
//                   {['Unlikely', 'Possible', 'Likely', 'Certain'].map(option => (
//                     <button
//                       key={`${index}-likelihood-${option}`}
//                       type="button"
//                       className={`py-1 rounded text-center ${likelihoodColors[option]} ${
//                         option === 'Unlikely' ? 'text-gray-700' : 'text-white'
//                       } ${hazard.likelihood === option ? 'ring-2 ring-blue-500' : ''}`}
//                       onClick={() => handleHazardChange(index, 'likelihood', option)}
//                     >
//                       {option}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             </div>


//             <div className="mb-3">
//               <label className="block text-sm text-gray-600 mb-1">Control Measures</label>
//               <textarea
//                 value={hazard.controlmeasures}
//                 onChange={(e) => handleHazardChange(index, 'controlmeasures', e.target.value)}
//                 placeholder="Control measures to prevent the potential hazard in detail..."
//                 className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-400"
//                 rows="2"
//               />
//             </div>

//             <div className=" flex items-center justify-content-between mb-3 gap-2">
//                 <div className='w-full' > 
//               <label className="block text-sm text-gray-600 mb-1">Responsible Person</label>
//               <input
//                 type="text"
//                 value={hazard.responsiblePerson}
//                 onChange={(e) => handleHazardChange(index, 'responsiblePerson', e.target.value)}
//                 placeholder=""
//                 className="w-full p-2 rounded "
//                 rows="2"
//               />
//               </div>
//               <div className="w-full"> 
//               <label className="block text-sm text-gray-600 mb-1">Implementation Date</label>
//               <input
//                 type="date"
//                 value={hazard.implementationDate}
//                 onChange={(e) => handleHazardChange(index, 'implementationDate', e.target.value)}
//                 placeholder=""
//                 className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 rows="2"
//               />
//               </div>
//             </div>

//             <div className="mb-3">
//                 <label className="block text-sm text-gray-600 mb-1">Status</label>
//                 <div className="grid grid-cols-3 gap-2">
//                { ['Pending', 'InProgress', 'Completed'].map(status => (
//                     <button
//                         key={`${index}-status-${status}`}
//                         type="button"
//                         className={`py-1 rounded text-center ${hazard.status === status ? ` ${statuscolors[status]} bg-green-500 text-white border-blue-500 border-2` : 'bg-gray-100 text-gray-700 border-gray-300 border-1'}`}
//                         onClick={() => handleHazardChange(index, 'status', status)}
//                     >
//                         {status}
//                     </button>
//                 ))}
//                 </div>
            
                

// </div>




//           </div>
//         ))}
//       </div>

//       {/* PPE Requirements Section */}
//     {/* PPE Section */}
// <div className="mb-6">
//   <h2 className="text-lg font-medium mb-3">Required PPE</h2>
//   <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//     {ppeItems.map(item => {
//       const isSelected = formData.ppe[item.key]?.selected;

//       return (
//         <div
//           key={item.key}
//           onClick={() => togglePPE(item.key, 'selected')}
//           className={`border rounded p-3 cursor-pointer transition-colors ${
//             isSelected ? 'bg-blue-100 border-blue-500' : 'bg-white'
//           }`}
//         >
//           <div className="flex flex-col items-center mb-2">
//             <div className={`p-3 rounded-full ${isSelected ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'}`}>
//               {item.icon}
//             </div>
//             <p className="text-sm text-center mt-1">{item.title}</p>
//           </div>

//           {isSelected && (
//             <div className="flex items-center justify-center mt-2">
//               <input
//                 type="checkbox"
//                 id={`mandatory-${item.key}`}
//                 checked={formData.ppe[item.key].mandatory}
//                 onChange={(e) => {
//                   e.stopPropagation(); // Prevents toggling selection when clicking checkbox
//                   togglePPE(item.key, 'mandatory');
//                 }}
//                 className="h-4 w-4"
//               />
//               <label htmlFor={`mandatory-${item.key}`} className="ml-2 text-xs">
//                 Mandatory
//               </label>
//             </div>
//           )}
//         </div>
//       );
//     })}
//   </div>
// </div>


//       <div className="flex justify-end">
//         <Button
//           onClick={handleSubmit}
//           className="btn-set-color"
//         >
//           Save Assessment
//         </Button>
//       </div>
//     </div>
//   );
// }


import { useState } from 'react';
import { Plus, Trash2, AlertCircle, CheckCircle } from 'lucide-react';
import { Button } from 'react-bootstrap';
import { ChevronDown, ChevronUp, HardHat, Shield, FileText, Clipboard, UserCheck, Building2 } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { addhazardTemplate, updatehazardTemplate } from '../../../redux/slices/HazardTemplate';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

export default function HazardTemplateForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { state } = useLocation();
  console.log(state)
 const ppeArrayToObject = (ppeArr) => {
    const obj = {
      hardHat: { selected: false, mandatory: false },
      safetyGlasses: { selected: false, mandatory: false },
      gloves: { selected: false, mandatory: false },
      safetyBoots: { selected: false, mandatory: false },
      respirator: { selected: false, mandatory: false }
    };
    if (Array.isArray(ppeArr)) {
      ppeArr.forEach(item => {
        const key = Object.keys(obj).find(k => item.name.toLowerCase().includes(k.toLowerCase().replace(/([A-Z])/g, ' $1').trim()));
        if (key) {
          obj[key] = { selected: true, mandatory: item.mandatory };
        }
      });
    }
    return obj;
  };

  // Helper to convert hazards to your form's hazard structure
  const hazardsForForm = (hazardsArr) =>
    hazardsArr?.map(h => ({
      hazardDescription: h.hazardDescription || "",
      severityLevel: h.severityLevel || "Medium",
      likelihood: h.likelihood || "Possible",
      impact: h.impact || "Moderate",
      riskMatrix: h.riskMatrix || "2 x 2",
      controlMeasure: h.controlMeasure || "",
      responsiblePerson: h.responsiblePerson || "",
      implementationDate: h.implementationDate || "",
      additionalNotes: h.additionalNotes || "",
      status: h.status || "Pending"
    })) || [
      {
        hazardDescription: '',
        severityLevel: 'Medium',
        likelihood: 'Possible',
        impact: 'Moderate',
        riskMatrix: '2 x 2',
        controlMeasure: '',
        responsiblePerson: '',
        implementationDate: '',
        additionalNotes: '',
        status: 'Pending'
      }
    ];

  // Initialize formData for add or edit
  const [formData, setFormData] = useState(() => {
    if (state?.template) {
      return {
        workActivity: state.template.workactivity || "",
        hazards: hazardsForForm(state.template.hazards),
        ppe: ppeArrayToObject(state.template.requiredPPE)
      };
    }
    // Default (add mode)
    return {
      workActivity: '',
      hazards: [
        {
          hazardDescription: '',
          severityLevel: 'Medium',
          likelihood: 'Possible',
          impact: 'Moderate',
          riskMatrix: '2 x 2',
          controlMeasure: '',
          responsiblePerson: '',
          implementationDate: '',
          additionalNotes: '',
          status: 'Pending'
        }
      ],
      ppe: {
        hardHat: { selected: false, mandatory: false },
        safetyGlasses: { selected: false, mandatory: false },
        gloves: { selected: false, mandatory: false },
        safetyBoots: { selected: false, mandatory: false },
        respirator: { selected: false, mandatory: false }
      }
    };
  });


  const handleWorkActivityChange = (e) => {
    setFormData({
      ...formData,
      workActivity: e.target.value
    });
  };

  const ppeItems = [
    {
      key: "hardHat",
      title: "Hard Hat",
      icon: <HardHat />,
      mandatory: false
    },
    {
      key: "safetyGlasses",
      title: "Safety Glasses",
      icon: <Shield size={24} />,
      mandatory: false,
    },
    {
      key: "gloves",
      title: "Gloves",
      icon: <FileText size={24} className="text-blue-600" />,
      mandatory: false,
    },
    {
      key: "safetyBoots",
      title: "Safety Boots",
      icon: <Clipboard size={24} className="text-gray-600" />,
      mandatory: false,
    },
    {
      key: "respirator",
      title: "Dust Mask",
      icon: <UserCheck size={24} className="text-gray-600" />,
      mandatory: false,
    }
  ];

  const handleHazardChange = (index, field, value) => {
    const updatedHazards = [...formData.hazards];
    updatedHazards[index] = {
      ...updatedHazards[index],
      [field]: value
    };
    
    // Auto-calculate risk matrix when severity or likelihood changes
    if (field === 'severityLevel' || field === 'likelihood') {
      const severityMap = { Low: 1, Medium: 2, High: 3, Critical: 4 };
      const likelihoodMap = { Unlikely: 1, Possible: 2, Likely: 3, Certain: 4 };
      
      const severity = field === 'severityLevel' ? value : updatedHazards[index].severityLevel;
      const likelihood = field === 'likelihood' ? value : updatedHazards[index].likelihood;
      
      updatedHazards[index].riskMatrix = `${severityMap[severity]} x ${likelihoodMap[likelihood]}`;
      
      // Auto-set impact based on risk level
      const riskScore = severityMap[severity] * likelihoodMap[likelihood];
      if (riskScore <= 4) updatedHazards[index].impact = 'Minor';
      else if (riskScore <= 8) updatedHazards[index].impact = 'Moderate';
      else if (riskScore <= 12) updatedHazards[index].impact = 'Severe';
      else updatedHazards[index].impact = 'Critical';
    }
    
    setFormData({
      ...formData,
      hazards: updatedHazards
    });
  };

  const addHazard = () => {
    setFormData({
      ...formData,
      hazards: [
        ...formData.hazards,
        {
          hazardDescription: '',
          severityLevel: 'Medium',
          likelihood: 'Possible',
          impact: 'Moderate',
          riskMatrix: '2 x 2',
          controlMeasure: '',
          responsiblePerson: '',
          implementationDate: '',
          additionalNotes: '',
          status: 'Pending'
        }
      ]
    });
  };

  const removeHazard = (index) => {
    if (formData.hazards.length === 1) return;
    const updatedHazards = [...formData.hazards];
    updatedHazards.splice(index, 1);
    setFormData({
      ...formData,
      hazards: updatedHazards
    });
  };

  const togglePPE = (item, field) => {
    setFormData({
      ...formData,
      ppe: {
        ...formData.ppe,
        [item]: {
          ...formData.ppe[item],
          [field]: !formData.ppe[item][field]
        }
      }
    });
  };

  // Transform data to match API format
  const transformDataForAPI = () => {
    // Transform PPE data
    const requiredPPE = Object.entries(formData.ppe)
      .filter(([key, value]) => value.selected)
      .map(([key, value]) => ({
        name: ppeItems.find(item => item.key === key)?.title || key,
        mandatory: value.mandatory
      }));

    // Transform hazards data (remove fields not needed by API)
    const transformedHazards = formData.hazards.map(hazard => ({
      hazardDescription: hazard.hazardDescription,
      severityLevel: hazard.severityLevel,
      likelihood: hazard.likelihood,
      impact: hazard.impact,
      riskMatrix: hazard.riskMatrix,
      additionalNotes: hazard.additionalNotes,
      responsiblePerson: hazard.responsiblePerson,
      controlMeasure: hazard.controlMeasure
    }));

    return {
      workactivity: formData.workActivity, // Note: API expects 'workactivity' not 'workActivity'
      hazards: transformedHazards,
      requiredPPE: requiredPPE
    };
  };
const handleSubmit = async (e) => {
  e.preventDefault();
  const apiPayload = transformDataForAPI();

  try {
    if (state?.template?._id) {
      // Edit mode
      await dispatch(updatehazardTemplate({ id: state.template._id, payload: apiPayload })) .then((response) => {
          if (response.status === 200) {
            toast.success("Hazard Template Updated successfully");
          }
        })
      }
     else {
      // Add mode
      await dispatch(addhazardTemplate(apiPayload)).unwrap();
      toast.success("Hazard Template Added successfully");
    }
    navigate(-1);
  } catch (error) {
    toast.error("Error saving hazard template");
  }
};


  const statuscolors = {
    Pending: 'bg-red-500 text-white',
    InProgress: 'bg-yellow-500 text-white',
    Completed: 'bg-green-500 text-white',
  };

  const severityColors = {
    Low: 'bg-green-500',
    Medium: 'bg-yellow-500',
    High: 'bg-orange-500',
    Critical: 'bg-red-500'
  };

  const likelihoodColors = {
    Unlikely: 'bg-gray-300',
    Possible: 'bg-yellow-500',
    Likely: 'bg-orange-400',
    Certain: 'bg-red-500'
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-800">Construction Hazard Assessment</h1>
        <Link to="/swms">
          <Button
            className="btn-set-color"
            style={{ backgroundColor: "#0d6efd", color: "white" }}
          >
            <i className="fa-solid fa-arrow-left me-2"></i> Back to Overview
          </Button>
        </Link>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Work Activity Section */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Work Activity</label>
          <textarea
            value={formData.workActivity}
            onChange={handleWorkActivityChange}
            placeholder="Describe the work activity in detail..."
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="3"
            required
          />
        </div>

        {/* Hazards Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-medium text-gray-800">Hazards</h2>
            <Button
              type="button"
              onClick={addHazard}
              className="btn-set-color"
            >
              Add Hazard
            </Button>
          </div>

          {formData.hazards.map((hazard, index) => (
            <div key={index} className="mb-4 p-4 border border-gray-200 rounded">
              <div className="flex justify-between">
                <h3 className="font-medium text-gray-700 mb-2">Hazard #{index + 1}</h3>
                {formData.hazards.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeHazard(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={18} />
                  </button>
                )}
              </div>
              
              <div className="mb-3">
                <label className="block text-sm text-gray-600 mb-1">Hazard Description</label>
                <textarea
                  value={hazard.hazardDescription}
                  onChange={(e) => handleHazardChange(index, 'hazardDescription', e.target.value)}
                  placeholder="Describe the potential hazard in detail..."
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="2"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Severity Level</label>
                  <div className="grid grid-cols-2 gap-2">
                    {['Low', 'Medium', 'High', 'Critical'].map(level => (
                      <button
                        key={`${index}-severity-${level}`}
                        type="button"
                        className={`py-1 rounded text-white text-center ${severityColors[level]} ${
                          hazard.severityLevel === level ? 'ring-2 ring-blue-500' : ''
                        }`}
                        onClick={() => handleHazardChange(index, 'severityLevel', level)}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-2">Likelihood</label>
                  <div className="grid grid-cols-2 gap-2">
                    {['Unlikely', 'Possible', 'Likely', 'Certain'].map(option => (
                      <button
                        key={`${index}-likelihood-${option}`}
                        type="button"
                        className={`py-1 rounded text-center ${likelihoodColors[option]} ${
                          option === 'Unlikely' ? 'text-gray-700' : 'text-white'
                        } ${hazard.likelihood === option ? 'ring-2 ring-blue-500' : ''}`}
                        onClick={() => handleHazardChange(index, 'likelihood', option)}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Risk Matrix and Impact - Auto-calculated and displayed */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Risk Matrix</label>
                  <input
                    type="text"
                    value={hazard.riskMatrix}
                    readOnly
                    className="w-full p-2 border border-gray-300 rounded bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Impact</label>
                  <input
                    type="text"
                    value={hazard.impact}
                    readOnly
                    className="w-full p-2 border border-gray-300 rounded bg-gray-100"
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="block text-sm text-gray-600 mb-1">Control Measures</label>
                <textarea
                  value={hazard.controlMeasure}
                  onChange={(e) => handleHazardChange(index, 'controlMeasure', e.target.value)}
                  placeholder="Describe how control measures will be verified..."
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="2"
                />
              </div>

              <div className="flex items-center justify-between mb-3 gap-2">
                <div className='w-full'> 
                  <label className="block text-sm text-gray-600 mb-1">Responsible Person</label>
                  <input
                    type="text"
                    value={hazard.responsiblePerson}
                    onChange={(e) => handleHazardChange(index, 'responsiblePerson', e.target.value)}
                    placeholder="Enter responsible person's name"
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="w-full"> 
                  <label className="block text-sm text-gray-600 mb-1">Implementation Date</label>
                  <input
                    type="date"
                    value={hazard.implementationDate}
                    onChange={(e) => handleHazardChange(index, 'implementationDate', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="block text-sm text-gray-600 mb-1">Additional Notes</label>
                <textarea
                  value={hazard.additionalNotes}
                  onChange={(e) => handleHazardChange(index, 'additionalNotes', e.target.value)}
                  placeholder="Any additional notes or comments..."
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="2"
                />
              </div>

              <div className="mb-3">
                <label className="block text-sm text-gray-600 mb-1">Status</label>
                <div className="grid grid-cols-3 gap-2">
                  {['Pending', 'InProgress', 'Completed'].map(status => (
                    <button
                      key={`${index}-status-${status}`}
                      type="button"
                      className={`py-1 rounded text-center ${hazard.status === status ? `${statuscolors[status]} border-blue-500 border-2` : 'bg-gray-100 text-gray-700 border-gray-300 border'}`}
                      onClick={() => handleHazardChange(index, 'status', status)}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* PPE Section */}
        <div className="mb-6">
          <h2 className="text-lg font-medium mb-3">Required PPE</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {ppeItems.map(item => {
              const isSelected = formData.ppe[item.key]?.selected;

              return (
                <div
                  key={item.key}
                  onClick={() => togglePPE(item.key, 'selected')}
                  className={`border rounded p-3 cursor-pointer transition-colors ${
                    isSelected ? 'bg-blue-100 border-blue-500' : 'bg-white'
                  }`}
                >
                  <div className="flex flex-col items-center mb-2">
                    <div className={`p-3 rounded-full ${isSelected ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'}`}>
                      {item.icon}
                    </div>
                    <p className="text-sm text-center mt-1">{item.title}</p>
                  </div>

                  {isSelected && (
                    <div className="flex items-center justify-center mt-2">
                      <input
                        type="checkbox"
                        id={`mandatory-${item.key}`}
                        checked={formData.ppe[item.key].mandatory}
                        onChange={(e) => {
                          e.stopPropagation();
                          togglePPE(item.key, 'mandatory');
                        }}
                        className="h-4 w-4"
                      />
                      <label htmlFor={`mandatory-${item.key}`} className="ml-2 text-xs">
                        Mandatory
                      </label>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            className="btn-set-color"
          >
            Save Assessment
          </Button>
        </div>
      </form>
    </div>
  );
}