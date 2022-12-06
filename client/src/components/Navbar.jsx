import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../index";
import { observer } from "mobx-react-lite";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Dropdown from "react-bootstrap/Dropdown";
import logo from "../assets/logo.png";
import { Switch, useDarkreader } from "react-darkreader";
import defaultAva from "../assets/default.png";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import * as Icon from "react-bootstrap-icons";
import "../styles/Navbar.css";

const NavbarComponent = () => {
  const { authStore } = useContext(Context);
  const loginButton = useNavigate();
  const theme = localStorage.getItem("theme") === "true";
  const [isDark, { toggle }] = useDarkreader(theme);

  useEffect(() => {
    localStorage.setItem("theme", isDark);
  }, [isDark]);
  return (
    <>
      <Navbar
        bg="light"
        variant="light"
        className="mainNavHereForBorderTop"
        sticky="top"
      >
        <Container>
          <Navbar.Brand href="/questions">
            <img alt="" src={logo} className="d-inline-block align-top" />{" "}
          </Navbar.Brand>
          <Navbar.Text className="me-auto" style={{ fontSize: "16px" }}>
            | made with <Icon.HeartFill color="red" /> by{" "}
            <a
              href="https://lms.khpi.ucode-connect.study/users/yklymenko"
              className="kuzya"
            >
              yklymenko
            </a>
          </Navbar.Text>
          {!authStore.isAuth && !authStore.user.isActivated ? (
            <Nav>
              <Button
                variant="light"
                style={{ color: "orange", borderColor: "orange" }}
                onClick={() => loginButton("/login")}
              >
                Log in
              </Button>
              <Button variant="warning" onClick={() => loginButton("/reg")}>
                Sign up
              </Button>
            </Nav>
          ) : (
            <Nav>
              <Nav.Item className="d-flex align-items-center">
                {authStore.user.role}
              </Nav.Item>
              {/* <NavDropdown title={"profile"} id="navbarScrollingDown">
                <img alt="" src={defaultAva} height="50" width="50" className="d-inline-block align-top" />
                <NavDropdown.Item href="#action3">Profile</NavDropdown.Item>
                <NavDropdown.Item href="#action4">Logout</NavDropdown.Item>
                {/* try to add fontsize, perfect when use navbar.brand but elemnts in cloumn then */}
              {/* </NavDropdown> */}
              <Dropdown>
                <Dropdown.Toggle
                  style={{ height: "40px", border: "none" }}
                  variant="light"
                  id="dropdown-basic"
                  className="d-flex align-items-center"
                >
                  {/* <img alt="" src={defaultAva} height="40" width="40" className="d-inline-block align-top" /> */}
                  <img
                    alt=""
                    src={`http://localhost:5000/avatars/${authStore.user.profile_pic}`}
                    height="40"
                    width="40"
                    className="d-inline-block align-top"
                    style={{ marginRight: "1em", borderRadius: "50px" }}
                  />

                  <span style={{ fontSize: "15px" }}>
                    {authStore.user.full_name}
                  </span>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item
                    href=""
                    onClick={() => {
                      loginButton(`/users/${authStore.user.id}`);
                      window.location.reload();
                    }}
                  >
                    Profile
                  </Dropdown.Item>
                  <Dropdown.Item
                    href=""
                    onClick={() => {
                      authStore.logout();
                      loginButton("/");
                    }}
                  >
                    Log out
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          )}
          <Switch checked={isDark} onChange={toggle} styling="docusaurus" />
        </Container>
      </Navbar>
    </>
  );
};

export default observer(NavbarComponent);
