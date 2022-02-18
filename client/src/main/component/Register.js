import React, { Component } from "react";
import axios from "axios";
import isEmpty from "../../validation/emptyChecker";

import TextInputField from "../../layout/TextInputField";
import TextPasswordField from "../../layout/TextPasswordField";

class Register extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    password2: "",
    referral: this.props.referral,
    error: {},
    pass1: true,
    pass2: true,
    loading: false,
    headers: {
      "Content-Type": "application/json",
    },
  };

  componentDidMount() {
    console.log(this.props.referred);
    console.log(this.props.referral);
    /*  if (this.props.match.params.referral) {
      this.setState({
        referral: this.props.match.params.referral,
      });
      console.log(this.state.referral);
    }


     
    let email = "molary23@gmail.com";
    axios
      .post(
        "api/public/email/",
        { email: email },
        {
          headers: this.state.headers,
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((error) => console.log(error));

    axios
      .get("api/public/finder/")
      .then((res) => {
        console.log(res);
      })
      .catch((error) => console.log(error));
      */
  }

  changeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  clickHandler = (caller) => {
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

  submitHandler = (e) => {
    this.setState({
      loading: true,
    });
    e.preventDefault();
    const { username, email, password, password2, referral } = this.state;

    if (isEmpty(username)) {
      this.setState({
        error: {
          username: "Username Field can't be Empty",
        },
        loading: false,
      });
    } else if (isEmpty(email)) {
      this.setState({
        error: {
          email: "Email Address Field can't be Empty",
        },
        loading: false,
      });
    } else if (isEmpty(password)) {
      this.setState({
        error: {
          password: "Password Field can't be Empty",
        },
        loading: false,
      });
    } else if (isEmpty(password2)) {
      this.setState({
        error: {
          password2: "Confirm Password Field can't be Empty",
        },
        loading: false,
      });
    } else if (password !== password2) {
      this.setState({
        error: {
          password: "Password mismatched!",
        },
        loading: false,
      });
    } else {
      this.setState({
        loading: false,
      });
      const newUser = {
        referral: referral.trim(),
        username: username.trim(),
        email: email.trim(),
        password: password,
      };

      axios
        .post(
          "api/public/register/",
          {
            newUser,
          },
          {
            headers: this.state.headers,
          }
        )
        .then((res) => {
          console.log(res.data);
        })
        .catch((error) => {
          let err = error.response;
          this.setState({
            error: err.data,
          });
        });
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
    } = this.state;
    return (
      <div className="main-register">
        <div className="register-box">
          <div className="form-box">
            <form className="register-form" onSubmit={this.submitHandler}>
              <TextInputField
                id="register-form-referral"
                placeholder="Referral"
                label="Referral"
                type="text"
                name="referral"
                value={referral}
                onChange={this.changeHandler}
                disabled={this.props.referred ? "disabled" : ""}
              />
              <TextInputField
                id="register-form-email"
                placeholder="Email Address"
                label="Email Address"
                type="email"
                name="email"
                value={email}
                onChange={this.changeHandler}
                error={error.email}
              />
              <TextInputField
                id="register-form-username"
                placeholder="Username"
                label="Username"
                type="text"
                name="username"
                value={username}
                onChange={this.changeHandler}
                error={error.username}
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
                onClick={() => this.clickHandler(1)}
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
                onClick={() => this.clickHandler(2)}
                error={error.password2}
              />
              <div className="d-grid">
                <button
                  type="submit"
                  className="btn btn-primary btn-lg btn-block"
                >
                  Register
                  {loading && (
                    <span className="loader ms-2">
                      <i className="fas fa-spinner fa-spin" />
                    </span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
