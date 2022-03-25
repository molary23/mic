import React, { useState } from "react";
import PropTypes from "prop-types";

import TextInputField from "./TextInputField";
function ProfileForm(props) {
  const { onSubmit, userinfo } = props;
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    if (inputs.lastname === "") {
      setErrors({
        lastname: "Last Name Field can't be empty",
      });
    } else if (inputs.lastname.length > 25) {
      setErrors({
        lastname: "Last Name can't be more than 25 characters",
      });
    } else if (inputs.firstname === "") {
      setErrors({
        firstname: "First Name Field can't be empty",
      });
    } else if (inputs.firstname.length > 25) {
      setErrors({
        firstname: "First Name can't be more than 25 characters",
      });
    } else if (inputs.phone === "") {
      setErrors({
        phone: "Phone Number Field can't be empty",
      });
    } else if (isNaN(inputs.phone)) {
      setErrors({
        addadminphone: "Phone Number can only be a Number",
      });
    } else if (inputs.phone.length > 20) {
      setErrors({
        phone: "Phone Number can't be more than 20 characters",
      });
    } else {
      setLoading(true);
      setErrors({});
      const user = {
        lastname: inputs.lastname.toLowerCase(),
        firstname: inputs.firstname.toLowerCase(),
        phone: inputs.phone,
      };
      onSubmit(user);
    }
  };

  const [inputs, setInputs] = useState({
    lastname: userinfo.lastname,
    firstname: userinfo.firstname,
    phone: userinfo.phone,
  });

  const changeEditHandler = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  return (
    <div className="settings-form-profile dash-card settings-form-card">
      <div className="page-title mb-2 mt-1">
        <h4>Change Profile</h4>
      </div>
      <form className="edit-profile-form" onSubmit={submitHandler}>
        <TextInputField
          id="profile-form-lastname"
          placeholder="Last Name"
          type="text"
          name="lastname"
          value={inputs.lastname || ""}
          onChange={changeEditHandler}
          error={errors.lastname}
        />
        <TextInputField
          id="profile-form-firstname"
          placeholder="First Name"
          type="text"
          name="firstname"
          value={inputs.firstname || ""}
          onChange={changeEditHandler}
          error={errors.firstname}
        />
        <TextInputField
          id="profile-form-phone"
          placeholder="Phone"
          type="text"
          name="phone"
          value={inputs.phone || ""}
          onChange={changeEditHandler}
          error={errors.phone}
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

ProfileForm.propTypes = {
  onSubmit: PropTypes.func,
  userinfo: PropTypes.object.isRequired,
};

export default ProfileForm;
