import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { confirmCode } from "../action/confirmAction";

import isEmpty from "../validation/emptyChecker";

import TextInputField from "../layout/TextInputField";

import Box from "../layout/Box";

export class Confirm extends Component {
  state = {
    username: "",
    code: "",
    loading: false,
    error: {},
    navigate: false,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    let update = {};

    if (nextProps.auth.isConfirmed && prevState.navigate === false) {
      update.navigate = true;
    }

    if (nextProps.errors && Object.keys(prevState.error).length === 0) {
      update.error = nextProps.errors;
    }

    return update;
  }

  changeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
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
          password: "Password Field can't be Empty",
        },
      });
    } else {
      this.setState({
        loading: true,
      });
      const usercode = {
        username: username.trim(),
        code: code,
      };

      this.props.confirmCode(usercode);

      /*  try {
        let response = await axios.post(
          "/api/public/confirm/",
          {
            usercode,
          },
          {}
        );
        console.log(response);
          if (response.data === 1) {
          this.setState({
            modal: true,
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
        console.log(error.response);
        let err = error.response;
        this.setState({
          error: err.data,
        });
      }*/
    }
  };

  render() {
    const { username, code, error, loading } = this.state;
    //const { errors } = this.props;
    return (
      <div>
        <Box sender="Confirm Code">
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
                className="btn default-btn btn-lg btn-block"
              >
                Confirm Code
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

Confirm.propTypes = {
  confirmCode: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  confirm: state.confirm,
  error: state.error,
});
export default connect(mapStateToProps, { confirmCode })(Confirm);
