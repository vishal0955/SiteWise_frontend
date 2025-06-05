import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Form,
  InputGroup,
  FormControl,
  Row,
  Col,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteTask, fetchTasks } from "../../../redux/slices/taskManagement";
import Swal from "sweetalert2";
import { Columns } from "lucide-react";

const AllTasks = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { tasks, loading, error } = useSelector((state) => state.task);

  console.log("Tasks:", tasks);

  const HandleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteTask(id))
          .then(() => {
            Swal.fire("Deleted!", "The Task has been deleted.", "success");
            dispatch(fetchTasks()); // Refresh the table after delete
          })
          .catch((error) => {
            Swal.fire("Error!", "Something went wrong.", "error");
          });
      }
    });
  };

  const [filter, setFilter] = useState("");

  const filteredTasks = loading ? (
    <p> Loading...</p>
  ) : (
    tasks.filter((task) => {
      const taskTitle = task?.taskTitle || "";
      let assignTo = "";
      if (typeof task?.assignTo === "object" && task?.assignTo !== null) {
        assignTo = `${task.assignTo.firstName || ""} ${
          task.assignTo.lastName || ""
        }`;
      } else if (typeof task?.assignTo === "string") {
        assignTo = task?.assignTo;
      }
      const category = task?.category || "";

      return (
        taskTitle.toLowerCase().includes(filter.toLowerCase()) ||
        assignTo.toLowerCase().includes(filter.toLowerCase()) ||
        category.toLowerCase().includes(filter.toLowerCase())
      );
    })
  );

  // const filteredData = data.filter((project) => {
  //   const matchesSearch = task?.name
  //     .toLowerCase()
  //     .includes(searchTerm.toLowerCase());
  //   const matchesStatus = statusFilter ? project.status === statusFilter : true;
  //   const matchesPriority = priorityFilter
  //     ? project.priority === priorityFilter
  //     : true;
  //   return matchesSearch && matchesStatus && matchesPriority;
  // });

  const color = ["primary", "success", "warning", "danger", "info", "dark"];

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <div>
      <div className="d-flex justify-content-between mb-3 mt-4">
        <h2>All Tasks</h2>

        <div className="d-flex justify-space-between gap-2">
          <Link to="/kanban">
            <div className="bg-light border p-1 border-gray-800 rounded">
              <Columns />
            </div>
          </Link>

          <Link to="/create-task">
            <Button className="btn-set-color">
              Add New Task
            </Button>
          </Link>
        </div>
      </div>

      <Row className="mb-3">
        <Col md={4}>
          <Form.Control
            type="text"
            placeholder="Search Tasks .."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </Col>
        <Col md={2}>
          <Form.Control
            as="select"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="">All Statuses</option>
            <option>Ongoing</option>
            <option>Completed</option>
            <option>In Progress</option>
            <option>Delayed</option>
          </Form.Control>
        </Col>
        <Col md={2}>
          <Form.Control
            as="select"
            // value={priorityFilter}
            // onChange={(e) => {
            //   setPriorityFilter(e.target.value);
            //   setCurrentPage(1);
            // }}

            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="">All Priorities</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </Form.Control>
        </Col>
      </Row>

      <Table
        bordered
        hover
        responsive
        className="mb-0"
        style={{ border: "1px solid #dee2e6", borderRadius: "8px" }}
      >
        <thead className="table-light">
          <tr className="">
            <th className="ps-4">Task Title</th>
            <th>Assigned To</th>
            <th>Category</th>
            <th>Priority</th>
            <th>Due Date</th>
            <th>Status</th>
            <th className="pe-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="7" className="text-center py-3">
                Loading...
              </td>
            </tr>
          ) : filteredTasks.length > 0 ? (
            filteredTasks.map((task, index) => (
              <tr
                key={index}
                className="bg-white py-3"
                style={{ cursor: "pointer" }}
              >
                <td className="ps-4 py-3">{task.taskTitle}</td>
                <td className="py-3">
                  {task.assignTo
                    ? `${task.assignTo.firstName} ${task.assignTo.lastName}`
                    : "Unassigned"}
                </td>
                <td className="py-3">{task.category}</td>
                <td className="py-3">
                  <span
                    className={`badge text-white ${
                      task.priority === "High"
                        ? "bg-danger"
                        : task.priority === "Medium"
                        ? "bg-warning"
                        : "bg-success"
                    }`}
                  >
                    {task.priority}
                  </span>
                </td>
                <td className="py-3">
                  {new Date(task.dueDate).toISOString().split("T")[0]}
                </td>
                <td className="py-3">
                  <span
                    className={`badge text-white ${
                      task.status === "Completed"
                        ? "bg-[#117a1f]"
                        : task.status === "In Progress"
                        ? "bg-primary"
                        : "bg-danger"
                    }`}
                  >
                    {task.status}
                  </span>
                </td>
                <td className="pe-4 py-3">
                  <button
                    className=" p-0 me-2 text-primary"
                    onClick={() => navigate(`/updatetask/${task._id}`)}
                  >
                    <i className="fa-solid fa-pen-to-square"></i>
                  </button>
                  <button
                    className=" p-0 text-danger"
                    onClick={() => HandleDelete(task._id)}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center py-3">
                No tasks found
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      <div className="d-flex justify-content-end mt-3">
        <Button size="sm" variant="outline-secondary" className="me-2">
          Previous
        </Button>
        <Button size="sm" variant="primary" className="ms-2">
          1
        </Button>
        <Button size="sm" variant="outline-secondary" className="ms-2">
          2
        </Button>
        <Button size="sm" variant="outline-secondary" className="ms-2">
          Next
        </Button>
      </div>

      <div className="row g-3 mb-4 mt-2">
        {[
          {
            title: "Total Tasks",
            value: 12,
            subtitle: "All tasks",
            icon: (
              <i
                className="fa-solid fa-list-check"
                style={{ color: "#3490fa", fontSize: 22 }}
              ></i>
            ),
          },
          {
            title: "Completed Tasks",
            value: "95%",
            subtitle: "Last 30 days average",
            icon: (
              <i
                className="fa-solid fa-circle-check"
                style={{ color: "#16a34a", fontSize: 22 }}
              ></i>
            ),
            className: "text-success",
          },
          {
            title: "Pending Tasks",
            value: 8,
            subtitle: "Requires attention",
            icon: (
              <i
                className="fa-solid fa-hourglass-half"
                style={{ color: "#f59e42", fontSize: 22 }}
              ></i>
            ),
          },
          {
            title: "Inprogress Tasks",
            value: 10,
            subtitle: "All requirements met",
            icon: (
              <i
                className="fa-solid fa-spinner"
                style={{ color: "#2563eb", fontSize: 22 }}
              ></i>
            ),
            className: "text-success",
          },
        ].map((card, i) => (
          <div key={i} className="col-12 col-sm-6 col-md-6 col-lg-3">
            <div
              className="bg-white rounded-4 shadow-sm  border p-4 h-100"
              style={{
                minHeight: 150,
                boxShadow: "0 4px 16px 0 #e5e7eb",
                background: "#fff",
                border: "none",
              }}
            >
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <div
                    className="fw-bold mb-2"
                    style={{
                      color: "#2563eb",
                      fontSize: "1.05rem",
                    }}
                  >
                    {card.title}
                  </div>
                  <div
                    className="fw-bold"
                    style={{
                      fontSize: "2rem",
                      
                      lineHeight: 1.1,
                    }}
                  >
                    {card.value}
                  </div>
                  <div
                    className="mt-2"
                    style={{
                      color: "#16a34a",
                      fontSize: "1rem",
                    }}
                  >
                    {card.subtitle}
                  </div>
                </div>
                <span
                  className="d-inline-flex align-items-center justify-content-center rounded-circle"
                  style={{
                    background: "#e0edff",
                    width: 44,
                    height: 44,
                    marginLeft: 8,
                  }}
                >
                  {card.icon}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllTasks;
