import React, { Component } from "react";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loginuser, getAllCounts } from "../action/authAction";

import TextInputField from "../layout/TextInputField";
import TextPasswordField from "../layout/TextPasswordField";
import ProgressBar from "../layout/ProgressBar";
import LoadCount from "../layout/LoadCount";

import Box from "../layout/Box";

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
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      if (this.props.auth.user.level === 1) {
        this.setState({
          navigate: true,
          viewer: "/user",
        });
      } else if (this.props.auth.user.level === 2) {
        this.setState({
          navigate: true,
          viewer: "/sp",
        });
      } else if (this.props.auth.user.level === 3) {
        this.setState({
          navigate: true,
          viewer: "/admin",
        });
      }
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let update = {};

    if (nextProps.auth.isAuthenticated) {
      update.level = nextProps.auth.user.level;
      if (nextProps.auth.user.level === 1) {
        update.viewer = "/user";
      } else if (nextProps.auth.user.level === 2) {
        update.viewer = "/sp";
      } else if (nextProps.auth.user.level === 3) {
        update.viewer = "/admin";
      }
      update.move = true;
    }

    if (nextProps.errors) {
      update.error = nextProps.errors;
      update.loading = false;
    }

    if (
      nextProps.auth.isAuthenticated &&
      (Object.keys(nextProps.auth.allCounts).length > 0 ||
        Object.keys(nextProps.auth.providerCounts).length > 0 ||
        Object.keys(nextProps.auth.userCounts).length > 0)
    ) {
      update.loading = false;
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
    if (username === "" || username === undefined) {
      this.setState({
        error: {
          username: "Email Address/Username Field can't be Empty",
        },
      });
    } else if (password === "" || password === undefined) {
      this.setState({
        error: {
          password: "Password Field can't be Empty",
        },
      });
    } else {
      this.setState({
        loading: true,
      });
      const user = {
        username,
        password,
      };

      this.props.loginuser(user);
    }
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
    } = this.state;
    //const { errors } = this.props;

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
              label="Email Address/Username"
              type="text"
              name="username"
              value={username}
              onChange={this.changeHandler}
              error={error.username}
            />
            <TextPasswordField
              id="login-form-password"
              placeholder="Password"
              label="Password"
              icon={`far ${pass ? "fa-eye-slash" : "fa-eye"}`}
              type={pass ? "password" : "text"}
              name="password"
              value={password}
              onChange={this.changeHandler}
              onClick={this.checkPassHandler}
              error={error.password}
            />
            <div className="d-grid">
              <button
                type="submit"
                className="btn default-btn btn-lg btn-block"
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
      </div>
    );
  }
}

Login.propTypes = {
  loginuser: PropTypes.func.isRequired,
  getAllCounts: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});
export default connect(mapStateToProps, { loginuser, getAllCounts })(Login);
