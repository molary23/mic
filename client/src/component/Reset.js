import React, { Component } from "react";

import TextInputField from "../layout/TextInputField";

import Box from "../layout/Box";

export class Forgot extends Component {
  state = {
    username: "",
    code: "",
    loading: false,
    error: {},
  };

  render() {
    const { username, code, error, loading } = this.state;
    return (
      <div>
        <Box sender="Reset Password">
          <form className="login-form" onSubmit={this.submitHandler}>
            <TextInputField
              id="reset-form-email"
              placeholder="Email Address/Username"
              label="Email Address/Username"
              type="text"
              name="username"
              value={username}
              onChange={this.changeHandler}
              error={error.username}
            />
            <TextInputField
              id="reset-form-code"
              placeholder="Reset Code"
              label="Reset Code"
              type="text"
              name="code"
              value={code}
              onChange={this.changeHandler}
              error={error.code}
            />
            <div className="d-grid">
              <button
                type="submit"
                className="btn btn-primary btn-lg btn-block"
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

export default Forgot;
