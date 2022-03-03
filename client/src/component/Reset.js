import React, { Component } from "react";

import TextPasswordField from "../layout/TextPasswordField";

import Box from "../layout/Box";

export class Reset extends Component {
  state = {
    password: "",
    password2: "",
    error: {},
    pass1: true,
    pass2: true,
    loading: false,
  };

  render() {
    const { password, password2, error, loading, pass1, pass2 } = this.state;
    return (
      <div>
        <Box sender="Reset Password">
          <form className="login-form" onSubmit={this.submitHandler}>
            <TextPasswordField
              id="reset-form-password"
              placeholder="Password"
              label="Password"
              icon={`far ${pass1 ? "fa-eye-slash" : "fa-eye"}`}
              type={pass1 ? "password" : "text"}
              name="password"
              value={password}
              onChange={this.changeHandler}
              onClick={() => this.checkPassHandler(1)}
              error={error.password}
            />
            <TextPasswordField
              id="reset-form-password2"
              placeholder="Confirm Password"
              label="Confirm Password"
              icon={`far ${pass2 ? "fa-eye-slash" : "fa-eye"}`}
              type={pass2 ? "password" : "text"}
              name="password2"
              value={password2}
              onChange={this.changeHandler}
              onClick={() => this.checkPassHandler(2)}
              error={error.password2}
            />

            <div className="d-grid">
              <button
                type="submit"
                className="btn default-btn btn-lg btn-block"
              >
                Reset
                {loading && (
                  <span className="spinner-border spinner-border-sm ms-2"></span>
                )}
              </button>
            </div>
          </form>
        </Box>
      </div>
    );
  }
}

export default Reset;
