import React from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import logoImg from "../assets/logo.png";
import { FaCartShopping } from "react-icons/fa6";

export function Header() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary p-4">
      <Container>
        <Navbar.Brand>
          <Link to="/">
            <img className="w-100" src={logoImg} alt="Logo" style={{ maxWidth: "170px" }} />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto fs-5 d-flex align-items-center gap-3">
            <NavLink className={({ isActive }) => (isActive ? "text-danger nav-link fw-bold" : "nav-link")} to="/">
              Home
            </NavLink>
            <NavLink className={({ isActive }) => (isActive ? "text-danger nav-link fw-bold" : "nav-link")} to="/products">
              Products Dashboard
            </NavLink>
            <NavDropdown title="Pages" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Blog</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Contact Us</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">About</NavDropdown.Item>
            </NavDropdown>
            <NavLink className={({ isActive }) => (isActive ? "text-danger nav-link fw-bold" : "nav-link")} to="/login">
              Login
            </NavLink>
            <NavLink className={({ isActive }) => (isActive ? "text-danger nav-link fw-bold" : "nav-link")} to="/cart">
              <span className="d-flex align-items-center gap-1">
                <FaCartShopping /> (0)
              </span>
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
