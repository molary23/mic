import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import decrypt from "../util/decrypt";

import isEmpty from "../validation/emptyChecker";

import TextInputField from "../layout/TextInputField";
import Modal from "../layout/Modal";
import Box from "../layout/Box";

export class VerifyEmail extends Component {
  state = {
    username: "",
    code: "",
    loading: false,
    error: {},
    modal: false,
  };
  componentDidMount() {
    let search = window.location.search;

    if (search !== "") {
      let ref = search.split("?")[1],
        sender = ref.split("=")[0];
      if (sender === "refer") {
        let params = search.split("refer=")[1],
          opt = decrypt(params),
          values = JSON.parse(opt);
        this.setState({
          username: values.username,
          code: values.code.toUpperCase(),
        });
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

  submitHandler = async (e) => {
    e.preventDefault();
    const { username, code } = this.state;
    if (isEmpty(username)) {
      this.setState({
        error: {
          username: "Username Field can't be Empty",
        },
      });
    } else if (isEmpty(code)) {
      this.setState({
        error: {
          code: "Code can't be Empty",
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

      try {
        let response = await axios.post(
          "/api/public/verify/",
          {
            userverify,
          },
          {}
        );
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
        console.log(error);
        let err = error.response;
        this.setState({
          error: err.data,
        });
      }
    }
  };

  render() {
    const { username, code, error, loading, modal } = this.state;
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
              <button
                type="submit"
                className="btn default-btn btn-lg btn-block"
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
