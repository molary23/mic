import React from "react";
import { Link } from "react-router-dom";

function DropdownItem(props) {
  let url = props.url,
    title = props.title;

  return (
    <div>
      <Link to={url} className="nav-link">
        {title}
      </Link>
    </div>
  );
}

export default DropdownItem;
