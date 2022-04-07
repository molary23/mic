import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import isEmail from "validator/lib/isEmail";
import isEmpty from "../../validation/emptyChecker";

import TextInputField from "../../layout/TextInputField";
import Modal from "../../layout/Modal";
import Box from "../../layout/Box";

export class Forgot extends Component {
  state = {
    username: "",
    modall: false,
    loading: false,
    error: {},
  };

  changeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  modalHandler = (close) => {
    this.setState({
      modal: close,
    });
  };

  submitHandler = async (e) => {
    e.preventDefault();
    const { username } = this.state;
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
    } else {
      this.setState({
        loading: true,
      });
      const user = {
        username,
      };
      try {
        let response = await axios.post(
          "/api/view/forgot",
          {
            user,
          },
          {}
        );
        if (response.data === 1) {
          this.setState({
            modal: true,
            loading: false,
            username: "",
            error: {},
          });
        }
      } catch (error) {
        let err = error.response;
        if (err.status === 404) {
          this.setState({
            error: {
              network: "There has been a network error. Refresh and try again.",
            },
            loading: false,
          });
        } else {
          this.setState({
            error: { username: err.data.error },
            loading: false,
          });
        }
      }
    }
  };

  render() {
    const { username, error, loading, modal } = this.state;
    return (
      <div>
        <Box sender="Forgot Password">
          <form className="login-form" onSubmit={this.submitHandler}>
            <TextInputField
              id="forgot-form-email"
              placeholder="Email Address/Username"
              type="text"
              name="username"
              value={username}
              onChange={this.changeHandler}
              error={error.username}
            />
            <div className="d-grid">
              {error.network && (
                <small className="text-muted mb-2">{error.network}</small>
              )}
              <button
                type="submit"
                className="btn btn-lg btn-block default-btn"
                disabled={loading && true}
              >
                Get Code
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
            Take me back to <Link to="/">Login</Link>
          </p>
        </div>
        {modal ? (
          <Modal {...{ modal, sender: "forgot" }} onClick={this.modalHandler} />
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default Forgot;
