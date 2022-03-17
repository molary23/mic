import React, { Component } from "react";
import { Link, Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import jwtDecode from "jwt-decode";

import { HiBadgeCheck, HiOutlineChatAlt2 } from "react-icons/hi";
import { RiSettings3Line } from "react-icons/ri";

import { getUserProfile } from "../action/profileAction";
import logo from "../asset/images/logo.png";

import Dropdown from "./Dropdown";

import { logoutUser } from "../action/authAction";
import { clearCurrentProfile } from "../action/profileAction";

export class SubNav extends Component {
  state = {
    close: true,
    premiuminfo: "",
    userinfo:
      this.props.auth.user ?? jwtDecode(localStorage.getItem("jwtDecode")),
    navigate: false,
  };

  componentDidMount() {
    if (this.props.auth.user.level === 1) {
      this.setState({
        premiuminfo:
          this.props.user.premium ??
          JSON.parse(localStorage.getItem("premium")),
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.errors !== this.props.errors &&
      this.props.errors === "Unauthorized"
    ) {
      console.log(this.props.errors);
      this.props.logoutUser();
      // props.clearActions();
      this.props.clearCurrentProfile();
      this.setState({
        navigate: true,
      });
    }
  }

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
    const { premiuminfo, userinfo, navigate } = this.state;
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
                <li className="nav-item">
                  <a className="nav-link" href="/">
                    <span className="nav-user-name">{userinfo.username}</span>
                    {this.props.auth.user.level === 3 && (
                      <span className="nav-sub-icon">
                        {premiuminfo.status === "n" && <HiBadgeCheck />}
                      </span>
                    )}
                  </a>
                </li>

                {(auth.user.level === 3 || auth.user.level === 1) && (
                  <li className="nav-item">
                    <span className="nav-forum-icon">
                      <Link
                        className="nav-link"
                        to={`/${
                          (auth.user.level === 3 && "admin") ||
                          (auth.user.level === 2 && "sp") ||
                          (auth.user.level === 1 && "user")
                        }/forums`}
                      >
                        <HiOutlineChatAlt2 />
                      </Link>
                    </span>
                  </li>
                )}

                <li className="nav-item">
                  <span className="nav-settings-icon">
                    <Link
                      className="nav-link"
                      to={`/${
                        (auth.user.level === 3 && "admin") ||
                        (auth.user.level === 2 && "sp") ||
                        (auth.user.level === 1 && "user")
                      }/settings`}
                    >
                      <RiSettings3Line />
                    </Link>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        {navigate && <Navigate to={"/"} replace={true} />}
      </div>
    );
  }
}
SubNav.propTypes = {
  getUserProfile: PropTypes.func,
  auth: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.any,
  logoutUser: PropTypes.func.isRequired,
  clearCurrentProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user,
  profile: state.profile,
  errors: state.errors,
});

export default connect(mapStateToProps, {
  getUserProfile,
  logoutUser,
  clearCurrentProfile,
})(SubNav);
