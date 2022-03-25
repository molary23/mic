import React, { useState } from "react";
import { ThemeContext, themes } from "../contexts/ThemeContext";
import PropTypes from "prop-types";

function DisplayForm(props) {
  const { onSubmit, display, load } = props;
  const [mode, setMode] = useState("");
  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const submitHandler = (e) => {
    e.preventDefault();
    if (display === mode) {
      setErrors("You have not made any new changes");
    } else {
      setLoading(true);
      onSubmit(mode);
      setLoading(load);
    }
  };
  let hour = new Date().getHours(),
    systemcolor;
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    //  document.documentElement.setAttribute("dark", true);
    systemcolor = "dark";
  }

  return (
    <div className="settings-form-dark-mode dash-card settings-form-card">
      <div className="page-title mb-2 mt-1">
        <h4>Change Display Mode</h4>
      </div>
      <ThemeContext.Consumer>
        {({ changeTheme }) => (
          <form className="change-display-form" onSubmit={submitHandler}>
            <div className="form-check mb-2">
              <input
                type="radio"
                className="form-check-input"
                id="radio1"
                name="display"
                value="d"
                defaultChecked={display === "d" && true}
                onChange={() => {
                  setMode("d");
                  setDarkMode(!darkMode);
                  changeTheme(themes.light);
                }}
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
                onChange={() => {
                  setMode("n");
                  setDarkMode(!darkMode);
                  changeTheme(themes.dark);
                }}
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
                onChange={() => {
                  setMode("a");
                  hour > 7 && hour < 20
                    ? setDarkMode(darkMode)
                    : setDarkMode(!darkMode);
                  changeTheme(
                    hour > 7 && hour < 20 ? themes.dark : themes.light
                  );
                }}
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
                value="i"
                defaultChecked={display === "i" && true}
                onChange={() => {
                  setMode("i");
                  systemcolor === "dark"
                    ? setDarkMode(darkMode)
                    : setDarkMode(!darkMode);
                  setDarkMode(!darkMode);
                  changeTheme(
                    systemcolor === "dark" ? themes.dark : themes.light
                  );
                }}
              />

              <label className="form-check-label" htmlFor="radio4">
                Inherit from System
              </label>
            </div>
            {errors && <small className="mb-2">{errors}</small>}
            <div className="d-grid mt-3">
              <button
                type="submit"
                className="btn default-btn btn-lg btn-block"
              >
                Change Display Mode
                {loading && (
                  <span className="spinner-border spinner-border-sm ms-2"></span>
                )}
              </button>
            </div>
          </form>
        )}
      </ThemeContext.Consumer>
    </div>
  );
}

DisplayForm.propTypes = {
  display: PropTypes.string.isRequired,
  onSubmit: PropTypes.func,
  load: PropTypes.bool,
};

export default DisplayForm;
