import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { FaShoppingCart, FaUsers, FaStar ,FaShippingFast, FaTags, FaHeadset, FaShieldAlt  } from "react-icons/fa";
import { Link } from "react-router-dom";

import img1 from '../assets/1.jpg.png'
import img2 from '../assets/2.jpg.png'
import img3 from '../assets/3.jpg.png'
import about1 from '../assets/about-1.webp'
import about2 from '../assets/about-2.webp'
import about3 from '../assets/about-3.webp'
import '../styles/ContactUs.css'

export default function AboutUs() {
  return (
    <>
      {/* Hero Section */}
            <div className=" hero-section  text-white text-center d-flex flex-column justify-content-center align-items-center py-5">
              <Container>
              <h1 className=" display-3 fw-bold  text-danger">About Us</h1>
              <p className="lead mt-3 fs-4 text-danger ">Your Trusted Destination for Quality Products & Exceptional Service.</p>
              <Link className="btn btn-outline-danger btn-lg mt-3" to={'/'}>Back To Home</Link>
      
              </Container>
            </div>

          {/* Our Values */}
          <Container className="my-5">
        <Row className="g-4">
          <Col md={3}>
            <Card className="text-center shadow border-0 p-4">
              <FaStar size={50} className="text-danger mx-auto" />
              <h5 className="mt-3 fw-bold">Quality First</h5>
              <p className="text-muted">We ensure top-notch products.</p>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="text-center shadow border-0 p-4">
              <FaUsers size={50} className="text-danger mx-auto" />
              <h5 className="mt-3 fw-bold">Customer Focus</h5>
              <p className="text-muted">Your satisfaction is our priority.</p>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="text-center shadow border-0 p-4">
              <FaShoppingCart size={50} className="text-danger mx-auto" />
              <h5 className="mt-3 fw-bold">Wide Selection</h5>
              <p className="text-muted">A variety of products at great prices.</p>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="text-center shadow border-0 p-4">
              <FaShieldAlt size={50} className="text-danger mx-auto" />
              <h5 className="mt-3 fw-bold">Secure Shopping</h5>
              <p className="text-muted">100% safe & secure transactions.</p>
            </Card>
          </Col>
        </Row>
      </Container>

        {/* */}
      <Container className="my-5 bg-body-tertiary">
        <Row className="align-items-center">
          {/* Left Side - Single Image */}
          <Col md={6} className="text-center mb-4 mb-md-0">
            <img
              src={about1}
              alt="Online Shopping"
              style={{ height: "450px", width: "100%" }}
              className="img-fluid rounded"
            />
          </Col>

          {/* Right Side - Text & Features */}
          <Col md={6}>
            <h5 className="text-danger fw-bold fs-3 alert ">About Us</h5>
            <h2 className="fw-bold text-black-50">
              Your Trusted Online Shopping Destination
            </h2>
            <p className="text-muted">
              We offer a wide range of high-quality products at unbeatable prices.
              Enjoy a seamless shopping experience with fast delivery and
              excellent customer support.
            </p>

            {/* Features */}
            <Row>
              <Col xs={6} className="mb-3">
                <Card className="p-3 border-0 shadow-sm text-center">
                  <FaShippingFast size={30} className="text-success" />
                  <h6 className="mt-2 fw-bold">Fast & Free Delivery</h6>
                </Card>
              </Col>
              <Col xs={6} className="mb-3">
                <Card className="p-3 border-0 shadow-sm text-center">
                  <FaTags size={30} className="text-primary" />
                  <h6 className="mt-2 fw-bold">Best Deals & Prices</h6>
                </Card>
              </Col>
              <Col xs={6}>
                <Card className="p-3 border-0 shadow-sm text-center">
                  <FaHeadset size={30} className="text-danger" />
                  <h6 className="mt-2 fw-bold">24/7 Customer Support</h6>
                </Card>
              </Col>
              <Col xs={6}>
                <Card className="p-3 border-0 shadow-sm text-center">
                  <FaShieldAlt size={30} className="text-purple" />
                  <h6 className="mt-2 fw-bold">Secure Payment</h6>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
        {/* */}

      {/* Our Story */}
      {/* <Container className="my-5">
        <Row className="justify-content-center">
          <Col md={10} lg={8}>
            <h2 className="fw-bold text-center text-danger">Our Story</h2>
            <p className="text-muted text-center">
              We started with a mission to bring the best products at unbeatable
              prices. With passion for quality and customer satisfaction, we
              have grown into a trusted name in e-commerce.
            </p>
          </Col>
        </Row>
      </Container> */}


      {/* Meet the Team */}
      <Container className="my-5 text-center">
        <h2 className="fw-bold text-danger">Meet Our Team</h2>
        <p className="text-muted">Dedicated professionals making your shopping better.</p>
        <Row className="g-4">
          <Col md={4}>
            <Card className="shadow border-0 p-4">
              <Card.Img
                variant="top"
                src={img1}
                className="rounded-circle mx-auto"
                style={{ width: "100px" }}
              />
              <Card.Body>
                <h5 className="fw-bold">John Doe</h5>
                <p className="text-muted">Founder & CEO</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="shadow border-0 p-4">
              <Card.Img
                variant="top"
                src={img2}
                className="rounded-circle mx-auto"
                style={{ width: "100px" }}
              />
              <Card.Body>
                <h5 className="fw-bold">Jane Smith</h5>
                <p className="text-muted">Head of Marketing</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="shadow border-0 p-4">
              <Card.Img
                variant="top"
                src={img3}
                className="rounded-circle mx-auto"
                style={{ width: "100px" }}
              />
              <Card.Body>
                <h5 className="fw-bold">Mike Johnson</h5>
                <p className="text-muted">Customer Support Lead</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Why Choose Us */}
      {/* <Container className="my-5 text-center">
        <h2 className="fw-bold text-danger">Why Choose Us?</h2>
        <p className="text-muted">Here’s why we stand out.</p>
        <Row className="g-4">
          <Col md={4}>
            <Card className="shadow border-0 p-4">
              <h5 className="fw-bold">🚚 Fast Delivery</h5>
              <p className="text-muted">Get your orders delivered on time.</p>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="shadow border-0 p-4">
              <h5 className="fw-bold">💰 Best Prices</h5>
              <p className="text-muted">Competitive pricing for all products.</p>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="shadow border-0 p-4">
              <h5 className="fw-bold">⭐ Trusted by Thousands</h5>
              <p className="text-muted">A loyal customer base worldwide.</p>
            </Card>
          </Col>
        </Row>
      </Container> */}

      {/* Call to Action */}
      <Container className="text-center my-5">
        <h3 className="fw-bold">Ready to Shop?</h3>
        <p className="text-muted">Discover the best deals today.</p>
        <Link to="/" className="btn btn-danger btn-lg">
          Start Shopping
        </Link>
      </Container>
    </>
  );
}
