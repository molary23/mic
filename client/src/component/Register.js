import React, { Component } from "react";
import axios from "axios";
import isEmpty from "../validation/emptyChecker";

import TextPasswordField from "../layout/TextPasswordField";
import Modal from "../layout/Modal";
import Box from "../layout/Box";
let typingTimer;
class Register extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    password2: "",
    referral: "",
    error: {},
    pass1: true,
    pass2: true,
    loading: false,
    modal: true,
    loader: {
      email: false,
      username: false,
      referral: false,
    },
    headers: {
      "Content-Type": "application/json",
    },
    typingTimer: null,
    doneTypingInterval: 5000,
  };

  componentDidMount() {
    if (this.props.referred)
      this.setState({
        referral: this.props.referral,
      });
  }

  changeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  checkHandler = (input, target) => {
    let req = {},
      response;

    clearTimeout(typingTimer);
    if (input === "email") {
      req = { email: target };
    } else if (input === "username") {
      req = { username: target };
    } else if (input === "referral") {
      req = { referral: target };
    }
    typingTimer = setTimeout(() => {
      this.setState({
        loader: {
          [input]: true,
        },
      });
      axios
        .post(`/api/public/${input}/`, req, {})
        .then((res) => {
          response = res.data.text;
          this.setState({
            error: {
              [input]: response,
            },
            loader: {
              [input]: false,
            },
          });
        })
        .catch((error) => console.log(error.response));
    }, this.state.doneTypingInterval);
  };

  keyHandler = (e) => {
    if (
      e.target.name === "email" ||
      e.target.name === "username" ||
      e.target.name === "referral"
    ) {
      this.checkHandler(e.target.name, e.target.value);
    }
  };

  checkPassHandler = (caller) => {
    if (caller === 1) {
      this.setState({
        pass1: !this.state.pass1,
      });
    } else {
      this.setState({
        pass2: !this.state.pass2,
      });
    }
  };

  submitHandler = async (e) => {
    e.preventDefault();
    const { username, email, password, password2, referral } = this.state;

    if (isEmpty(email)) {
      this.setState({
        error: {
          email: "Email Address Field can't be Empty",
        },
      });
    } else if (isEmpty(username)) {
      this.setState({
        error: {
          username: "Username Field can't be Empty",
        },
      });
    } else if (isEmpty(password)) {
      this.setState({
        error: {
          password: "Password Field can't be Empty",
        },
      });
    } else if (isEmpty(password2)) {
      this.setState({
        error: {
          password2: "Confirm Password Field can't be Empty",
        },
      });
    } else if (password !== password2) {
      this.setState({
        error: {
          password: "Password mismatched!",
        },
      });
    } else {
      this.setState({
        loading: true,
      });
      const newUser = {
        referral: referral.trim(),
        username: username.trim(),
        email: email.trim(),
        password: password,
      };

      try {
        let response = await axios.post(
          "/api/public/register/",
          {
            newUser,
          },
          {}
        );
        if (response.data === 1) {
          this.setState({
            modal: true,
            username: "",
            email: "",
            password: "",
            password2: "",
            referral: "",
            error: {},
            pass1: true,
            pass2: true,
          });
        }
      } catch (error) {
        console.log(error);
        let err = error.response;
        this.setState({
          error: err.data,
        });
      }
    }
  };

  render() {
    const {
      username,
      email,
      password,
      password2,
      referral,
      error,
      pass1,
      pass2,
      loading,
      modal,
      loader,
    } = this.state;
    return (
      <div className="main-register">
        <div className="register-box">
          <Box sender="Register">
            <form className="register-form" onSubmit={this.submitHandler}>
              <TextPasswordField
                id="register-form-referral"
                placeholder="Referral"
                label="Referral"
                icon={`${loader.referral ? "fas fa-circle-notch fa-spin" : ""}`}
                type="text"
                name="referral"
                value={referral}
                onChange={this.changeHandler}
                disabled={this.props.referred ? "disabled" : ""}
                error={error.referral}
                onKeyUp={this.keyHandler}
              />

              <TextPasswordField
                id="register-form-email"
                placeholder="Email Address"
                label="Email Address"
                icon={`${loader.email ? "fas fa-circle-notch fa-spin" : ""}`}
                type="email"
                name="email"
                value={email}
                onChange={this.changeHandler}
                onClick={() => this.checkPassHandler(1)}
                error={error.email}
                onKeyUp={this.keyHandler}
              />
              <TextPasswordField
                id="register-form-username"
                placeholder="Username"
                label="Username"
                icon={`${loader.username ? "fas fa-circle-notch fa-spin" : ""}`}
                type="text"
                name="username"
                value={username}
                onChange={this.changeHandler}
                onClick={() => this.checkPassHandler(1)}
                error={error.username}
                onKeyUp={this.keyHandler}
              />

              <TextPasswordField
                id="register-form-password"
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
                id="register-form-password"
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
                  className="btn btn-lg btn-block default-btn"
                >
                  Register
                  {loading && (
                    <span className="spinner-border spinner-border-sm ms-2"></span>
                  )}
                </button>
              </div>
            </form>
          </Box>
        </div>
        {modal ? <Modal {...{ modal, sender: "register" }} /> : ""}
      </div>
    );
  }
}

export default Register;
