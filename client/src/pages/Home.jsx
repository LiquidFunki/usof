import React, { useState, useContext } from "react";
import PostService from "../services/PostService";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import LeftSideBar from "../components/LeftSideBar";
import RightSideBar from "../components/RightSideBar";
import HomeMainBar from "../components/HomeMainBar";
import QuestionList from "../components/QuestionList";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useEffect } from "react";
import * as Icon from "react-bootstrap-icons";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const { postStore, categoryStore, userStore } = useContext(Context);
  const filters = postStore.filters;

  async function getPosts() {
    try {
      await postStore.fetchPosts(postStore.filters);
    } catch (e) {
      console.log(e);
    }
  }
  async function FetchPostsCategories() {
    await postStore.fetchPosts(postStore.filters);
    await categoryStore.fetchCategories();
    await userStore.fetchUsers();
  }
  useEffect(() => {
    async function FetchData() {
      await FetchPostsCategories();
    }
    FetchData();
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <Container>
        <Row>
          <Col md={2} style={{ padding: "0" }}>
            <LeftSideBar />
          </Col>
          <Col md={7}>
            <HomeMainBar />
            <QuestionList />

            <div style={{ height: "100px", display: "flex" }}>
              <Container style={{ height: "100%" }}>
                <Row style={{ height: "100%" }}>
                  <Col>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "start",
                        height: "100%",
                        alignItems: "center",
                      }}
                    >
                      <Icon.ArrowLeftSquareFill
                        style={{
                          height: "40px",
                          width: "40px",
                          cursor: "pointer",
                          color: "orange",
                        }}
                        onClick={() => {
                          // postStore.setFilters({...filters, page: filters.page -= 1 })
                          postStore.pageDecrement();
                          console.log(postStore.filters);
                          getPosts();
                        }}
                      ></Icon.ArrowLeftSquareFill>
                    </div>
                  </Col>
                  <Col>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        height: "100%",
                        alignItems: "center",
                      }}
                    >
                      {filters.page}
                    </div>
                  </Col>
                  <Col>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "end",
                        height: "100%",
                        alignItems: "center",
                      }}
                    >
                      <Icon.ArrowRightSquareFill
                        style={{
                          height: "40px",
                          width: "40px",
                          cursor: "pointer",
                          color: "orange",
                        }}
                        onClick={() => {
                          // postStore.setFilters({...filters, page: filters.page += 1 })
                          if (postStore.posts.length) {
                            postStore.pageIncrement();
                            console.log(postStore.filters);
                            getPosts();
                          }
                        }}
                      ></Icon.ArrowRightSquareFill>
                    </div>
                  </Col>
                </Row>
              </Container>
            </div>
          </Col>
          <Col>
            <RightSideBar />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default observer(Home);
