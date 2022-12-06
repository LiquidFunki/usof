import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../index";
import { observer } from "mobx-react-lite";

const CategoryCard = ({ category }) => {
  const { userStore } = useContext(Context);
  const loginButton = useNavigate();

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minWidth: "20%",
          maxWidth: "20%",
          backgroundColor: "rgb(255 198 90 / 24%)",
          margin: "20px",
        }}
      >
        <span
          style={{
            marginLeft: "5px",
            backgroundColor: "#00dcff36",
            color: "#009eff",
            padding: "3px",
            marginBottom: "10px",
            marginTop: "20px",
            fontWeight: "bold",
            fontSize: "18px"
          }}
        >
          {category.title}
        </span>
        <hr
          style={{
            border: "none",
            height: "2px",
            margin: "0",
            backgroundColor: "rgba(0, 0, 0, 0.83)",
          }}
        ></hr>
        <span style={{margin: "20px"}}>{category.description}</span>
      </div>
    </>
  );
};

export default observer(CategoryCard);
