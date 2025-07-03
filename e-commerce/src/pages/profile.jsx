import React, { useState } from 'react';
import { Container, Card, Row, Col, Form, Button, Alert, Badge } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserAction } from '../store/userSlice';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';

const Profile = () => {
  const dispatch = useDispatch();
  const { currentUser, isLoading, errors } = useSelector((store) => store.userSlice);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: currentUser?.fullName || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    address: currentUser?.address || '',
    avatar: currentUser?.avatar || '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateUserAction({
        userId: currentUser.id,
        userData: {
          ...currentUser,
          ...formData
        }
      })).unwrap();
      
      setIsEditing(false);
      Swal.fire({
        title: 'Success!',
        text: 'Profile updated successfully',
        icon: 'success',
        confirmButtonColor: '#3085d6'
      });
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message || 'Failed to update profile',
        icon: 'error',
        confirmButtonColor: '#d33'
      });
    }
  };

  if (!currentUser) {
    return (
      <Container className="my-5">
        <Alert variant="danger">
          Please log in to view your profile.
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow">
            <Card.Header className="bg-danger text-white py-3">
              <h4 className="mb-0">Profile Information</h4>
            </Card.Header>
            <Card.Body className="p-4">
              {errors && <Alert variant="danger">{errors}</Alert>}
              
              <Row className="align-items-center mb-4">
                <Col xs={12} md={4} className="text-center mb-3 mb-md-0">
                  <img
                    src= "https://wallpapers.com/images/featured/cool-profile-picture-87h46gcobjl5e4xu.webp"
                    alt="Profile"
                    className="rounded-circle img-thumbnail"
                    style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                  />
                  {!isEditing && (
                    <Button 
                      variant="outline-danger" 
                      className="mt-3 d-block mx-auto"
                      onClick={() => setIsEditing(true)}
                    >
                      Edit Profile
                    </Button>
                  )}
                </Col>
                <Col xs={12} md={8}>
                  {isEditing ? (
                    <Form onSubmit={handleSubmit}>
                      <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          required
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                          as="textarea"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          rows={2}
                        />
                      </Form.Group>
                      <div className="d-flex gap-2">
                        <Button type="submit" variant="danger" disabled={isLoading}>
                          {isLoading ? 'Saving...' : 'Save Changes'}
                        </Button>
                        <Button 
                          type="button" 
                          variant="secondary"
                          onClick={() => {
                            setIsEditing(false);
                            setFormData({
                              fullName: currentUser.fullName,
                              email: currentUser.email,
                              phone: currentUser.phone || '',
                              address: currentUser.address || '',
                              avatar: currentUser.avatar
                            });
                          }}
                        >
                          Cancel
                        </Button>
                      </div>
                    </Form>
                  ) : (
                    <div className="user-info">
                      <div className="mb-3 d-flex align-items-center">
                        <FaUser className="text-danger me-2" />
                        <div>
                          <small className="text-muted">Name</small>
                          <p className="mb-0">{currentUser.fullName}</p>
                        </div>
                      </div>
                      <div className="mb-3 d-flex align-items-center">
                        <FaEnvelope className="text-danger me-2" />
                        <div>
                          <small className="text-muted">Email</small>
                          <p className="mb-0">{currentUser.email}</p>
                        </div>
                      </div>
                      <div className="mb-3 d-flex align-items-center">
                        <FaPhone className="text-danger me-2" />
                        <div>
                          <small className="text-muted">Phone</small>
                          <p className="mb-0">{currentUser.phone || 'Not provided'}</p>
                        </div>
                      </div>
                      <div className="mb-3 d-flex align-items-center">
                        <FaMapMarkerAlt className="text-danger me-2" />
                        <div>
                          <small className="text-muted">Address</small>
                          <p className="mb-0">{currentUser.address || 'Not provided'}</p>
                        </div>
                      </div>
                      {currentUser.role === 'admin' && (
                        <Badge bg="danger" className="mt-2">Admin</Badge>
                      )}
                    </div>
                  )}
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;