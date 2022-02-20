import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { loginuser } from "../../action/authAction";
import { withRouter } from "../../util/withRouter";

import TextInputField from "../../layout/TextInputField";
import TextPasswordField from "../../layout/TextPasswordField";
import logo from "../../asset/images/logo.png";
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

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.setState({});
    }
    if (nextProps.errors) {
      this.setState({
        error: nextProps.errors,
      });
    }
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
    const { username, error, pass, password, loading } = this.state;
    return (
      <div className="login-page">
        <div className="login-box">
          <img alt="MIC Earn Business Logo" src={logo} className="mb-4" />
          <div className="form-box mb-3">
            <div className="page-title mb-4 mt-2">
              <h1>Login</h1>
            </div>
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
                  Register
                  {loading && (
                    <span className="spinner-border spinner-border-sm ms-2"></span>
                  )}
                </button>
              </div>
            </form>
          </div>
          <div className="login-helper">
            <p className="mb-1">
              New to MIC? <Link to="//localhost:3000/register">Join</Link>
            </p>
            <p className="">
              <Link to="/">Forgot your Password?</Link>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginuser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapToStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});
export default connect(mapToStateToProps, { loginuser })(withRouter(Login));
