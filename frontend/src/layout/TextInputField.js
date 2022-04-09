import React from "react";
import PropTypes from "prop-types";

function TextInputField(props) {
  const { label, error, name, value, onChange, type, id, disabled, maxLength } =
    props;
  return (
    <div className="mb-3 mt-3">
      <div className="form-floating">
        <input
          type={type}
          className="form-control"
          id={id}
          placeholder={label}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          maxLength={maxLength}
        />
        <label htmlFor={id}>{label}</label>
      </div>
      {error && <small className="text-muted">{error}</small>}
    </div>
  );
}

TextInputField.defaultProps = {
  type: "text",
  disabled: "",
  value: "",
};

TextInputField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  disabled: PropTypes.string,
  maxLength: PropTypes.string,
};

export default TextInputField;
