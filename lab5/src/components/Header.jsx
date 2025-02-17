import React from 'react'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { Link, NavLink } from 'react-router-dom'
import logoImg from '../assets/logo.png'

export function Header() {
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary p-3" >
        <Container>
          <Navbar.Brand ><Link to="/"><img className='w-25' src= {logoImg} /></Link></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav ">
            <Nav className="me-auto " id='navbar'>
              <NavLink className={({ isActive })=> isActive? "text-danger nav-link fw-bold":"nav-link"} to="/">Home</NavLink>
              <NavLink className={({ isActive })=> isActive? "text-danger nav-link fw-bold":"nav-link"}  to="/products" >Products Dashboard</NavLink>
              <NavDropdown title="Pages" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Blog</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Contact Us</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">About</NavDropdown.Item>
              </NavDropdown>
              <NavLink className={({ isActive })=> isActive? "text-danger nav-link fw-bold":"nav-link"} to="/login">Login</NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar> 
    </>
  )
}
