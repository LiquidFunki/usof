import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import CategoriesList from "../components/CategoriesList";
import LeftSideBar from "../components/LeftSideBar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CategoryService from "../services/CategoryService";
import { useEffect } from "react";


const Tags = () => {
  const [categories, setCategories] = useState([]);
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  const [categoriesDisplay, setCategoriesDisplay] = useState([]);
  async function FetchUserCategories() {
    const response1 = await CategoryService.fetchCategories();
    setCategories(response1.data);
  }
  useEffect(() => {
    async function FetchData() {
      await FetchUserCategories();
    }
    FetchData();
  }, []);
  const searchHandler = (e) => {
    setSearch(e.target.value);
    setFilter("");
    const temp = [...categories];
    setCategoriesDisplay(
      temp.filter((value) =>
        value.title.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  useEffect(() => {
    setCategoriesDisplay(categories);
  }, [categories]);

  return (
    <div style={{ display: "flex"}}>
      <Container>
        <Row>
          <Col md={2} style={{ padding: "0" }}>
            <LeftSideBar />
          </Col>
          <Col>
          <div style={{margin: "20px"}}>
          <h1>Categories</h1>
          <input
              type="text"
              onChange={searchHandler}
              value={search}
              name="search"
              className="searchInput"
              placeholder="Search..."
            />
          </div>
          <CategoriesList  CategoriesList={categoriesDisplay} />

          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default observer(Tags);
