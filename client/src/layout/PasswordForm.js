import React, { useState } from "react";
import PropTypes from "prop-types";

import TextPasswordField from "./TextPasswordField";
import { BsEyeSlash, BsEye } from "react-icons/bs";

function PasswordForm(props) {
  const { onSubmit, error } = props;
  const [inputs, setInputs] = useState({});
  const [errors, setErrors] = useState({});
  const [pass, setPass] = useState({
    pass1: true,
    pass2: true,
    pass3: true,
  });

  const [loading, setLoading] = useState(false);

  const checkPassHandler = (value) => {
    if (value === 1) {
      setPass({ ...pass, pass1: !pass.pass1 });
    } else if (value === 2) {
      setPass({ ...pass, pass2: !pass.pass2 });
    } else if (value === 3) {
      setPass({ ...pass, pass3: !pass.pass3 });
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (
      !Object.keys(inputs).includes("oldpassword") ||
      inputs.oldpassword === ""
    ) {
      setErrors({
        oldpassword: "Old Password Field can't be empty",
      });
    } else if (
      !Object.keys(inputs).includes("newpassword") ||
      inputs.newpassword === ""
    ) {
      setErrors({
        newpassword: "New Password Field can't be empty",
      });
    } else if (inputs.newpassword.length < 8) {
      setErrors({
        newpassword: "New Password should be at least 8 characters",
      });
    } else if (
      !Object.keys(inputs).includes("newpassword2") ||
      inputs.newpassword2 === ""
    ) {
      setErrors({
        newpassword2: "Confirm New Password Field can't be empty",
      });
    } else if (inputs.newpassword2.length < 8) {
      setErrors({
        newpassword2: "Confirm New Password should be at least 8 characters",
      });
    } else if (inputs.newpassword !== inputs.newpassword2) {
      setErrors({
        newpassword2: "Password Mismatched",
      });
    } else if (inputs.oldpassword === inputs.newpassword) {
      setErrors({
        newpassword: "You can't change your Password to your Old Password",
      });
    } else {
      setLoading(true);
      setErrors({});
      const pass = {
        old: inputs.oldpassword,
        new: inputs.newpassword,
      };
      onSubmit(pass);
    }
  };
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setInputs((values) => ({ ...values, [name]: value }));
  };
  return (
    <div className="settings-form-password dash-card settings-form-card">
      <div className="page-title mb-2 mt-1">
        <h4>Add/Modify Password</h4>
      </div>
      <form className="change-password-form" onSubmit={submitHandler}>
        <TextPasswordField
          id="add-admin-form-password"
          placeholder="Old Password"
          icon={pass.pass1 ? <BsEye /> : <BsEyeSlash />}
          type={pass.pass1 ? "password" : "text"}
          name="oldpassword"
          value={inputs.oldpassword || ""}
          onChange={changeHandler}
          onClick={() => checkPassHandler(1)}
          error={errors.oldpassword || error.password}
        />
        <TextPasswordField
          id="add-admin-form-password"
          placeholder="New Password"
          icon={pass.pass2 ? <BsEye /> : <BsEyeSlash />}
          type={pass.pass2 ? "password" : "text"}
          name="newpassword"
          value={inputs.newpassword || ""}
          onChange={changeHandler}
          onClick={() => checkPassHandler(2)}
          error={errors.newpassword}
        />
        <TextPasswordField
          id="add-admin-form-password"
          placeholder="Confirm New Password"
          icon={pass.pass3 ? <BsEye /> : <BsEyeSlash />}
          type={pass.pass3 ? "password" : "text"}
          name="newpassword2"
          value={inputs.newpassword2 || ""}
          onChange={changeHandler}
          onClick={() => checkPassHandler(3)}
          error={errors.newpassword2}
        />
        <div className="d-grid">
          <button
            type="submit"
            className="btn default-btn btn-lg btn-block"
            disabled={loading && true}
          >
            Change Password
            {loading && (
              <span className="spinner-border spinner-border-sm ms-2"></span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

PasswordForm.propTypes = {
  onSubmit: PropTypes.func,
  error: PropTypes.object,
};

export default PasswordForm;
