import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';



const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("");

  // Dummy credentials for different roles
  const roleCredentials = {
    admin: { email: "admin@example.com", password: "admin123" },
    superadmin: { email: "superadmin@example.com", password: "superadmin123" },
    supervisor: { email: "supervisor@example.com", password: "manager123" },
    worker: { email: "worker@example.com", password: "employee123" },
  };

  // Handle role selection and fill dummy credentials
  const handleRoleSelect = (role) => {
    const credentials = roleCredentials[role];
    setEmail(credentials.email);
    setPassword(credentials.password);
    setSelectedRole(role);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (selectedRole) {
      localStorage.setItem("userRole", selectedRole);
      alert(`Logged in as ${selectedRole}`);
      // Navigate based on role
      if (selectedRole === "superadmin") {
        navigate("/super-admin-dashboard");
      } else {
        navigate("/dashboard");
      }
    } else {
      alert("Please select a role before logging in.");
    }
  };
  // Dummy login function
  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 " style={{
       background: 'linear-gradient(180deg, rgb(5, 68, 162),#0448ae, #0052CC, #3399FF, rgb(125, 188, 252))',
      color: 'white',
      padding: '20px',
    }}>
      <div className="d-flex w-100 shadow-lg" style={{ maxWidth: '960px', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 0 20px rgba(0,0,0,0.1)' }}>

        {/* Left Side */}
        <div className="bg-white p-5 col-md-6 ">
          <div className="text-center mb-4">
            <h6 className="text-uppercase text-muted mb-1">Welcome to</h6>
            {/* <img className="bg-transparent w-[100%] h-[60px] " src="https://i.postimg.cc/ht8bLKB1/Whats-App-Image-2025-05-31-at-19-06-38-ad6c37ab-removebg-preview.png" alt="SiteWiseLogo" border="0"></img> */}
            <h1 className=""  style={{ color: "#0448ae" }} >
            
              SiteWise
            </h1>
            <p className="text-muted small mt-2">Log in to get in the moment updates on the things that interest you.</p>
          </div>

          <form>
            <div className="mb-3">
              <input type="text" className="form-control rounded-pill px-4" placeholder="Username" value={email}
                onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="mb-3">
              <input type="password" className="form-control rounded-pill px-4" placeholder="Password" value={password}
                onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="d-grid mb-3">
              <button type="submit" className=" rounded-pill py-2 fw-semibold" style={{ backgroundColor: "#0448ae" }} onClick={handleLogin}>Log In</button>
            </div>
          </form>

          <p className="text-center small">
          
            Don’t have an account? <Link to="/signup" className="text-blue fw-semibold text-decoration-none">Sign Up Now</Link>
          </p>

          <div className="text-center mt-4">
            <p className="text-muted small mb-2">Or</p>
            <div className="d-flex justify-content-center gap-3">
              <i className="fab fa-facebook-f text-primary fs-5"></i>
              <i className="fab fa-twitter text-info fs-5"></i>
              <i className="fab fa-google-plus-g text-danger fs-5"></i>
              <i className="fab fa-linkedin-in text-primary fs-5"></i>
            </div>
          </div>

          <div className="d-grid gap-2 text-center mt-3">

            <div className="d-flex justify-content-center gap-2 " >
              <button className=" rounded-pill fw-semibold flex-fill py-2" style={{ backgroundColor: "#0448ae" , width: "80px" }} onClick={() => handleRoleSelect("admin")}>Admin</button>

              <button className="rounded-pill fw-semibold flex-fill py-2" style={{ backgroundColor: "#0448ae" }} onClick={() => handleRoleSelect("superadmin")} >Superadmin</button>
            </div>

            <div className="d-flex justify-content-center gap-2 " >
              <button className="  rounded-pill fw-semibold flex-fill py-2" style={{ backgroundColor: "#0448ae" , width: "50px" }} onClick={() => handleRoleSelect("supervisor")} >Supervisor</button>

              <button className=" rounded-pill fw-semibold flex-fill py-2" style={{ backgroundColor: "#0448ae" }} onClick={() => handleRoleSelect("worker")}>Worker</button>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div
          className="col-md-6 d-none d-md-flex align-items-center justify-content-center text-white position-relative"
          style={{
            background: `url('https://i.postimg.cc/XXS78NPK/Untitled-design-17.png') center/cover no-repeat`,
            flex: 1,
          }}
        >
          <div
            className="text-center px-4 position-relative"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.5)',  // sirf text ke piche halka black transparent overlay
              padding: '20px',
              borderRadius: '8px',
              maxWidth: '400px',
            }}
          >
            <h2 className="fw-bold mb-3" style={{ position: 'relative', zIndex: 2 }}>
              {/* <span style={{ fontSize: '24px', marginRight: '5px' }}>&#8734;</span> */}
            SiteWise
            </h2>
            <p className="small text-white" style={{ position: 'relative', zIndex: 2 }}>
              Build your future with <strong> SiteWise</strong> — where quality meets innovation.
              Track your projects, manage workers, and oversee everything from blueprints to bricks — all in one platform.
            </p>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Login;
