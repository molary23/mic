import React, { useState } from "react";
import { loginuser } from "../action/authAction";
import { withRouter } from "../util/withRouter";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import TextInputField from "../layout/TextInputField";
import TextPasswordField from "../layout/TextPasswordField";

function FormBox(props) {
  const [inputs, setInputs] = useState({});
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [pass, setPass] = useState(false);

  const submitHandler = async (e) => {
    setLoading(true);
    e.preventDefault();
    const { username, password } = inputs;
    if (username === "" || username === undefined) {
      setError({ username: "Email Address/Username Field can't be Empty" });
      setLoading(false);
    } else if (password === "" || password === undefined) {
      setError({ password: "Password Field can't be Empty" });
      setLoading(false);
    } else {
      const user = {
        username,
        password,
      };

      console.log(user);
      setLoading(false);

      //this.props.loginuser(user);

      /* try {
        const response = await axios.post("/api/public/login/", user, {
          headers: this.state.headers,
        });
        const res = await response.data;
        console.log(res);
      } catch (error) {
        let err = error.response.data;
        this.setState({
          error: err,
        });
        console.log(err);
      }*/
    }
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const checkPassHandler = () => {
    setPass(!pass);
  };

  return (
    <div>
      <div className="form-box mb-3">
        <div className="page-title mb-4 mt-2">
          <h1>Login</h1>
        </div>
        <form className="login-form" onSubmit={submitHandler}>
          <TextInputField
            id="login-form-email"
            placeholder="Email Address/Username"
            label="Email Address/Username"
            type="text"
            name="username"
            value={inputs.username || ""}
            onChange={changeHandler}
            error={error.username}
          />
          <TextPasswordField
            id="login-form-password"
            placeholder="Password"
            label="Password"
            icon={`far ${pass ? "fa-eye-slash" : "fa-eye"}`}
            type={pass ? "password" : "text"}
            name="password"
            value={inputs.password || ""}
            onChange={changeHandler}
            onClick={checkPassHandler}
            error={error.password}
          />
          <div className="d-grid">
            <button type="submit" className="btn btn-primary btn-lg btn-block">
              Login
              {loading && (
                <span className="spinner-border spinner-border-sm ms-2"></span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

FormBox.propTypes = {
  loginuser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});
export default connect(mapStateToProps, { loginuser })(withRouter(FormBox));
