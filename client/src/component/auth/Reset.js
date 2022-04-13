import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Navigate, Link } from "react-router-dom";

import { resetPass } from "../../action/confirmAction";

import isEmpty from "../../validation/emptyChecker";
import TextPasswordField from "../../layout/TextPasswordField";
import Box from "../../layout/Box";
import Modal from "../../layout/Modal";

import { BsEyeSlash, BsEye } from "react-icons/bs";

export class Reset extends Component {
  state = {
    password: "",
    password2: "",
    error: {},
    pass1: true,
    pass2: true,
    loading: false,
    navigate: false,
    modal: false,
    UserId: localStorage.getItem("confirm") ?? this.props.confirm.message.value,
  };

  componentDidMount() {
    if (!this.props.confirm.isConfirmed) {
      this.setState({
        navigate: true,
      });
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let update = {};

    if (nextProps.confirm.reset && prevState.modal === false) {
      update.modal = true;
    }

    if (nextProps.errors) {
      update.error = nextProps.errors;
      update.loading = false;
    }

    return update;
  }

  changeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
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
    const { password, password2, UserId } = this.state;
    if (isEmpty(password)) {
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
      });
      const pass = {
        password: password,
        UserId,
      };
      this.props.resetPass(pass);
    }
  };

  render() {
    const {
      password,
      password2,
      error,
      loading,
      pass1,
      pass2,
      navigate,
      modal,
    } = this.state;
    return (
      <div>
        <Box sender="Reset Password">
          <form className="login-form" onSubmit={this.submitHandler}>
            <TextPasswordField
              id="reset-form-password"
              placeholder="Password"
              label="Password"
              icon={pass1 ? <BsEye /> : <BsEyeSlash />}
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
              icon={pass2 ? <BsEye /> : <BsEyeSlash />}
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
                disabled={loading && true}
              >
                Reset
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
          <Modal {...{ modal, sender: "reset" }} onClick={this.modalHandler} />
        ) : (
          ""
        )}
        {navigate && <Navigate to="/confirm" replace={true} />}
      </div>
    );
  }
}

Reset.propTypes = {
  confirm: PropTypes.object.isRequired,
  reset: PropTypes.object,
  resetPass: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  confirm: state.confirm,
  errors: state.errors,
});
export default connect(mapStateToProps, {
  resetPass,
})(Reset);
