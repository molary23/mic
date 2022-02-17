import React from "react";
import { Link } from "react-router-dom";

function MainNav() {
  return (
    <nav className="navbar navbar-expand-sm bg-dark navbar-dark justify-content-center">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img
            src="logo.png"
            alt="MIC Earn Business Logo"
            style={{ width: "40px" }}
            className="rounded-pill"
          />
        </Link>
        <span className="navbar-text">Navbar text</span>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbarMenu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="mainNavbarMenu">
          <ul className="navbar-nav ">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Contact
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/">
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
