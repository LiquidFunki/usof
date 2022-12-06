import { useParams } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import UserService from "../services/UserService";
import CommentService from "../services/CommentService";
import CategoryService from "../services/CategoryService";
import { Context } from "../index";
import { Link, useNavigate } from "react-router-dom";
import Moment from "react-moment";
import moment from "moment";
import Button from "react-bootstrap/Button";
import { observer } from "mobx-react-lite";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import * as Icon from "react-bootstrap-icons";

const Comment = ({ comment }) => {
  const params = useParams();
  const { userStore, categoryStore, commentStore, authStore } =
    useContext(Context);
  const [commentVoteLike, setCommentVoteLike] = useState(0);
  const [CommentVoteDislike, setCommentVoteDislike] = useState(0);
  const [commentUserLike, setCommentUserLike] = useState("");
  const [editCommentFlag, setEditCommentFlag] = useState(false);
  const [likes, setLikes] = useState([]);
  const [user, setUser] = useState({});
  const [content, setContent] = useState(comment.content);
  const loginButton = useNavigate();
  const date = new Date(parseInt(comment.publish_date)).toUTCString();
  //   const [categories, setCategories] = useState([]);

  async function FetchUserCategories() {
    const response1 = await UserService.fetchUser(comment.author_id);
    setUser(response1.data);
    // console.log(user);
    // const response2 = await CategoryService.fetchCategoriesByPost(question.id);
    // console.log(response2);
    // setCategories(response2.data);
    const response2 = await CommentService.fetchCommentLikes(comment.id);
    // console.log(response1.data.likes);
    // console.log(response2.data);
    setLikes(response2.data);

    if (response2.data.length) {
      let likes = 0;
      let dislikes = 0;
      for (let i = 0; i < response2.data.length; i++) {
        if (response2.data[i].author_id === authStore.user.id) {
          setCommentUserLike(response2.data[i].type);
          //   console.log("here");
        }
        if (response2.data[i].type === "like") {
          likes += 1;
        }
        if (response2.data[i].type === "dislike") {
          dislikes += 1;
        }
      }
      // console.log("likes", likes);
      // console.log("dislikes", dislikes);
      setCommentVoteLike(likes);
      setCommentVoteDislike(dislikes);
    }
  }
  useEffect(() => {
    async function FetchData() {
      await FetchUserCategories();
    }
    FetchData();
  }, []);
  // console.log(comment.content);
  return (
    <div
      style={{
        display: "flex",
        padding: "16px",
        borderBottom: "1px solid rgb(0,0,0,0.2)",
      }}
    >
      <div style={{ width: "100%" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{ alignSelf: "end", fontWeight: "bold", fontSize: "14px" }}
          >
            {" "}
            Comment status: {comment.status}
          </span>
          {editCommentFlag ? (
            <div>
              <Form>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>Edit your comment</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </Form.Group>
              </Form>
              <Button
                variant="warning"
                style={{ marginRight: "1em" }}
                disabled={
                  !(
                    comment.author_id == authStore.user.id ||
                    authStore.user.role == "admin"
                  )
                }
                onClick={() => {
                  commentStore.updateComment(comment.id, content);
                  window.location.reload();
                }}
              >
                Update
              </Button>
              <Button
                variant="outline-warning"
                style={{ marginRight: "1em" }}
                disabled={
                  !(
                    comment.author_id == authStore.user.id ||
                    authStore.user.role == "admin"
                  )
                }
                onClick={() => setEditCommentFlag(!editCommentFlag)}
              >
                Cancel
              </Button>
            </div>
          ) : (
            <span>{comment.content}</span>
          )}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ marginTop: "1em" }}>
            {editCommentFlag ? (
              <span></span>
            ) : (
              <div>
                {commentUserLike === "like" ? (
                  <Icon.HandThumbsUpFill
                    style={{
                      cursor: "pointer",
                      width: "30px",
                      height: "30px",
                      color: "green",
                    }}
                    onClick={async () => {
                      // await CommentService.postCommentLikes(comment.id, "like");
                      await CommentService.deleteLike(comment.id);
                      window.location.reload();
                    }}
                  ></Icon.HandThumbsUpFill>
                ) : (
                  <Icon.HandThumbsUp
                    style={{ cursor: "pointer", width: "30px", height: "30px" }}
                    onClick={async () => {
                      await CommentService.postCommentLikes(comment.id, "like");
                      window.location.reload();
                    }}
                  ></Icon.HandThumbsUp>
                )}
                <span style={{ marginRight: "15px", fontSize: "20px" }}>
                  {commentVoteLike}
                </span>
                {commentUserLike === "dislike" ? (
                  <Icon.HandThumbsDownFill
                    style={{
                      cursor: "pointer",
                      width: "30px",
                      height: "30px",
                      color: "red",
                    }}
                    onClick={async () => {
                      // await CommentService.postCommentLikes(
                      //   comment.id,
                      //   "dislike"
                      // );
                      await CommentService.deleteLike(comment.id);
                      window.location.reload();
                    }}
                  ></Icon.HandThumbsDownFill>
                ) : (
                  <Icon.HandThumbsDown
                    style={{ cursor: "pointer", width: "30px", height: "30px" }}
                    onClick={async () => {
                      await CommentService.postCommentLikes(
                        comment.id,
                        "dislike"
                      );
                      window.location.reload();
                    }}
                  ></Icon.HandThumbsDown>
                )}
                <span style={{ marginRight: "15px", fontSize: "20px" }}>
                  {CommentVoteDislike}
                </span>
                <Button
                  variant="warning"
                  style={{ marginRight: "1em" }}
                  disabled={
                    !(
                      (comment.author_id == authStore.user.id)
                      //   || authStore.user.role == "admin" //TODO: check
                    )
                  }
                  onClick={() => setEditCommentFlag(!editCommentFlag)}
                >
                  Edit <Icon.PencilSquare />
                </Button>
                <Button
                  variant="warning"
                  style={{ marginRight: "1em" }}
                  disabled={
                    !(
                      // comment.author_id == authStore.user.id ||
                      authStore.user.role == "admin"
                    )
                  }
                  onClick={() => loginButton(`/editQuestion/${comment.id}`)}
                >
                  Change status <Icon.EyeSlashFill />
                </Button>
                <Button
                  variant="warning"
                  style={{ marginRight: "1em" }}
                  disabled={
                    !(
                      comment.author_id == authStore.user.id ||
                      authStore.user.role == "admin"
                    )
                  }
                  onClick={() => {
                    commentStore.deleteComment(comment.id);
                    window.location.reload();
                  }}
                >
                  Delete <Icon.Trash3Fill />
                </Button>
              </div>
            )}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              minWidth: "20%",
              border: "none",
              backgroundColor: "rgb(255 198 90 / 24%)",
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
                asked <Moment fromNow>{date}</Moment> <Icon.Clock />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(Comment);
