import React, { useState, useEffect } from "react";
import { Container, Form, Button, Alert, Image } from "react-bootstrap";
import { Eye, EyeOff } from "lucide-react";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUserAction } from "../store/userSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [validationError, setValidationError] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, errors, currentUser } = useSelector(
    (store) => store.userSlice
  );

  useEffect(() => {
    if (currentUser || localStorage.getItem("user")) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  const validateForm = () => {
    setValidationError(null); // Reset previous errors

    if (!email.trim()) {
      setValidationError("Email is required");
      return true;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setValidationError("Please enter a valid email address");
      return true;
    }

    if (!password.trim()) {
      setValidationError("Password is required");
      return true;
    }

    if (password.length < 6) {
      setValidationError("Password must be at least 6 characters");
      return true;
    }

    return false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const hasErrors = validateForm();
    if (hasErrors) {
      return;
    }

    dispatch(loginUserAction({ email, password }));
  };

  return (
    <Container className="min-vh-100 d-flex align-items-center justify-content-center p-3 p-md-5">
      <div className="login-box p-4 p-md-5 shadow-lg col-md-8 col-lg-5 rounded-4 bg-white">
        <div className="d-flex justify-content-center mb-4">
          <Image
            src={logo}
            alt="Logo"
            className="img-fluid"
            width={180}
            style={{ transition: "transform 0.3s ease" }}
            onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
            onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
          />
        </div>

        <h2 className="text-center mb-4 fw-bold">Welcome Back!</h2>

        {(validationError || errors) && (
          <Alert variant="danger" className="animate__animated animate__shakeX">
            <div className="d-flex align-items-center">
              <i className="bi bi-exclamation-circle me-2"></i>
              {validationError || errors}
            </div>
          </Alert>
        )}

        <Form onSubmit={handleSubmit} className="mt-4">
          <Form.Group controlId="formEmail" className="mb-4">
            <Form.Label className="fw-medium">Email address</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="py-2 shadow-sm"
              style={{ transition: "all 0.3s ease" }}
            />
          </Form.Group>

          <Form.Group controlId="formPassword" className="mb-4">
            <Form.Label className="fw-medium">Password</Form.Label>
            <div className="position-relative">
              <Form.Control
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="py-2 shadow-sm"
                style={{ transition: "all 0.3s ease" }}
              />
              <Button
                variant="link"
                className="position-absolute end-0 top-50 translate-middle-y border-0"
                onClick={() => setShowPassword(!showPassword)}
                style={{ zIndex: 10 }}
                disabled={isLoading}
              >
                {showPassword ? (
                  <EyeOff size={20} className="text-muted" />
                ) : (
                  <Eye size={20} className="text-muted" />
                )}
              </Button>
            </div>
          </Form.Group>

          <div className="d-flex justify-content-between mb-4">
            <Form.Check
              type="checkbox"
              label="Remember me"
              className="text-muted"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <Link
              to="/forgot-password"
              className="text-danger text-decoration-none"
            >
              Forgot Password?
            </Link>
          </div>

          <div className="d-grid">
            <Button
              variant="danger"
              type="submit"
              className="py-2 rounded-3"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </div>

          <p className="text-center mt-4 mb-0 text-muted">
            Don't have an account?{" "}
            <Link to="/register" className="text-danger text-decoration-none">
              Sign up
            </Link>
          </p>
        </Form>
      </div>
    </Container>
  );
};

export default Login;