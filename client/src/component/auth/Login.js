import React, { Component } from "react";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loginuser, clearErrors } from "../../action/authAction";

import { setDocumentTitle } from "../../util/LoadFunction";

import TextInputField from "../../layout/TextInputField";
import TextPasswordField from "../../layout/TextPasswordField";
import ProgressBar from "../../layout/ProgressBar";
import LoadCount from "../../layout/LoadCount";
import Modal from "../../layout/Modal";

import { BsEyeSlash, BsEye } from "react-icons/bs";

import Box from "../../layout/Box";
import isEmail from "validator/lib/isEmail";
import isEmpty from "../../validation/emptyChecker";

class Login extends Component {
  state = {
    username: "",
    password: "",
    pass: true,
    loading: false,
    error: {},
    navigate: false,
    viewer: "",
    move: false,
    level: 0,
    servererror: {},
    modal: false,
    sender: null,
  };

  componentDidMount() {
    setDocumentTitle("login page");
    this.props.clearErrors();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let update = {};
    let location, checklevel;
    let search = window.location.search;

    if (nextProps.auth.isAuthenticated) {
      update.level = nextProps.auth.user.level;
      if (search !== "") {
        location = search.split("=")[1];
        checklevel = location.split("/")[1];
        if (
          (nextProps.auth.user.level === 1 && checklevel === "user") ||
          (nextProps.auth.user.level === 2 && checklevel === "sp") ||
          (nextProps.auth.user.level === 3 && checklevel === "admin")
        ) {
          update.viewer = `${location}`;
        }
      } else {
        if (nextProps.auth.user.level === 1) {
          update.viewer = "/user";
        } else if (nextProps.auth.user.level === 2) {
          update.viewer = "/sp";
        } else if (nextProps.auth.user.level === 3) {
          update.viewer = "/admin";
        }
      }

      update.move = true;
    }

    if (nextProps.errors !== prevState.errors) {
      if (nextProps.errors.status === 400) {
        update.servererror = nextProps.errors.data;
        update.loading = false;
      }
      if (nextProps.errors.status === 404) {
        update.servererror = {
          network: "There has been a network error. Refresh and try again.",
        };
        update.loading = false;
      }
      if (nextProps.errors.status === 403) {
        update.modal = true;
        update.sender = "unverified";
        update.loading = false;
      }
    }

    if (nextProps.auth.isAuthenticated && nextProps.auth.counted) {
      update.move = false;
      update.navigate = true;
    }

    return update;
  }

  changeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  checkPassHandler = () => {
    this.setState({
      pass: !this.state.pass,
    });
  };

  submitHandler = async (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    let pattern = new RegExp("^[a-zA-Z0-9._-]+$"),
      tester = pattern.test(username);
    if (isEmpty(username)) {
      this.setState({
        error: {
          username: "Email Address/Username Field can't be Empty",
        },
      });
    } else if (!tester && !isEmail(username)) {
      this.setState({
        error: {
          username: "Enter a valid Username or Email Address",
        },
      });
    } else if (isEmpty(password)) {
      this.setState({
        error: {
          password: "Password Field can't be Empty",
        },
      });
    } else {
      this.setState({
        loading: true,
        modal: false,
        error: {},
      });
      const user = {
        username,
        password,
      };

      this.props.loginuser(user);
    }
  };

  modalHandler = (close) => {
    this.setState({
      modal: close,
    });
  };

  render() {
    const {
      username,
      error,
      pass,
      password,
      loading,
      navigate,
      viewer,
      move,
      level,
      servererror,
      modal,
      sender,
    } = this.state;

    return (
      <div className="">
        {move && (
          <>
            <ProgressBar />
            <LoadCount sender={"login"} level={level} />
          </>
        )}

        <Box sender={"login"}>
          <form className="login-form" onSubmit={this.submitHandler}>
            <TextInputField
              id="login-form-email"
              placeholder="Email Address/Username"
              type="text"
              name="username"
              value={username}
              onChange={this.changeHandler}
              error={error.username || servererror.username}
            />
            <TextPasswordField
              id="login-form-password"
              placeholder="Password"
              label="Password"
              icon={pass ? <BsEye /> : <BsEyeSlash />}
              type={pass ? "password" : "text"}
              name="password"
              value={password}
              onChange={this.changeHandler}
              onClick={this.checkPassHandler}
              error={error.password || servererror.password}
            />

            <div className="d-grid">
              {servererror.network && (
                <small className="text-muted mb-2">{servererror.network}</small>
              )}
              <button
                type="submit"
                className="btn default-btn btn-lg btn-block"
                disabled={loading && true}
              >
                Login
                {loading && (
                  <span className="spinner-border spinner-border-sm ms-2"></span>
                )}
              </button>
            </div>
          </form>
        </Box>
        <div className="login-helper">
          <p className="mb-1">
            New to MIC? <Link to="/register">Join</Link>
          </p>
          <p className="">
            <Link to="/forgot">Forgot your Password?</Link>
          </p>
        </div>
        {navigate && <Navigate to={`${viewer}`} replace={true} />}
        {modal ? (
          <Modal {...{ modal, sender }} onClick={this.modalHandler} />
        ) : null}
      </div>
    );
  }
}

Login.propTypes = {
  loginuser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.any,
  clearErrors: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});
export default connect(mapStateToProps, {
  loginuser,
  clearErrors,
})(Login);
