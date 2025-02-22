import React from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, Navigate, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaCartShopping } from "react-icons/fa6";
import { logoutUserAction } from "../store/userSlice";
import logoImg from "../assets/logo.png";

export function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((store) => store.userSlice);

  const handleLogout = () => {
    dispatch(logoutUserAction());
    Navigate("/login");
  };

  const isAdmin = currentUser?.role === "admin";

  return (
    <Navbar expand="lg" className="bg-body-tertiary p-4">
      <Container>
        <Navbar.Brand>
          <Link to="/">
            <img 
              className="w-100" 
              src={logoImg} 
              alt="Logo" 
              style={{ maxWidth: "170px" }} 
            />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto fs-5 d-flex align-items-center gap-3">
            <NavLink 
              className={({ isActive }) => 
                isActive ? "text-danger nav-link fw-bold" : "nav-link"
              } 
              to="/"
            >
              Home
            </NavLink>

            {isAdmin && (
              <NavLink 
                className={({ isActive }) => 
                  isActive ? "text-danger nav-link fw-bold" : "nav-link"
                } 
                to="/products"
              >
                Products Dashboard
              </NavLink>
            )}

            <NavDropdown title="Pages" id="basic-nav-dropdown">
              <Link className="dropdown-item" to={`/myprofile`}>My Profile</Link>
              <NavDropdown.Item href="#action/3.2">Contact Us</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">About</NavDropdown.Item>
            </NavDropdown>

            {currentUser ? (
              <>
                <span className="nav-link text-danger">
                  Welcome, {currentUser.fullName.split(" ")[0] + " !"}
                </span>
                {!isAdmin && (
                  <NavLink 
                    className={({ isActive }) => 
                      isActive ? "text-danger nav-link fw-bold" : "nav-link"
                    } 
                    to="/cart"
                  >
                    <span className="d-flex align-items-center gap-1">
                      <FaCartShopping /> (0)
                    </span>
                  </NavLink>
                )}
                <NavLink 
                  className="nav-link text-danger"
                  onClick={handleLogout}
                  to="/"
                  style={{ cursor: 'pointer' }}
                >
                  Logout
                </NavLink>
              </>
            ) : (
              <>
                <NavLink 
                  className={({ isActive }) => 
                    isActive ? "text-danger nav-link fw-bold" : "nav-link"
                  } 
                  to="/login"
                >
                  Login
                </NavLink>
                <NavLink 
                  className={({ isActive }) => 
                    isActive ? "text-danger nav-link fw-bold" : "nav-link"
                  } 
                  to="/register"
                >
                  Register
                </NavLink>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}