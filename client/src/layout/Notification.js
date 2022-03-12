import React, { useState } from "react";
import Box from "./Box";

function Notification(props) {
  const { onSubmit, load, alert } = props;

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState("");

  let beep = false;
  if (alert === "y") {
    beep = true;
  }
  const [notify, setNotify] = useState(beep);

  const submitHandler = (e) => {
    e.preventDefault();

    if ((notify && alert === "y") || (!notify && alert === "n")) {
      setErrors("You have not made any changes to your Notification Status");
    } else {
      setErrors("");
      let buzz;
      if (notify) {
        buzz = "y";
        setLoading(true);
        onSubmit(buzz);
        setLoading(load);
      } else {
        let confirm = window.confirm(
          "It is recommended that you have your Email Notification On at all times so that you can get Signal Updates on the Go. Do you wish to switch it off?"
        );
        if (!confirm) {
          setLoading(false);
          return false;
        } else {
          buzz = "n";
          setLoading(true);
          onSubmit(buzz);
          setLoading(load);
        }
      }
    }
  };
  const changeHandler = (e) => {
    setNotify(!notify);
  };

  return (
    <div className="settings-form-notify dash-card settings-form-card">
      <div className="page-title mb-2 mt-1">
        <h4>Email Notification</h4>
      </div>
      <form className="notification-form" onSubmit={submitHandler}>
        <div className="form-check form-switch mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            id="emailSwitch"
            name="notify"
            value={notify}
            defaultChecked={notify}
            onChange={changeHandler}
          />
          <label className="form-check-label" htmlFor="mySwitch">
            Email Notification
          </label>
        </div>
        {errors && <small className="text-muted">{errors}</small>}
        <div className="d-grid mt-3">
          <button type="submit" className="btn default-btn btn-lg btn-block">
            Change
            {loading && (
              <span className="spinner-border spinner-border-sm ms-2"></span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Notification;
