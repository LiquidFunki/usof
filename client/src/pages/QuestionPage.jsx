import React, { useState, useContext } from "react";
import PostService from "../services/PostService";
import UserService from "../services/UserService";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import { Context } from "../index";
import LeftSideBar from "../components/LeftSideBar";
import Form from "react-bootstrap/Form";
import CategoryService from "../services/CategoryService";
import RightSideBar from "../components/RightSideBar";
import HomeMainBar from "../components/HomeMainBar";
import QuestionList from "../components/QuestionList";
import Moment from "react-moment";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import * as Icon from "react-bootstrap-icons";
import CommentStore from "../store/commentStore";
import CommentList from "../components/CommentList";

const QuestionPage = () => {
  const params = useParams();
  const [addCommFlag, setAddCommFlag] = useState(true);
  const [categories, setCategories] = useState([]);
  const [voteLike, setVoteLike] = useState(0);
  const [voteDislike, setVoteDislike] = useState(0);
  const [likes, setLikes] = useState([]);
  const [userLike, setUserLike] = useState("");
  const [categoriesForm, setCategoriesForm] = useState([]);
  const [user, setUser] = useState({});
  const [post, setPost] = useState({});
  const [commentContent, setCommentContent] = useState("");
  const loginButton = useNavigate();
  const { postStore, categoryStore, authStore, commentStore } =
    useContext(Context);
  const filters = postStore.filters;
  const date = new Date(parseInt(post.publish_date)).toUTCString();

  async function getPost() {
    try {
      await postStore.fetchPost(params.id);
    } catch (e) {
      console.log(e);
    }
  }
  async function FetchPostsCategories() {
    const response1 = await PostService.fetchLikesPost(params.id);
    setLikes(response1.data.likes);

    if (response1.data.likes.length) {
      let likes = 0;
      let dislikes = 0;
      for (let i = 0; i < response1.data.likes.length; i++) {
        if (response1.data.likes[i].author_id === authStore.user.id) {
          setUserLike(response1.data.likes[i].type);
        }
        if (response1.data.likes[i].type === "like") {
          likes += 1;
        }
        if (response1.data.likes[i].type === "dislike") {
          dislikes += 1;
        }
      }
      setVoteLike(likes);
      setVoteDislike(dislikes);
    }

    await postStore.fetchPost(params.id);
    setPost(postStore.post);

    const response2 = await CategoryService.fetchCategoriesByPost(params.id);
    setCategories(response2.data);
    setCategoriesForm(response2.data.map((category) => (category.title)));
    const response3 = await UserService.fetchUser(postStore.post.author_id);
    setUser(response3.data);

    await commentStore.fetchComments(params.id);
  }
  useEffect(() => {
    async function FetchData() {
      await FetchPostsCategories();
    }
    FetchData();
  }, []);
  console.log("post", post);
  return (
    <div style={{ display: "flex", height: "100%" }}>
      <Container>
        <Row style={{ height: "100%" }}>
          <Col md={2} style={{ padding: "0" }}>
            <LeftSideBar />
          </Col>
          <Col style={{ padding: "1em" }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h2>{post.title}</h2>
                {authStore.isAuth ? (
                  <Button
                    style={{ marginRight: "1em" }}
                    onClick={() => loginButton("/askQuestion")}
                  >
                    Ask question
                  </Button>
                ) : (
                  <span></span>
                )}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>
                  Asked{" "}
                  <span style={{ fontWeight: "bold" }}>
                    <Moment fromNow>{date}</Moment> <Icon.Clock />
                  </span>
                </span>
                <span
                  style={{
                    fontWeight: "bold",
                    fontSize: "18px",
                    marginRight: "20px",
                  }}
                >
                  Post status: {postStore.post.status}
                </span>
              </div>
              <hr
                style={{
                  border: "none",
                  height: "1px",
                  margin: "0",
                  flexShrink: "0",
                  marginTop: "0.5em",
                  marginBottom: "1em",
                  backgroundColor: "black",
                }}
              ></hr>
            </div>
            <div>
              <span style={{ fontSize: "20px" }}>{post.content}</span>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  {categories.map((category) => (
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
                    }}
                  />
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <span
                      style={{ cursor: "pointer", color: "orange" }}
                      onClick={() => {
                        loginButton(`/users/${user.id}`);
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
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div style={{ marginTop: "1em" }}>
                {userLike === "like" ? (
                  <Icon.HandThumbsUpFill
                    style={{
                      cursor: "pointer",
                      width: "30px",
                      height: "30px",
                      color: "green",
                    }}
                    onClick={async () => {
                      await PostService.deleteLike(params.id);
                      window.location.reload();
                    }}
                  ></Icon.HandThumbsUpFill>
                ) : (
                  <Icon.HandThumbsUp
                    style={{ cursor: "pointer", width: "30px", height: "30px" }}
                    onClick={async () => {
                      await PostService.postLikes(params.id, "like");
                      window.location.reload();
                    }}
                  ></Icon.HandThumbsUp>
                )}
                <span style={{ marginRight: "15px", fontSize: "20px" }}>
                  {voteLike}
                </span>
                {userLike === "dislike" ? (
                  <Icon.HandThumbsDownFill
                    style={{
                      cursor: "pointer",
                      width: "30px",
                      height: "30px",
                      color: "red",
                    }}
                    onClick={async () => {
                      await PostService.deleteLike(params.id);
                      window.location.reload();
                    }}
                  ></Icon.HandThumbsDownFill>
                ) : (
                  <Icon.HandThumbsDown
                    style={{ cursor: "pointer", width: "30px", height: "30px" }}
                    onClick={async () => {
                      await PostService.postLikes(params.id, "dislike");
                      window.location.reload();
                    }}
                  ></Icon.HandThumbsDown>
                )}
                <span style={{ marginRight: "15px", fontSize: "20px" }}>
                  {voteDislike}
                </span>
              </div>
              <div>
                <Button
                  variant="warning"
                  style={{ marginRight: "1em" }}
                  disabled={!(post.author_id == authStore.user.id)}
                  onClick={() => loginButton(`/editQuestion/${post.id}`)}
                >
                  Edit <Icon.PencilSquare />
                </Button>
                <Button
                  variant="warning"
                  style={{ marginRight: "1em" }}
                  disabled={
                    !(
                      authStore.user.role == "admin"
                    )
                  }
                  onClick={() => {
                    if(post.status === "active"){
                      postStore.updatePost(params.id, post.title, categoriesForm, post.content, "inactive" );
                      window.location.reload();
                    } else {
                      postStore.updatePost(params.id, post.title, categoriesForm, post.content, "active" );
                      window.location.reload();
                    }
                  }}
                >
                  Change status <Icon.EyeSlashFill />
                </Button>
                <Button
                  variant="warning"
                  style={{ marginRight: "1em" }}
                  disabled={
                    !(
                      post.author_id == authStore.user.id ||
                      authStore.user.role == "admin"
                    )
                  }
                  onClick={() => {
                    postStore.deletePost(post.id);
                    loginButton("/questions");
                  }}
                >
                  Delete <Icon.Trash3Fill />
                </Button>
              </div>
            </div>
            <hr
              style={{
                border: "none",
                height: "1px",
                margin: "0",
                flexShrink: "0",
                marginTop: "0.5em",
                marginBottom: "1em",
                backgroundColor: "black",
              }}
            ></hr>
            <div>
              {addCommFlag ? (
                <Button
                  style={{ marginRight: "1em" }}
                  variant="warning"
                  disabled={!authStore.isAuth}
                  onClick={() => setAddCommFlag(!addCommFlag)}
                >
                  Add comment
                </Button>
              ) : (
                <div>
                  <Form>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlTextarea1"
                    >
                      <Form.Label>Your comment</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        value={commentContent}
                        onChange={(e) => setCommentContent(e.target.value)}
                      />
                    </Form.Group>
                  </Form>
                  <div>
                    <Button
                      style={{ marginRight: "1em" }}
                      variant="warning"
                      disabled={!authStore.isAuth}
                      onClick={() => {
                        commentStore.uploadComment(params.id, commentContent);
                        setAddCommFlag(!addCommFlag);
                        window.location.reload();
                      }}
                    >
                      Add comment
                    </Button>
                    <Button
                      style={{ marginRight: "1em" }}
                      variant="outline-warning"
                      disabled={!authStore.isAuth}
                      onClick={() => setAddCommFlag(!addCommFlag)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </div>
            <hr
              style={{
                border: "none",
                height: "1px",
                margin: "0",
                flexShrink: "0",
                marginTop: "1em",
                marginBottom: "1em",
                backgroundColor: "black",
              }}
            ></hr>
            <div>
              <h2>Comments ({commentStore.comments.length})</h2>
              <CommentList />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default observer(QuestionPage);
