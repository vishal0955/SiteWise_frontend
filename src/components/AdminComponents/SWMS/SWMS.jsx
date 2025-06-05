// import React, { use, useEffect, useState, useMemo } from "react";
// import {Container,Row,Col,Card,Form,Button,Table,Badge,} from "react-bootstrap";
// import { FaEdit, FaEye, FaTrash, FaDownload, FaShare } from "react-icons/fa";
// import {  deleteswms, getallSwms } from "../../../redux/slices/swmsSlice";
// import {
//   getSingleProject,
//   fetchProjects,
// } from "../../../redux/slices/projectSlice";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";

// import { Link } from "react-router-dom";
// import { toast } from "react-toastify";
// import Template from "./Template";
// import SWMSAnalyticsSection from "./SWMSAnalyticsSection";
// import { AlertTriangle, CheckCircle, Clock, Download, Filter, Search } from "lucide-react";
// import TableFilterBar from '../../common/TableFilterBar';

// function SWMS() {
//   const [search, setSearch] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//    const [statusFilter, setStatusFilter] = useState("All");
//    const [activeFilter, setActiveFilter] = useState('all');

//    const [ template, setTemplate] = useState(null);
//   const itemsPerPage = 5;

//   const dispatch = useDispatch();

//   const { swms, loading, error } = useSelector((state) => state.swms);
//   console.log("swms", swms);

//   const projects = useSelector((state) => state.projects.data);
//   // console.log(projects);

//   // console.log("sWMS" ,swms)
//   const navigate = useNavigate();

//   useEffect(() => {
//     dispatch(getallSwms());
//     dispatch(fetchProjects());
//   }, [dispatch]);

//   const SwmsList = Array.isArray(swms.data) ? swms.data : [];

//   console.log("SwmsList", SwmsList);
//   console.log(SwmsList.swmsName)

//   const statusOptions = ['Approved', 'Pending', 'In Review'];
  
//   const handleSearchChange = (e) => {
//     setSearch(e.target.value);
//     setCurrentPage(1); 
//   };

//   const handleStatusChange = (e) => {
//     setStatusFilter(e.target.value);
//     setCurrentPage(1); 
//   };



//   const stats = useMemo(() => {
//     const totalSwms = SwmsList.length;

//     const approvedSwms = SwmsList.filter(swms => swms.status === "Approved").length;
//     const pendingSwms = SwmsList.filter(swms => swms.status === "Pending").length;
//     const inReviewSwms = SwmsList.filter(swms => swms.status === "In Review").length;
//    console.log("stats", totalSwms, approvedSwms, pendingSwms, inReviewSwms);
//     return [
//       {
//         title: "Total SWMS",
//         number: totalSwms,
//         icon: <AlertTriangle className="text-primary" />,
//         subtitle: 'Total safe work statements',
//         filterValue: 'all'
//       },
//       {
//         title: "Approved SWMS",
//         number: approvedSwms,
//         icon: <CheckCircle className="text-primary" />,
//         subtitle: 'Approved statements',
//         filterValue: 'Approved'
//       },
//       {
//         title: "Pending SWMS",
//         number: pendingSwms,
//         icon: <Clock className="text-primary" />,
//         subtitle: 'Pending approval',
//         filterValue: 'Pending'
//       },
//       {
//         title: "In Review",
//         number: inReviewSwms,
//         icon: <AlertTriangle className="text-primary" />,
//         subtitle: 'Under review',
//         filterValue: 'In Review'
//       }
//     ];
//   }, [SwmsList]);

//   const filteredSwms = useMemo(() => {
//     return SwmsList.filter((swms) => {
//       const matchesSearch = swms.swmsName.toLowerCase().includes(search.toLowerCase());
//       const matchesStatus = activeFilter === 'all' || swms.status === activeFilter;
//       return matchesSearch && matchesStatus;
//     });
//   }, [SwmsList, search, activeFilter]);

//   const totalPages = Math.ceil(filteredSwms.length / itemsPerPage);

//   const paginatedSwms = filteredSwms.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   const templates = [
//     {
//       id: 1,
//       title: "Working at Heights",
//       description:
//         "Standard procedures for tasks involving ladders, scaffolding, or elevated platforms.",
//     },
//     {
//       id: 2,
//       title: "Electrical Work",
//       description:
//         "Precautions and procedures for safe handling of electrical systems and components.",
//     },
//     {
//       id: 3,
//       title: "Heavy Machinery Operation",
//       description:
//         "Guidelines for operating excavators, bulldozers, and other heavy equipment safely.",
//     },
//     {
//       id: 4,
//       title: "Confined Space Entry",
//       description:
//         "Safety protocol for entering and working in confined or enclosed spaces.",
//     },
//     {
//       id: 5,
//       title: "Excavation and Trenching",
//       description:
//         "Hazard management and safe digging practices near services and in deep trenches.",
//     },
//     {
//       id: 6,
//       title: "Manual Handling",
//       description:
//         "Safe lifting techniques and risk mitigation for physically demanding tasks.",
//     },
//     {
//       id: 7,
//       title: "Scaffolding Erection",
//       description:
//         "Procedures for erecting, modifying, and working on scaffolding systems.",
//     },
//     {
//       id: 8,
//       title: "Hot Work (Welding & Cutting)",
//       description:
//         "Fire safety and precautions for tasks involving open flames or heat sources.",
//     },
//     {
//       id: 9,
//       title: "Demolition Work",
//       description:
//         "Risk assessment and control for structural demolition and removal work.",
//     },
//   ];


// const handleDelete = async (id) => {
//   try {
//     const result = await Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Yes, delete it!"
//     });

//     if (result.isConfirmed) {
//       const response = await dispatch(deleteswms(id)).unwrap();
      
//       if (response.success) {
//         toast.success("SWMS deleted successfully!");
//         await dispatch(getallSwms()).unwrap(); // Refresh the list
//       } else {
//         toast.error(response.message || "Failed to delete SWMS!");
//       }
//     }
//   } catch (error) {
//     toast.error(error.message || "Something went wrong!");
//   }
// };


//   const getProjectName = (projectId) => {
//     const project = projects.find((p) => p.id === projectId);
//     // console.log("getproject",project);
//     return project ? project.name : "Unknown Project";
//   };

//   const handleUseTemplate = (title) => {
//     navigate(`/template`, { state: { title } });
//   };

//   const handleUseEquipment = (title) => {
//     navigate(`/equipment`, { state: { title } });
//   };
//   return (
//     <Container
//       fluid
//       className="p-4"
//       style={{  minHeight: "100vh" }}
//     >
//       {/* Templates Section */}
//       <div className="dashboard-header">
//         <div className="d-flex justify-content-between align-items-center ">  
//             <h2>Safe Work Method Statements (SWMS)</h2>
//           <Link to={"/SWMSStepper"}>
//             <Button
             
//               className="btn-set-color"
//             >
//               {" "}
//               + Create SWMS{" "}
//             </Button>
//           </Link>
      
//         </div>
//         <p>Manage and monitor your safety documentation</p>
//       </div>

//          <SWMSAnalyticsSection 
//        setStatusFilter={setStatusFilter} 
//         statusFilter={statusFilter}
      
//       />

//       <Row className="mb-4 align-items-center g-3">
//         {/* <h3>SMS Induction </h3> */}
//         <Col sm={12} md={6}>
         
//         </Col>

//         <Col sm={12} md={2}>
//           {/* <Form.Select
//             style={{ borderRadius: "4px", border: "1px solid #dee2e6" }}
//           >
//             <option>All Status</option>
//             <option>Draft</option>
//             <option>Pending Approval</option>
//             <option>Approved</option>
//           </Form.Select> */}
//         </Col>
//         <Col sm={12} md="auto" className="ms-md-auto">
        
//         </Col>
//       </Row>

//       <Card className="mb-5 border-0 shadow-sm">
//         <Card.Header className="bg-white py-3 border-0">
//           <div className="row align-items-center g-3">
//             <div className="col-12">
//               <h4 className="mb-0 fw-semibold">SWMS Overview</h4>
//             </div>
//           </div>
//         </Card.Header>
        
//         <Card.Body className="p-2">
//           {/* Add the filter bar here */}
//           <TableFilterBar
//             searchQuery={search}
//             onSearchChange={handleSearchChange}
//             statusFilter={statusFilter}
//             onStatusChange={handleStatusChange}
//             statusOptions={statusOptions}
//           />

//           <div className="table-responsive">
//             <table className="table table-hover  align-middle mb-0" style={{ border: '1px solid #dee2e6', borderRadius: '8px' }}
          
//             >
//               <thead className="bg-light">
//                 <tr>
//                   <th className="ps-4">SWMS Name</th>
//                   <th>Company Name</th>
//                   <th>Responsible Person </th>
//                   <th>Status</th>
//                   <th>Date Created</th>
//                   <th className="pe-4">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {loading ? (
//   <tr>
//     <td colSpan="6" className="text-center py-3">
//       <div className="spinner-border text-primary" role="status">
//         <span className="visually-hidden">Loading...</span>
//       </div>
//     </td>   
//   </tr>
// ) : filteredSwms.length > 0 ? (
//   paginatedSwms.map((item, index) => (
//                   <tr key={index} onClick={() => navigate(`/view-swms/${item?._id}`)} style={{ cursor: 'pointer' }}>
//                     <td className="ps-4">
//                       <div className="d-flex align-items-center gap-3">
//                         <div>
//                           <div className="">{item?.swmsName}</div>
//                         </div>
//                       </div>
//                     </td>
//                     <td>{item?.companyName || item.project}</td>
//                     <td>{item?.responsiblePersonName}</td>
//                     <td>{index % 2 === 0 ? "Approved": "Pending"}</td>
//                     <td>{new Date(item?.createdAt).toLocaleDateString()}</td>
//                     <td className="pe-4">
//                       <div className="d-flex gap-3">
//                         <Link to={`/view-swms/${item?._id}`}>
//                           <button variant="link" className="text-primary p-0">
//                             <i className="fa-solid fa-eye"></i>
//                           </button>
//                         </Link>
//                         <button
//                           variant="link"
//                           className="text-primary  p-0"
//                           onClick={() =>
//                             navigate(`/editnewSwms/${item?._id}`) ||
//                             handleEdit(item?._id)
//                           }
//                         >
//                           <i className="fa-solid fa-pencil"></i>
//                         </button>

//                         <button
//                           className="text-danger  p-0"
//                           onClick={() => handleDelete(item?._id)}
//                         >
//                           <i className="fa-solid fa-trash"></i>
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="5" className="text-center py-3">
//                     No SWMS found
//                   </td>
//                 </tr>
//               )}
//               </tbody>
//             </table>
//           </div>

//           {/* Pagination */}
//           <div className="d-flex justify-content-end my-3 align-items-center gap-2">
//             <Button
//               size="sm"
//               variant="outline-secondary"
//               onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//               disabled={currentPage === 1}
//             >
//               Previous
//             </Button>

//             {[...Array(totalPages)].map((_, idx) => (
//               <Button
//                 key={idx}
//                 size="sm"
//                 variant={
//                   currentPage === idx + 1 ? "primary" : "outline-secondary"
//                 }
//                 onClick={() => setCurrentPage(idx + 1)}
//               >
//                 {idx + 1}
//               </Button>
//             ))}

//             <Button
//               size="sm"
//               variant="outline-secondary"
//               onClick={() =>
//                 setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//               }
//               disabled={currentPage === totalPages}
//             >
//               Next
//             </Button>
//           </div>

//         </Card.Body>
//       </Card>

   
//       <h5 className="mb-3 mt-3" style={{ fontSize: "1rem", fontWeight: "500" }}>
     
//       </h5>
//       <Row className="mb-4 g-3">
//       <Template
       
//        />
    
//       </Row>

      



//     </Container>
//   );
// }

// export default SWMS;



// SWMS.jsx - Using reusable components
import React, { useEffect } from "react";
import { Container, Row, Col, Button, Badge } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

// Redux actions
import { deleteswms, getallSwms } from "../../../redux/slices/swmsSlice";
import { fetchProjects } from "../../../redux/slices/projectSlice";

// Reusable components


// Other components
import Template from "./Template";
import SWMSAnalyticsSection from "./SWMSAnalyticsSection";

// Icons
import { AlertTriangle, CheckCircle, Clock, FileText } from "lucide-react";
import GenericTableWrapper from "../../common/GenericTableWrapper";
import GenericOverview from "../../common/GenericOverview";
import GenericFilterBar from "../../common/GenericFilterBar";
import { useOverviewFilter } from "../../../hooks/useOverviewFilter";

function SWMS() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { swms, loading, error } = useSelector((state) => state.swms);
  const projects = useSelector((state) => state.projects.data);

  const SwmsList = Array.isArray(swms.data) ? swms.data : [];
  const statusOptions = ['Approved', 'Pending', 'In Review'];

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
    data: SwmsList,
    searchFields: ['swmsName', 'companyName', 'responsiblePersonName'], // Fields to search in
    statusField: 'status',
    itemsPerPage: 5,
    statusOptions
  });

  // Custom icons for different statuses
  const statusIcons = {
    'all': <FileText className="text-primary" />,
    'Approved': <CheckCircle  className="text-primary" />,
    'Pending': <Clock  className="text-primary" />,
    'In Review': <AlertTriangle  className="text-primary" />
  };

  // Custom stats with proper titles and icons
  const customStats = stats.map(stat => ({
    ...stat,
    title: stat.filterValue === 'all' ? 'Total SWMS' : `${stat.filterValue} SWMS`,
    subtitle: stat.filterValue === 'all' 
      ? 'Total safe work statements' 
      : `${stat.filterValue.toLowerCase()} statements`,
    icon: statusIcons[stat.filterValue]
  }));

  useEffect(() => {
    dispatch(getallSwms());
    dispatch(fetchProjects());
  }, [dispatch]);

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!"
      });

      if (result.isConfirmed) {
        const response = await dispatch(deleteswms(id)).unwrap();
        
        if (response.success) {
          toast.success("SWMS deleted successfully!");
          await dispatch(getallSwms()).unwrap();
        } else {
          toast.error(response.message || "Failed to delete SWMS!");
        }
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong!");
    }
  };

  const getProjectName = (projectId) => {
    const project = projects.find((p) => p.id === projectId);
    return project ? project.name : "Unknown Project";
  };

  return (
    <Container fluid className="p-4" style={{ minHeight: "100vh" }}>
      {/* Header Section */}
      <div className="dashboard-header">
        <div className="d-flex justify-content-between align-items-center">  
          <h2>Safe Work Method Statements (SWMS)</h2>
          <Link to={"/SWMSStepper"}>
            <Button className="btn-set-color">
              + Create SWMS
            </Button>
          </Link>
        </div>
        <p>Manage and monitor your safety documentation</p>
      </div>

      {/* Overview Cards - Reusable */}
      <GenericOverview
        stats={customStats}
        onCardClick={handleOverviewCardClick}
        activeFilter={activeFilter}
        icons={statusIcons}
      />

      {/* Analytics Section */}
      <SWMSAnalyticsSection 
        stats={customStats}
        activeFilter={activeFilter}
        onOverviewCardClick={handleOverviewCardClick}
      />

      {/* Table Section - Reusable */}
      <GenericTableWrapper
        title="SWMS Overview"
        activeFilter={activeFilter}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        filteredDataLength={filteredData.length}
        loading={loading}
      >
        {/* Filter Bar - Reusable */}
        <GenericFilterBar
          searchQuery={search}
          onSearchChange={handleSearchChange}
          activeFilter={activeFilter}
          onStatusChange={handleStatusChange}
          statusOptions={statusOptions}
          searchPlaceholder="Search SWMS..."
        />

     {/* <TableFilterBar */}

        {/* Table */}
        <div className="table-responsive">
          <table 
            className="table table-hover align-middle mb-0" 
            style={{ border: '1px solid #dee2e6', borderRadius: '8px' }}
          >
            <thead className="bg-light">
              <tr>
                <th className="ps-4">SWMS Name</th>
                <th>Company Name</th>
                <th>Responsible Person</th>
                <th>Status</th>
                <th>Date Created</th>
                <th className="pe-4">Actions</th>
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
                  <tr 
                    key={item._id || index} 
                    onClick={() => navigate(`/view-swms/${item?._id}`)} 
                    style={{ cursor: 'pointer' }}
                  >
                    <td className="ps-4">
                      <div className="d-flex align-items-center gap-3">
                        <div>{item?.swmsName}</div>
                      </div>
                    </td>
                    <td>{item?.companyName || item.project}</td>
                    <td>{item?.responsiblePersonName}</td>
                    <td>
                      <Badge bg={
                        item.status === 'Approved' ? 'success' : 
                        item.status === 'Pending' ? 'warning' : 'info'
                      }>
                        {item.status || (index % 2 === 0 ? "Approved" : "Pending")}
                      </Badge>
                    </td>
                    <td>{new Date(item?.createdAt).toLocaleDateString()}</td>
                    <td className="pe-4">
                      <div className="d-flex gap-3">
                        <Link to={`/view-swms/${item?._id}`}>
                          <button className=" text-primary p-0">
                            <i className="fa-solid fa-eye"></i>
                          </button>
                        </Link>
                        <button
                          className=" text-primary p-0"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/editnewSwms/${item?._id}`);
                          }}
                        >
                          <i className="fa-solid fa-pencil"></i>
                        </button>
                        <button
                          className=" text-danger p-0"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(item?._id);
                          }}
                        >
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-3">
                    {activeFilter === 'all' ? 'No SWMS found' : `No ${activeFilter} SWMS found`}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </GenericTableWrapper>

      {/* Templates Section */}
      <Row className="mb-4 g-3">
        <Template />
      </Row>
    </Container>
  );
}

export default SWMS;
