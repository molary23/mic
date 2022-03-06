import React from "react";

function Notification() {
  const submitHandler = (e) => {};

  return (
    <div>
      <form className="notification-form" onSubmit={submitHandler}>
        Email activation?
      </form>
    </div>
  );
}

export default Notification;
