import React from 'react'
import { FiSend } from "react-icons/fi";
import logoImg from "../assets/logo.png";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <>
        <footer className="bg-light py-4 mt-5">
      <Container>
        <Row>
          <Col md={4}>
            <div className="mb-3">
              <Link to="/">
                <img width="210" src={logoImg} alt="Logo" />
              </Link>
            </div>
            <div>
              <p><strong>ADDRESS:</strong> Cairo tower, Aljazeera, Cairo City, EGYPT</p>
              <p><strong>TELEPHONE:</strong> +20 11 590 90 880</p>
              <p><strong>EMAIL:</strong> FAMMS@gmail.com</p>
            </div>
          </Col>
          
          <Col md={8}>
            <Row>
              <Col md={7}>
                <Row>
                  <Col md={6}>
                    <div>
                      <h5>Menu</h5>
                      <ul className="list-unstyled ">
                        <li><Link to={"/"} className='text-dark text-decoration-none' href="#">Home</Link></li>
                        <li><a className='text-dark text-decoration-none' href="#">About</a></li>
                        <li><a className='text-dark text-decoration-none' href="#">Services</a></li>
                        <li><a className='text-dark text-decoration-none' href="#">Testimonial</a></li>
                        <li><a className='text-dark text-decoration-none' href="#">Blog</a></li>
                        <li><a className='text-dark text-decoration-none' href="#">Contact</a></li>
                      </ul>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div>
                      <h5>Account</h5>
                      <ul className="list-unstyled">
                        <li><a className='text-dark text-decoration-none' href="#">Account</a></li>
                        <li><a className='text-dark text-decoration-none' href="#">Checkout</a></li>
                        <li><a className='text-dark text-decoration-none' href="#">Login</a></li>
                        <li><a className='text-dark text-decoration-none' href="#">Register</a></li>
                        <li><a className='text-dark text-decoration-none' href="#">Shopping</a></li>
                        <li><a className='text-dark text-decoration-none' href="#">Widget</a></li>
                      </ul>
                    </div>
                  </Col>
                </Row>
              </Col>
              
              <Col md={5}>
                <div>
                  <h5>Newsletter</h5>
                  <p>Subscribe to our newsletter and get updates regularly.</p>
                  <Form>
                    <Form.Group className='d-flex '>
                      <Form.Control type="email" placeholder="Enter Your Email" />
                        <Button variant="dark" type="submit" className=" ms-1"><FiSend className='text-white fs-5 '/></Button>
                    </Form.Group>
                  </Form>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
        <div className="text-center py-3 bg-dark text-white">
          <p className="m-0 p-3">
            © 2021 All Rights Reserved By Famms Theme
          </p>
        </div>
      </Container>
    </footer>
    </>
)
}
