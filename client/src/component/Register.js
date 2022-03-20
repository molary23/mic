import React, { Component } from "react";
import axios from "axios";
import isEmpty from "../validation/emptyChecker";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import TextPasswordField from "../layout/TextPasswordField";
import Modal from "../layout/Modal";
import Box from "../layout/Box";
import isEmail from "validator/lib/isEmail";
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
    modal: false,
    loader: {
      email: false,
      username: false,
      referral: false,
    },
    phone: "",
    headers: {
      "Content-Type": "application/json",
    },
    typingTimer: null,
  };

  componentDidMount() {
    if (this.props.referred) {
      this.setState({
        referral: this.props.referral,
      });
    }
  }

  changeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  checkHandler = (input, target) => {
    let req = {},
      response;
    if (target !== "") {
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
      }, 5000);
    }
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

  modalHandler = (close) => {
    this.setState({
      modal: close,
    });
  };

  submitHandler = async (e) => {
    e.preventDefault();
    const { username, email, password, password2, referral, phone } =
      this.state;
    let pattern = new RegExp("^[a-zA-Z0-9._-]+$");
    let tester = pattern.test(username);
    if (isEmpty(email)) {
      this.setState({
        error: {
          email: "Email Address Field can't be Empty",
        },
      });
    } else if (!isEmail(email)) {
      this.setState({
        error: {
          email: "Only Email Address is allowed",
        },
      });
    } else if (phone.length < 12) {
      this.setState({
        error: {
          phone: "Phone Number should be atleast 12 Characters",
        },
      });
    } else if (isEmpty(username)) {
      this.setState({
        error: {
          username: "Username Field can't be Empty",
        },
      });
    } else if (isEmail(username)) {
      this.setState({
        error: {
          username: "Username Field can't be an Email",
        },
      });
    } else if (!tester) {
      this.setState({
        error: {
          username:
            "Only contain Letters, Numbers and (.-_) characters allowed",
        },
      });
    } else if (isEmpty(password)) {
      this.setState({
        error: {
          password: "Password Field can't be Empty",
        },
      });
    } else if (password.length < 8) {
      this.setState({
        error: {
          password: "Password should be atleast 8 characters",
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
        error: {},
      });
      const user = {
        referral: referral.trim(),
        username: username.trim(),
        email: email.trim(),
        phone: phone.split(" ").join("").trim(),
        password: password,
      };

      try {
        let response = await axios.post(
          "/api/public/register/",
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
            email: "",
            password: "",
            password2: "",
            referral: "",
            phone: "",
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
      phone,
    } = this.state;
    const { referred } = this.props;
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
                disabled={referred ? "disabled" : ""}
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
                //onClick={() => this.checkPassHandler(1)}
                error={error.email}
                onKeyUp={this.keyHandler}
              />

              <PhoneInput
                country={"ng"}
                value={phone}
                onChange={(phone) => this.setState({ phone })}
                className="phone-with-input"
                placeholder="Phone Number"
              />
              {error.phone && (
                <small className="text-muted">{error.phone}</small>
              )}
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
                icon={`far ${pass1 ? "fa-eye" : "fa-eye-slash"}`}
                type={pass1 ? "password" : "text"}
                name="password"
                value={password}
                onChange={this.changeHandler}
                onClick={() => this.checkPassHandler(1)}
                error={error.password}
              />
              <TextPasswordField
                id="register-form-password2"
                placeholder="Confirm Password"
                label="Confirm Password"
                icon={`far ${pass2 ? "fa-eye" : "fa-eye-slash"}`}
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
