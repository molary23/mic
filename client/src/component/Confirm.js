import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { confirmCode, clearErrors } from "../action/confirmAction";

import isEmpty from "../validation/emptyChecker";

import TextInputField from "../layout/TextInputField";
import Modal from "../layout/Modal";
import Box from "../layout/Box";

export class Confirm extends Component {
  state = {
    username: "",
    code: "",
    loading: false,
    error: {},
    navigate: false,
    modal: false,
  };
  componentDidMount() {
    this.props.clearErrors();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let update = {};

    if (nextProps.confirm.isConfirmed && prevState.modal === false) {
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
      });
      const usercode = {
        username: username.trim(),
        code: code,
      };

      this.props.confirmCode(usercode);
    }
  };

  render() {
    const { username, code, error, loading, modal } = this.state;
    //const { errors } = this.props;
    return (
      <div>
        <Box sender="Confirm Code">
          <form className="login-form" onSubmit={this.submitHandler}>
            <TextInputField
              id="reset-form-email"
              placeholder="Email Address/Username"
              type="text"
              name="username"
              value={username}
              onChange={this.changeHandler}
              error={error.username}
            />
            <TextInputField
              id="reset-form-code"
              placeholder="Reset Code"
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
        <div className="login-helper">
          <p className="mb-1">
            <Link to="/forgot">Need a new code?</Link>
          </p>
          <p className="mb-1">
            New to MIC? <Link to="/register">Join</Link>
          </p>
          <p className="">
            Take me back to <Link to="/">Login</Link>
          </p>
        </div>
        {modal ? <Modal {...{ modal, sender: "confirm" }} /> : null}
      </div>
    );
  }
}

Confirm.propTypes = {
  confirmCode: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  confirm: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  confirm: state.confirm,
  errors: state.errors,
});
export default connect(mapStateToProps, { confirmCode, clearErrors })(Confirm);
