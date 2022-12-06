import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../index";
import { observer } from "mobx-react-lite";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import "../styles/ForgetPasswordForm.css";

const LoginForm = () => {
  //REMAKE FOR REGISTRATION ANOTHER COMPONENT(REGISTRATION FORM)
  const [email, setEmail] = useState("");
  const { authStore } = useContext(Context);
  return (
    <div className="bebraDivPass">
      <Form>
        <Form.Group className="mb-2" controlId="formBasicEmail">
          <p>
            Forgot your account’s password or having trouble logging into your
            Team? Enter your email address and we’ll send you a recovery link.
          </p>
          <Form.Label style={{fontWeight: "bold", fontSize:"18px"}}>Email</Form.Label>
          <Form.Control
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter email"
            value={email}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Button
            className="bebraButton"
            variant="primary"
            type="submit"
            onClick={() => authStore.forgetPassword(email)}
          >
            Send recovery email
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default observer(LoginForm);
