import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getUserProfile } from "../action/profileAction";
import logo from "../asset/images/logo.png";

import Dropdown from "./Dropdown";

export class SubNav extends Component {
  state = {
    close: true,
    progress: 50,
  };

  componentDidMount() {}

  openNav = () => {
    this.setState({
      close: true,
    });

    this.props.onClick(true);
  };

  clickHandler = () => {
    this.setState({
      close: false,
    });
    this.props.onClick(false);
  };

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-sm bg-light navbar-light dash-top-nav fixed-top">
          <div className="container-fluid">
            <div className="toggle-btn">
              {this.state.close ? (
                <button
                  className="btn move-close-btn"
                  type="button"
                  onClick={this.clickHandler}
                >
                  <i className="fas fa-times" />
                </button>
              ) : (
                <button className="btn" type="button" onClick={this.openNav}>
                  <span className="navbar-toggler-icon"></span>
                </button>
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
      </div>
    );
  }
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
