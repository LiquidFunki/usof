import React, { useState, useContext } from "react";
import UserService from "../services/UserService";
import { useParams } from "react-router-dom";
import Question from "../components/Question";
import Form from "react-bootstrap/Form";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import LeftSideBar from "../components/LeftSideBar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useEffect } from "react";
import * as Icon from "react-bootstrap-icons";
import Button from "react-bootstrap/Button";
import PostService from "../services/PostService";

const User = () => {

  const { authStore } = useContext(Context);
  const params = useParams();
  const [flag, setFlag] = useState(false);
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({});
  const [fullName, setFullName] = useState("");
  const [login, setLogin] = useState("");
  const [file, setFile] = useState("");

  async function updateAvatar(file) {
    await UserService.updateAvatar(file);
  }
  async function FetchUserPosts() {
    const response1 = await UserService.fetchUser(params.id);
    setUser(response1.data);
    setFullName(response1.data.full_name);
    setLogin(response1.data.login);
    const response2 = await PostService.fetchUserPosts(params.id);
    setPosts(response2.data || []);

  }
  useEffect(() => {
    async function FetchData() {
      await FetchUserPosts();
    }
    FetchData();
  }, [params.id]);

  return (
    <div style={{ display: "flex" }}>
      <Container>
        <Row>
          <Col md={2} style={{ padding: "0" }}>
            <LeftSideBar />
          </Col>
          <Col
            style={{
              padding: "0em 1.4em",
              marginTop: "1.4em",
              display: "flex",
            }}
          >
            <div
              style={{
                height: "250px",
                padding: "1.6em",
                textAlign: "center",
                backgroundColor: "rgb(255 198 90 / 24%)",
                minWidth: "220px",
                maxWidth: "220px",
              }}
            >
              <img
                alt=""
                src={`http://localhost:5000/avatars/${user.profile_pic}`}
                height="160"
                width="160"
                className="d-inline-block align-top"
              />
              <h5 style={{ marginTop: "1em", color: "orange" }}>
                {user.rating} Social credits
              </h5>
              {authStore.user.id === user.id || authStore.user.role === "admin" ? (
                <Button
                  style={{ right: "0", marginTop: "2em" }}
                  onClick={() => {
                    setFlag(!flag);
                  }}
                >
                  Edit profile
                </Button>
              ) : (
                <span></span>
              )}
              {flag ? (
                <div>
                  <Form
                    style={{
                      textAlign: "start",
                      marginTop: "1.5em",
                      width: "40vw",
                    }}
                    onSubmit={async (e) => {
                      e.preventDefault();
                      await UserService.updateAvatar(
                        e.target.bebraInputAvatar.files[0]
                      );
                      window.location.reload();
                    }}
                  >
                    <Form.Label>Change profile picture</Form.Label>
                    <Form.Control
                      type="file"
                      onChange={(e) => {
                        setFile(e.target.value);
                      }}
                      value={file}
                      name="bebraInputAvatar"
                    />
                    <Button
                      type="submit"
                      style={{
                        right: "0",
                        marginBottom: "0.5em",
                        marginTop: "0.5em",
                      }}
                    >
                      Upload Photo
                    </Button>
                  </Form>
                  <Form
                    style={{
                      textAlign: "start",
                      width: "40vw",
                    }}
                    onSubmit={async (e) => {
                      e.preventDefault();
                      if(fullName === ""){
                        setFullName(null);
                      }
                      if(login === ""){
                        setLogin(null);
                      }
                      await UserService.updateUser(params.id, login, fullName);
                      window.location.reload();
                    }}
                  >
                    <Form.Group className="mb-1" controlId="formBasicName">
                      <Form.Label>Full name</Form.Label>
                      <Form.Control
                        type="text" //password
                        onChange={(e) => setFullName(e.target.value)}
                        value={fullName}
                        placeholder="Full name"
                      />
                    </Form.Group>
                    <Form.Group className="mb-1" controlId="formBasicName">
                      <Form.Label>Login</Form.Label>
                      <Form.Control
                        type="text" //password
                        onChange={(e) => setLogin(e.target.value)}
                        value={login}
                        placeholder="Login"
                        aria-describedby="loginHelpBlock"
                      />
                      <Form.Text id="loginHelpBlock" muted>
                        Your login must be unique, contain letters and numbers,
                        and must not contain spaces, special characters, or
                        emoji.
                      </Form.Text>
                    </Form.Group>
                    <Button
                      type="submit"
                      style={{ right: "0", marginBottom: "1em"}}
                    >
                      Upload changes
                    </Button>
                  </Form>
                </div>
              ) : (
                <div></div>
              )}
            </div>
            <div
              style={{ paddingLeft: "2em", paddingRight: "2em", width: "100%" }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <h4>{user.full_name}</h4>
                  <p>role: {user.role}</p>
                </div>
                <div style={{ marginRight: "10px", textAlign: "center" }}>
                  <h4>{posts.length ? posts.length : 0}</h4>
                  <p>question(s)</p>
                </div>
              </div>
              <hr
                style={{
                  border: "none",
                  height: "2px",
                  margin: "0",
                  backgroundColor: "rgba(0, 0, 0, 0.83)",
                }}
              ></hr>
              <div
                style={{
                  marginTop: "1em",
                }}
              >
                <h4>Last asked question</h4>
                {posts.length ? (
                  <span>
                    <Question question={posts[0]} />
                    <hr
                      style={{
                        border: "none",
                        height: "2px",
                        backgroundColor: "rgba(0, 0, 0, 0.83)",
                      }}
                    ></hr>
                  </span>
                ) : (
                  <span>
                    <hr
                      style={{
                        border: "none",
                        height: "2px",
                        backgroundColor: "rgba(0, 0, 0, 0.83)",
                      }}
                    ></hr>
                    No questions found
                  </span>
                )}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default observer(User);
