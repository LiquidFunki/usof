import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { Context } from "../index";
import { observer } from "mobx-react-lite";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import "../styles/ForgetPasswordForm.css";

const LoginForm = () => {
  //REMAKE FOR REGISTRATION ANOTHER COMPONENT(REGISTRATION FORM)
  const loginButton = useNavigate();
  const [password, setPassword] = useState("");
  const [password_confirmation, setPassword_confirmation] = useState("");
  const params = useParams();
  useEffect(() => {
    console.log(params);
  }, [])

  const { authStore } = useContext(Context);
  return (
    <div className="bebraDivPass">
      <Form>
      <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="text" //password
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Enter new password"
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
            
            onClick={(e) =>{
                e.preventDefault();
                authStore.resetPassword(password, password_confirmation, params.token)//КАК ПЕРЕДЕАТЬ ЕБУЧИЙ ТОКЕН ТУДА
                loginButton('/questions');}
            } 
          >
            Submit
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default observer(LoginForm);
