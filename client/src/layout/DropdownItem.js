import React from "react";
import { Link } from "react-router-dom";

function DropdownItem(props) {
  const { title, url } = props;
  return (
    <div>
      <Link to={url}>{title}</Link>
    </div>
  );
}

export default DropdownItem;
