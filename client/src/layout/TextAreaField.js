import React from "react";
import PropTypes from "prop-types";

function TextAreaField(props) {
  const { label, error, name, value, onChange, type, id } = props;
  return (
    <div className="mb-3 mt-3">
      <div className="form-floating">
        <textarea
          type={type}
          className="form-control"
          id={id}
          placeholder={label}
          name={name}
          value={value}
          onChange={onChange}
        />
        <label htmlFor={id}>{label}</label>
      </div>
      {error && <small className="text-muted">{error}</small>}
    </div>
  );
}

TextAreaField.defaultProps = {
  type: "text",
};

TextAreaField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
};

export default TextAreaField;
