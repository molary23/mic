import React from "react";
import logo from "../asset/images/logo.png";

function MainNav() {
  return (
    <nav className="navbar navbar-expand-sm bg-light navbar-light sticky-top">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <img src={logo} alt="MIC Earn Business Logo" className="nav-logo" />
        </a>
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
              <a className="nav-link" href="/">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/">
                About us
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/">
                Contact
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/">
                Login
              </a>
            </li>
            <li className="nav-item">
              <a type="button" className="btn nav-link btn" href="/">
                Register
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default MainNav;
