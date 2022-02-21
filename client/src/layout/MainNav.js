import React from "react";
import { Link } from "react-router-dom";
import logo from "../asset/images/logo.png";

function MainNav() {
  return (
    <nav className="navbar navbar-expand-sm bg-light navbar-light sticky-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img
            src={logo}
            alt="MIC Earn Business Logo"
            className="rounded-pill nav-logo"
          />
        </Link>
        <span className="navbar-text">MIC Earn Business</span>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbarMenu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="mainNavbarMenu">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/">
                About us
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Contact
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="//dashboard.localhost:3000">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link type="button" className="btn nav-link btn" to="/register">
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
