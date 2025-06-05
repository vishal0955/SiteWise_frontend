//upATE CODE WITH DYNAMIC NAME AND EMAIL BASED ON ROLE

// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import "./Navbar.css";
// import { useSelector } from "react-redux";
// const Navbar = ({ toggleSidebar }) => {

//   const [showPassword, setShowPassword] = useState(false);

//   //when logi api is called, the user data is stored in local storage
//   // const [roledata, setRoleData] = useState(() => {
//   //   const storedRole = localStorage.getItem("userRole");
//   //   return storedRole ? JSON.parse(storedRole) : null;
//   // });

//   // useEffect(() => {
//   //   const stored = localStorage.getItem("user");
//   //   if (stored) {
//   //     const parsed = JSON.parse(stored);
//   //     console.log("Role", parsed.email);
//   //     setRoleData(parsed);
//   //   } else {
//   //     setRoleData(null);
//   //   }
//   // }, []);

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   // console.log(roledata)
//   // console.log("email",roledata.email)

//   return (
//     <>
//       <nav className="navbar pe-5 d-flex justify-content-end">
//         <div className="navbar-left">
//           <div className="navbar-logo">
//             <span className="logo-text">Contruction</span>
//           </div>
//           <button onClick={toggleSidebar} className="toggle-button d-block d-md-none">
//             <i className="fas fa-bars"></i>
//           </button>
//         </div>

//         <div className="navbar-right">
//           <div className="dropdown profile-dropdown d-none d-md-block">
//             <div className="profile-trigger" data-bs-toggle="dropdown" aria-expanded="false">
//               <div className="profile-info">
//                    <span className="profile-name">Admin</span>
//                 {/* <span className="profile-role">{roledata?.email}</span> */}
//                 {/* <span className="profile-name">{roledata?.firstName}</span>
//                 <span className="profile-role">{roledata?.email}</span> */}
//                 <span className="profile-role">Admin</span>
//               </div>
//               <div className="profile-avatar">
//                 <img src="https://i.ibb.co/6Jc9g6jF/user-11.jpg" alt="profile" />
//               </div>
//             </div>

//             <ul className="dropdown-menu dropdown-menu-end profile-menu">
//               <li>
//                 <Link  className="dropdown-item">
//                   <i className="fas fa-user"></i>
//                   <span>My Profile</span>
//                 </Link>
//               </li>
//               <li>
//                 <Link  className="dropdown-item">
//                   <i className="fas fa-edit"></i>
//                   <span>Update Profile</span>
//                 </Link>
//               </li>
//               <li>
//                 <Link  className="dropdown-item">
//                   <i className="fas fa-lock"></i>
//                   <span>Change Password</span>
//                 </Link>
//               </li>
//               <li><hr className="dropdown-divider"/></li>
//               <li onClick={()=>localStorage.clear()}>
//                 <Link to="/" className="dropdown-item text-danger" >
//                   <i className="fas fa-sign-out-alt"></i>
//                   <span>Logout</span>
//                 </Link>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </nav>
//     </>
//   );
// };

// export default Navbar;

import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useTheme } from "../../context/ThemeContext";
import {
  Activity,
  Bell,
  Clipboard,
  ClipboardCheck,
  CreditCard,
  Dna,
  Moon,
  Redo,
  Sun,
  User,
} from "lucide-react";
import { MdDangerous } from "react-icons/md";
// import { useTheme } from "../../context/ThemeContext";

const Navbar = ({ toggleSidebar }) => {
  
  const { theme, toggleTheme } = useTheme();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isNotificationDropdownOpen, setIsNotificationDropdownOpen] =
    useState(false);
  const [newEntryOpen, setNewEntryOpen] = useState(false);
  const dropdownRef = useRef(null);
  const toggleNotificationDropdown = () => {
    setIsNotificationDropdownOpen(!isNotificationDropdownOpen);
    
  };

  const [roledata, setRoleData] = useState("");

  useEffect(() => {
    const Role = localStorage.getItem("userRole");
    if (Role) {
      setRoleData(Role);
    } else {
      setRoleData();
    }
  }, []);
  const handleropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleNewEntryDropdown = () => {
    setNewEntryOpen(!newEntryOpen);
    // Close other dropdowns if open
    setDropdownOpen(false);
    setIsNotificationDropdownOpen(false);
  };

  return (
    <>
      <nav className="navbar ">
        <div className="navbar-left d-flex align-items-center">
          <div className="navbar-logo">
            {theme === "light" ? (
              <img
                className="navbar-logo-img"
                src="https://i.postimg.cc/T36K3vxs/4.png"
                alt="logo"
              />
            ) : (
              <img
                className="navbar-logo-img"
                src="https://i.postimg.cc/KYmCVXyp/3.png"
                alt="logo"
              />
            )}
          </div>
        </div>

        <div className="navbar-right d-flex align-items-center">
          {/* Add this before the theme toggle button */}
          <div className="new-entry-dropdown me-3">
            <button 
              className="btn btn-primary d-flex align-items-center gap-2" 
              onClick={handleNewEntryDropdown}
            >
              <i className="fas fa-plus text-white"></i>
              <span className="">New Entry</span>
            </button>

            {newEntryOpen && (
              <ul className="dropdown-menu show new-entry-menu">
                <li>
                  <Link to="/swms" className="dropdown-item">
                    <Clipboard size={16} className="me-2" />
                    <span> SWMS</span>
                  </Link>
                </li>
                <li>
                  <Link to="/rfis" className="dropdown-item">
                    <Activity size={16} className="me-2" />
                    <span>RFI</span>
                  </Link>
                </li>
                <li>
                  <Link to="/TaskDashboard" className="dropdown-item">
                    <Dna size={16} className="me-2" />
                    <span> Task</span>
                  </Link>
                </li>
                <li>
                  <Link to="/sitereview" className="dropdown-item">
                    <CreditCard size={16} className="me-2" />
                    <span>Review</span>
                  </Link>
                </li>
              </ul>
            )}
          </div>

          <button onClick={toggleTheme} className="btn-icon me-3" aria-label="Toggle theme">
            <i className={`fa fa-${theme === "light" ? "moon" : "sun"}`}></i>
          </button>

          <div className="relative me-3" ref={dropdownRef}>
            <button
              onClick={toggleNotificationDropdown}
              className="notification-btn"
            >
              <Bell size={20} />
              <span className="notification-badge">2</span>
            </button>

            {isNotificationDropdownOpen && (
              <div
                className="fixed top-16 right-0 w-80 h-[calc(100vh-4rem)] bg-white shadow-lg z-50 rounded-l-md ring-1 ring-black ring-opacity-5 overflow-y-auto"
              >
                <div className="p-4 border-b border-gray-200">
                  <h3 className="text-base font-medium">Notifications</h3>
                </div>

                <div className="py-1">
                  {/* Notification Item 1 */}
                  <a href="#" className="flex items-start px-4 py-2 border-b border-gray-100">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <User size={16} className="text-blue-500" />
                    </div>
                    <div>
                      <p className="font-medium">New Induction at Site 1</p>
                      <p className="text-xs">John Doe has joined Site 1</p>
                      <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
                    </div>
                  </a>

                  {/* Notification Item 2 */}
                  <a href="#" className="flex items-start px-4 py-2 border-b border-gray-100">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                      <ClipboardCheck size={16} className="text-green-500" />
                    </div>
                    <div>
                      <p className="font-medium">SWMS approved</p>
                      <p className="text-xs">SWMS has been approved</p>
                      <p className="text-xs text-gray-400 mt-1">1 day ago</p>
                    </div>
                  </a>

                  {/* Notification Item 3 */}
                  <a href="#" className="flex items-start px-4 py-2">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                      <MdDangerous size={16} className="text-red-500" />
                    </div>
                    <div>
                      <p className="font-medium">New Incident Found</p>
                      <p className="text-xs">Incident with high severity at Site 1</p>
                      <p className="text-xs text-gray-400 mt-1">3 days ago</p>
                    </div>
                  </a>
                </div>

                <div className="py-2 border-t border-gray-200 text-center">
                  <a href="#" className="text-sm text-blue-500 hover:text-blue-700 font-medium">
                    View all notifications
                  </a>
                </div>
              </div>
            )}
          </div>


          <div className="dropdown profile-dropdown" onClick={handleropdown}>
            <div className="profile-trigger d-flex align-items-center me-4">
              <div className="profile-info text-end me-2">
                <p className="profile-name mb-0">admin</p>
                <p className="profile-role mb-0">admin@gmail.com</p>
              </div>
              <div className="profile-avatar">
                <img
                  src="https://i.ibb.co/6Jc9g6jF/user-11.jpg"
                  alt="profile"
                />
              </div>
            </div>
            {dropdownOpen && (
              <ul className="dropdown-menu dropdown-menu-end profile-menu show">
                <li>
                  <Link className="dropdown-item">
                    <i className="fas fa-user"></i>
                    <span>My Profile</span>
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item">
                    <i className="fas fa-edit"></i>
                    <span>Update Profile</span>
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item">
                    <i className="fas fa-lock"></i>
                    <span>Change Password</span>
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link to="/" className="dropdown-item text-danger">
                    <i className="fas fa-sign-out-alt"></i>
                    <span>Logout</span>
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </div>

        {/* Toggle button at the end for mobile */}
        <button
          onClick={toggleSidebar}
          className="toggle-button navbar-toggle-end"
          aria-label="Open sidebar"
        >
          <i className="fas fa-bars"></i>
        </button>
      </nav>
    </>
  );
};

export default Navbar;
