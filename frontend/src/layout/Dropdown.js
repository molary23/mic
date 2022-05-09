import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import { IoLanguageOutline } from "react-icons/io5";

function Dropdown(props) {
  const [display, setDisplay] = useState(false);
  const { i18n } = useTranslation();

  console.log(i18n.resolvedLanguage);

  const linkHandler = (e) => {
    e.preventDefault();
    setDisplay(!display);
  };

  return (
    <div className="Dropdown">
      <a
        href="#"
        data-bs-toggle="dropdown"
        onClick={linkHandler}
        onBlur={() => {
          setDisplay(false);
        }}
      >
        <div className=" nav-lang">
          <IoLanguageOutline />
        </div>
      </a>
      <ul className={`dropdown-menu ${display ? "show" : ""}`}>
        <li className="dropdown-item">
          <a
            href="#"
            //onMouseDown={}
            className="nav-link"
            role="button"
          >
            Chinese
          </a>
        </li>
        <li className="dropdown-item">
          <a
            href="#"
            className="nav-link"
            role="button"
            style={{
              fontWeight: i18n.resolvedLanguage === "en" ? "bold" : "normal",
            }}
            type="submit"
            onMouseDown={() => {
              i18n.changeLanguage("en");
            }}
          >
            English
          </a>
        </li>
        <li className="dropdown-item">
          <a
            href="#"
            //onMouseDown={}
            className="nav-link"
            role="button"
          >
            France
          </a>
        </li>
        <li className="dropdown-item">
          <a
            href="#"
            className="nav-link"
            role="button"
            style={{
              fontWeight: i18n.resolvedLanguage === "de" ? "bold" : "normal",
            }}
            type="submit"
            onMouseDown={() => {
              i18n.changeLanguage("de");
            }}
          >
            German
          </a>
        </li>
        <li className="dropdown-item">
          <a
            href="#"
            style={{
              fontWeight: i18n.resolvedLanguage === "es" ? "bold" : "normal",
            }}
            type="submit"
            onClick={() => {
              i18n.changeLanguage("es");
            }}
            className="nav-link"
            role="button"
          >
            Spanish
          </a>
        </li>
      </ul>
    </div>
  );
}

Dropdown.propTypes = {};

export default Dropdown;
