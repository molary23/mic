import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import jwtDecode from "jwt-decode";

import { getUserProfile } from "../action/profileAction";
import logo from "../asset/images/logo.png";

import Dropdown from "./Dropdown";

export class SubNav extends Component {
  state = {
    close: true,
    premiuminfo:
      JSON.parse(localStorage.getItem("premium")) ?? this.props.user.premium,
    userinfo:
      this.props.auth.user ?? jwtDecode(localStorage.getItem("jwtDecode")),
  };

  openNav = () => {
    this.setState({
      close: !this.state.close,
    });

    if (this.state.close) {
      this.props.onClick(false);
    } else {
      this.props.onClick(true);
    }
  };

  render() {
    const { premiuminfo, userinfo } = this.state;
    const { auth } = this.props;

    return (
      <div>
        <nav className="navbar navbar-expand-sm bg-light navbar-light dash-top-nav fixed-top">
          <div className="container-fluid">
            <div className="toggle-btn">
              <button className="btn" type="button" onClick={this.openNav}>
                <span className="navbar-toggler-icon"></span>
              </button>
            </div>
            <Link className="navbar-brand" to="/">
              <img
                src={logo}
                alt="MIC Earn Business Logo"
                className="nav-logo"
              />
            </Link>

            <div className="collapse navbar-collapse" id="sideNavBar">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item dropdown">
                  <Dropdown
                    avatar={userinfo.avatar}
                    username={userinfo.username}
                  />
                </li>
                <li className="nav-item dropdown">
                  <p className="nav-name">{userinfo.username}&nbsp;</p>
                </li>
                <li className="nav-item dropdown">
                  <p className="nav-sub-icon">
                    {premiuminfo.status === "n" && (
                      <i className="fas fa-check-circle" />
                    )}
                  </p>
                </li>
                {(auth.user.level === 3 || auth.user.level === 1) && (
                  <li className="nav-item dropdown">
                    <span className="vl"></span>
                  </li>
                )}
                {(auth.user.level === 3 || auth.user.level === 1) && (
                  <li className="nav-item dropdown">
                    <Link className="navbar-brand" to="/user/contact">
                      <i className="far fa-bell nav-notify" />
                    </Link>
                  </li>
                )}
                <li className="nav-item dropdown">
                  <span className="vl"></span>
                </li>
                <li className="nav-item dropdown">
                  <Link className="navbar-brand" to="/user/settings">
                    <i className="fas fa-cog nav-settings" />
                  </Link>
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
  user: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user,
  profile: state.profile,
});

export default connect(mapStateToProps, { getUserProfile })(SubNav);
