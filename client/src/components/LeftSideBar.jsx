import React, { useState, useContext, useEffect } from "react";
import { Context } from "../index";
import { observer } from "mobx-react-lite";
import { NavLink, useLocation } from "react-router-dom";
// import {LinkContainer} from 'react-router-bootstrap';
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import * as Icon from "react-bootstrap-icons";
import "../styles/LeftSideBar.css";

const LeftSideBar = () => {
  const { authStore } = useContext(Context);
  const  location  = useLocation();
  

  return (
    <div className="LeftSideBar" style={{ position: "fixed", height: "100%"}}>
      <Nav  activeKey={location.pathname} className="flex-column" >
        <NavLink style={{textDecoration: "none", fontSize: "20px"}} to="/questions"> <Icon.Globe2 /> Questions </NavLink>
        <NavLink style={{textDecoration: "none", fonstSize: "20px"}} to="/tags"> <Icon.TagsFill /> Tags </NavLink>
        <NavLink style={{textDecoration: "none", fonstSize: "20px"}} to="/users"> <Icon.PeopleFill /> Users </NavLink>
      </Nav>
      
    </div>
  );
};

export default observer(LeftSideBar);
