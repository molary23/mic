import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../asset/images/logo.png";

import Dropdown from "./Dropdown";

function SubNav() {
  const [display, setDisplay] = useState(false);
  return (
    <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#sideNavBar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <Link className="navbar-brand" to="/">
          <img
            src={logo}
            alt="MIC Earn Business Logo"
            style={{ width: "30px" }}
            className="rounded-pill"
          />
        </Link>
        <span className="navbar-text">MIC Earn Business</span>

        <div className="collapse navbar-collapse" id="sideNavBar">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <img
                src={logo}
                alt="MIC Earn Business Logo"
                style={{ width: "30px" }}
                className="rounded-pill"
              />
            </li>
            <li className="nav-item dropdown">
              <Dropdown />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default SubNav;
