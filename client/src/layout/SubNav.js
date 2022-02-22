import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getUserProfile } from "../action/profileAction";
import logo from "../asset/images/logo.png";

import Dropdown from "./Dropdown";

function SubNav(props) {
  const [close, setClose] = useState(true);
  const openNav = () => {
    setClose(true);
    props.onClick(true);
  };

  const clickHandler = () => {
    setClose(false);
    props.onClick(false);
  };

  return (
    <nav className="navbar navbar-expand-sm bg-light navbar-light dash-top-nav sticky-top">
      <div className="container-fluid">
        <div className="toggle-btn">
          {close ? (
            ""
          ) : (
            <button className="btn" type="button" onClick={openNav}>
              <span className="navbar-toggler-icon"></span>
            </button>
          )}

          {close ? (
            <button
              className="btn move-close-btn"
              type="button"
              onClick={clickHandler}
            >
              <i className="fas fa-times" />
            </button>
          ) : (
            ""
          )}
        </div>
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

SubNav.propTypes = {
  getUserProfile: PropTypes.func,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getUserProfile })(SubNav);
