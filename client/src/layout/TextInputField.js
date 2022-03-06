import React from "react";
import PropTypes from "prop-types";

function TextInputField(props) {
  const { placeholder, error, name, value, onChange, type, id } = props;
  return (
    <div className="mb-3 mt-3">
      <div className="form-floating">
        <input
          type={type}
          className="form-control form-control-lg"
          id={id}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
        />
        <label htmlFor={id}>{placeholder}</label>
      </div>
      {error && <small className="text-muted">{error}</small>}
    </div>
  );
}

TextInputField.defaultProps = {
  type: "text",
  value: "",
};

TextInputField.propTypes = {
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
};

export default TextInputField;
