import React, { useState } from "react";
import TextInputField from "./TextInputField";
function ProfileForm(props) {
  const { onSubmit, userinfo } = props;
  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({});

  const submitHandler = (e) => {};
  const changeHandler = (e) => {};

  return (
    <div className="settings-form-profile dash-card settings-form-card">
      <form className="edit-profile-form" onSubmit={submitHandler}>
        <TextInputField
          id="profile-form-lastname"
          placeholder="Last Name"
          type="text"
          name="lastname"
          value={inputs.lastname || userinfo.lastname}
          onChange={changeHandler}
          error={errors.lastname}
        />
        <TextInputField
          id="profile-form-firstname"
          placeholder="First Name"
          type="text"
          name="firstname"
          value={inputs.firstname || userinfo.firstname}
          onChange={changeHandler}
          error={errors.firstname}
        />
        <div className="d-grid">
          <button type="submit" className="btn default-btn btn-lg btn-block">
            Edit Profile
            {loading && (
              <span className="spinner-border spinner-border-sm ms-2"></span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProfileForm;
