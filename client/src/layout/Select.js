import React from "react";
import PropTypes from "prop-types";

function Select(props) {
  const { options, onChange, value, name, error } = props;
  let selectItems;

  selectItems = options.map((item, i) => {
    return (
      <option key={i} value={item.value}>
        {item.option}
      </option>
    );
  });

  return (
    <div className="mb-3">
      <select
        className="form-select"
        onChange={onChange}
        value={value}
        name={name}
      >
        {selectItems}
      </select>
      {error && <small className="text-muted">{error}</small>}
    </div>
  );
}

Select.propTypes = {
  value: PropTypes.array.isRequired,
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.object,
};

export default Select;
