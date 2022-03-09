import React, { useState } from "react";
import Box from "./Box";

function Notification(props) {
  const { onSubmit, sender, load } = props;
  const [notify, setNotify] = useState(false);
  const [loading, setLoading] = useState(false);
  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    onSubmit(notify);
    setLoading(load);
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
            checked={notify}
            onChange={changeHandler}
          />
          <label className="form-check-label" htmlFor="mySwitch">
            Email Notification
          </label>
        </div>
        <div className="d-grid">
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
