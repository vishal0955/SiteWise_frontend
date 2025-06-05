import { useEffect, useState } from "react";
import {
  ChevronRight,
  AlertTriangle,
  Hammer,
  Users,
  HardHat,
  Box,
  Wrench,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";


import axios from "axios";
import { getallhazardTemplates } from "../../../redux/slices/HazardTemplate";

export default function Template() {
  const navigate= useNavigate();
 const dispatch = useDispatch();
  const { hazardtemplate,loading ,error } = useSelector((state) => state.hazardtemplate);

  console.log(hazardtemplate);



const handleEdit = (template) =>{
  navigate(`/editHazardTemplateForm/${template._id}`, {state : { template

  }})
}



 useEffect(() => {
   
   dispatch(getallhazardTemplates())
  }, [dispatch]);
  

  const severityColors = {
    Low: "bg-green-100 text-green-800 border-green-300",
    Medium: "bg-yellow-100 text-yellow-800 border-yellow-300",
    High: "bg-orange-100 text-orange-800 border-orange-300",
    Critical: "bg-red-100 text-red-800 border-red-300",
  };

  const likelihoodColors = {
    Unlikely: "bg-gray-100 text-gray-800 border-gray-300",
    Possible: "bg-yellow-100 text-yellow-800 border-yellow-300",
    Likely: "bg-orange-100 text-orange-800 border-orange-300",
    Certain: "bg-red-100 text-red-800 border-red-300",
  };

  const getIcon = (iconType) => {
    switch (iconType) {
      case "heights":
        return <HardHat size={24} className="text-blue-600" />;
      case "electrical":
        return <AlertTriangle size={24} className="text-yellow-600" />;
      case "machinery":
        return <Wrench size={24} className="text-gray-600" />;
      case "confined":
        return <Box size={24} className="text-red-600" />;
      case "excavation":
        return <Hammer size={24} className="text-orange-600" />;
      case "manual":
        return <Users size={24} className="text-green-600" />;
      default:
        return <AlertTriangle size={24} className="text-blue-600" />;
    }
  };

 

    const handleUseTemplate = (id) => {
    const selected = hazardtemplate.data.find((t) => t._id === id);
    if (selected) {
      navigate("/SWMSStepper", {
        state: {
          hazards: selected.hazards,
          templateTitle: selected.workactivity,
          keyPPE: selected.requiredPPE,
        },
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="d-flex justify-between">
        <h2 className="text-xl font-bold mb-6">Pre-Populated Templates</h2>

        <Link to="/HazardTemplateForm">
          <Button className="btn-set-color">
            Add Template
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
       { loading ? (
        <div >Loading </div>
       )
       :
       
        ( 
        Array.isArray(hazardtemplate.data) && hazardtemplate.data.map((template) => (
          // <div
          //   key={template._id}
          //   className=" rounded-lg shadow-md border overflow-hidden transition-all hover:shadow-lg bg-white shadow-sm"
          
          // >
          //   {/* Header */}
          //   <div className="p-4 border-b border-gray-100 flex items-center justify-between"    onClick={() => handleUseTemplate(template._id)}>
          //     <div className="flex items-center">
          //       {getIcon(template.icon)}
          //       <h3 className="ml-2 font-semibold ">{template.workactivity}</h3>
          //     </div>
          //   </div>

          //   {/* Description */}
          //   <div className="p-4" onClick={() => handleUseTemplate(template._id)}>
          //     <p className="text-gray-500 text-sm mb-4">
          //       {template.description}
          //     </p>

          //     {/* Risk Assessment */}
          //     <div className="mb-4">
          //       <h4 className="text-xs font-semibold uppercase text-gray-500 mb-2">
          //         Key Hazards
          //       </h4>

          //       {template.hazards.map((hazard, index) => (
          //         <div key={index} className="mb-2 flex flex-wrap items-center">
          //           <span className="text-sm mr-2 text-gray-700">
          //             {hazard.hazardDescription}
          //           </span>
          //           <div className="flex flex-wrap gap-1 mt-1">
          //             <span
          //               className={`text-xs px-2 py-0.5 rounded-full border ${
          //                 severityColors[hazard.severity]
          //               }`}
          //             >
          //               {hazard.severityLevel}
          //             </span>
          //             <span
          //               className={`text-xs px-2 py-0.5 rounded-full border ${
          //                 likelihoodColors[hazard.likelihood]
          //               }`}
          //             >
          //               {hazard.likelihood}
          //             </span>
          //           </div>
          //         </div>
          //       ))}
          //     </div>

          //     {/* PPE Requirements */}
          //     <div className="mb-4">
          //       <h4 className="text-xs font-semibold uppercase text-gray-500 mb-2">
          //         Required PPE
          //       </h4>
          //       <div className="flex flex-wrap gap-1">
          //         {template.requiredPPE.map((item, index) => (
          //           <span
          //             key={index}
          //             className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full border border-blue-200"
          //           >
          //             {item.name}
          //           </span>
          //         ))}
          //       </div>
          //     </div>
          //   </div>

          //   {/* Actions */}
          //   <div className="border-t border-gray-100 mb-0 p-3 bg-gray-50 flex justify-between">
          //     <button 
          //       onClick={() => handleUseTemplate(template._id)}
          //       className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
          //     >
          //       Use Template
          //       <ChevronRight size={16} className="ml-1" />
          //     </button>
              
          //     <button 
          //       className="text-gray-600 hover:text-gray-800 text-sm font-medium"
          //       onClick={() =>handleEdit(template)}
          //     >
          //       Edit
          //     </button>
            
          //   </div>
          // </div>

          <div
  key={template._id}
  className="flex flex-col rounded-lg shadow-md border overflow-hidden transition-all hover:shadow-lg bg-white shadow-sm h-full"
>
  {/* Header */}
  <div
    className="p-4 border-b border-gray-100 flex items-center justify-between"
    onClick={() => handleUseTemplate(template._id)}
  >
    <div className="flex items-center">
      {getIcon(template.icon)}
      <h3 className="ml-2 font-semibold text-base sm:text-lg">
        {template.workactivity}
      </h3>
    </div>
  </div>

  {/* Body (Flexible) */}
  <div
    className="p-4 flex-1 flex flex-col justify-between"
    onClick={() => handleUseTemplate(template._id)}
  >
    {/* Description */}
    <p className="text-gray-500 text-sm mb-4">{template.description}</p>

    {/* Key Hazards */}
    <div className="mb-4">
      <h4 className="text-xs font-semibold uppercase text-gray-500 mb-2">
        Key Hazards
      </h4>
      {template.hazards.map((hazard, index) => (
        <div key={index} className="mb-2 flex flex-wrap items-center">
          <span className="text-sm mr-2 text-gray-700">
            {hazard.hazardDescription}
          </span>
          <div className="flex flex-wrap gap-1 mt-1">
            <span
              className={`text-xs px-2 py-0.5 rounded-full border ${
                severityColors[hazard.severity]
              }`}
            >
              {hazard.severityLevel}
            </span>
            <span
              className={`text-xs px-2 py-0.5 rounded-full border ${
                likelihoodColors[hazard.likelihood]
              }`}
            >
              {hazard.likelihood}
            </span>
          </div>
        </div>
      ))}
    </div>

    {/* PPE Requirements */}
    <div className="mb-4">
      <h4 className="text-xs font-semibold uppercase text-gray-500 mb-2">
        Required PPE
      </h4>
      <div className="flex flex-wrap gap-1">
        {template.requiredPPE.map((item, index) => (
          <span
            key={index}
            className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full border border-blue-200"
          >
            {item.name}
          </span>
        ))}
      </div>
    </div>
  </div>

  {/* Footer (Anchored at Bottom) */}
  <div className="border-t border-gray-100 p-3 bg-gray-50 flex justify-between mt-auto">
    <button
      onClick={() => handleUseTemplate(template._id)}
      className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
    >
      Use Template
      <ChevronRight size={16} className="ml-1" />
    </button>

    <button
      className="text-gray-600 hover:text-gray-800 text-sm font-medium"
      onClick={() => handleEdit(template)}
    >
      Edit
    </button>
  </div>
</div>

        ))
      )
      

      }
      </div>
    </div>
  );
}
