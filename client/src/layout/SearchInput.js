import React from "react";
import PropTypes from "prop-types";

function SearchInput(props) {
  const { placeholder, onChange, name, value } = props;
  return (
    <div>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder={placeholder}
          value={value}
          name={name}
          onChange={onChange}
        />
        <span className="input-group-text">
          <i className="fas fa-search" />
        </span>
      </div>
    </div>
  );
}

SearchInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SearchInput;
