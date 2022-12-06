import React, { useState, useContext, useEffect } from "react";
import PostService from "../services/PostService";
import { useNavigate } from "react-router-dom"
import { Context } from "../index";
import { observer } from "mobx-react-lite";
import { NavLink, useLocation } from "react-router-dom";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import "../styles/MainBar.css";

const HomeMainBar = () => {
  const { authStore } = useContext(Context);
  const [radioValue, setRadioValue] = useState("date,desc");
  const [radioDataValue, setRadioDataValue] = useState("");
  const [radioDataName, setRadioDataName] = useState("");
  const [radioDataFlag, setRadioDataFlag] = useState(false);
  const [radioName, setRadioName] = useState("");
  const loginButton = useNavigate();
  const location = useLocation();
  const { postStore } = useContext(Context);
  const filters = postStore.filters;

  async function getPosts() {
    try {
      await postStore.fetchPosts(postStore.filters);
    } catch (e) {
      console.log(e);
    }
  }
  const radios = [
    { name: "Newest", value: "date,desc" },
    { name: "Oldest", value: "date,asc" },
    { name: "Most popular", value: "like,desc" },
    { name: "Least popular", value: "like,asc" },
  ];
  const radioData = [
    { id: "1", name: "year", value: "year" },
    { id: "2", name: "month", value: "month" },
    { id: "3", name: "week", value: "week" },
  ];
  console.log(radioDataName);
  console.log(radioDataValue);
  return (
    <div>
      <div className="mainBarHeader-1">
        <h5
          style={{
            fontSize: "1.5rem",
            fontWeight: "400",
            fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
          }}
        >
          {radioName ? radioName : "Newest"} Questions
        </h5>
        {authStore.isAuth ? (
          <Button style={{ right: "0" }}  onClick={() => loginButton('/askQuestion')}>Ask question</Button>
        ) : (
          <a></a>
        )}
      </div>
      <div
        style={{
          display: "flex",
          marginTop: "20px",
          justifyContent: "space-between",
        }}
      >
        <ButtonGroup>
          {radioData.map((radio, id) => (
            <ToggleButton
              key={id}
              id={`${radio.id}`}
              type="radio"
              variant="outline-warning"
              name={radio.name}
              value={radio.value}
              checked={radioDataValue === radio.value}
              onClick={(e) => {
                console.log("bebra1");
                console.log(e.currentTarget.value);
                console.log(radioDataValue);
                if (radioDataValue == radio.value) {
                  setRadioDataValue("");
                  setRadioDataName("");
                  postStore.setFilters({
                    ...filters,
                    dateFilter: null,
                    page: 1,
                  });
                } else {
                  setRadioDataValue(radio.value);
                  setRadioDataName(radio.name);
                  postStore.setFilters({
                    ...filters,
                    dateFilter: radio.value,
                    page: 1,
                  });
                }
              }}
            >
              {radio.name}
            </ToggleButton>
          ))}
        </ButtonGroup>

        <ButtonGroup>
          {radios.map((radio, idx) => (
            <ToggleButton
              key={idx}
              id={`radio-${idx}`}
              type="radio"
              variant="outline-warning"
              // name="radio"
              name={radio.name}
              value={radio.value}
              checked={radioValue === radio.value}
              onChange={(e) => {
                setRadioValue(e.currentTarget.value);
                setRadioName(e.currentTarget.name);
                postStore.setFilters({
                  ...filters,
                  sort: e.currentTarget.value,
                  page: 1,
                });
                getPosts();
              }}
            >
              {radio.name}
            </ToggleButton>
          ))}
        </ButtonGroup>
      </div>
      <hr
        style={{
          border: "none",
          height: "1px",
          margin: "0",
          flexShrink: "0",
          marginTop: "12px",
          backgroundColor: "black",
        }}
      ></hr>
    </div>
  );
};

export default observer(HomeMainBar);
