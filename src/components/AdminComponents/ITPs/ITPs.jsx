// import React, { useState, useMemo, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { Button } from "react-bootstrap";
// import { fetchITPs, deleteITP } from "../../../redux/slices/itpSlice";
// import { fetchUsers } from "../../../redux/slices/userSlice";

// import {
//   LineChart,
//   Line,
//   PieChart,
//   Pie,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
//   CartesianGrid,
//   XAxis,
//   YAxis,
//   Cell,
// } from "recharts";
// import {
//   FaClipboard,
//   FaClock,
//   FaCheckCircle,
//   FaExclamationCircle,
//   FaClipboardCheck,
//   FaHourglassHalf,
//   FaPlus,
// } from "react-icons/fa";
// import { useDispatch, useSelector } from "react-redux";
// import EditITPModal from "./EditITPModal";
// import Swal from "sweetalert2";

// const pieChartData = [
//   { name: "< 24 hrs", value: 40, color: "#3366CC" },
//   { name: "1-3 days", value: 30, color: "#109618" },
//   { name: "3-7 days", value: 20, color: "#FF9900" },
//   { name: "> 7 days", value: 10, color: "#DC3912" },
// ];

// const ITPs = () => {
//   const analytics = {
//     totalITPs: {
//       current: 42,
//       lastMonth: 38,
//       percentageChange: 10,
//     },
//     approvalRate: {
//       current: 68,
//       lastMonth: 62,
//       percentageChange: 6,
//     },
//     pendingITPs: {
//       current: 15,
//       lastMonth: 18,
//       percentageChange: -3,
//     },
//     submissionMetrics: {
//       averageTime: {
//         current: 4.2,
//         previous: 4.5,
//       },
//       lateSubmissions: {
//         current: 7,
//         previous: 9,
//       },
//       onTimeRate: 93,
//     },
//   };
//   const [showEditModal, setShowEditModal] = useState(false);
//   const dispatch = useDispatch();
  // const { data: itps = [], loading, error } = useSelector((state) => state.itps);
  // const users = useSelector((state) => state.users.data || []);

//   useEffect(() => {
//     dispatch(fetchITPs());
//     dispatch(fetchUsers());
//   }, [dispatch]);

//   const handleDelete = (id) => {
//     Swal.fire({
//       title: 'Are you sure?',
//       text: "You won't be able to revert this!",
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#3085d6',
//       cancelButtonColor: '#d33',
//       confirmButtonText: 'Yes, delete it!'
//     }).then((result) => {
//       if (result.isConfirmed) {
//         dispatch(deleteITP(id))
//           .then(() => {
//             Swal.fire(
//               'Deleted!',
//               'The site entry has been deleted.',
//             );
//             dispatch(fetchITPs());  // Refresh the table after delete - fixed function name
//           })
//           .catch((error) => {
//             Swal.fire(
//               'Error!',
//               'Something went wrong.',
//               'error'
//             );
//           });
//       }
//     });
//   };

//   const itemsPerPage = 6;
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedType, setSelectedType] = useState("All Types");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [selectedStatus, setSelectedStatus] = useState("All Statuses");
//   const [selectedAssignee, setSelectedAssignee] = useState("All Assignees");



//   const folders = [
//     { id: 1,icon: <i className="fa fa-folder"></i>, name: "Unit 101" },
//     { id: 2,icon: <i className="fa fa-folder"></i>, name: "Zone A" },
//     { id: 3,icon: <i className="fa fa-folder"></i>, name: "Zone B" },
//     { id: 4,icon: <i className="fa fa-folder"></i>, name: "Project B" },
//   ];
   

//   const trade = [
//     { id: 1, name: "Electrical" },
//     { id: 2, name: "Mechanical" },
//     { id: 3, name: "Civil" },
//   ];

//   const zone = [
//     { id: 1, name: "Zone A" },
//     { id: 2, name: "Zone B" },
//     { id: 3, name: "Zone C" },
//   ];

//   const unitnumber = [
//     { id: 1, name: "Unit 101" },
//     { id: 2, name: "Unit 102" },
//     { id: 3, name: "Unit 103" },
//   ];

//   const projectstage = [
//     { id: 1, name: "Planning" },
//     { id: 2, name: "Execution" },
//     { id: 3, name: "Completion" },
//   ];

//   // Get filter options based on selected group
//   const getFilterOptions = () => {
//     switch(selectedType) {
//       case "trade":
//         return trade;
//       case "zone":
//         return zone;
//       case "unitnumber":
//         return unitnumber;
//       case "projectstage":
//         return projectstage;
//       default:
//         return [];
//     }
//   };

//   const filteredData = useMemo(() => {
//     return itps.filter((item) => {
//       const matchesSearch =
//         (item.activity?.toLowerCase().includes(searchQuery.toLowerCase())) ||
//         (item.Inspector?.firstName?.toLowerCase().includes(searchQuery.toLowerCase())) ||
//         (item.additionalNotes?.toLowerCase().includes(searchQuery.toLowerCase()));
      
//       const matchesStatus = 
//         selectedStatus === "All Statuses" || 
//         item.status === selectedStatus;
      
//       const matchesAssignee =
//         selectedAssignee === "All Assignees" ||
//         item.Inspector?._id === selectedAssignee;
      
//       return matchesSearch && matchesStatus && matchesAssignee;
//     });
//   }, [itps, searchQuery, selectedStatus, selectedAssignee]);

//   const totalPages = Math.ceil(filteredData.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const paginatedData = filteredData.slice(
//     startIndex,
//     startIndex + itemsPerPage
//   );

//   const getStatusBadgeClass = (status) => {
//     switch (status) {
//       case "Approved":
//         return "bg-success";
//       case "Pending":
//         return "bg-warning text-dark";
//       case "Under Review":
//         return "bg-primary";
//       default:
//         return "bg-secondary";
//     }
//   };

//   const handlePageChange = (page) => {
//     setCurrentPage(Math.min(Math.max(1, page), totalPages));
//   };

//   const renderPaginationItems = () => {
//     const items = [];
//     const maxVisiblePages = 5;
//     let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
//     let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

//     if (endPage - startPage + 1 < maxVisiblePages) {
//       startPage = Math.max(1, endPage - maxVisiblePages + 1);
//     }

//     if (startPage > 1) {
//       items.push(
//         <li key="first" className="page-item">
//           <button className="page-link" onClick={() => handlePageChange(1)}>
//             1
//           </button>
//         </li>
//       );
//       if (startPage > 2) {
//         items.push(
//           <li key="dots-1" className="page-item disabled">
//             <button className="page-link">...</button>
//           </li>
//         );
//       }
//     }

//     for (let i = startPage; i <= endPage; i++) {
//       items.push(
//         <li
//           key={i}
//           className={`page-item ${currentPage === i ? "active" : ""}`}
//         >
//           <button className="page-link" onClick={() => handlePageChange(i)}>
//             {i}
//           </button>
//         </li>
//       );
//     }

//     if (endPage < totalPages) {
//       if (endPage < totalPages - 1) {
//         items.push(
//           <li key="dots-2" className="page-item disabled">
//             <button className="page-link">...</button>
//           </li>
//         );
//       }
//       items.push(
//         <li key="last" className="page-item">
//           <button
//             className="page-link"
//             onClick={() => handlePageChange(totalPages)}
//           >
//             {totalPages}
//           </button>
//         </li>
//       );
//     }

//     return items;
//   };

//   const color = [ "primary", "success", "warning", "danger", "info", "dark" ];

//   // Change the stats array to use the same icon for all cards (like your screenshot)
//   const stats = [
//     {
//       icon: (
//         <span className="stats-icon ">
//           <FaClipboard size={22} className="text-primary" />
//         </span>
//       ),
//       title: "Total ITPs",
//       number: analytics.totalITPs.current,
//       subtitle: `${analytics.totalITPs.lastMonth} last month`,
//       color: "primary",
//       trend: analytics.totalITPs.percentageChange,
//     },
//     {
//       icon: (
//         <span className="stats-icon">
//           <FaCheckCircle size={22} className="text-primary" />
//         </span>
//       ),
//       title: "Approval Rate",
//       number: `${analytics.approvalRate.current}%`,
//       subtitle: `${analytics.approvalRate.lastMonth}% last month`,
//       color: "success",
//       trend: analytics.approvalRate.percentageChange,
//     },
//     {
//       icon: (
//         <span className="stats-icon ">
//           <FaHourglassHalf size={22} className="text-primary" />
//         </span>
//       ),
//       title: "Pending ITPs",
//       number: analytics.pendingITPs.current,
//       subtitle: `${analytics.pendingITPs.lastMonth} last month`,
//       color: "warning",
//       trend: analytics.pendingITPs.percentageChange,
//     },
//   ];

//   const handleAddFolderClick = () => {
//     // Open file explorer for folder selection (works in Chrome/Edge)
//     const input = document.createElement("input");
//     input.type = "file";
//     input.webkitdirectory = true; // For Chrome/Edge
//     input.directory = true;       // For Firefox (not widely supported)
//     input.multiple = true;
//     input.style.display = "none";
//     input.onchange = (e) => {
//       // You can handle selected folder files here
//       const files = Array.from(e.target.files);
//       console.log("Selected folder files:", files);
//       // Implement your logic here (e.g., upload, show, etc.)
//     };
//     document.body.appendChild(input);
//     input.click();
//     document.body.removeChild(input);
//   };

//   return (
//     <div className="p-4">
//       <div className="d-flex justify-content-between">
//         <h3 className="fw-semibold mb-4">ITPs</h3>

//         <Link to={"/AddITPs"} className="ms-auto">
//           <Button
//             className="btn-set-color"
//             onClick={() => {
//               console.log("Redirect to create checklist page");
//             }}
//             style={{ backgroundColor: "#0d6efd", color: "white" }}
//           >
//             <i className="fa-solid fa-plus me-2"></i> New ITPs
//           </Button>
//         </Link>
//       </div>
    

        

//      <div className="shadow-sm p-3 bg-white rounded-3 mb-3">
//   <div className="d-flex align-items-center justify-content-between mb-2">
//     <h4 className="mb-0">Folders</h4>
//     <button
//       className="btn btn-primary d-flex align-items-center gap-2"
//       style={{ fontWeight: 500, borderRadius: 8, fontSize: 15 }}
//       onClick={handleAddFolderClick}
//     >
//       <FaPlus className="me-1" /> Add Folder
//     </button>
//   </div>
//   <div className="row">
//     {folders.map((folder) => (
//       <div
//         className="col-12 col-sm-6 col-md-4 col-lg-3 mb-3"
//         key={folder.id}
//       >
//         <div
//           className="card h-100 border-0 folder-card shadow-sm"
//           style={{
//             transition: "box-shadow 0.2s, transform 0.2s",
//             cursor: "pointer",
//             borderRadius: "16px",
//           }}
//         >
//           <div className="card-body d-flex flex-column align-items-start justify-content-center">
//             <div
//               className="mb-3 d-flex align-items-center justify-content-center"
//               style={{
//                 background: "#f3f6fd",
//                 borderRadius: "50%",
//                 width: "56px",
//                 height: "56px",
//               }}
//             >
//               <i
//                 className="fa fa-folder"
//                 style={{
//                   fontSize: "2rem",
//                   color: "#4f8cff",
//                 }}
//               ></i>
//             </div>
//             <h5 className="card-title mb-1 fw-semibold">{folder.name}</h5>
//             <div className="text-muted small">4 files</div>
//           </div>
//         </div>
//       </div>
//     ))}
//   </div>
// </div>

          

//         <div className=" shadow-sm p-3 bg-white rounded-3">
//         {/* Filters */}
//         <div className="filters-section mb-3">
//           <div className="row g-2">
//             <div className="col-md-4">
//               <input
//                 type="text"
//                 className="form-control"
//                 placeholder="Search..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//             </div>


//             <div className="col-md-4">
//               <select
//                 className="form-select"
//                 value={selectedStatus}
//                 onChange={(e) => setSelectedStatus(e.target.value)}
//               >
//                 <option value="All Statuses">All Statuses</option>
//                 <option value="Approved">Approved</option>
//                 <option value="Pending">Pending</option>
//                 <option value="Under Review">Under Review</option>
//               </select>
//             </div>
//             <div className="col-md-4">
//               <select
//                 className="form-select"
//                 value={selectedAssignee}
//                 onChange={(e) => setSelectedAssignee(e.target.value)}
//               >
//                 <option value="All Assignees">All Assignees</option>
//                 {users.map((user) => (
//                   <option key={user._id} value={user._id}>
//                     {user.name || `${user.firstName} ${user.lastName}`}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>
//         </div>

//         {/* Table */}
//         <div className="table-responsive shadow-sm bg-white rounded">
//           <table className="table table-bordered table-striped align-middle mb-0" style={{ border: '1px solid #dee2e6', borderRadius: '8px' }}>
//             <thead className="table-light p-2">
//               <tr>
//                 <th className="ps-4">Activity</th>
//                 <th>Inspector</th>
//                 <th>Criteria</th>
//                 <th>Due Date</th>
//                 <th>Comments</th>
//                 <th>Status</th>
//                 <th className="pe-4">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="p-2">
//               {paginatedData.length > 0 ? (
//                 paginatedData.map((item) => (
//                   <tr key={item._id}>
//                     <td className="ps-4">{item.activity}</td>
//                     <td>
//                       <div className="d-flex align-items-center gap-2">
//                         <span>{item?.Inspector?.firstName}</span>
//                       </div>
//                     </td>
//                     <td>{item.criteria}</td>
//                     <td>{new Date(item.Date).toLocaleDateString()}</td>
//                     <td className="text-muted">{item.additionalNotes}</td>
//                     <td>
//                       <span
//                         className={`badge ${getStatusBadgeClass(item.status)}`}
//                       >
//                         {item.status}
//                       </span>
//                     </td>
//                     <td className="pe-4">
//                       <div className="d-flex gap-2">
//                         <Link
//                           to={`/itps/view/${item._id}`}
//                           className=" btn-sm text-primary p-0"
//                         >
//                           <i
//                             className="fas fa-eye text-primary"
//                             style={{ fontSize: "15px" }}
//                           ></i>
//                         </Link>
                    
//                         <Link to={`/edititp/${item._id}`} className=" btn-sm text-primary p-0">
//                           <i
//                             className="fas fa-edit text-primary"
//                             style={{ fontSize: "15px" }}
//                           ></i>
//                         </Link>
//                         <button
//                           className=" btn-sm p-0"
//                           onClick={() => handleDelete(item._id)}
//                         >
//                           <i
//                             className="fas fa-trash text-danger"
//                             style={{ fontSize: "15px" }}
//                           ></i>
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="7" className="text-center py-3">
//                     No data available
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//           <EditITPModal
//             show={showEditModal}
//             handleClose={() => setShowEditModal(false)}
//             itpData={itps}
//           />
//         </div>

//         {/* Pagination */}
//         <div className="d-flex justify-content-between align-items-center mt-3">
//           <div className="results-counter">
//             Showing {filteredData.length > 0 ? startIndex + 1 : 0} to{" "}
//             {Math.min(startIndex + itemsPerPage, filteredData.length)} of{" "}
//             {filteredData.length} results
//           </div>
//           <nav>
//             <ul className="pagination mb-0">
//               <li
//                 className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
//               >
//                 <button
//                   className="page-link"
//                   onClick={() => handlePageChange(currentPage - 1)}
//                 >
//                   &laquo;
//                 </button>
//               </li>
//               {renderPaginationItems()}
//               <li
//                 className={`page-item ${
//                   currentPage === totalPages || totalPages === 0 ? "disabled" : ""
//                 }`}
//               >
//                 <button
//                   className="page-link"
//                   onClick={() => handlePageChange(currentPage + 1)}
//                 >
//                   &raquo;
//                 </button>
//               </li>
//             </ul>
//           </nav>
//         </div>
//       </div>


//       <div className="row g-4 mt-2">
//   {stats.map((stat, idx) => (
//     <div className="col-12 col-sm-6 col-md-6 col-lg-4" key={idx}>
//       <div
//         className="shadow-sm rounded-4 border  h-100 d-flex flex-column justify-content-between"
//         style={{

          
//           minHeight: 120,
//           boxShadow: "0 2px 8px 0 rgba(60,72,88,.08)",
//           padding: "1.5rem",
//         }}
//       >
//         <div className="d-flex justify-content-between align-items-start mb-2">
//           <div>
//             <div
//               style={{
                
//                 fontWeight: 600,
//                 fontSize: 16,
//                 marginBottom: 2,
//               }}
//             >
//               {stat.title}
//             </div>
//             <div
//               style={{
//                 fontWeight: 700,
//                 fontSize: 28,
                
//                 marginBottom: 2,
//               }}
//             >
//               {stat.number}
//             </div>
//             <div style={{ color: "#1b8a3a", fontSize: 14 }}>
//               {stat.subtitle}
//             </div>
//           </div>
//           <span className="border-0 p-2 rounded-full bg-[#e0edff]">{stat.icon}</span>
//         </div>
//       </div>
//     </div>
//   ))}
// </div>

//       {/* Approval Rate and Submission Metrics */}
//       <div className="row mt-4 g-4">
//         <div className="col-md-6">
//           <div className="card p-3 shadow-sm">
//             <h4 className="mb-4">Resolution Time</h4>
//             <ResponsiveContainer width="100%" height={300}>
//               <PieChart>
//                 <Pie
//                   data={pieChartData}
//                   dataKey="value"
//                   nameKey="name"
//                   cx="50%"
//                   cy="50%"
//                   outerRadius={90}
//                   innerRadius={50}
//                   label
//                 >
//                   {pieChartData.map((entry, index) => (
//                     <Cell key={`cell-${index}`} fill={entry.color} />
//                   ))}
//                 </Pie>
//                 <Tooltip />
//                 <Legend />
//               </PieChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         <div className="col-md-6">
//           <div className="card border-0 h-100">
//             <div className="card p-4 shadow-sm border">
//               <h4 className="mb-4 ">Submission Metrics</h4>
//               <div className="mb-4">
//                 <div className="d-flex justify-content-between align-items-center mb-2">
//                   <span className="text-muted">Average Submission Time</span>
//                   <span className="text-success">
//                     <i className="fas fa-arrow-up me-1"></i>
//                     Previous: {
//                       analytics.submissionMetrics.averageTime.previous
//                     }{" "}
//                     days
//                   </span>
//                 </div>
//                 <h3 className="mb-0 fw-bold">
//                   {analytics.submissionMetrics.averageTime.current} days
//                 </h3>
//               </div>

//               <div className="mb-4">
//                 <div className="d-flex justify-content-between align-items-center mb-2">
//                   <span className="text-muted">Late Submissions</span>
//                   <span className="text-success">
//                     <i className="fas fa-arrow-up me-1"></i>
//                     Previous:{" "}
//                     {analytics.submissionMetrics.lateSubmissions.previous}
//                   </span>
//                 </div>
//                 <h3 className="mb-0 fw-bold">
//                   {analytics.submissionMetrics.lateSubmissions.current}
//                 </h3>
//               </div>

//               <div>
//                 <div className="d-flex justify-content-between align-items-center mb-2">
//                   <span className="text-muted">On-time Submission Rate</span>
//                   <span className="fw-bold">
//                     {analytics.submissionMetrics.onTimeRate}%
//                   </span>
//                 </div>
//                 <div className="progress" style={{ height: "8px" }}>
//                   <div
//                     className="progress-bar bg-primary"
//                     role="progressbar"
//                     style={{
//                       width: `${analytics.submissionMetrics.onTimeRate}%`,
//                     }}
//                     aria-valuenow={analytics.submissionMetrics.onTimeRate}
//                     aria-valuemin="0"
//                     aria-valuemax="100"
//                   ></div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ITPs;

// // Add this CSS to your global stylesheet or in a <style> tag:
// /*
// .stats-icon {
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   border-radius: 50%;
//   width: 38px;
//   height: 38px;
//   background: #e3eafd;
// }
// .bg-primary { background: #e3eafd !important; }
// .bg-success { background: #d1f5e0 !important; }
// .bg-warning { background: #fff4e3 !important; }
// */



// ITPs.jsx - Example usage for ITPs (Inspection and Test Plans)
import React, { useEffect } from "react";
import { Container, Button, Badge } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

// Reusable components

// Icons
import { FileCheck, Clock, CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import { useOverviewFilter } from "../../../hooks/useOverviewFilter";
import GenericTableWrapper from "../../common/GenericTableWrapper";
import GenericFilterBar from "../../common/GenericFilterBar";
import GenericOverview from "../../common/GenericOverview";
import { fetchITPs } from "../../../redux/slices/itpSlice";
import { fetchUsers } from "../../../redux/slices/userSlice";

function ITPs() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { data: itps = [], loading, error } = useSelector((state) => state.itps);
  const users = useSelector((state) => state.users.data || []);
  console.log("ITPs data:", itps);
  const ITPList = Array.isArray(itps.data) ? itps.data : [];
  
  const statusOptions = ['Draft', 'Submitted', 'Approved', 'Rejected'];

  // Use the reusable hook
  const {
    search,
    currentPage,
    activeFilter,
    stats,
    filteredData,
    paginatedData,
    totalPages,
    handleSearchChange,
    handleStatusChange,
    handleOverviewCardClick,
    setCurrentPage
  } = useOverviewFilter({
    data: ITPList,
    searchFields: ['itpName', 'projectName', 'inspectorName'], // ITP specific fields
    statusField: 'status',
    itemsPerPage: 10, // Different page size
    statusOptions
  });

  // Custom icons for ITP statuses
  const statusIcons = {
    // 'all': <FileCheck className="text-primary" />,
    // 'Draft': <Clock className="text-secondary" />,
    // 'Submitted': <AlertTriangle className="text-warning" />,
    // 'Approved': <CheckCircle className="text-success" />,
    // 'Rejected': <XCircle className="text-danger" />
  };

  // Custom stats with ITP-specific titles
  const customStats = stats.map(stat => ({
    ...stat,
    title: stat.filterValue === 'all' ? 'Total ITPs' : `${stat.filterValue} ITPs`,
    subtitle: stat.filterValue === 'all' 
      ? 'Total inspection plans' 
      : `${stat.filterValue.toLowerCase()} plans`,
    icon: statusIcons[stat.filterValue]
  }));

  useEffect(() => {
  dispatch(fetchITPs());
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleDelete = async (id) => {
    // ITP specific delete logic
  };

  return (
    <Container fluid className="p-4" style={{ minHeight: "100vh" }}>
      {/* Header Section */}
      <div className="dashboard-header">
        <div className="d-flex justify-content-between align-items-center">  
          <h2>Inspection and Test Plans (ITPs)</h2>
          <Link to={"/create-itp"}>
            <Button className="btn-primary">
              + Create ITP
            </Button>
          </Link>
        </div>
        <p>Manage and monitor your inspection and test plans</p>
      </div>

      {/* Overview Cards - Same reusable component */}
      <GenericOverview
        stats={customStats}
        onCardClick={handleOverviewCardClick}
        activeFilter={activeFilter}
        icons={statusIcons}
      />

      {/* Table Section - Same reusable wrapper */}
      <GenericTableWrapper
        title="ITP Overview"
        activeFilter={activeFilter}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        filteredDataLength={filteredData.length}
        loading={loading}
      >
        {/* Filter Bar - Same reusable component */}
        <GenericFilterBar
          searchQuery={search}
          onSearchChange={handleSearchChange}
          activeFilter={activeFilter}
          onStatusChange={handleStatusChange}
          statusOptions={statusOptions}
          searchPlaceholder="Search ITPs..."
          extraFilters={
            // ITP specific additional filters
            <select className="form-select">
              <option>All Projects</option>
              <option>Project A</option>
              <option>Project B</option>
            </select>
          }
        />

        {/* ITP Specific Table */}
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="bg-light">
              <tr>
                <th>ITP Name</th>
                <th>Project</th>
                <th>Inspector</th>
                <th>Status</th>
                <th>Due Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center py-3">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </td>   
                </tr>
              ) : paginatedData.length > 0 ? (
                paginatedData.map((item, index) => (
                  <tr key={item._id || index}>
                    <td>{item.itpName}</td>
                    <td>{item.projectName}</td>
                    <td>{item.inspectorName}</td>
                    <td>
                      <Badge bg={
                        item.status === 'Approved' ? 'success' : 
                        item.status === 'Rejected' ? 'danger' :
                        item.status === 'Submitted' ? 'warning' : 'secondary'
                      }>
                        {item.status}
                      </Badge>
                    </td>
                    <td>{new Date(item.dueDate).toLocaleDateString()}</td>
                    <td>
                      <div className="d-flex gap-2">
                        <button className="btn btn-sm btn-outline-primary">
                          <i className="fa-solid fa-eye"></i>
                        </button>
                        <button className="btn btn-sm btn-outline-secondary">
                          <i className="fa-solid fa-edit"></i>
                        </button>
                        <button className="btn btn-sm btn-outline-danger">
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-3">
                    No ITPs found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </GenericTableWrapper>
    </Container>
  );
}

export default ITPs;