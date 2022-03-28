import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { confirmCode, clearErrors } from "../action/confirmAction";

import isEmpty from "../validation/emptyChecker";

import TextInputField from "../layout/TextInputField";
import Modal from "../layout/Modal";
import Box from "../layout/Box";
import decrypt from "../util/decrypt";
import isEmail from "validator/lib/isEmail";
import isAlphanumeric from "validator/lib/isAlphanumeric";

export class Confirm extends Component {
  state = {
    username: "",
    code: "",
    loading: false,
    error: {},
    navigate: false,
    modal: false,
    sender: "",
    servererror: {},
  };
  componentDidMount() {
    this.props.clearErrors();

    let search = window.location.search;

    if (search !== "") {
      let fullparams = search.split("auth="),
        auth = fullparams[1].split("&")[0];

      let ref = fullparams[1].split("&"),
        sender = ref[1].split("=")[0];

      if (sender === "refer") {
        let params = ref[1].split("=")[1],
          opt = decrypt(params);
        try {
          let values = JSON.parse(opt);
          if (auth === "no") {
            let pattern = new RegExp("^[a-zA-Z0-9._-]+$"),
              tester = pattern.test(values.username);
            if (tester && isAlphanumeric(values.code)) {
              const usercode = {
                username: values.username.trim(),
                code: values.code.toLowerCase(),
                auth: "no",
              };
              this.props.confirmCode(usercode);
            }
          } else {
            this.setState({
              username: values.username,
              code: values.code.toUpperCase(),
            });
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

  static getDerivedStateFromProps(nextProps, prevState) {
    let update = {};

    if (
      nextProps.confirm.isConfirmed &&
      !prevState.modal &&
      nextProps.confirm.message.message
    ) {
      update.modal = true;
      update.sender = "confirmed";
    }
    if (
      nextProps.confirm.isConfirmed &&
      !prevState.modal &&
      !nextProps.confirm.message.message
    ) {
      update.modal = true;
      update.sender = "unconfirmed";
    }

    if (nextProps.errors !== prevState.errors) {
      if (nextProps.errors.status === 400) {
        update.servererror = nextProps.errors.data;
      }
      if (nextProps.errors.status === 404) {
        update.servererror = {
          network: "There has been a network error. Refresh and try again.",
        };
      }
      update.loading = false;
    }

    return update;
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
      });
      const usercode = {
        username: username.trim(),
        code: code.toLowerCase(),
        auth: "yes",
      };

      this.props.confirmCode(usercode);
    }
  };

  render() {
    const { username, code, error, loading, modal, sender, servererror } =
      this.state;
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
              error={error.username || servererror.username}
            />
            <TextInputField
              id="reset-form-code"
              placeholder="Reset Code"
              type="text"
              name="code"
              value={code}
              onChange={this.changeHandler}
              error={error.code || servererror.code}
            />
            <div className="d-grid">
              {servererror.network && (
                <small className="text-muted mb-2">{servererror.network}</small>
              )}
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
        {modal ? (
          <Modal {...{ modal, sender }} onClick={this.modalHandler} />
        ) : null}
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
