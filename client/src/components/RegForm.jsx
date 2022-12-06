import React, { useState, useContext } from "react";
import { Context } from "../index";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom"
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { NavLink } from "react-router-dom";
import "../styles/RegForm.css";

const RegForm = () => {
  //REMAKE FOR REGISTRATION ANOTHER COMPONENT(REGISTRATION FORM)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState("");
  const [password_confirmation, setPassword_confirmation] = useState("");
  const [full_name, setFull_name] = useState("");
  const loginButton = useNavigate();
  const { authStore } = useContext(Context);
  return (
    <div className="bebraDivReg">
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
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
          <Form.Label>Displayed name</Form.Label>
          <Form.Control
            type="text" //password
            onChange={(e) => setFull_name(e.target.value)}
            value={full_name}
            placeholder="Displayed name"
          />
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

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="text" //password
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Password"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPasswordConfirmation">
          <Form.Label>Password confirmation</Form.Label>
          <Form.Control
            type="text" //password
            onChange={(e) => setPassword_confirmation(e.target.value)}
            value={password_confirmation}
            placeholder="Password confirmation"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Button
            className="bebraButton"
            variant="primary"
            type="submit"
            onClick={() => authStore.registation(email, password, login, password_confirmation, full_name)}
          >
            Sign up
          </Button>
        </Form.Group>

        <Form.Label>
          Already have an account?
          <span
            className="bebra"
            style={{
              textDecoration: "none",
              fontSize: "15px",
              color: "blue !important",
              cursor: "pointer"
            }}
            onClick={() => loginButton('/login')}
          >
            {" "}
            Log in
          </span>
        </Form.Label>
      </Form>
    </div>
  );
};

export default observer(RegForm);

{
  /* <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="text"
        placeholder="Email"
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="text"
        placeholder="Password"
      />
      <input
        onChange={(e) => setLogin(e.target.value)}
        value={login}
        type="text"
        placeholder="Login"
      />
      <button onClick={() => authStore.login(email, password, login)}>Login</button>
      <button>Registration</button> */
}
