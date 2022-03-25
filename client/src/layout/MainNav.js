import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../asset/images/logo.png";

function MainNav() {
  const [display, setDisplay] = useState(false);
  return (
    <nav className="navbar navbar-expand-sm bg-light navbar-light sticky-top main-nav">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img
            src={logo}
            alt="MIC Earn Business Logo"
            className="rounded-pill nav-logo"
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbarMenu"
          onClick={() => {
            setDisplay(!display);
          }}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`${!display ? "collapse" : ""}  navbar-collapse`}
          id="mainNavbarMenu"
        >
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link
                type="button"
                className="btn nav-link btn default-btn"
                to="/register"
              >
                Register
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default MainNav;
