import React, { useState } from "react";
import { Link } from "react-router-dom";

function SideNav(props) {
  let open = props.act;
  let display = open;

  const clickHandler = () => {
    display = false;
    console.log(open);
  };

  return (
    <div>
      <div id="mySidebar" className={`sidebar ${display ? "show-side" : ""}`}>
        <Link to="/">Dashboard</Link>
        <Link to="/signal">Signal</Link>
        <Link to="/">Clients</Link>
        <Link to="/">Contact</Link>
      </div>
    </div>
  );
}

export default SideNav;
