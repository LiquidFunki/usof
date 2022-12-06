import React, { useContext, useState } from "react";
import LoginForm from "../components/LoginForm";
import LeftSideBar from "../components/LeftSideBar";
import { observer } from "mobx-react-lite";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Select from "react-select";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../index";
import { useEffect } from "react";
import * as Icon from "react-bootstrap-icons";
import CategoryService from "../services/CategoryService";
import UserService from "../services/UserService";

const AskQuestion = () => {
  const loginButton = useNavigate();
  const { postStore, categoryStore } = useContext(Context);
  const [categories, setCategories] = useState([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [categoriesForm, setCategoriesForm] = useState([]);
  const selector = categories.map((category) => ({
    value: category.title,
    label: category.title,
  }));
  const tagChange = (option) => {
    const titleArr = option.map((opt) => opt.value);
    setCategoriesForm({ ...categoriesForm, titleArr });
  };
  useEffect(() => {
    async function FetchData() {
      const respond = await CategoryService.fetchCategories();
      setCategories(respond.data);
    }
    FetchData();
  }, []);
  console.log(categoriesForm.titleArr);
  return (
    <div style={{ display: "flex" }}>
      <Container>
        <Row>
          <Col md={2} style={{ padding: "0" }}>
            <LeftSideBar />
          </Col>
          <Col>
            <h1 style={{ color: "orange" }}>Ask a Question</h1>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter at least 3 characters up to 50"
                />
                <Form.Text id="loginHelpBlock" muted>
                  Be specific and imagine you’re asking a question to another
                  person
                </Form.Text>
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Content</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Content field must not be empty"
                />
                <Form.Text id="loginHelpBlock" muted>
                  Include all the information someone would need to answer your
                  question
                </Form.Text>
              </Form.Group>
              <Select
                className="basic-single searchInput p-0 pt-2 m-0"
                classNamePrefix="select"
                isClearable
                isSearchable
                isMulti
                name="categories"
                options={selector}
                onChange={tagChange}
                placeholder="Start typing to see suggestions."
              />
              <Form.Group className="mb-3">
                <Button
                  style={{marginTop: "3em", width: "20%", alignSelf: "center"}}
                  className="bebraButton"
                  variant="warning"
                  type="submit"
                  onClick={()=> {
                    postStore.uploadPost(title, content, categoriesForm.titleArr);
                    loginButton('/questions');
                  }}
                >
                  Post your question
                </Button>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default observer(AskQuestion);
