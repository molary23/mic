import React from "react";
import PropTypes from "prop-types";

function TextPasswordField(props) {
  const { placeholder, error, name, value, onChange, type, icon, id, onClick } =
    props;

  return (
    <div className="mb-3 mt-3">
      <div className="input-group">
        <div className="form-floating form-floating-group flex-grow-1">
          <input
            type={type}
            className="form-control form-control-lg"
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={onChange}
          />
          <label htmlFor={id}>{placeholder}</label>
        </div>
        <span className="input-group-text" onClick={onClick}>
          <i className={icon} />
        </span>
      </div>
      {error && <small className="text-muted">{error}</small>}
    </div>
  );
}

TextPasswordField.defaultProps = {
  type: "password",
  icon: "far fa-eye-slash",
};

TextPasswordField.propTypes = {
  id: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func,
  error: PropTypes.string,
};

export default TextPasswordField;
