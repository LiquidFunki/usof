import React, { useContext } from "react";
import Question from "./Question";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../index";
import { observer } from "mobx-react-lite";

const UserCard = ({user}) => {
  const { userStore } = useContext(Context);
  const loginButton = useNavigate();

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          minWidth: "20%",
          border: "none",
          backgroundColor: "rgb(255 198 90 / 24%)",
          margin: "20px"
        }}
      >
        <img
          alt=""
          src={`http://localhost:5000/avatars/${user.profile_pic}`}
          height="40"
          width="40"
          className="d-inline-block align-top"
          style={{ margin: "1em", cursor: "pointer" }}
          onClick={() => {
            loginButton(`/users/${user.id}`);
            // loginButton(0);
          }}
        />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{ cursor: "pointer", color: "orange" }}
            onClick={() => {
              loginButton(`/users/${user.id}`);
              // loginButton(0);
            }}
          >
            {user.full_name}
          </span>
          <span style={{ fontSize: "12px" }}>
            {user.rating} Social credits
          </span>
        </div>
      </div>
    </>
  );
};

export default observer(UserCard);
