import React, { useContext, useEffect, useState } from "react";
import UserService from "../services/UserService";
import CategoryService from "../services/CategoryService";
import { Context } from "../index";
import { Link, useNavigate } from "react-router-dom";
import Moment from "react-moment";
import moment from "moment";
import { observer } from "mobx-react-lite";
import Card from "react-bootstrap/Card";
import * as Icon from "react-bootstrap-icons";
import CommentService from "../services/CommentService";

const Question = ({ question }) => {
  const { userStore, categoryStore } = useContext(Context);
  const [user, setUser] = useState({});
  const [categories, setCategories] = useState([]);
  const [comments, setComments] = useState([]);
  const loginButton = useNavigate();
  const date = new Date(parseInt(question.publish_date)).toUTCString();

  async function FetchUserCategories() {
    const response1 = await UserService.fetchUser(question.author_id);
    setUser(response1.data);
    // console.log(user);
    const response2 = await CategoryService.fetchCategoriesByPost(question.id);
    // console.log(response2);
    setCategories(response2.data);

    const response3 = await CommentService.fetchComments(question.id);
    setComments(response3.data);
  }
  useEffect(() => {
    async function FetchData() {
      // const response1 = await UserService.fetchUser(question.author_id);
      //   console.log(response1);
      //   setUser(response1.data);
      //   console.log(userStore.user);
      await FetchUserCategories();
      //     const response2 = await CategoryService.fetchCategoriesByPost(question.id);
      // console.log(response2);
      // setCategories(response2.data);
    }
    FetchData();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        padding: "16px",
        borderTop: "2px solid rgb(0,0,0,0.2)",
      }}
    >
      <div
        style={{
          marginTop: "auto",
          marginBottom: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          width: "110px",
          marginRight: "20px",
        }}
      >
        <div>{question.likeCount} votes</div>
        <div>{comments.length} answers</div>
        {/* TODO: ADD COUNT OF COMMENTS FOR POST */}
        {/* <div>
            0 views
        </div> */}
      </div>
      <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <div style={{ alignSelf: "start" }}>
          <span
            style={{ cursor: "pointer", color: "orange" }}
            onClick={() => {
              loginButton(`/questions/${question.id}`);
            }}
          >
            {question.title}
          </span>
        </div>
        <div>
          {question.content.length > 65
            ? `${question.content.slice(0, 63)}...`
            : `${question.content}`}
        </div>
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          {/* <div style={{alignSelf: "start"}}> */}
          {/* TODO: SID WITH CATEGORIES */}
          <div style={{ display: "flex", alignItems: "center" }}>
            {categories.length > 4
              ? categories.slice(0, 4).map((category) => (
                  <span
                    style={{
                      marginLeft: "5px",
                      backgroundColor: "#00dcff36",
                      color: "#009eff",
                      padding: "3px",
                    }}
                    key={category.id}
                  >
                    {category.title}
                  </span>
                ))
              : categories.map((category) => (
                  <span
                    style={{
                      marginLeft: "5px",
                      backgroundColor: "#00dcff36",
                      color: "#009eff",
                      padding: "3px",
                    }}
                    key={category.id}
                  >
                    {category.title}
                  </span>
                ))}
            {categories.length > 3 ? (
              <span style={{ marginLeft: "10px" }}>...</span>
            ) : (
              <span></span>
            )}
          </div>
          <div
            // style={{ alignSelf: "end", display: "flex", alignItems: "center" }}
            style={{ display: "flex", alignItems: "center" }}
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
  // window.location.reload();

                // loginButton(0);
              }}
            />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span
                style={{ cursor: "pointer", color: "orange" }}
                onClick={() => {
                  loginButton(`/users/${user.id}`);
  // window.location.reload();

                  // loginButton(0);
                }}
              >
                {user.full_name}
              </span>
              <span style={{ fontSize: "12px" }}>
                asked  <Moment fromNow>{date}</Moment> <Icon.Clock />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(Question);

// author_id
// category_id
// category_title
// content
// description
// id
// likeCount
// publish_date
// status
// title
