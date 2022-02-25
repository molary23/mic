import React, { useState } from "react";

function Select(props) {
  const { sender, options, onChange, value, name } = props;
  let selectItems;

  selectItems = options.map((item, i) => {
    return (
      <option key={i} value={item.value}>
        {item.option}
      </option>
    );
  });

  return (
    <select
      className="form-select"
      onChange={onChange}
      value={value}
      name={name}
    >
      {selectItems}
    </select>
  );
}

export default Select;
