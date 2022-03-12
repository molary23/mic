import React, { useState } from "react";

import TextPasswordField from "./TextPasswordField";

function PasswordForm(props) {
  const { onSubmit, error } = props;
  const [inputs, setInputs] = useState({});
  const [errors, setErrors] = useState({});
  const [pass1, setPass1] = useState(true);
  const [pass2, setPass2] = useState(true);
  const [pass3, setPass3] = useState(true);
  const [loading, setLoading] = useState(false);

  const checkPassHandler = (value) => {
    if (value === 1) {
      setPass1(!pass1);
    } else if (value === 2) {
      setPass2(!pass2);
    } else if (value === 3) {
      setPass3(!pass3);
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
        <h4>Add/Modify Account</h4>
      </div>
      <form className="change-password-form" onSubmit={submitHandler}>
        <TextPasswordField
          id="add-admin-form-password"
          placeholder="Old Password"
          icon={`far ${pass1 ? "fa-eye" : "fa-eye-slash"}`}
          type={pass1 ? "password" : "text"}
          name="oldpassword"
          value={inputs.oldpassword || ""}
          onChange={changeHandler}
          onClick={() => checkPassHandler(1)}
          error={errors.oldpassword || error.password}
        />
        <TextPasswordField
          id="add-admin-form-password"
          placeholder="New Password"
          icon={`far ${pass2 ? "fa-eye" : "fa-eye-slash"}`}
          type={pass2 ? "password" : "text"}
          name="newpassword"
          value={inputs.newpassword || ""}
          onChange={changeHandler}
          onClick={() => checkPassHandler(2)}
          error={errors.newpassword}
        />
        <TextPasswordField
          id="add-admin-form-password"
          placeholder="Confirm New Password"
          icon={`far ${pass3 ? "fa-eye" : "fa-eye-slash"}`}
          type={pass3 ? "password" : "text"}
          name="newpassword2"
          value={inputs.newpassword2 || ""}
          onChange={changeHandler}
          onClick={() => checkPassHandler(3)}
          error={errors.newpassword2}
        />
        <div className="d-grid">
          <button type="submit" className="btn default-btn btn-lg btn-block">
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

export default PasswordForm;
