import React, { Component } from "react";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loginuser } from "../action/authAction";

import TextInputField from "../layout/TextInputField";
import TextPasswordField from "../layout/TextPasswordField";

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
          viewer: "/provider",
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

    if (nextProps.auth.isAuthenticated && prevState.navigate === false) {
      if (nextProps.auth.user.level === 1) {
        update.viewer = "/user";
      } else if (nextProps.auth.user.level === 2) {
        update.viewer = "/provider";
      } else if (nextProps.auth.user.level === 3) {
        update.viewer = "/admin";
      }
      update.navigate = true;
    }

    if (nextProps.errors && Object.keys(prevState.error).length === 0) {
      update.error = nextProps.errors;
    }

    return update;

    /*
    if (nextProps.auth.isAuthenticated && prevState.navigate) {
      return { navigate: true };
    } else {
      return { navigate: null };
    }
   if (nextProps.errors && prevState.error) {
     return { error: errors };
   } else {
     return {
       error: null,
     };
   }*/
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

      /* try {
        const response = await axios.post("/api/public/login/", user, {
          headers: this.state.headers,
        });
        const res = await response.data;
        console.log(res);
      } catch (error) {
        let err = error.response.data;
        this.setState({
          error: err,
        });
        console.log(err);
      }*/
    }
  };

  render() {
    const { username, error, pass, password, loading, navigate, viewer } =
      this.state;
    const { errors } = this.props;

    return (
      <div className="">
        {/*<div className="form-box mb-3">
          <div className="page-title mb-4 mt-2">
            <h1>Login</h1>
    </div>*/}
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
        {/*</div>*/}
        <div className="login-helper">
          <p className="mb-1">
            New to MIC? <Link to="/register">Join</Link>
          </p>
          <p className="">
            <Link to="/">Forgot your Password?</Link>
          </p>
        </div>
        {navigate && <Navigate to={`${viewer}`} replace={true} />}
      </div>
    );
  }
}

Login.propTypes = {
  loginuser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});
export default connect(mapStateToProps, { loginuser })(Login);