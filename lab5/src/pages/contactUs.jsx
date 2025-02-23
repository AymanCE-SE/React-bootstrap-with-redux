import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";
import '../styles/ContactUs.css'

export default function ContactUs() {
  return (
    <>
      {/* Hero Section */}
      <div className=" hero-section  text-white text-center d-flex flex-column justify-content-center align-items-center py-5">
        <Container>
        <h1 className=" display-3 fw-bold  text-danger">Let's Connect!</h1>
        <p className="lead mt-3 fs-4 text-danger">Have questions or need assistance? We’d love to hear from you!</p>
        <Link className="btn btn-outline-danger btn-lg mt-3" to={'/'}>Back To Home</Link>

        </Container>
      </div>

      <Container className="my-5">
        <Row className="g-4">
          {/* Contact Form */}
          <Col md={7}>
            <Card className="shadow-lg border-0 p-4">
              <Card.Body>
                <h3 className="fw-bold text-center mb-4">Send a Message</h3>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter your name" />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter your email" />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Subject</Form.Label>
                    <Form.Control type="text" placeholder="Subject" />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Message</Form.Label>
                    <Form.Control as="textarea" rows={4} placeholder="Write your message here..." />
                  </Form.Group>
                  <Button variant="danger" className="w-100">Send Message</Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>

          {/* Contact Info */}
          <Col md={5}>
            <Card className="shadow-lg border-0 p-4 bg-light">
              <Card.Body>
                <h3 className="fw-bold text-center mb-4">Contact Information</h3>
                <p className="text-muted text-center mb-4">Feel free to reach out to us via phone, email, or visit us.</p>

                {/* Address */}
                <div className="d-flex flex-column mb-3">
                  <div className="d-flex align-items-center gap-2">
                    <FaMapMarkerAlt size={24} className="text-danger" />
                    <h6 className="fw-bold ">Our Location</h6>
                  </div>
                  <p className="text-muted ps-4 mb-2">123 Street, City, Country</p>
                </div>

                {/* Phone */}
                <div className="d-flex flex-column mb-3">
                  <div className="d-flex align-items-center gap-2">
                    <FaPhone size={24} className="text-danger" />
                    <h6 className="fw-bold ">Call Us</h6>
                  </div>
                  <p className="text-muted ps-4 mb-2">+1 234 567 890</p>
                </div>

                {/* Email */}
                <div className="d-flex flex-column mb-3">
                  <div className="d-flex align-items-center gap-2">
                    <FaEnvelope size={24} className="text-danger" />
                    <h6 className="fw-bold ">Email Us</h6>
                  </div>
                  <p className="text-muted ps-4 mb-2">info@example.com</p>
                </div>

                {/* Working Hours */}
                <div className="d-flex flex-column mb-3">
                  <div className="d-flex align-items-center gap-2">
                    <FaClock size={24} className="text-danger" />
                    <h6 className="fw-bold ">Working Hours</h6>
                  </div>
                  <p className="text-muted mb-1 ps-4">Mon - Fri: 9:00 AM - 6:00 PM</p>
                  <p className="text-muted ps-4 mb-2">Sat - Sun: Closed</p>
                </div>

                {/* Social Links */}
                <div className="d-flex justify-content-center mt-4 gap-4">
                  <Link to="#" className="text-primary"><FaFacebook size={30} /></Link>
                  <Link to="#" className="text-info"><FaTwitter size={30} /></Link>
                  <Link to="#" className="text-primary"><FaLinkedin size={30} /></Link>
                  <Link to="#" className="text-danger"><FaInstagram size={30} /></Link>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Google Map */}
      <div className="mt-5">
        <iframe
          title="Google Map"
          className="w-100"
          height="400"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345086194!2d144.95373531531768!3d-37.81720977975159!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d5df7f93b0f%3A0x2b1f533a1e4b9b0!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2s!4v1647878492336!5m2!1sen!2s"
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </>
  );
}
