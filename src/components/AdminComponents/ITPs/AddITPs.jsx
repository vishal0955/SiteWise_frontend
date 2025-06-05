



import { Modal , Button} from 'react-bootstrap';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddITPs() {
  const navigate = useNavigate();
  const [steps, setSteps] = useState([{ comment: "", photo: null, status: "Meets spec" }]);
  const [folder, setFolder] = useState("Waterproofing");
  const [showFolderModal, setShowFolderModal] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Waterproofing");
  const [taskType, setTaskType] = useState("");
  const [reviewer, setReviewer] = useState("");
  const [reviewerComments, setReviewerComments] = useState("");

  const addStep = () => {
    setSteps([...steps, { comment: "", photo: null, status: "Meets spec" }]);
  };

  const updateStep = (index, field, value) => {
    const newSteps = [...steps];
    newSteps[index][field] = value;
    setSteps(newSteps);
  };

  const handleSubmit = (isDraft = false) => {
    console.log({
      title,
      category,
      taskType,
      folder,
      steps,
      reviewer,
      reviewerComments,
      status: isDraft ? "Draft" : "Submitted"
    });
    
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-sm rounded-lg">
      <div className="flex justify-between items-center mb-4">
      <h2 className="text-2xl font-semibold mb-6 ">New QA Submission</h2>
      <button
            onClick={() => navigate(-1)}
            className="btn btn-outline-secondary btn-set-back"
          >
            <i className="fa-solid fa-arrow-left me-2"></i> Back 
          </button>
</div>
      <div className="space-y-6">
     
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium  mb-1">
              Title
            </label>
            <input
              type="text"
             
               className=" w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500
             bg-white text-black dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
              placeholder="e.g., Waterproofing to Wet Area 102"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium  mb-1">
              Category
            </label>
            <select 
            className=" w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500
             bg-white text-black dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Waterproofing">Waterproofing</option>
              <option value="Framing">Framing</option>
              <option value="Services Rough-In">Services Rough-In</option>
              <option value="Electrical">Electrical</option>
              <option value="Plumbing">Plumbing</option>
              <option value="HVAC">HVAC</option>
              <option value="Concrete">Concrete</option>
              <option value="Drywall">Drywall</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium  mb-1">
              Task Type or Stage
            </label>
            <input
              type="text"
             className=" w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500
             bg-white text-black dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
              placeholder="e.g., In-wall install"
              value={taskType}
              onChange={(e) => setTaskType(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium  mb-1">
              Folder Location
            </label>
            <div className="flex gap-2">
              <select
                type="text"
                className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500
             bg-white text-black dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
                
                placeholder="e.g., Level 2 Zone A"
                value={folder}
                onChange={(e) => setFolder(e.target.value)}
              >
                <option value="Waterproofing">Level 2</option>
                <option value="Framing">Unit 101</option>
                <option value="zone">Zone A</option>

                </select>
              <button className="px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 " onClick={() => setShowFolderModal(true)}>
                + New Folder
              </button>
            </div>
          </div>
        </div>


        {
          showFolderModal && (
            <Modal show={showFolderModal} onHide={() => setShowFolderModal(false)} centered size="md">
              <Modal.Header closeButton>
                <Modal.Title>Create New Folder</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="mb-4">
                  <label className="block text-sm font-medium  mb-1">
                    Folder Name
                  </label>
                  <input
                    type="text"
                   className=" w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500
             bg-white text-black dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
                    placeholder="e.g., Level 2 Zone A"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium  mb-1">
                    Description (optional)
                  </label>
                  <textarea
                   className=" w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500
             bg-white text-black dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
                    rows={3}
                    placeholder="Describe the purpose of this folder..."
                  />
                </div>
              </Modal.Body>
              <Modal.Footer>
                <button className="px-4 py-2 btn btn-secondary 
                 rounded-md hover:bg-gray-50 " onClick={() => setShowFolderModal(false)}>
                  Cancel
                </button>
                <button className="btn btn-primary px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-700 text-white" onClick={() => setShowFolderModal(false)}>
                  Create Folder
                </button>
              </Modal.Footer>
            </Modal>
          )
        }

        <hr className="my-6" />

        {/* Step-by-Step Entries */}
        <div>
          <h3 className="text-xl font-medium mb-4">Step-by-Step Entries</h3>
          
          {steps.map((step, index) => (
            <div key={index} className="mb-6 p-4 border border-gray-200 rounded-md ">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium  mb-1">
                    Step Description
                  </label>
                  <textarea
                   className=" w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500
             bg-white text-black dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
                    rows={3}
                    placeholder="Describe what was done in this step..."
                    value={step.comment}
                    onChange={(e) => updateStep(index, "comment", e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium  mb-1">
                    Quality Status
                  </label>
                  <select
                    className=" w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500
             bg-white text-black dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
                    value={step.status}
                    onChange={(e) => updateStep(index, "status", e.target.value)}
                  >
                    <option value="Meets spec">Meets spec</option>
                    <option value="Requires rework">Requires rework</option>
                    <option value="Needs review">Needs review</option>
                  </select>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium  mb-1">
                  Photo Evidence
                </label>
                <input
                  type="file"
                 className=" w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500
             bg-white text-black dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
                  onChange={(e) => updateStep(index, "photo", e.target.files[0])}
                />
              </div>
            </div>
          ))}

          <button 
            className="px-4 py-2 bg-green-50 border border-green-300 rounded-md hover:bg-green-100 text-green-700"
            onClick={addStep}
          >
            + Add Step
          </button>
        </div>

        <hr className="my-6" />

        {/* Review Section */}
        <div>
          <h3 className="text-xl font-medium mb-4">Review Assignment</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium  mb-1">
                Assign Reviewer
              </label>
              <select
              className=" w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500
             bg-white text-black dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
                value={reviewer}
                onChange={(e) => setReviewer(e.target.value)}
              >
                <option value="">Select a reviewer...</option>
                <option value="john-smith">John Smith</option>
                <option value="qa-manager">QA Manager</option>
                <option value="maria-garcia">Maria Garcia</option>
                <option value="robert-johnson">Robert Johnson</option>
              </select>
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium  mb-1">
              Reviewer Comments (optional)
            </label>
            <textarea
             className=" w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500
             bg-white text-black dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
              rows={3}
              placeholder="Add any additional comments for the reviewer..."
              value={reviewerComments}
              onChange={(e) => setReviewerComments(e.target.value)}
            />
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <button 
            className="px-6 py-2 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 "
            onClick={() => handleSubmit(true)}
          >
            Save Draft
          </button>
          <button 
            className="px-6 py-2 bg-blue-600 rounded-md hover:bg-blue-700 text-white"
            onClick={() => handleSubmit(false)}
          >
            Submit for Review
          </button>
        </div>
      </div>
    </div>
  );
}