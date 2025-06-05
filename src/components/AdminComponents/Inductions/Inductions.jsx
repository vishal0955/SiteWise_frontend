import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  ProgressBar,
  Modal,
} from "react-bootstrap";
import "./Inductions.css";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";
import { Link, useNavigate } from "react-router-dom";
import {
  deleteInduction,
  fetchInductions,
} from "../../../redux/slices/inductionSlice";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
import jsPDF from "jspdf";
import "jspdf-autotable";
import Overview from "../../common/Overview";
import { AlertTriangle, Check, CheckCircle, Clock } from "lucide-react";

function Inductions() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [searchQuery, setSearchQuery] = useState("");
  const { inductions } = useSelector((state) => state.inductions);

  const [questions, setQuestions] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [questionPage, setQuestionPage] = useState(1); // Pagination for questions
  const questionsPerPage = 10;

  useEffect(() => {
    dispatch(fetchInductions());
  }, [dispatch]);

  

  // Filtered Inductions
  const filteredInductions = inductions?.filter((induction) =>
    induction?.fullName?.toLowerCase()?.includes(searchQuery.toLowerCase())
  );

  // delete Inductions
  const HandleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteInduction(id));
        Swal.fire("Deleted!", "Induction has been deleted.", "success");
      }
    });
  };

  const pieChartData = {
    labels: ["Completed", "Pending", "In Progress"],
    datasets: [
      {
        data: [45, 30, 25],
        backgroundColor: ["#4dabf7", "#dc3545", "#ffc107"],
        borderWidth: 0,
      },
    ],
  };

  const barChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Pending Reviews",
        data: [12, 19, 15, 8, 10],
        backgroundColor: "#4dabf7",
      },
    ],
  };

  const horizontalBarData = {
    labels: ["Safety", "Quality", "Process", "Equipment", "Environment"],
    datasets: [
      {
        label: "Compliance Score",
        data: [95, 88, 92, 85, 90],
        backgroundColor: "#4dabf7",
      },
    ],
  };

  const totalPages = Math.ceil(filteredInductions.length / itemsPerPage);

  const paginatedInductions = filteredInductions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const toggleRequired = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].required = !updatedQuestions[index].required;
    setQuestions(updatedQuestions);
  };

  const toggleTriggerPending = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].triggerPending =
      !updatedQuestions[index].triggerPending;
    setQuestions(updatedQuestions);
  };

  // Removed duplicate editQuestion function to avoid redeclaration error.

  const deleteQuestion = (index) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
  };

  const addNewQuestion = () => {
    const newQuestion = {
      text: "New Question",
      required: false,
      triggerPending: false,
      inputType: "Text",
    };
    setQuestions([...questions, newQuestion]);
  };

  const addSuggestedQuestions = () => {
    const suggestedQuestions = [
      {
        text: "Are you fit to work today?",
        required: false,
        triggerPending: false,
        inputType: "Text",
      },
      {
        text: "Do you have the required PPE?",
        required: false,
        triggerPending: false,
        inputType: "Text",
      },
      {
        text: "Do you understand today’s work tasks?",
        required: false,
        triggerPending: false,
        inputType: "Text",
      },
      {
        text: "Are you aware of the emergency protocols?",
        required: false,
        triggerPending: false,
        inputType: "Text",
      },
    ];
    setQuestions([...questions, ...suggestedQuestions]);
  };
  const [editingIndex, setEditingIndex] = useState(null); // Track which question is being edited

  const editQuestion = (index) => {
    setEditingIndex(index); // Set the index of the question being edited
  };

  const saveQuestion = (index, updatedText) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].text = updatedText; // Update the question text
    setQuestions(updatedQuestions);
    setEditingIndex(null); // Exit editing mode
  };

  const generateReport = () => {
    const totalInductions = inductions.length;
    const completedInductions = inductions.filter(
      (induction) => induction.status === "Completed"
    );
    const pendingInductions = inductions.filter(
      (induction) => induction.status === "Pending"
    );

    const commonFailedQuestions = [
      // Example data, replace with actual logic
      { question: "Do you have the required PPE?", failures: 12 },
      { question: "Are you fit to work today?", failures: 8 },
    ];

    const averageCompletionTime =
      calculateAverageCompletionTime(completedInductions);

    const workersExpiringSoon = inductions.filter((induction) => {
      const expiryDate = new Date(induction.inductionValidTill);
      const today = new Date();
      const diffInDays = (expiryDate - today) / (1000 * 60 * 60 * 24);
      return diffInDays <= 30;
    });



 const total1Inductions = inductions.length;
    const completed1Inductions = inductions.filter(
      (induction) => induction.status === "Completed"
    );
    const pending1Inductions = inductions.filter(
      (induction) => induction.status === "Pending"
    );
   

    // Generate PDF
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("AI Assisted Induction Report", 14, 20);

    doc.setFontSize(12);
    doc.text(`Total Inductions: ${totalInductions}`, 14, 30);
    doc.text(`Completed Inductions: ${completedInductions.length}`, 14, 40);
    doc.text(`Pending Inductions: ${pendingInductions.length}`, 14, 50);

    doc.text("Common Failed Questions:", 14, 60);
    commonFailedQuestions.forEach((item, index) => {
      doc.text(
        `${index + 1}. ${item.question} - ${item.failures} failures`,
        14,
        70 + index * 10
      );
    });

    doc.text(
      `Average Completion Time: ${averageCompletionTime} minutes`,
      14,
      90
    );

    doc.text("Workers Expiring Soon:", 14, 100);
    workersExpiringSoon.forEach((worker, index) => {
      doc.text(
        `${index + 1}. ${worker.fullName} - Expiry: ${
          worker.inductionValidTill
        }`,
        14,
        110 + index * 10
      );
    });

    // Save PDF
    doc.save("Induction_Report.pdf");
  };

  const calculateAverageCompletionTime = (completedInductions) => {
    if (completedInductions.length === 0) return 0;

    const totalTime = completedInductions.reduce((sum, induction) => {
      const startTime = new Date(induction.startTime);
      const endTime = new Date(induction.endTime);
      const duration = (endTime - startTime) / (1000 * 60); // Convert to minutes
      return sum + duration;
    }, 0);

    return (totalTime / completedInductions.length).toFixed(2);
  };
  // Paginate Questions
  const paginatedQuestions = questions.slice(
    (questionPage - 1) * questionsPerPage,
    questionPage * questionsPerPage
  );

  const handleInductionCompletion = (inductionId, answers) => {
    const undesiredAnswers = [
      { question: "Are you fit to work today?", answer: "No" },
      { question: "Do you have the required PPE?", answer: "No" },
    ];

    const hasUndesiredAnswers = answers.some((answer) =>
      undesiredAnswers.some(
        (undesired) =>
          undesired.question === answer.question &&
          undesired.answer === answer.answer
      )
    );

    if (hasUndesiredAnswers) {
      Swal.fire({
        title: "Alert!",
        text: "An induction requires manual review due to undesired answers.",
        icon: "warning",
        confirmButtonText: "OK",
      });
      dispatch(
        updateInductionStatus({ id: inductionId, status: "Pending Review" })
      );
    } else {
      Swal.fire({
        title: "Success!",
        text: "Induction has been marked as completed.",
        icon: "success",
        confirmButtonText: "OK",
      });
      dispatch(updateInductionStatus({ id: inductionId, status: "Completed" }));
    }
  };

  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const sortTable = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    const sortedInductions = [...filteredInductions].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setFilteredInductions(sortedInductions);
  };

  const handleEditChange = (index, updatedText) => {
    const updated = [...questions];
    updated[index].text = updatedText;
    setQuestions(updated);
  };


 
  const stt = 
   [
    {
      title: "Total Inductions",
      number: 2,
      icon: <AlertTriangle className="text-primary"  />,
      subtitle: 'Total inductions ',
      },
      {
      title: "Completed Inductions",
      number: 3,
      icon: <Check className="text-primary"  />,

      subtitle: 'completed inductions',
      },
      {
      title: "Pending Inductions",
      number:4,
      icon: <Check className="text-primary"  />,
      subtitle: 'Pending Inductions',
      },
      { 
      title: "Average Completion Time",
      number: 2,
      icon: <Check className="text-primary"  />,
      subtitle: 'Average Completion Time',
    }
   ]

  return (
    <Container fluid className="py-4">
      {/* Header & Actions */}
      <Row className="align-items-center mb-4 g-2">
        <Col xs={12} md={6}>
          <h3 className="fw-bold mb-2 mb-md-0">Live Induction Tracker</h3>
        </Col>
        <Col xs={12} md={6}>
          <div className="d-flex justify-content-end gap-2">
            <Link to="/ViewAllLiveInductions">
              <Button className="btn-set-color px-3">
                <i className="fas fa-users me-2 text-white"></i>
                All Live Inductions
              </Button>
            </Link>
            <Link to="/AddnewInduction">
              <Button
                className="btn-set-color px-3"
                onClick={() =>
                  document.querySelector(".chart-card")?.scrollIntoView({ behavior: "smooth" })
                }
              >
                <span className="text-white">Add Induction</span>
              </Button>
            </Link>
          </div>
        </Col>
      </Row>

      <Overview stats={stt} />

         <Row className="g-4">
        <Col xs={12} md={4}>
          <Card className="border-0 shadow h-100 chart-card p-2 p-md-3">
            <Card.Body>
              <h6 className="mb-3 fw-semibold">Status Distribution</h6>
              <div>
                <Pie data={pieChartData} options={{ maintainAspectRatio: false }} height={200} />
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={4}>
          <Card className="border-0 shadow h-100 chart-card p-2 p-md-3">
            <Card.Body>
              <h6 className="mb-3 fw-semibold">Pending Reviews</h6>
              <div>
                <Bar data={barChartData} options={{ maintainAspectRatio: false }} height={200} />
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={4}>
          <Card className="border-0 shadow h-100 chart-card p-2 p-md-3">
            <Card.Body>
              <h6 className="mb-3 fw-semibold">Compliance Scores</h6>
              <div>
                <Bar
                  data={horizontalBarData}
                  options={{
                    indexAxis: "y",
                    maintainAspectRatio: false,
                    scales: {
                      x: {
                        beginAtZero: true,
                        max: 100,
                      },
                    },
                  }}
                  height={200}
                />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>


      {/* Inductions Overview List */}
      <Card className="mb-5 border-0 shadow-sm mt-4">
        <Card.Header className="bg-white border-0 mt-2">

          <div className="row g-3 align-items-center">
            
          <h4 className="mb-2">Inductions Overview</h4>

           <div className="d-flex flex-column flex-sm-row justify-content-between align-items-stretch gap-2">
            <Form.Control
              type="text"
              placeholder="Search inductions..."
              className="form-control-sm p-3 w-100 w-sm-auto"
              style={{ backgroundColor: "#f4f5f7", maxWidth: "240px" }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button className="btn-set-color  w-sm-auto" onClick={generateReport}>
              <i className="fas fa-robot me-2"></i>
              Generate AI Assisted Report
            </Button>
          </div>
          </div>
          

         
          
        </Card.Header>

        
        <Card.Body className="p-2">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="">
                <tr>
                  <th className="ps-4" onClick={() => sortTable("fullName")}>
                    Name
                  </th>
                  <th onClick={() => sortTable("contactNumber")}>
                    Contact Number
                  </th>
                  <th onClick={() => sortTable("inductionDate")}>
                    Induction Date
                  </th>
                  <th onClick={() => sortTable("siteLocation")}>
                    Site Location
                  </th>
                  <th onClick={() => sortTable("accessTime")}>Access Time</th>
                  <th onClick={() => sortTable("status")}>Status</th>
                  <th className="pe-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredInductions && filteredInductions?.length > 0 ? 
                  paginatedInductions?.map((induction, index) => (
                   
                    <tr key={index} onClick={() => navigate(`/View-Inductions/${induction._id}`)} >
                      <td className="ps-4">{induction?.fullName}</td>
                      <td>{induction?.contactNumber}</td>
                      <td>
                        {new Date(induction.inductionDate).toLocaleDateString()}
                      </td>
                      <td>{induction?.siteLocation}</td>
                      <td>
                        {induction.accessStartTime} - {induction.accessEndTime}
                      </td>
                      <td>{induction?.status}</td>
                      <td className="pe-4">
                        <div className="d-flex gap-3">
                          <Link to={`/View-Inductions/${induction._id}`}>
                            <button variant="link" className="text-primary p-0">
                              <i className="fa-solid fa-eye"></i>
                            </button>
                          </Link>
                          <button
                            variant="link"
                            className="text-primary p-0"
                            onClick={() => HandleDelete(induction._id)}
                          >
                            <i className="fas fa-trash text-danger"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                : (
                  <tr>
                    <td colSpan="7" className="text-center py-4">
                      No inductions found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          <div className="d-flex flex-wrap justify-content-end mb-2 mt-2 gap-2">
            <Button
              size="sm"
              variant="outline-secondary"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            {[...Array(totalPages)].map((_, idx) => (
              <Button
                key={idx}
                size="sm"
                variant={currentPage === idx + 1 ? "primary" : "outline-secondary"}
                onClick={() => setCurrentPage(idx + 1)}
              >
                {idx + 1}
              </Button>
            ))}
            <Button
              size="sm"
              variant="outline-secondary"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </Card.Body>
      </Card>

      {/* Inductions Templates */}
      <Card className="mb-5 border-0 shadow-sm">
        <Card.Header className="bg-white border-0">
          <div className="row g-3 align-items-center">
            <h4 className="mb-2 fw-semibold text-center text-md-start">
              Inductions Templates
            </h4>
            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-stretch gap-2">
              <Form.Control
                type="text"
                placeholder="Search inductions..."
                className="form-control-sm p-3 w-100 w-sm-auto"
                style={{ backgroundColor: "#f4f5f7", maxWidth: "240px" }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button
                className="btn-set-color  w-sm-auto"
                onClick={() => navigate("/addInductionTemplate")}
                style={{ backgroundColor: "#0d6efd" }}
              >
                <i className="fas fa-plus text-white"></i>
                <span className="text-white">Add Template</span>
              </Button>
            </div>
          </div>
        </Card.Header>
        <Card.Body>
          <div className="table-responsive">
            <table className="table table-hover mb-0" style={{ border: "1px solid #dee2e6", borderRadius: "8px" }}>
              <thead className="bg-light">
                <tr>
                  <th className="ps-4" onClick={() => sortTable("fullName")}>
                    Site Name
                  </th>
                  <th onClick={() => sortTable("contactNumber")}>
                    Project Name
                  </th>

                  <th onClick={() => sortTable("siteLocation")}>
                    Site Location
                  </th>
                  <th>Status</th>

                  <th className="pe-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredInductions && filteredInductions?.length > 0 ? (
                  paginatedInductions?.map((induction, index) => (
                    <tr key={index}>
                      <td className="ps-4">{induction?.fullName}</td>
                      <td>{induction?.contactNumber}</td>
                      <td>{induction?.siteLocation}</td>

                      <td>{index % 2 === 0 ? "Active " : "Inactive"}</td>
                      <td className="pe-4">
                        <div className="d-flex gap-3">
                          <Link to={`/addInductionTemplate`}>
                            <button variant="link" className="text-primary p-0">
                              <i className="fa-solid fa-pen"></i>
                            </button>
                          </Link>
                          <button
                            variant="link"
                            className="text-primary p-0"
                            // onClick={() => HandleDelete(induction._id)}
                          >
                            <i className="fa-solid fa-share-from-square"></i>
                          </button>
                          <button
                            variant="link"
                            className="text-primary p-0"
                            onClick={() => HandleDelete(induction._id)}
                          >
                            <i className="fas fa-trash text-danger"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center py-4">
                      No inductions found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card.Body>
      </Card>

      {/* Induction Template Questions */}
      <h4 className="mb-4 fw-semibold mt-4">Induction Template Questions</h4>
      <Card className="mb-5 border-0 shadow-sm">
        <Card.Header className="bg-white py-3 border-0">
          <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center gap-2">
            <h6 className="mb-0 fw-semibold">Template Questions</h6>
            {/* <Button className="btn-set-color  w-sm-auto" onClick={() => setShowEditModal(true)}>
              Edit Template
            </Button> */}
          </div>
        </Card.Header>
        <Card.Body>
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="">
                <tr>
                  <th>Question</th>
                  <th>Required</th>
                  <th>Trigger Pending</th>
                  <th>Input Type</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {questions.map((question, index) => (
                  <tr key={index}>
                    <td>
                      {editingIndex === index ? (
                        <Form.Control
                          type="text"
                          value={questions[index].text}
                          onChange={(e) =>
                            handleEditChange(index, e.target.value)
                          }
                          autoFocus
                        />
                      ) : (
                        question.text
                      )}
                    </td>

                    <td>
                      <Form.Check
                        type="switch"
                        checked={question.required}
                        onChange={() => toggleRequired(index)}
                      />
                    </td>
                    <td>
                      <Form.Check
                        type="switch"
                        checked={question.triggerPending}
                        onChange={() => toggleTriggerPending(index)}
                      />
                    </td>
                    <td>{question.inputType}</td>
                    <td>
                      <div className="d-flex gap-2">
                        {editingIndex === index ? (
                          <button
                            variant="link"
                            className="text-success p-0"
                            onClick={() => setEditingIndex(null)}
                          >
                            <i className="fas fa-check"></i>
                          </button>
                        ) : (
                          <button
                            variant="link"
                            className="text-primary p-0"
                            onClick={() => editQuestion(index)}
                          >
                            <i className="fas fa-edit"></i>
                          </button>
                        )}
                        <button
                          variant="link"
                          className="text-danger p-0"
                          onClick={() => deleteQuestion(index)}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 text-end">
            <Button className="btn-set-color" onClick={() => handleInductionCompletion(inductions, [
              { question: "Are you fit to work today?", answer: "No" },
              { question: "Do you have the required PPE?", answer: "Yes" },
            ])}>
              Submit Induction
            </Button>
          </div>
          <Button
            variant="light"
            className="mt-3 w-100 border-0 shadow py-3"
            onClick={addNewQuestion}
          >
            <i className="fas fa-plus-circle me-2"></i>
            Add New Question
          </Button>
        </Card.Body>
      </Card>

  
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closebutton>
          <Modal.Title>Edit Induction Template</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>AI Suggested Questions:</p>
          <ul>
            <li>Are you fit to work today?</li>
            <li>Do you have the required PPE?</li>
            <li>Do you understand today’s work tasks?</li>
            <li>Are you aware of the emergency protocols?</li>
          </ul>
          <button
            variant="primary"
            onClick={() => addSuggestedQuestions()}
            className="mt-3"
          >
            Add Suggested Questions
          </button>
        </Modal.Body>
        <Modal.Footer>
          <button variant="secondary" onClick={() => setShowEditModal(false)}>
            Close
          </button>
        </Modal.Footer>
      </Modal>

   
   
   
    </Container>
  );
}

export default Inductions;
