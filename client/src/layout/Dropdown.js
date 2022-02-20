import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { logoutUser } from "../action/authAction";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import DropdownItem from "./DropdownItem";
import SubNav from "./SubNav";

function Dropdown(props) {
  const [display, setDisplay] = useState(false);

  const logoutClick = (e) => {
    props.logoutUser();
  };

  return (
    <div className="Dropdown">
      <Link
        className="nav-link dropdown-toggle"
        to="#"
        role="button"
        data-bs-toggle="dropdown"
        onClick={() => setDisplay(!display)}
        onBlur={() => setDisplay(false)}
      ></Link>

      <ul className={`dropdown-menu ${display ? "show" : ""}`}>
        <li className="dropdown-item">
          <DropdownItem {...{ title: "settings", url: "/" }} />
        </li>
        <li className="dropdown-item">
          <DropdownItem {...{ title: "profile", url: "/forgot" }} />
        </li>
        <li className="dropdown-item">
          <DropdownItem {...{ title: "nothing", url: "/forgot" }} />
        </li>
        <li className="dropdown-item">
          <Link to="" onClick={logoutClick()} className="nav-link">
            Log Out
          </Link>
        </li>
      </ul>
    </div>
  );
}

Dropdown.propTypes = {
  logoutUser: PropTypes.func.isRequired,
};
export default connect(null, { logoutUser })(Dropdown);
