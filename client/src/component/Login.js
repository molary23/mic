import React, { Component } from "react";
import { Link, Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { loginuser } from "../action/authAction";
import { withRouter } from "../util/withRouter";

import TextInputField from "../layout/TextInputField";
import TextPasswordField from "../layout/TextPasswordField";

import Box from "../layout/Box";
import { connect } from "react-redux";

class Login extends Component {
  state = {
    username: "",
    password: "",
    pass: true,
    loading: false,
    error: {},
    navigate: false,
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.setState({
        navigate: true,
      });
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let update = {};

    if (nextProps.auth.isAuthenticated && prevState.navigate) {
      update.navigate = true;
    }

    if (nextProps.errors && prevState.error) {
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
    const { username, error, pass, password, loading, navigate } = this.state;
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
                className="btn btn-primary btn-lg btn-block"
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
        {navigate && <Navigate to="/" replace={true} />}
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
export default connect(mapStateToProps, { loginuser })(withRouter(Login));
