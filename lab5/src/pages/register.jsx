import React, { useState } from 'react';
import { Container, Form, Button, Alert, Image } from 'react-bootstrap';
import { Eye, EyeOff } from 'lucide-react';
import logo from '../assets/logo.png';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.fullName.trim()) {
      setError('Full name is required');
      return;
    }

    if (!formData.email.includes('@')) {
      setError('Invalid email address');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    console.log(formData);
    alert('Registration successful!');
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
            style={{ transition: 'transform 0.3s ease' }}
            onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
          />
        </div>
        
        <h2 className="text-center mb-4 fw-bold">Create Account</h2>
        
        {error && (
          <Alert variant="danger" className="animate__animated animate__shakeX">
            <div className="d-flex align-items-center">
              <i className="bi bi-exclamation-circle me-2"></i>
              {error}
            </div>
          </Alert>
        )}
        
        <Form onSubmit={handleSubmit} className="mt-4">
          <Form.Group controlId="formFullName" className="mb-4">
            <Form.Label className="fw-medium">Full Name</Form.Label>
            <Form.Control
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="py-2 shadow-sm"
              style={{ transition: 'all 0.3s ease' }}
            />
          </Form.Group>

          <Form.Group controlId="formEmail" className="mb-4">
            <Form.Label className="fw-medium">Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="py-2 shadow-sm"
              style={{ transition: 'all 0.3s ease' }}
            />
          </Form.Group>

          <Form.Group controlId="formPassword" className="mb-4">
            <Form.Label className="fw-medium">Password</Form.Label>
            <div className="position-relative">
              <Form.Control
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                className="py-2 shadow-sm"
                style={{ transition: 'all 0.3s ease' }}
              />
              <Button
                variant="link"
                className="position-absolute end-0 top-50 translate-middle-y border-0"
                onClick={() => setShowPassword(!showPassword)}
                style={{ zIndex: 10 }}
              >
                {showPassword ? 
                  <EyeOff size={20} className="text-muted" /> : 
                  <Eye size={20} className="text-muted" />
                }
              </Button>
            </div>
          </Form.Group>

          <Form.Group controlId="formConfirmPassword" className="mb-4">
            <Form.Label className="fw-medium">Confirm Password</Form.Label>
            <div className="position-relative">
              <Form.Control
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                className="py-2 shadow-sm"
                style={{ transition: 'all 0.3s ease' }}
              />
              <Button
                variant="link"
                className="position-absolute end-0 top-50 translate-middle-y border-0"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                style={{ zIndex: 10 }}
              >
                {showConfirmPassword ? 
                  <EyeOff size={20} className="text-muted" /> : 
                  <Eye size={20} className="text-muted" />
                }
              </Button>
            </div>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Check 
              type="checkbox" 
              label="I agree to the Terms of Service and Privacy Policy" 
              className="text-muted"
              required
            />
          </Form.Group>

          <div className="d-grid">
            <Button 
              variant="danger" 
              type="submit" 
              className="py-2 rounded-3"
              style={{ 
                transition: 'all 0.3s ease',
                backgroundColor: '#dc3545'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#c82333'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#dc3545'}
            >
              Create Account
            </Button>
          </div>

          <p className="text-center mt-4 mb-0 text-muted">
            Already have an account? <a href="#" className="text-danger text-decoration-none">Login</a>
          </p>
        </Form>
      </div>
    </Container>
  );
};

export default Register;