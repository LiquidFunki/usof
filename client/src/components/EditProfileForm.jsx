import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom"
import { Context } from "../index";
import { observer } from "mobx-react-lite";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import "../styles/LoginForm.css";
import icon from "../assets/icon.png";

const LoginForm = () => {
  //REMAKE FOR REGISTRATION ANOTHER COMPONENT(REGISTRATION FORM)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState("");
  const loginButton = useNavigate();
  const { authStore } = useContext(Context);
  return (
    <div className="bebraDiv">
      <img
        alt=""
        src={icon}
        style={{ display: "block", marginLeft: "auto", marginRight: "auto" }}
        width="40"
        height="40"
      />{" "}
      <Form>
        <Form.Group className="mb-2" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter email"
            value={email}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicLogin">
          <Form.Label>Login</Form.Label>
          <Form.Control
            type="text" //password
            onChange={(e) => setLogin(e.target.value)}
            value={login}
            placeholder="Login"
          />
        </Form.Group>

        <Form.Group className="mb-1" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="text" //password
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Password"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <span
            className="bebra"
            style={{
              textDecoration: "none",
              fontSize: "15px",
              color: "blue !important",
              cursor: "pointer"
            }}
            onClick={() => loginButton('/forgetPassword')}
          >
            {" "}
            Forgot password?{" "}
          </span>
        </Form.Group>


        <Form.Group className="mb-3">
          <Button
            className="bebraButton"
            variant="primary"
            type="submit"
            onClick={() => authStore.login(email, password, login)}
          >
            Log in
          </Button>
        </Form.Group>

        <Form.Group className="mb-1" style={{ textAlign: "center" }}>
          <Form.Label>
            Don't have an account?
            <span
              className="bebra"
              style={{
                textDecoration: "none",
                fontSize: "15px",
                color: "blue !important",
                cursor: "pointer"
              }}
              onClick={() => loginButton('/reg')}
            >
              {" "}
              Sign up
            </span>
          </Form.Label>
        </Form.Group>
      </Form>
    </div>
  );
};

export default observer(LoginForm);

