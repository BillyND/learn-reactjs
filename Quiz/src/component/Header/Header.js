import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink, Link, useNavigate } from "react-router-dom";
import "./Header.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { doLogout } from "../../redux/action/userAction";
import { postLogOut } from "../services/apiService";
import { toast } from "react-toastify";
import Languages from "./Languages";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Offcanvas from "react-bootstrap/Offcanvas";
import ProfileUser from "./ProfileUser";
import { useState } from "react";

const Header = () => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const user = useSelector((state) => state.user.account);
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/login");
  };
  const handleSignup = () => {
    navigate("/signup");
  };

  const handleLogout = async () => {
    const resLogout = await postLogOut(user.email, user.refresh_token);
    if (resLogout && resLogout.EC === 0) {
      dispatch(doLogout());
      navigate("/login");
    } else {
      toast.error(resLogout.EM);
    }
  };

  const handleShowProfile = () => {
    setShow(true);
  };

  return (
    <>
      <Navbar key="idNew" bg="light" expand="lg" className="mb-3">
        <Container fluid>
          <NavLink to="/" className="navbar-brand">
            Quiz Test
          </NavLink>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-$"idNew"`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-$"idNew"`}
            aria-labelledby={`offcanvasNavbarLabel-expand-$"idNew"`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-$"idNew"`}>
                Menu
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav className="justify-content-start flex-grow-1 pe-3">
                  <NavLink to="/" className="nav-link">
                    Home
                  </NavLink>
                  <NavLink to="/admin" className="nav-link">
                    Admin
                  </NavLink>
                  <NavLink to="/user" className="nav-link">
                    User
                  </NavLink>
                </Nav>
                <Nav className="dropDown-btn">
                  <div>
                    {isAuthenticated == false ? (
                      <div className="btn-login-signup">
                        <button
                          className="btn-login"
                          onClick={() => handleLogin()}
                        >
                          Log In
                        </button>
                        <button
                          className="btn-signup"
                          onClick={() => handleSignup()}
                        >
                          Sign Up
                        </button>
                      </div>
                    ) : (
                      <NavDropdown
                        title="Settings"
                        className="basic-nav-dropdown"
                      >
                        <NavDropdown.Item
                          className="item-dropdown"
                          onClick={() => handleShowProfile()}
                        >
                          Profile
                        </NavDropdown.Item>
                        <NavDropdown.Item
                          className="item-dropdown"
                          onClick={() => handleLogout()}
                        >
                          Log Out
                        </NavDropdown.Item>
                      </NavDropdown>
                    )}
                  </div>
                  <div>
                    <Languages />
                  </div>
                </Nav>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
      <ProfileUser user={user} show={show} setClose={() => setShow(false)} />
    </>
  );
};

export default Header;
