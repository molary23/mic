import React, { useState } from "react";

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
        <a href="/">About</a>
        <a href="/">Services</a>
        <a href="/">Clients</a>
        <a href="/">Contact</a>
      </div>
    </div>
  );
}

export default SideNav;
