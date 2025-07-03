import React, { useEffect, useState } from "react";
import { Container, Form, Button, Alert, Image } from "react-bootstrap";
import { Eye, EyeOff } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { registerUserAction, getAllUsersAction } from "../store/userSlice";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import logo from "../assets/logo.png";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  
  const [validationErrors, setValidationErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const { users, currentUser, isLoading, errors } = useSelector(
    (store) => store.userSlice
  );

  useEffect(() => {
    if (currentUser) {
      Swal.fire({
        title: 'Success!',
        text: `Welcome ${currentUser.fullName}! Your account has been created successfully.`,
        icon: 'success',
        confirmButtonColor: '#dc3545',
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false
      }).then((result) => {
        navigate("/");
      });
    } else if (users.length === 0) {
      dispatch(getAllUsersAction());
    }
  }, [currentUser, dispatch, users.length, navigate]);

  const validateForm = () => {
    const errors = {};
    
    if (!formData.fullName.trim()) {
      errors.fullName = "Full name is required";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (users.some((user) => user.email === formData.email)) {
      errors.email = "This email is already registered";
    }

    if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    if (!termsAccepted) {
      errors.terms = "You must accept the Terms of Service";
    }

    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear validation error when user starts typing
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    const newUser = {
      fullName: formData.fullName,
      email: formData.email,
      password: formData.password,
      role: "user",
    };

    dispatch(registerUserAction(newUser));
  };

  return (
    <Container className="min-vh-100 d-flex align-items-center justify-content-center p-3 p-md-5">
      <div className="login-box p-4 p-md-5 shadow-lg col-md-8 col-lg-5 rounded-4 bg-white">
        <div className="d-flex justify-content-center mb-4">
          <Image src={logo} alt="Logo" className="img-fluid" width={180} />
        </div>

        <h2 className="text-center mb-4 fw-bold">Create Account</h2>

        {errors && <Alert variant="danger">{errors}</Alert>}

        <Form onSubmit={handleSubmit} className="mt-4">
          <Form.Group controlId="formFullName" className="mb-4">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              isInvalid={!!validationErrors.fullName}
            />
            <Form.Control.Feedback type="invalid">
              {validationErrors.fullName}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formEmail" className="mb-4">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              isInvalid={!!validationErrors.email}
            />
            <Form.Control.Feedback type="invalid">
              {validationErrors.email}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formPassword" className="mb-4">
            <Form.Label>Password</Form.Label>
            <div className="position-relative">
              <Form.Control
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                isInvalid={!!validationErrors.password}
              />
              <Button
                variant="link"
                className="position-absolute end-0 top-50 translate-middle-y border-0"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </Button>
              <Form.Control.Feedback type="invalid">
                {validationErrors.password}
              </Form.Control.Feedback>
            </div>
          </Form.Group>

          <Form.Group controlId="formConfirmPassword" className="mb-4">
            <Form.Label>Confirm Password</Form.Label>
            <div className="position-relative">
              <Form.Control
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                isInvalid={!!validationErrors.confirmPassword}
              />
              <Button
                variant="link"
                className="position-absolute end-0 top-50 translate-middle-y border-0"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </Button>
              <Form.Control.Feedback type="invalid">
                {validationErrors.confirmPassword}
              </Form.Control.Feedback>
            </div>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Check
              type="checkbox"
              label="I agree to the Terms of Service and Privacy Policy"
              isInvalid={!!validationErrors.terms}
              onChange={(e) => {
                setTermsAccepted(e.target.checked);
                if (validationErrors.terms) {
                  setValidationErrors((prev) => ({ ...prev, terms: "" }));
                }
              }}
            />
            {validationErrors.terms && (
              <div className="text-danger small mt-1">
                {validationErrors.terms}
              </div>
            )}
          </Form.Group>

          <div className="d-grid">
            <Button
              variant="danger"
              type="submit"
              className="py-2 rounded-3"
              disabled={isLoading}
            >
              {isLoading ? "Creating..." : "Create Account"}
            </Button>
          </div>

          <p className="text-center mt-4 mb-0">
            Already have an account? <Link to="/login" className="text-danger text-decoration-none">Login</Link>
          </p>
        </Form>
      </div>
    </Container>
  );
};

export default Register;