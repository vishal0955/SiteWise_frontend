import React, { useState } from "react";
import { ChevronDown, ChevronUp, Camera, HelpCircle, Check, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const initialChecklistData = [
  {
    id: 'site-safety',
    title: 'Site Safety & Traffic Management',
    expanded: true,
    questions: [
      {
        id: 'site-fencing',
        text: 'Site is properly fenced and secured when unattended',
        answer: '',
        photos: [],
        comment: ''
      },
      {
        id: 'warning-signs',
        text: 'Appropriate warning signs and notices are displayed',
        answer: 'yes',
        photos: [],
        comment: ''
      },
      {
        id: 'public-protection',
        text: 'Protection for public and visitors is in place',
        answer: 'no',
        photos: [],
        comment: 'Need additional barriers at north entrance'
      }
    ]
  },
  {
    id: 'personal-safety',
    title: 'Personal Safety & PPE',
    expanded: false,
    questions: [
      {
        id: 'ppe-available',
        text: 'Required PPE is available for all workers and visitors',
        answer: '',
        photos: [],
        comment: ''
      }
    ]
  }
];


function QuestionItem({ 
     question,
  topicIndex,
  questionIndex,
  onAnswerChange,
  onCommentChange,
  onToggleMandatory,
  onToggleAutoTask,
  onEditQuestion,
}) {



  const [showHelp, setShowHelp] = useState(false);
  const [showPhotoUpload, setShowPhotoUpload] = useState(false);
   const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="border rounded-lg p-4">
      <div className="flex items-start justify-between mb-3 align-items-center">
        <div className="flex-1">
       {isEditing ? (
          <input
            type="text"
            className="w-full p-2 border rounded-md font-medium me-4"
            value={question.text}
            onChange={(e) => onEditQuestion(topicIndex, questionIndex, e.target.value)}
          />
        ) : (
          <h5 className="font-medium">{question.text}</h5>
        )}
          
        </div>
          <i className="fa fa-edit " onClick={() => setIsEditing(!isEditing)} />
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
          Help text or instructions for this question.
        </div>
      )}

      <div className="flex flex-wrap items-center gap-2 mb-3">
        <div className="flex items-center gap-4">
          <label
            className={`flex items-center gap-2 cursor-pointer ${
              question.answer === "yes" ? "text-green-600 font-medium" : ""
            }`}
          >
            <input
              type="radio"
              name={`${topicIndex}-${questionIndex}`}
              value="yes"
              checked={question.answer === "yes"}
              onChange={() => onAnswerChange(topicIndex, questionIndex, "yes")}
              className="sr-only"
            />
            <div
              className={`w-5 h-5 rounded-full flex items-center justify-center border ${
                question.answer === "yes"
                  ? "bg-green-600 border-green-600"
                  : "border-gray-400"
              }`}
            >
              {question.answer === "yes" && <Check size={14} className="text-white" />}
            </div>
            <span>Yes</span>
          </label>

          <label
            className={`flex items-center gap-2 cursor-pointer ${
              question.answer === "no" ? "text-red-600 font-medium" : ""
            }`}
          >
            <input
              type="radio"
              name={`${topicIndex}-${questionIndex}`}
              value="no"
              checked={question.answer === "no"}
              onChange={() => onAnswerChange(topicIndex, questionIndex, "no")}
              className="sr-only"
            />
            <div
              className={`w-5 h-5 rounded-full flex items-center justify-center border ${
                question.answer === "no"
                  ? "bg-red-600 border-red-600"
                  : "border-gray-400"
              }`}
            >
              {question.answer === "no" && <X size={14} className="text-white" />}
            </div>
            <span>No</span>
          </label>

          <label
            className={`flex items-center gap-2 cursor-pointer ${
              question.answer === "na" ? "text-gray-600 font-medium" : ""
            }`}
          >
            <input
              type="radio"
              name={`${topicIndex}-${questionIndex}`}
              value="na"
              checked={question.answer === "na"}
              onChange={() => onAnswerChange(topicIndex, questionIndex, "na")}
              className="sr-only"
            />
            <div
              className={`w-5 h-5 rounded-full flex items-center justify-center border ${
                question.answer === "na"
                  ? "bg-gray-600 border-gray-600"
                  : "border-gray-400"
              }`}
            >
              {question.answer === "na" && (
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
          {question.photos.length > 0 ? `Photos (${question.photos.length})` : "Add Photo"}
        </button>
      </div>

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
                  const updatedPhotos = [...question.photos, file];
                  onAnswerChange(topicIndex, questionIndex, {
                    ...question,
                    photos: updatedPhotos,
                  });
                }
              }}
            />
          </label>
        </div>
      </div>

      <textarea
        className="w-full p-2 border rounded-md text-sm"
        placeholder={
          question.answer === "no"
            ? "Describe the issue and any immediate actions taken..."
            : "Add comment (optional)"
        }
        value={question.comment}
        onChange={(e) => onCommentChange(topicIndex, questionIndex, e.target.value)}
        rows={2}
      />
    </div>
  );
}

export default function AddTemplateSitereview(  ) {
  const [checklistData, setChecklistData] = useState(initialChecklistData);

 const [edittopic, setedittopic] = useState(null);
  

  const navigate = useNavigate();

  const onBack = () => {
    navigate(-1); // Go back to previous page
  };
 const handleToggleMandatory = (topicIndex, questionIndex) => {
    setChecklistData((prev) =>
      prev.map((topic, tIndex) =>
        tIndex === topicIndex
          ? {
              ...topic,
              questions: topic.questions.map((question, qIndex) =>
                qIndex === questionIndex
                  ? { ...question, mandatory: !question.mandatory }
                  : question
              ),
            }
          : topic
      )
    );
  };

  const handleToggleAutoTask = (topicIndex, questionIndex) => {
    setChecklistData((prev) =>
      prev.map((topic, tIndex) =>
        tIndex === topicIndex
          ? {
              ...topic,
              questions: topic.questions.map((question, qIndex) =>
                qIndex === questionIndex
                  ? { ...question, autoTaskCreation: !question.autoTaskCreation }
                  : question
              ),
            }
          : topic
      )
    );
  };

  const handleEditQuestion = (topicIndex, questionIndex, newText) => {
    setChecklistData((prev) =>
      prev.map((topic, tIndex) =>
        tIndex === topicIndex
          ? {
              ...topic,
              questions: topic.questions.map((question, qIndex) =>
                qIndex === questionIndex
                  ? { ...question, text: newText }
                  : question
              ),
            }
          : topic
      )
    );
  };

  const handleEditTopicTitle = (topicIndex, newTitle) => {
    setChecklistData((prev) =>
      prev.map((topic, tIndex) =>
        tIndex === topicIndex ? { ...topic, title: newTitle } : topic
      )
    );
  };

  const toggleSection = (topicIndex) => {
    setChecklistData(prev => 
      prev.map((topic, index) => 
        index === topicIndex 
          ? { ...topic, expanded: !topic.expanded }
          : topic
      )
    );
  };

  const handleAnswerChange = (topicIndex, questionIndex, value) => {
    setChecklistData(prev => 
      prev.map((topic, tIndex) => 
        tIndex === topicIndex 
          ? {
              ...topic,
              questions: topic.questions.map((question, qIndex) => 
                qIndex === questionIndex 
                  ? { ...question, answer: value }
                  : question
              )
            }
          : topic
      )
    );
  };

  const handleCommentChange = (topicIndex, questionIndex, value) => {
    setChecklistData(prev => 
      prev.map((topic, tIndex) => 
        tIndex === topicIndex 
          ? {
              ...topic,
              questions: topic.questions.map((question, qIndex) => 
                qIndex === questionIndex 
                  ? { ...question, comment: value }
                  : question
              )
            }
          : topic
      )
    );
  };

  const addQuestion = (topicIndex) => {
    const newQuestion = {
      id: `question-${Date.now()}`,
      text: `New Question ${checklistData[topicIndex].questions.length + 1}`,
      answer: '',
      photos: [],
      comment: ''
    };

    setChecklistData(prev => 
      prev.map((topic, index) => 
        index === topicIndex 
          ? { ...topic, questions: [...topic.questions, newQuestion] }
          : topic
      )
    );
  };

  const addTopic = () => {
    const newTopic = {
      id: `topic-${Date.now()}`,
      title: `New Topic ${checklistData.length + 1}`,
      expanded: true,
      questions: [
        {
          id: `question-${Date.now()}`,
          text: 'Sample question for new topic',
          answer: '',
          photos: [],
          comment: ''
        }
      ]
    };

    setChecklistData(prev => [...prev, newTopic]);
  };

  return (
    <div className="container py-4">
      
      <div className="row justify-content-center">
      
        <div className="col-12 col-lg-10">
            <div className="text-end mb-3"><button className="btn btn-outline-secondary "  onClick={onBack}><i class="fa-solid fa-arrow-left me-2"></i>Back</button></div>
          {checklistData.map((topic, topicIndex) => (
            <div key={topic.id} className="card shadow-sm mb-4">
              <div 
                className="card-header bg-light cursor-pointer d-flex justify-content-between align-items-center"
                onClick={() => toggleSection(topicIndex)}
                style={{ cursor: 'pointer' }}
              >
                <div className="d-flex align-items-center">
                  <span 
                    className="badge bg-primary rounded-circle me-3 d-flex align-items-center justify-content-center"
                    // style={{ width: 32, height: 32, fontSize: '1rem' }}
                  >
                    {topicIndex + 1}
                  </span>
                  { (edittopic ===  topic.id) ? (
                    <>
                   <input
                  type="text"
                  className="form-control"
               
                  value={topic.title}
                  onChange={(e) =>
                    handleEditTopicTitle(topicIndex, e.target.value)
                  }
                />
                  <i className="fa fa-edit mx-2" onClick={() => setedittopic(null)} />
                </>
             ) : (
 <>
                  <h5 className="mb-0 fw-bold me-2">{topic.title}</h5>  
                <i className="fa fa-edit" onClick={() => setedittopic(topic.id)} />
                  </>
                )}
                  
                </div>
            
                {topic.expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>

              {topic.expanded && (
                <div className="card-body">
                  {topic.questions.map((question, questionIndex) => (
                    <QuestionItem
                      key={question.id}
                      question={question}
                      topicIndex={topicIndex}
                      questionIndex={questionIndex}
                      onAnswerChange={handleAnswerChange}
                      onCommentChange={handleCommentChange}
                                            onToggleMandatory={handleToggleMandatory}
                      onToggleAutoTask={handleToggleAutoTask}
                      onEditQuestion={handleEditQuestion}
                    />
                  ))}
                  
                  <div className="text-center mt-2">
                    <button
                      className="btn btn-outline-primary"
                      type="button"
                      onClick={() => addQuestion(topicIndex)}
                    >
                      + Add Question
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
          
          <div className="text-center">
            <button
              className="btn btn-primary"
              type="button"
              onClick={addTopic}
            >
              + Add Topic
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
