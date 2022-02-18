import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";

import DropdownItem from "./DropdownItem";

function Dropdown() {
  const [display, setDisplay] = useState(false);

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
      </ul>
    </div>
  );
}

export default Dropdown;
