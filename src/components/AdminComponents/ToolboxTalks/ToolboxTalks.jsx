import React, { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchToolboxTalks,
  deleteToolbox,
} from "../../../redux/slices/toolboxTalkSlice";
import axiosInstance from "../../../utils/axiosInstance";
import { FaCalendarAlt, FaUserCheck, FaExclamationTriangle, FaShieldAlt } from "react-icons/fa";

function ToolboxTalks() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const [searchText, setSearchText] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [recording, setRecording] = useState(false);
  const [transcription, setTranscription] = useState("");
  const [summary, setSummary] = useState("");
  const [loadingAudio, setLoadingAudio] = useState(false);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const handleView = (id) => {
    navigate(`/toolboxview/${id}`)
  }

  const onStop = async (recordedBlob) => {
    setLoadingAudio(true);
    const formData = new FormData();
    formData.append("audio", recordedBlob.blob, "recording.wav");

    try {
      const res = await axiosInstance.post(
        "https://constructionaimicroservice-production.up.railway.app/speechtotext",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setTranscription(res.data.transcription);
      setSummary(res.data.summery);
    } catch (error) {
      console.error("Transcription failed", error);
      setTranscription("Error processing audio");
    } finally {
      setLoadingAudio(false);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunksRef.current = [];
      const mediaRecorder = new MediaRecorder(stream);

      mediaRecorder.ondataavailable = (e) => {
        audioChunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/wav",
        });
        const recordedBlob = { blob: audioBlob }; // mimic ReactMic structure
        onStop(recordedBlob);
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
      setRecording(true);
    } catch (err) {
      console.error("Failed to start recording:", err);
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const recordedBlob = { blob: file }; // mimic structure expected by onStop
    onStop(recordedBlob);
  };

  const stopRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  const { talks, loading, error } = useSelector((state) => state.toolboxTalks);

  useEffect(() => {
    dispatch(fetchToolboxTalks());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteToolbox(id));
  };

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
          {
            label: "Attendance",
            data: [95, 97, 93, 96, 94, 95, 96],
            borderColor: "#007bff",
            fill: false,
            tension: 0.3,
          },
          {
            label: "Compliance",
            data: [98, 97, 99, 97, 98, 100, 100],
            borderColor: "#28a745",
            fill: false,
            tension: 0.3,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "top",
            labels: {
              boxWidth: 10,
              font: { size: 12 },
            },
          },
        },
        scales: {
          y: { beginAtZero: true, max: 100 },
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  const filteredTalks = talks.filter((talk) => {
    const matchesSearch =
      talk.title.toLowerCase().includes(searchText.toLowerCase()) ||
      talk.description?.toLowerCase().includes(searchText.toLowerCase());

    const matchesStatus =
      selectedStatus === "All" || talk.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredTalks.length / itemsPerPage);
  const paginatedTalks = filteredTalks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const color = [ "primary", "success", "warning", "danger", "info", "dark" ];

  return (
    <div>
     <div className="flex items-center justify-between mt-2 mb-2 ms-2 mt-4">
  <h3 className="mb-0">Toolbox Talk</h3>
  <Link to={"/AddToolboxTalks"}>
    <Button className="btn-set-color">
      Create New Talk
    </Button>
  </Link>
</div>

      <div
        className="container-fluid  p-4"
      >
        {/* Top Stats */}
        

        <div className="row">
          <div className="col-12 bg-white p-4 rounded shadow-sm">
            <div className="d-flex justify-content-between align-items-center mb-3">
            </div>

            {/* Filters */}

            <div className="d-flex gap-2 flex-wrap mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search talks..."
                style={{ maxWidth: "200px" }}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <select
                className="form-select"
                style={{ maxWidth: "160px" }}
                value={selectedStatus}
                onChange={(e) => {
                  setSelectedStatus(e.target.value);
                  setCurrentPage(1); // reset pagination on filter
                }}
              >
                <option value="All">All Status</option>
                {[...new Set(talks.map((t) => t.status))].map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            {/* Tabs */}
            <ul className="nav nav-tabs mb-3">
              <li className="nav-item">
                <button
                  className="tabclass"
                  data-bs-toggle="tab"
                  data-bs-target="#scheduled"
                >
                  Scheduled Talks
                </button>
              </li>
              <li className="nav-item">
                <button
                  className="tabclass"
                  data-bs-toggle="tab"
                  data-bs-target="#completed"
                >
                  Completed Talks
                </button>
              </li>
            </ul>
  <div className="tab-content">
          <div className="tab-pane fade show active" id="scheduled">
            
              <table className="table table-hover align-middle" style={{ border: '1px solid #dee2e6', borderRadius: '8px' }}>
                <thead>
                  <tr>
                    <th>Topic</th>
                    <th>Date & Time</th>
                    <th>Assigned Team</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading && (
                    <tr>
                      <td colSpan="5">Loading...</td>
                    </tr>
                  )}
                  {error && (
                    <tr>
                      <td colSpan="5">Error: {error}</td>
                    </tr>
                  )}
                  {paginatedTalks?.map((talk) => (
                    <tr key={talk._id}>
                      <td>
                        {talk.title}
                        <br />
                        <small className="text-muted">{talk.description}</small>
                      </td>
                      <td>{new Date(talk.date).toLocaleString()}</td>
                      <td>
                        {talk?.presenter?.firstName} {talk?.presenter?.lastName}
                        <br />
                        <small>{talk.participants.length} participants</small>
                      </td>
                      <td>
                        <span
                          className={`badge bg-${
                            talk.status === "Completed" ? "success" : "warning"
                          }`}
                        >
                          {talk.status}
                        </span>
                      </td>
                      <td>
                           <Link
                          to={`/toolboxview/${talk._id}`}
                          className="me-3 text-primary"
                          title="view"
                        >
                           <i className="fa fa-eye" ></i>

                        </Link>
                       

                        <Link
                          to={`/edit-toolbox/${talk._id}`}
                          className="me-3 text-primary"
                          title="Edit"
                        >
                          <i className="fa-solid fa-pen-to-square"></i>
                        </Link>
                        <Link
                          className="text-danger"
                          title="Delete"
                          onClick={() => handleDelete(talk._id)}
                        >
                          <i className="fa-solid fa-trash"></i>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="d-flex justify-content-end mb-3 gap-2">
              <Button
                size="sm"
                variant="outline-secondary"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
              >
                Previous
              </Button>
              {[...Array(totalPages)].map((_, i) => (
                <Button
                  key={i}
                  size="sm"
                  variant={
                    currentPage === i + 1 ? "primary" : "outline-secondary"
                  }
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </Button>
              ))}
              <Button
                size="sm"
                variant="outline-secondary"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
              >
                Next
              </Button>
            </div>
            
          </div>


          <div className="tab-pane fade" id="completed">
            <p className="text-muted">No completed talks yet.</p>
          </div>
        </div>

            {/* Tab Content */}
          </div>
          
        </div>

      

        <div className="row g-3 mb-4 mt-2">
          {[
            {
              title: "Upcoming Talks",
              value: 12,
              note: "Next talk in 2 hours",
              icon: <FaCalendarAlt size={22}  />,
            },
            {
              title: "Attendance Rate",
              value: "95%",
              note: "Last 30 days average",
              icon: <FaUserCheck size={22}  />,
            },
            {
              title: "Pending Actions",
              value: 8,
              note: "Requires attention",
              icon: <FaExclamationTriangle size={22} />,
            },
            {
              title: "Compliance Status",
              value: "100%",
              note: "All requirements met",
              icon: <FaShieldAlt size={22} />,
            },
          ].map((card, i) => (
            <div key={i} className="col-12 col-sm-6 col-md-6 col-lg-3">
      <div
        className="bg-white rounded-4 shadow-sm p-4 border  h-100"
        style={{
          minHeight: 150,
          boxShadow: "0 4px 16px 0 #e5e7eb",
          background: "#fff",
          border: "none"
        }}
      >
        <div className="d-flex justify-content-between align-items-start">
          <div>
            <div
              className="fw-bold mb-2"
              style={{
            
                fontSize: "1.05rem"
              }}
            >
              {card.title}
            </div>
            <div
              className="fw-bold"
              style={{
                fontSize: "2rem",
                
                lineHeight: 1.1
              }}
            >
              {card.value}
            </div>
            <div
              className="mt-2"
              style={{
                color: "#16a34a",
                fontSize: "1rem"
              }}
            >
              {card.note}
            </div>
          </div>
          <span
            className="d-inline-flex align-items-center justify-content-center rounded-circle text-primary"
            style={{
              background: "#e0edff",
              width: 44,
              height: 44,
              marginLeft: 8
            }}
          >
            {card.icon}
          </span>
        </div>
      </div>
    </div>
          ))}
        </div>
    
        <div className="row gx-3 gy-3 mb-4">
          <div className="col-md-8 d-flex flex-column gap-3">
        
            <div className="bg-white p-4 rounded shadow-sm">
              <div className="mb-3">
                {recording ? (
                  <button
                    onClick={stopRecording}
                    className="btn btn-danger me-2"
                  >
                    <i className="bi bi-stop-circle me-1"></i> Stop Recording
                  </button>
                ) : (
                  <button
                    onClick={startRecording}
                    className="btn btn-dark me-2"
                  >
                    <i className="bi bi-record-circle me-1"></i> Start Recording
                  </button>
                )}
                <button className="btn btn-outline-dark mt-2">
                  Take Attendance
                </button>

                <input
                  type="file"
                  accept="audio/*"
                  onChange={handleFileUpload}
                  className="form-control mt-2"
                  style={{ maxWidth: "300px" }}
                />
              </div>

              <div
                className="border rounded p-3 text-muted"
                style={{ height: "120px", overflowY: "auto" }}
              >
                {loadingAudio ? (
                  <p>Processing audio...</p>
                ) : transcription ? (
                  <>
                    <p>
                      <strong>Transcription:</strong> {transcription}
                    </p>
                    <p>
                      <strong>Summary:</strong>
                      <br />
                      <span
                        dangerouslySetInnerHTML={{
                          __html: summary.replace(/\n/g, "<br/>"),
                        }}
                      />
                    </p>
                  </>
                ) : (
                  <p>AI Transcription will appear here...</p>
                )}
              </div>
            </div>

            {/* Analytics Section */}
            <div className="stats-card  p-4 rounded shadow-sm">
              <h4 className="mb-3">Analytics</h4>
              <div style={{ height: "200px" }}>
                <canvas ref={chartRef}></canvas>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="col-md-4 d-flex flex-column gap-3">
            {/* Recent Activity */}
            <div className="bg-white p-4 rounded shadow-sm">
              <h6 className="mb-3">Recent Activity</h6>
              <div className="mb-3">
                <div className="fw-bold">Safety Equipment Review</div>
                <small>Completed with 15 participants</small>
                <br />
                <small className="text-muted">2 hours ago</small>
              </div>
              <div>
                <div className="fw-bold d-flex align-items-center">
                  <i className="bi bi-check-circle-fill text-success me-2"></i>
                  Emergency Procedures
                </div>
                <small>Updated and verified</small>
                <br />
                <small className="text-muted">5 hours ago</small>
              </div>
            </div>

            {/* Action Items */}
            <div className="bg-white p-4 rounded shadow-sm">
              <h6 className="mb-3">Action Items</h6>
              <div className="form-check mb-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="action1"
                />
                <label
                  className="form-check-label d-flex justify-content-between w-100"
                  htmlFor="action1"
                >
                  <span>Update safety protocols</span>
                  <span className="text-muted">Due today</span>
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="action2"
                />
                <label
                  className="form-check-label d-flex justify-content-between w-100"
                  htmlFor="action2"
                >
                  <span>Schedule equipment training</span>
                  <span className="text-muted">Tomorrow</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Toolbox Talks Table */}
      </div>
   
  );
}

export default ToolboxTalks;
