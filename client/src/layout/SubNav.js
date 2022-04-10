import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import jwtDecode from "jwt-decode";
import decrypt from "../util/decrypt";

import { HiBadgeCheck, HiOutlineChatAlt2 } from "react-icons/hi";
import { RiSettings3Line } from "react-icons/ri";

import logo from "../asset/images/logo.png";

import Dropdown from "./Dropdown";
import Toast from "../layout/Toast";

import { logoutUser, clearErrors } from "../action/authAction";

export class SubNav extends Component {
  state = {
    close: true,
    premiuminfo: "",
    userinfo:
      this.props.auth.user ?? jwtDecode(localStorage.getItem("jwtToken")),
    navigate: false,
    toast: false,
    toasttext: null,
    toastcategory: "error",
    isMounted: true,
    mobile: false,
  };

  componentDidMount() {
    if (this.props.auth.user.level === 1) {
      this.setState({
        premiuminfo:
          JSON.parse(decrypt(localStorage.getItem("premium"), "local")) ??
          this.props.user.premium,
      });
    }
    this.props.clearErrors();
  }

  componentWillUnmount() {
    this.setState({
      isMounted: false,
    });
  }

  componentDidUpdate(prevProps) {
    let servererror;

    if (this.state.isMounted) {
      if (
        prevProps.errors !== this.props.errors &&
        this.props.errors.status !== undefined
      ) {
        if (
          this.props.errors.status === 500 ||
          this.props.errors.status === 404
        ) {
          servererror =
            "There has been a Network Error. Refresh and Try again later.";
          this.getError(servererror);
        }
        if (this.props.errors.status === 400) {
          servererror = this.props.errors.data;
          if (servererror !== null && servererror !== undefined) {
            this.getError(Object.values(servererror));
          }
        }
      }
    }

    if (
      prevProps.errors !== this.props.errors &&
      this.props.errors.status === 401
    ) {
      this.logOut();
    }
  }

  logOut = () => {
    this.props.logoutUser();
  };

  getError = (message) => {
    this.setState({
      isLoading: false,
      toast: true,
      toastcategory: "error",
      toasttext: message,
    });

    setTimeout(() => {
      this.setState({
        toast: false,
      });
    }, 5000);
  };

  openNav = () => {
    this.setState({
      close: !this.state.close,
    });
    this.props.onClick();
  };

  openMobile = () => {
    this.setState((prevState) => ({
      mobile: !prevState.mobile,
    }));
  };
  closeMobile = () => {
    this.setState({
      mobile: false,
    });
  };

  render() {
    const { premiuminfo, userinfo, toast, toastcategory, toasttext, mobile } =
      this.state;
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

            <div className="toggle-btn">
              <button
                type="button"
                className="navbar-toggle collapsed pull-left"
                data-toggle="collapse"
                data-target="#sideNavBar"
                aria-expanded="false"
                onClick={() => this.openMobile()}
              >
                <span className="navbar-toggler-icon"></span>
              </button>
            </div>

            <div
              className={`${mobile ? "" : "collapse"} navbar-collapse`}
              id="sideNavBar"
            >
              <ul className="navbar-nav ms-auto">
                <li className="nav-item dropdown">
                  <Dropdown
                    avatar={userinfo.avatar}
                    username={userinfo.username}
                    onClick={() => this.closeMobile()}
                  />
                </li>
                <li className="nav-item nav-user-item">
                  <span className="nav-user-name">{userinfo.username}</span>
                  {this.props.auth.user.level === 1 && (
                    <span className="nav-sub-icon">
                      {premiuminfo.status === "a" && <HiBadgeCheck />}
                    </span>
                  )}
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
                        onClick={() => this.closeMobile()}
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
                      onClick={() => this.closeMobile()}
                    >
                      <RiSettings3Line />
                    </Link>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        {toast && <Toast text={toasttext} category={toastcategory} />}
      </div>
    );
  }
}
SubNav.propTypes = {
  auth: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  errors: PropTypes.any,
  logoutUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user,
  errors: state.errors,
});

export default connect(mapStateToProps, {
  logoutUser,
  clearErrors,
})(SubNav);
