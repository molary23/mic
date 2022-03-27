import React, { useState, useEffect } from "react";
import logo from "../asset/images/logo.png";

function MainNav() {
  const [display, setDisplay] = useState(false);

  const [focus, setFocus] = useState(false);

  const addFocus = () => {
    let winScroll = window.scrollY;
    if (winScroll > 100) {
      setFocus(true);
    } else {
      setFocus(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", addFocus, { passive: true });
    return () => {
      window.removeEventListener("scroll", addFocus);
    };
  }, []);

  return (
    <nav
      className={`${
        focus ? "show-bg" : ""
      } navbar navbar-expand-sm navbar-light fixed-top top-nav`}
    >
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <img src={logo} alt="MIC Earn Business Logo" className="nav-logo" />
        </a>
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
          <ul className="navbar-nav ms-auto right-nav">
            <li className="nav-item">
              <a className="nav-link" href="#home">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#about">
                About
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#service">
                Services
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#contactus">
                Contact
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/">
                Login
              </a>
            </li>
            <li className="nav-item">
              <a type="button" className="btn nav-link" href="/">
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
