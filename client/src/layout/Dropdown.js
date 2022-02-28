import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../action/authAction";
import { clearCurrentProfile } from "../action/profileAction";
import { clearActions } from "../action/adminAction";
import { clearSearchActions } from "../action/searchAction";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import DropdownItem from "./DropdownItem";

function Dropdown(props) {
  let navigate = useNavigate();
  const [display, setDisplay] = useState(false);

  const logoutClick = (e) => {
    e.preventDefault();
    props.logoutUser();
    props.clearCurrentProfile();
    props.clearActions("all");
    props.clearSearchActions("all");
    navigate("/", { replace: true });
  };

  return (
    <div className="Dropdown">
      <Link
        className="nav-link dropdown-toggle"
        to="#"
        role="button"
        data-bs-toggle="dropdown"
        onClick={() => {
          setDisplay(!display);
        }}
        onBlur={() => {
          setDisplay(false);
        }}
      ></Link>

      <ul className={`dropdown-menu ${display ? "show" : ""}`}>
        <li className="dropdown-item">
          <DropdownItem {...{ title: "profile", url: "/forgot" }} />
        </li>
        <li className="dropdown-item">
          <DropdownItem {...{ title: "nothing", url: "/forgot" }} />
        </li>
        <li className="dropdown-item">
          <Link
            to="#"
            onMouseDown={logoutClick}
            className="nav-link"
            role="button"
          >
            Log Out
          </Link>
        </li>
      </ul>
    </div>
  );
}

Dropdown.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  clearCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, {
  logoutUser,
  clearCurrentProfile,
  clearActions,
  clearSearchActions,
})(Dropdown);
