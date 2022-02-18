import React, { Component } from "react";
import { Link } from "react-router-dom";

import TextInputField from "../../layout/TextInputField";
import TextPasswordField from "../../layout/TextPasswordField";
import logo from "../../asset/images/logo.png";

class Login extends Component {
  state = {
    email: "",
    password: "",
    pass: false,
    loading: false,
    error: {},
  };

  changeHandler = (e) => {};
  render() {
    const { email, error, pass, password, loading } = this.state;
    return (
      <div className="login-page">
        <div className="login-box">
          <img alt="MIC Earn Business Logo" src={logo} className="mb-4" />
          <div className="form-box mb-3">
            <div className="page-title mb-3">
              <h1>Login</h1>
            </div>
            <form>
              <TextInputField
                id="login-form-email"
                placeholder="Email Address"
                label="Email Address"
                type="email"
                name="email"
                value={email}
                onChange={this.changeHandler}
                error={error.email}
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
                onClick={() => this.clickHandler(1)}
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
export default Login;
