import React from "react";
import { Form, Button, Row, Col, Container, Card } from "react-bootstrap";
import { Link } from "react-router-dom";


const Register = () => {
  return (
    <div className="auth-container" style={{
      background: 'linear-gradient(180deg, rgb(5, 68, 162),#0448ae, #0052CC, #3399FF, rgb(125, 188, 252))',
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}>
      <Card style={{ width: "960px", border: "none" , borderRadius: "20px", overflow: "hidden", display: "flex", flexDirection: "row", boxShadow: "0 8px 16px rgba(0,0,0,0.2)" }}>
        <div style={{ flex: 1, padding: "40px" }}>

          <h4 className="text-center mb-3">Create Account</h4>

          <button type="submit" className=" rounded-pill py-2 fw-semibold" style={{ backgroundColor: "#0448ae", color: "white", width: "100%" }}> <i className="fab fa-google me-2 text-white"></i>
            Continue with Google</button>

          <div className="text-center mb-3">
            <span>or</span>
          </div>
          <Form>
            <Row className="mb-3">
              <Col>
                <Form.Floating>
                  <Form.Control type="text" placeholder="First name" id="firstName" />
                  <label htmlFor="firstName">First name</label>
                </Form.Floating>
              </Col>
              <Col>
                <Form.Floating>
                  <Form.Control type="text" placeholder="Last name" id="lastName" />
                  <label htmlFor="lastName">Last name</label>
                </Form.Floating>
              </Col>
            </Row>
            <Form.Floating className="mb-3">
              <Form.Control type="email" placeholder="name@example.com" id="email" />
              <label htmlFor="email">Email address</label>
            </Form.Floating>
            <Form.Floating className="mb-3">
              <Form.Control type="password" placeholder="Password" id="password" />
              <label htmlFor="password">Password</label>
              <div className="form-text mt-1">Password must be at least 8 characters long</div>
            </Form.Floating>
            <Form.Check
              className="mb-4"
              type="checkbox"
              label={<>
                I agree to the <a href="#" className="text-decoration-none">Terms of Service</a> and <a href="#" className="text-decoration-none">Privacy Policy</a>
              </>}
              id="terms"
            />
            <button type="submit" className=" rounded-pill py-2 fw-semibold" style={{ backgroundColor: "#0448ae", color: "white", width: "100%" }}> Create Account</button>
            <div className="text-center">
              <span className="text-secondary">Already have an account?</span>
              <Link to="/" className="ms-1 text-decoration-none">Sign in</Link>
            </div>
          </Form>
        </div>

        <div className="col-md-6 d-none d-md-flex align-items-center justify-content-center text-white position-relative"
          style={{
            background: `url('https://i.postimg.cc/XXS78NPK/Untitled-design-17.png') center/cover no-repeat`,
            flex: 1,
          }}>
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
              <span style={{ fontSize: '24px', marginRight: '5px' }}>&#8734;</span>
              Construction
            </h2>
            <p className="small text-white" style={{ position: 'relative', zIndex: 2 }}>
              Build your future with <strong> Construction</strong> — where quality meets innovation.
              Track your projects, manage workers, and oversee everything from blueprints to bricks — all in one platform.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Register;
