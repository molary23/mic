import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../action/authAction";
import { clearCurrentProfile } from "../action/profileAction";
import { clearActions } from "../action/adminAction";
import { clearSearchActions } from "../action/searchAction";
import PropTypes from "prop-types";
import { connect } from "react-redux";

function Dropdown(props) {
  const { avatar, username } = props;

  let navigate = useNavigate();
  const [display, setDisplay] = useState(false);

  const logoutClick = (e) => {
    e.preventDefault();
    props.logoutUser();
    // props.clearActions();
    props.clearCurrentProfile();
    navigate("/", { replace: true });
  };

  const toProfile = () => {
    let to;
    if (props.auth.user.level === 3) {
      to = "admin";
    } else if (props.auth.user.level === 2) {
      to = "sp";
    } else if (props.auth.user.level === 1) {
      to = "user";
    }

    navigate(`/${to}/settings`, { replace: false });
  };
  const linkHandler = (e) => {
    e.preventDefault();
    setDisplay(!display);
  };
  return (
    <div className="Dropdown">
      <Link
        // className="nav-link dropdown-toggle"
        to="#"
        // role="button"
        data-bs-toggle="dropdown"
        onClick={linkHandler}
        onBlur={() => {
          setDisplay(false);
        }}
      >
        <div className=" nav-user-image">
          <img
            src={avatar}
            alt={`${username} avatar`}
            style={{ width: "30px" }}
            className="rounded-pill"
          />
        </div>
      </Link>

      <ul className={`dropdown-menu ${display ? "show" : ""}`}>
        <li className="dropdown-item">
          <a
            href="/sp/settings"
            className="nav-link"
            role="button"
            onMouseDown={toProfile}
          >
            Profile
          </a>
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
