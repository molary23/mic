import React, { useState } from "react";

import TextPasswordField from "./TextPasswordField";
import Select from "./Select";

function PasswordForm(props) {
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

  const submitHandler = (e) => {};
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
          error={errors.oldpassword}
        />
        <TextPasswordField
          id="add-admin-form-password"
          placeholder="New Password"
          icon={`far ${pass2 ? "fa-eye" : "fa-eye-slash"}`}
          type={pass2 ? "password" : "text"}
          name="newpasswordd"
          value={inputs.newpasswordd || ""}
          onChange={changeHandler}
          onClick={() => checkPassHandler(2)}
          error={errors.newpasswordd}
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
