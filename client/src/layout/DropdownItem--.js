import React from "react";
import { Link, useNavigate } from "react-router-dom";

function DropdownItem(props) {
  let navigate = useNavigate();
  const toProfile = () => {
    navigate(url, { replace: true });
  };

  let url = props.url,
    title = props.title;
  console.log(url);

  return (
    <div>
      <Link to={url} className="nav-link" role="button" onMouseDown={toProfile}>
        {title}
      </Link>
    </div>
  );
}

export default DropdownItem;
