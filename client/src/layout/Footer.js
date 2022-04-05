import React, { useEffect, useState } from "react";
import GoUp from "./GoUp";
import ConfirmModal from "./ConfirmModal";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../action/authAction";

function Footer() {
  const [check, setCheck] = useState(false),
    dispatch = useDispatch(),
    location = useLocation(),
    search = location.search,
    params = search.split("navigate=")[1];

  let sender = "home",
    checktext = (
      <div>
        <p>You are currently logged in.</p>
        <p>To visit this Page, you have to log out.</p>
        <p>Do you want to Log Out?</p>
      </div>
    ),
    checktitle = "Navigation Error";

  const confirmHandler = (option) => {
    if (option) {
      dispatch(logoutUser());
    }
    setCheck(false);
  };

  useEffect(() => {
    if (params === "lost") {
      setCheck(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <GoUp />
      <nav className="navbar navbar-expand-sm bg-light navbar-dark fixed-bottom justify-content-center footer-nav">
        <p className="footer-text">
          Copyright © <span translate="no">MIC Earn Business</span> 2020 -{" "}
          {new Date().getFullYear()}
        </p>
      </nav>
      {check && (
        <ConfirmModal
          {...{ check, sender, checktext, checktitle }}
          onClick={confirmHandler}
        />
      )}
    </div>
  );
}

export default Footer;
