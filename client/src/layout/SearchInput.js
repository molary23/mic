import React, { useState } from "react";
import PropTypes from "prop-types";
let typingTimer;
function SearchInput(props) {
  let doneTypingInterval = 5000;
  const [text, setText] = useState("");
  const searchHandler = (e) => {
    setText(e.target.value);
  };

  const getInput = (input) => {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(() => {
      let searchWord = text;
      props.onKeyUp(searchWord);
    }, doneTypingInterval);
  };

  const keyHandler = (e) => {
    if (e.target.name === "text") {
      getInput(text);
    }
  };
  const { placeholder } = props;
  return (
    <div>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder={placeholder}
          value={text}
          name="text"
          onChange={searchHandler}
          onKeyUp={keyHandler}
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
};

export default SearchInput;
