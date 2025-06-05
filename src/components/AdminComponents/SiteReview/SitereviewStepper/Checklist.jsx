
import React, {useState} from 'react'
import { ChevronDown, ChevronUp, Camera, AlertTriangle, CheckCircle, HelpCircle, Download, Mail, Plus, X, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Checklist = ({ onNext, onBack}) => {

  const navigate = useNavigate();
 const [activeTab, setActiveTab] = useState('checklist');
  const [expandedSections, setExpandedSections] = useState({
    'site-safety': true,
    'personal-safety': false,
    'tools-equipment': false,
    'environment': false
  });
  const [checklistData, setChecklistData] = useState({
    'site-safety': {
      'site-fencing': { answer: '', photos: [], comment: '' },
      'warning-signs': { answer: 'yes', photos: [], comment: '' },
      'public-protection': { answer: 'no', photos: [], comment: 'Need additional barriers at north entrance' },
      'first-aid': { answer: '', photos: [], comment: '' },
      'wash-stations': { answer: 'yes', photos: [], comment: '' }
    },
    'personal-safety': {
      'ppe-available': { answer: '', photos: [], comment: '' },
      'ppe-correct': { answer: '', photos: [], comment: '' },
      'staff-trained': { answer: '', photos: [], comment: '' }
    },
    'tools-equipment': {
      'inspection-current': { answer: '', photos: [], comment: '' },
      'proper-storage': { answer: '', photos: [], comment: '' },
      'damaged-items': { answer: '', photos: [], comment: '' }
    },
    'environment': {
      'waste-management': { answer: '', photos: [], comment: '' },
      'spill-controls': { answer: '', photos: [], comment: '' },
      'noise-management': { answer: '', photos: [], comment: '' }
    }
  });

  const toggleSection = (section) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section]
    });
  };

  const handleAnswerChange = (category, question, value) => {
     

    setChecklistData({
      ...checklistData,
      [category]: {
        ...checklistData[category],
        [question]: {
          ...checklistData[category][question],
          answer: value
        }
      }
    });

    if(value === "no"){
      const payload = {
        taskName: question,
        taskCategory: category,
     
      }
      navigate("/create-task", { state: { payload } });  
  };
}

  const handleCommentChange = (category, question, value) => {
    setChecklistData({
      ...checklistData,
      [category]: {
        ...checklistData[category],
        [question]: {
          ...checklistData[category][question],
          comment: value
        }
      }
    });
  };

  const countIssues = () => {
    let count = 0;
    Object.keys(checklistData).forEach(category => {
      Object.keys(checklistData[category]).forEach(question => {
        if (checklistData[category][question].answer === 'no') {
            navigate("/create-task")
        }
      });
    });
    return count;
  };
    
  return (
    <>

         <div className="flex-1  p-4">
        {activeTab === 'checklist' ? (
          <div className="space-y-4">
            {/* Site Safety & Traffic Management Section */}
            <div className="bg-white rounded-lg shadow">
              <div 
                className="flex justify-between items-center p-4 cursor-pointer"
                onClick={() => toggleSection('site-safety')}
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <span className="text-blue-600 font-bold">1</span>
                  </div>
                  <h2 className="text-lg font-semibold">Site Safety & Traffic Management</h2>
                </div>
                {expandedSections['site-safety'] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>
              
              {expandedSections['site-safety'] && (
                <div className="p-4 border-t">
                  <div className="space-y-6">
                    {/* Question 1 */}
                    <ChecklistItem
                      question="Site is properly fenced and secured when unattended"
                      category="site-safety"
                      id="site-fencing"
                      data={checklistData['site-safety']['site-fencing']}
                      onAnswerChange={(value) => handleAnswerChange('site-safety', 'site-fencing', value)}
                      onCommentChange={(value) => handleCommentChange('site-safety', 'site-fencing', value)}
                      helpText="Ensure all perimeter fencing is at least 1.8m tall with no gaps and all access points can be locked."
                    />
                    
                    {/* Question 2 */}
                    <ChecklistItem
                      question="Appropriate warning signs and notices are displayed"
                      category="site-safety"
                      id="warning-signs"
                      data={checklistData['site-safety']['warning-signs']}
                      onAnswerChange={(value) => handleAnswerChange('site-safety', 'warning-signs', value)}
                      onCommentChange={(value) => handleCommentChange('site-safety', 'warning-signs', value)}
                      helpText="Signs should include Site Entry Requirements, PPE requirements, and Emergency Information."
                    />
                    
                    {/* Question 3 */}
                    <ChecklistItem
                      question="Protection for public and visitors is in place"
                      category="site-safety"
                      id="public-protection"
                      data={checklistData['site-safety']['public-protection']}
                      onAnswerChange={(value) => handleAnswerChange('site-safety', 'public-protection', value)}
                      onCommentChange={(value) => handleCommentChange('site-safety', 'public-protection', value)}
                      helpText="Check for safety barriers, marked pathways, and overhead protection where required."
                    />
                    
                    {/* Question 4 */}
                    <ChecklistItem
                      question="First aid kit is accessible and fully stocked"
                      category="site-safety"
                      id="first-aid"
                      data={checklistData['site-safety']['first-aid']}
                      onAnswerChange={(value) => handleAnswerChange('site-safety', 'first-aid', value)}
                      onCommentChange={(value) => handleCommentChange('site-safety', 'first-aid', value)}
                      helpText="First aid kit should be prominently located with supplies checked and replenished."
                    />
                    
                    {/* Question 5 */}
                    <ChecklistItem
                      question="Hand wash stations are available and maintained"
                      category="site-safety"
                      id="wash-stations"
                      data={checklistData['site-safety']['wash-stations']}
                      onAnswerChange={(value) => handleAnswerChange('site-safety', 'wash-stations', value)}
                      onCommentChange={(value) => handleCommentChange('site-safety', 'wash-stations', value)}
                      helpText="Clean water, soap, and hand drying facilities should be available at entry/exit points."
                    />
                  </div>
                </div>
              )}
            </div>
              {/* Personal Safety Section */}
              <div className="bg-white rounded-lg shadow">
              <div 
                className="d-flex justify-between items-center p-4 cursor-pointer"
                onClick={() => toggleSection('personal-safety')}
              >
                <div className="d-flex items-center">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <span className="text-blue-600 font-bold">2</span>
                  </div>
                  <h2 className="text-lg font-semibold">Personal Safety & PPE</h2>
                </div>
                {expandedSections['personal-safety'] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>
              
              {expandedSections['personal-safety'] && (
                <div className="p-4 border-t">
                  <div className="space-y-6">
                    <ChecklistItem
                      question="Required PPE is available for all workers and visitors"
                      category="personal-safety"
                      id="ppe-available"
                      data={checklistData['personal-safety']['ppe-available']}
                      onAnswerChange={(value) => handleAnswerChange('personal-safety', 'ppe-available', value)}
                      onCommentChange={(value) => handleCommentChange('personal-safety', 'ppe-available', value)}
                      helpText="Check stock of hard hats, safety glasses, high-vis vests, and hearing protection."
                    />
                    
                    <ChecklistItem
                      question="Workers are using correct PPE for tasks being performed"
                      category="personal-safety"
                      id="ppe-correct"
                      data={checklistData['personal-safety']['ppe-correct']}
                      onAnswerChange={(value) => handleAnswerChange('personal-safety', 'ppe-correct', value)}
                      onCommentChange={(value) => handleCommentChange('personal-safety', 'ppe-correct', value)}
                      helpText="Ensure task-specific PPE is being used (e.g. respiratory protection for dust, fall arrest for heights)."
                    />
                    
                    <ChecklistItem
                      question="All staff are trained in correct PPE use and maintenance"
                      category="personal-safety"
                      id="staff-trained"
                      data={checklistData['personal-safety']['staff-trained']}
                      onAnswerChange={(value) => handleAnswerChange('personal-safety', 'staff-trained', value)}
                      onCommentChange={(value) => handleCommentChange('personal-safety', 'staff-trained', value)}
                      helpText="Workers should be able to demonstrate knowledge of when and how to use their PPE."
                    />
                  </div>
                </div>
              )}
            </div>

  {/* Tools & Equipment Section */}
  <div className="bg-white rounded-lg shadow">
              <div 
                className="flex justify-between items-center p-4 cursor-pointer"
                onClick={() => toggleSection('tools-equipment')}
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <span className="text-blue-600 font-bold">3</span>
                  </div>
                  <h2 className="text-lg font-semibold">Tools & Equipment</h2>
                </div>
                {expandedSections['tools-equipment'] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>
              
              {expandedSections['tools-equipment'] && (
                <div className="p-4 border-t">
                  <div className="space-y-6">
                    <ChecklistItem
                      question="All tools have current inspection tags/records"
                      category="tools-equipment"
                      id="inspection-current"
                      data={checklistData['tools-equipment']['inspection-current']}
                      onAnswerChange={(value) => handleAnswerChange('tools-equipment', 'inspection-current', value)}
                      onCommentChange={(value) => handleCommentChange('tools-equipment', 'inspection-current', value)}
                      helpText="Check that power tools, lifting equipment and other machinery have up-to-date inspection tags."
                    />
                    
                    <ChecklistItem
                      question="Tools and equipment are properly stored when not in use"
                      category="tools-equipment"
                      id="proper-storage"
                      data={checklistData['tools-equipment']['proper-storage']}
                      onAnswerChange={(value) => handleAnswerChange('tools-equipment', 'proper-storage', value)}
                      onCommentChange={(value) => handleCommentChange('tools-equipment', 'proper-storage', value)}
                      helpText="Tools should be secured in designated storage areas to prevent unauthorized use or theft."
                    />
                    
                    <ChecklistItem
                      question="Damaged or defective items are tagged and removed from service"
                      category="tools-equipment"
                      id="damaged-items"
                      data={checklistData['tools-equipment']['damaged-items']}
                      onAnswerChange={(value) => handleAnswerChange('tools-equipment', 'damaged-items', value)}
                      onCommentChange={(value) => handleCommentChange('tools-equipment', 'damaged-items', value)}
                      helpText="Any damaged item should be clearly marked as 'Do Not Use' and secured away from operational equipment."
                    />
                  </div>
                </div>
              )}
            </div>
             {/* Environmental Controls Section */}
             <div className="bg-white rounded-lg shadow">
              <div 
                className="flex justify-between items-center p-4 cursor-pointer"
                onClick={() => toggleSection('environment')}
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <span className="text-blue-600 font-bold">4</span>
                  </div>
                  <h2 className="text-lg font-semibold">Environmental Controls</h2>
                </div>
                {expandedSections['environment'] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>
              
              {expandedSections['environment'] && (
                <div className="p-4 border-t">
                  <div className="space-y-6">
                    <ChecklistItem
                      question="Waste is being properly managed and segregated"
                      category="environment"
                      id="waste-management"
                      data={checklistData['environment']['waste-management']}
                      onAnswerChange={(value) => handleAnswerChange('environment', 'waste-management', value)}
                      onCommentChange={(value) => handleCommentChange('environment', 'waste-management', value)}
                      helpText="Check for separate waste streams (general, recyclable, hazardous) and appropriate containers."
                    />
                    
                    <ChecklistItem
                      question="Spill control equipment is available and accessible"
                      category="environment"
                      id="spill-controls"
                      data={checklistData['environment']['spill-controls']}
                      onAnswerChange={(value) => handleAnswerChange('environment', 'spill-controls', value)}
                      onCommentChange={(value) => handleCommentChange('environment', 'spill-controls', value)}
                      helpText="Spill kits should be located near fuel storage, chemical storage and refueling areas."
                    />
                    
                    <ChecklistItem
                      question="Noise management controls are implemented"
                      category="environment"
                      id="noise-management"
                      data={checklistData['environment']['noise-management']}
                      onAnswerChange={(value) => handleAnswerChange('environment', 'noise-management', value)}
                      onCommentChange={(value) => handleCommentChange('environment', 'noise-management', value)}
                      helpText="Ensure noise barriers are in place if required and noisy work is scheduled appropriately."
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
            ) : (
              // Summary Tab
              <div className="bg-white rounded-lg shadow p-6">
                <div className="mb-6">
                  <h2 className="text-xl font-bold mb-2">Safety Inspection Summary</h2>
                  <p className="text-gray-600">Project: Commercial Building #4752 | Date: May 6, 2025</p>
                </div>
                
                {/* Issues Overview */}
                <div className="mb-6 bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <AlertTriangle className="text-orange-500 mr-2" size={24} />
                    <h5 className="text-lg font-medium text-orange-700">Issues Requiring Attention ({countIssues()})</h5>
                  </div>
                  <ul className="space-y-2">
                    {Object.keys(checklistData).map(category => 
                      Object.keys(checklistData[category]).map(question => {
                        if (checklistData[category][question].answer === 'no') {
                          // Create a readable question name from the ID
                          const readableQuestion = question.split('-').map(
                            word => word.charAt(0).toUpperCase() + word.slice(1)
                          ).join(' ');
                          
                          return (
                            <li key={`${category}-${question}`} className="flex items-start">
                              <span className="text-red-500 mr-2">•</span>
                              <div>
                                <span className="font-medium">{readableQuestion}</span>
                                {checklistData[category][question].comment && (
                                  <p className="text-gray-600 text-sm">{checklistData[category][question].comment}</p>
                                )}
                              </div>
                            </li>
                          );
                        }
                        return null;
                      })
                    ).flat().filter(Boolean)}
                    {countIssues() === 0 && (
                      <li className="text-green-600 flex items-center">
                        <CheckCircle size={16} className="mr-2" />
                        No issues identified in this inspection
                      </li>
                    )}
                  </ul>
                </div>
                
                {/* Smart Review Suggestions */}
                <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <HelpCircle className="text-blue-500 mr-2" size={24} />
                    <h5 className="text-lg font-medium text-blue-700">Smart Review Suggestions</h5>
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <div>
                        <span>Based on missing controls, we recommend reviewing public safety barriers at north entrance area.</span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <div>
                        <span>This checklist indicates several unanswered items - consider scheduling a follow-up inspection.</span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <div>
                        <span>Reference NCC Section B.3.2 regarding public protection standards for commercial construction sites.</span>
                      </div>
                    </li>
                  </ul>
                </div>
                
                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4">
                  <button className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg">
                    <Download size={18} className="mr-2" />
                    Download Report
                  </button>
                  <button className="flex items-center bg-green-600 text-white px-4 py-2 rounded-lg">
                    <Mail size={18} className="mr-2" />
                    Email Report
                  </button>
                  <button className="flex items-center bg-purple-600 text-white px-4 py-2 rounded-lg">
                    <Plus size={18} className="mr-2" />
                    Create Tasks from Issues
                  </button>
                </div>
              </div>
            )}
          </div>
        <div className="flex justify-between gap-2 mt-4">
  <button type="button" className="btn btn-outline-secondary" onClick={onBack}>
    back
  </button>
  
    <button className="btn btn-primary" onClick={onNext}>Next</button>

</div>

    </>
  )
}

export default Checklist


// function ChecklistItem({ question, category, id, data, onAnswerChange, onCommentChange, helpText }) {
//   const [showHelp, setShowHelp] = useState(false);
//   const [showPhotoUpload, setShowPhotoUpload] = useState(false);
  
//   return (
//     <div className="border rounded-lg p-4">
//       <div className="flex items-start justify-between mb-3">
//         <div className="flex-1">
//           <h5 className="font-medium">{question}</h5>
//         </div>
//         <button 
//           className="ml-2 text-blue-600 hover:text-blue-800 flex items-center text-sm"
//           onClick={() => setShowHelp(!showHelp)}
//         >
//           <HelpCircle size={16} className="mr-1" />
//           Unsure? View controls
//         </button>
//       </div>
      
//       {showHelp && (
//         <div className="bg-blue-50 p-3 rounded-md mb-3 text-sm text-blue-800">
//           {helpText}
//         </div>
//       )}
      
//       <div className="flex flex-wrap items-center gap-2 mb-3">
//         <div className="flex items-center gap-4">
//           <label className={`flex items-center gap-2 cursor-pointer ${data.answer === 'yes' ? 'text-green-600 font-medium' : ''}`}>
//             <input
//               type="radio"
//               name={`${category}-${id}`}
//               value="yes"
//               checked={data.answer === 'yes'}
//               onChange={() => onAnswerChange('yes')}
//               className="sr-only"
//             />
//             <div className={`w-5 h-5 rounded-full flex items-center justify-center border ${data.answer === 'yes' ? 'bg-green-600 border-green-600' : 'border-gray-400'}`}>
//               {data.answer === 'yes' && <Check size={14} className="text-white" />}
//             </div>
//             <span>Yes</span>
//           </label>
          
//           <label className={`flex items-center gap-2 cursor-pointer ${data.answer === 'no' ? 'text-red-600 font-medium' : ''}`}>
//             <input
//               type="radio"
//               name={`${category}-${id}`}
//               value="no"
//               checked={data.answer === 'no'}
//               onChange={() => onAnswerChange('no')}
//               className="sr-only"
//             />
//             <div className={`w-5 h-5 rounded-full flex items-center justify-center border ${data.answer === 'no' ? 'bg-red-600 border-red-600' : 'border-gray-400'}`}>
//               {data.answer === 'no' && <X size={14} className="text-white" />}
//             </div>
//             <span>No</span>
//           </label>
          
//           <label className={`flex items-center gap-2 cursor-pointer ${data.answer === 'na' ? 'text-gray-600 font-medium' : ''}`}>
//             <input
//               type="radio"
//               name={`${category}-${id}`}
//               value="na"
//               checked={data.answer === 'na'}
//               onChange={() => onAnswerChange('na')}
//               className="sr-only"
//             />
//             <div className={`w-5 h-5 rounded-full flex items-center justify-center border ${data.answer === 'na' ? 'bg-gray-600 border-gray-600' : 'border-gray-400'}`}>
//               {data.answer === 'na' && <div className="w-2 h-2 bg-white rounded-full" />}
//             </div>
//             <span>N/A</span>
//           </label>
//         </div>
        
//         <button 
//           className={`flex items-center text-sm ml-auto ${showPhotoUpload ? 'text-blue-800 bg-blue-100 p-1 px-2 rounded' : 'text-blue-600'}`}
//           onClick={() => setShowPhotoUpload(!showPhotoUpload)}
//         >
//           <Camera size={16} className="mr-1" />
//           {data.photos.length > 0 ? `Photos (${data.photos.length})` : "Add Photo"}
//         </button>
//       </div>
      
//       {/* {showPhotoUpload && (
//         <div className="mb-3 p-3 border border-dashed border-gray-300 rounded-lg bg-gray-50 flex items-center justify-center">
//           <div className="text-center">
//             <Camera size={24} className="mx-auto mb-2 text-gray-400" />
//             <input type='file'  className="text-sm text-gray-500">Tap to take photo or upload</input>
//           </div>
//         </div>
//       )} */}
//       {showPhotoUpload && (
//   <div className="mb-3 p-3 border border-dashed border-gray-300 rounded-lg bg-gray-50 flex items-center justify-center">
//     <div className="text-center">
//       <Camera size={24} className="mx-auto mb-2 text-gray-400" />
//       <label className="text-sm text-gray-500 cursor-pointer">
//         Tap to take photo or upload
//         <input
//           type="file"
//           className="hidden"
//           onChange={(e) => {
//             const file = e.target.files[0];
//             if (file) {
//               // Add the photo to the data
//               onAnswerChange([...data.photos, file]);
//             }
//           }}
//         />
//       </label>
//     </div>
//   </div>
// )}

//         <div>
//           <textarea
//             className="w-full p-2 border rounded-md text-sm"
//             placeholder={data.answer === 'no' ? "Describe the issue and any immediate actions taken..." : "Add comment (optional)"}
//             value={data.comment}
//             onChange={(e) => onCommentChange(e.target.value)}
//             rows={2}
//           />
//         </div>
      
//     </div>
//   );
// }

function ChecklistItem({ question, category, id, data, onAnswerChange, onCommentChange, helpText }) {
  const [showHelp, setShowHelp] = useState(false);
  const [showPhotoUpload, setShowPhotoUpload] = useState(false);

  return (
    <div className="border rounded-lg p-4">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h5 className="font-medium">{question}</h5>
        </div>
        <button
          className="ml-2 text-blue-600 hover:text-blue-800 flex items-center text-sm"
          onClick={() => setShowHelp(!showHelp)}
        >
          <HelpCircle size={16} className="mr-1" />
          Unsure? View controls
        </button>
      </div>

      {showHelp && (
        <div className="bg-blue-50 p-3 rounded-md mb-3 text-sm text-blue-800">
          {helpText}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-2 mb-3">
        <div className="flex items-center gap-4">
          <label
            className={`flex items-center gap-2 cursor-pointer ${
              data.answer === "yes" ? "text-green-600 font-medium" : ""
            }`}
          >
            <input
              type="radio"
              name={`${category}-${id}`}
              value="yes"
              checked={data.answer === "yes"}
              onChange={() => onAnswerChange("yes")}
              className="sr-only"
            />
            <div
              className={`w-5 h-5 rounded-full flex items-center justify-center border ${
                data.answer === "yes"
                  ? "bg-green-600 border-green-600"
                  : "border-gray-400"
              }`}
            >
              {data.answer === "yes" && <Check size={14} className="text-white" />}
            </div>
            <span>Yes</span>
          </label>

          <label
            className={`flex items-center gap-2 cursor-pointer ${
              data.answer === "no" ? "text-red-600 font-medium" : ""
            }`}
          >
            <input
              type="radio"
              name={`${category}-${id}`}
              value="no"
              checked={data.answer === "no"}
              onChange={() => onAnswerChange("no")}
              className="sr-only"
            />
            <div
              className={`w-5 h-5 rounded-full flex items-center justify-center border ${
                data.answer === "no"
                  ? "bg-red-600 border-red-600"
                  : "border-gray-400"
              }`}
            >
              {data.answer === "no" && <X size={14} className="text-white" />}
            </div>
            <span>No</span>
          </label>

          <label
            className={`flex items-center gap-2 cursor-pointer ${
              data.answer === "na" ? "text-gray-600 font-medium" : ""
            }`}
          >
            <input
              type="radio"
              name={`${category}-${id}`}
              value="na"
              checked={data.answer === "na"}
              onChange={() => onAnswerChange("na")}
              className="sr-only"
            />
            <div
              className={`w-5 h-5 rounded-full flex items-center justify-center border ${
                data.answer === "na"
                  ? "bg-gray-600 border-gray-600"
                  : "border-gray-400"
              }`}
            >
              {data.answer === "na" && (
                <div className="w-2 h-2 bg-white rounded-full" />
              )}
            </div>
            <span>N/A</span>
          </label>
        </div>

        <button
          className={`flex items-center text-sm ml-auto ${
            showPhotoUpload
              ? "text-blue-800 bg-blue-100 p-1 px-2 rounded"
              : "text-blue-600"
          }`}
          onClick={(e) => {
            e.preventDefault(); // Prevent scrolling
            setShowPhotoUpload(!showPhotoUpload);
          }}
        >
          <Camera size={16} className="mr-1" />
          {data.photos.length > 0 ? `Photos (${data.photos.length})` : "Add Photo"}
        </button>
      </div>

      {/* Keep the photo upload section in the DOM but toggle visibility */}
      <div
        className={`mb-3 p-3 border border-dashed border-gray-300 rounded-lg bg-gray-50 flex items-center justify-center ${
          showPhotoUpload ? "block" : "hidden"
        }`}
      >
        <div className="text-center">
          <Camera size={24} className="mx-auto mb-2 text-gray-400" />
          <label className="text-sm text-gray-500 cursor-pointer">
            Tap to take photo or upload
            <input
              type="file"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  // Add the photo to the data
                  onAnswerChange([...data.photos, file]);
                }
              }}
            />
          </label>
        </div>
      </div>

      <div>
        <textarea
          className="w-full p-2 border rounded-md text-sm"
          placeholder={
            data.answer === "no"
              ? "Describe the issue and any immediate actions taken..."
              : "Add comment (optional)"
          }
          value={data.comment}
          onChange={(e) => onCommentChange(e.target.value)}
          rows={2}
        />
      </div>
    </div>
  );
}