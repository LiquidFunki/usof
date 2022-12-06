import React, { useState } from "react";
import UserService from "../services/UserService";
import { observer } from "mobx-react-lite";
import LeftSideBar from "../components/LeftSideBar";
import UserList from "../components/UserList";
import Container from "react-bootstrap/Container";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useEffect } from "react";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  const [usersDisplay, setUsersDisplay] = useState([]);

  async function FetchUserCategories() {
    const response1 = await UserService.fetchUsers();
    setUsers(response1.data);
  }
  useEffect(() => {
    async function FetchData() {
      await FetchUserCategories();
    }
    FetchData();
  }, []);

  const filterChange = (e) => {
    setFilter(e.target.value);
    const temp = [...users];
    switch (e.target.value) {
      case "popular":
        setUsersDisplay(temp.sort((a, b) => b.rating - a.rating));
        break;
      case "name":
        setUsersDisplay(
          temp.sort((a, b) =>
            a.login > b.login ? 1 : b.login > a.login ? -1 : 0
          )
        );
        break;
      case "new":
        setUsersDisplay(temp.reverse());
        break;
      default:
        setUsersDisplay(users);
        break;
    }
  };
  const searchHandler = (e) => {
    setSearch(e.target.value);
    setFilter("");
    const temp = [...users];
    setUsersDisplay(
      temp.filter((value) =>
        value.full_name.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  useEffect(() => {
    setUsersDisplay(users);
  }, [users]);

  return (
    <div style={{ display: "flex" }}>
      <Container>
        <Row>
          <Col md={2} style={{ padding: "0" }}>
            <LeftSideBar />
          </Col>
          <Col>
          <div style={{margin: "20px"}}>
          <h1>Users</h1>
          <div style={{display: "flex", justifyContent: "space-between"}}>
            <input
              type="text"
              onChange={searchHandler}
              value={search}
              name="search"
              className="searchInput"
              placeholder="Search..."
            />
            <ButtonGroup aria-label="Basic example" style={{ marginRight: "3em" }}>
            <Button
              variant="outline-warning"
              active={filter === 'popular'}
              onClick={filterChange}
              value="popular"
            >
              Popular
            </Button>
            <Button
              variant="outline-warning"
              active={filter === 'name'}
              onClick={filterChange}
              value="name"
            >
              Name
            </Button>
            <Button
              variant="outline-warning"
              active={filter === 'new'}
              onClick={filterChange}
              value="new"
            >
              New
            </Button>
          </ButtonGroup>
          </div>
          </div>
            <UserList  userList={usersDisplay} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default observer(Users);
