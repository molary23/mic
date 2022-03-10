import React, { useState } from "react";

function DisplayForm(props) {
  const { onSubmit, display } = props;
  const [mode, setMode] = useState("");
  const [errors, setErrors] = useState("");

  const [loading, setLoading] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    onSubmit(mode);
  };
  const changeHandler = (e) => {
    setMode(e.target.value);
  };
  return (
    <div className="settings-form-dark-mode dash-card settings-form-card">
      <div className="page-title mb-2 mt-1">
        <h4>Add/Modify Account</h4>
      </div>
      <form className="change-display-form" onSubmit={submitHandler}>
        <div className="form-check mb-2">
          <input
            type="radio"
            className="form-check-input"
            id="radio1"
            name="display"
            value="d"
            defaultChecked={display === "d" && true}
            onChange={changeHandler}
          />

          <label className="form-check-label" htmlFor="radio1">
            Day
          </label>
        </div>
        <div className="form-check mb-2">
          <input
            type="radio"
            className="form-check-input"
            id="radio2"
            name="display"
            value="n"
            defaultChecked={display === "n" && true}
            onChange={changeHandler}
          />

          <label className="form-check-label" htmlFor="radio2">
            Night
          </label>
        </div>
        <div className="form-check mb-2">
          <input
            type="radio"
            id="radio3"
            className="form-check-input"
            name="display"
            value="a"
            defaultChecked={display === "a" && true}
            onChange={changeHandler}
          />

          <label className="form-check-label" htmlFor="radio3">
            Auto
          </label>
        </div>
        <div className="form-check mb-2">
          <input
            type="radio"
            id="radio4"
            className="form-check-input"
            name="display"
            value="s"
            defaultChecked={display === "s" && true}
            onChange={changeHandler}
          />

          <label className="form-check-label" htmlFor="radio4">
            System Preference
          </label>
        </div>
        {errors && <small>{errors}</small>}
        <div className="d-grid">
          <button type="submit" className="btn default-btn btn-lg btn-block">
            Change Display Mode
            {loading && (
              <span className="spinner-border spinner-border-sm ms-2"></span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default DisplayForm;
