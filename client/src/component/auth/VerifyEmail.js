import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import decrypt from "../../util/decrypt";

import isEmpty from "../../validation/emptyChecker";

import TextInputField from "../../layout/TextInputField";
import Modal from "../../layout/Modal";
import Box from "../../layout/Box";
import isAlphanumeric from "validator/lib/isAlphanumeric";
import isEmail from "validator/lib/isEmail";

export class VerifyEmail extends Component {
  state = {
    username: "",
    code: "",
    loading: false,
    error: {},
    modal: false,
    servererror: null,
  };
  componentDidMount() {
    let search = window.location.search;

    if (search !== "") {
      let ref = search.split("?")[1],
        sender = ref.split("=")[0];
      if (sender === "refer") {
        let params = search.split("refer=")[1],
          opt = decrypt(params, "mail");
        try {
          let values = JSON.parse(opt);
          this.setState({
            username: values.username,
            code: values.code.toUpperCase(),
          });
          let pattern = new RegExp("^[a-zA-Z0-9._-]+$"),
            tester = pattern.test(values.username);
          if (tester && isAlphanumeric(values.code)) {
            const userverify = {
              username: values.username,
              code: values.code.toLowerCase(),
            };
            this.pushData(userverify);
          }
        } catch (error) {
          this.setState({
            error: {
              username: "Invalid URL code",
            },
          });
        }
      }
    }
  }

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

  submitHandler = (e) => {
    e.preventDefault();
    const { username, code } = this.state;
    let pattern = new RegExp("^[a-zA-Z0-9._-]+$"),
      tester = pattern.test(username);
    if (isEmpty(username)) {
      this.setState({
        error: {
          username: "Username Field can't be Empty",
        },
      });
    } else if (!tester && !isEmail(username)) {
      this.setState({
        error: {
          username: "Enter a valid Username or Email Address",
        },
      });
    } else if (isEmpty(code)) {
      this.setState({
        error: {
          code: "Code can't be Empty",
        },
      });
    } else if (!isAlphanumeric(code)) {
      this.setState({
        error: {
          code: "Code can only be Alphanumeric",
        },
      });
    } else {
      this.setState({
        loading: true,
        error: {},
      });
      const userverify = {
        username: username.trim(),
        code: code.toLowerCase(),
      };
      this.pushData(userverify);
    }
  };

  pushData = async (data) => {
    try {
      let response = await axios({
        method: "post",
        url: "/api/view/verify/",
        data,
        timeout: 60000, // only wait for 60s
      });
      if (response.data === 1) {
        this.setState({
          modal: true,
          loading: false,
          username: "",
          code: "",
          error: {},
        });
      }
    } catch (error) {
      this.setState({
        loading: false,
      });
      if (error.code === "ECONNABORTED") {
        this.setState({
          servererror: "Request Timed out. Refresh and Try again later.",
        });
      } else {
        this.setState({
          error: error.response.data,
        });
      }
    }
  };

  render() {
    const { username, code, error, loading, modal, servererror } = this.state;
    return (
      <div>
        <Box sender="Verify Email Address">
          <form className="verify-form" onSubmit={this.submitHandler}>
            <TextInputField
              id="verify-form-email"
              placeholder="Email Address/Username"
              type="text"
              name="username"
              value={username}
              onChange={this.changeHandler}
              error={error.username}
            />
            <TextInputField
              id="verify-form-code"
              placeholder="Verification Code"
              type="text"
              name="code"
              value={code}
              onChange={this.changeHandler}
              error={error.code}
            />
            <div className="d-grid">
              {servererror && (
                <small className="text-muted mb-2">{servererror}</small>
              )}
              <button
                type="submit"
                className="btn default-btn btn-lg btn-block"
                disabled={loading && true}
              >
                Verify Code
                {loading && (
                  <span className="spinner-border spinner-border-sm ms-2"></span>
                )}
              </button>
            </div>
          </form>
        </Box>
        <div className="login-helper">
          <p className="mb-1">
            Need a new code? <Link to="/">Login Again</Link>
          </p>
          <p className="mb-1">
            New to MIC? <Link to="/register">Join</Link>
          </p>
        </div>
        {modal ? (
          <Modal {...{ modal, sender: "verify" }} onClick={this.modalHandler} />
        ) : null}
      </div>
    );
  }
}

VerifyEmail.propTypes = {};

export default VerifyEmail;
