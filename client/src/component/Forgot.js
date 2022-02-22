import React, { Component } from "react";

import TextInputField from "../layout/TextInputField";

import Box from "../layout/Box";

export class Forgot extends Component {
  state = {
    username: "",

    loading: false,
    error: {},
  };

  render() {
    const { username, error, loading } = this.state;
    return (
      <div>
        <Box sender="Forgot Password">
          <form className="login-form" onSubmit={this.submitHandler}>
            <TextInputField
              id="forgot-form-email"
              placeholder="Email Address/Username"
              label="Email Address/Username"
              type="text"
              name="username"
              value={username}
              onChange={this.changeHandler}
              error={error.username}
            />
            <div className="d-grid">
              <button
                type="submit"
                className="btn btn-primary btn-lg btn-block"
              >
                Get Code
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
