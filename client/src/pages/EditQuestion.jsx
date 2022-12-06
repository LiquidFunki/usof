import React, { useContext, useState } from "react";
import LoginForm from "../components/LoginForm";
import LeftSideBar from "../components/LeftSideBar";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Select from "react-select";
import { Context } from "../index";
import { useEffect } from "react";
import * as Icon from "react-bootstrap-icons";
import PostService from "../services/PostService";
import CategoryService from "../services/CategoryService";

const EditQuestion = () => {
  const loginButton = useNavigate();
  const params = useParams();
  const { postStore, categoryStore } = useContext(Context);
  const [categories2, setCategories2] = useState([])
  const [categoriesForm, setCategoriesForm] = useState([]);
  const [categories, setCategories] = useState();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const selector = categories2.map((category) => ({
    value: category.title,
    label: category.title,
  }));
  const tagChange = (option) => {
    const titleArr = option.map((opt) => opt.value);
    setCategoriesForm({ ...categoriesForm, titleArr });
    setCategories(option);
  };
  useEffect(() => {
    async function FetchData() {
      const respond = await PostService.fetchPost(params.id);
      console.log(respond.data);
      setTitle(respond.data.title);
      setContent(respond.data.content);
      const respond2 = await CategoryService.fetchCategories();
      setCategories2(respond2.data);
      const respond3 = await CategoryService.fetchCategoriesByPost(params.id);
      console.log(respond3.data);
      setCategoriesForm({titleArr: respond3.data.map((category) => (category.title))});
      setCategories(respond3.data.map((category)=>({
        value: category.title,
        label: category.title,
      })));
      
    }
    FetchData();
  }, []);
  console.log("categoriesForm", categoriesForm);
  return (
    <div style={{ display: "flex" }}>
      <Container>
        <Row>
          <Col md={2} style={{ padding: "0" }}>
            <LeftSideBar />
          </Col>
          <Col>
            <h1 style={{ color: "orange" }}>Edit a Question</h1>
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
                />
                <Form.Text id="loginHelpBlock" muted>
                  Include all the information someone would need to answer your
                  question
                </Form.Text>
              </Form.Group>
              <Select
                className="basic-single searchInput p-0 pt-2 m-0"
                classNamePrefix="select"
                value={categories}
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
                  variant="danger"
                  type="submit"
                  onClick={()=> {
                    postStore.updatePost(params.id, title, categoriesForm.titleArr, content );
                    loginButton('/questions');
                    window.location.reload();
                  }}
                >
                  Edit your question
                </Button>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default observer(EditQuestion);
