import React from "react";

function SelectList(props) {
  const { sender, list } = props;
  let listItem;

  if (sender === "provider") {
    const clickHandler = (value) => {};
    if (list === null) {
      listItem = (
        <p>You are currently receiving Signals from all our Providers</p>
      );
    } else {
      listItem = list.map((item, i) => {
        return (
          <li
            className="list-group-item d-flex justify-content-between align-items-center"
            key={i}
          >
            {item}
            <span className="remove-selected-item">
              <i
                className="fas fa-times"
                title={`Remove ${item.toUpperCase()}`}
                onClick={() => clickHandler(item)}
              />
            </span>
          </li>
        );
      });
    }
  } else if (sender === "currency") {
    const clickHandler = (value) => {};
    if (list === null) {
      listItem = (
        <p>You are currently receiving Signals about all our Currency Pairs</p>
      );
    } else {
      listItem = list.map((item, i) => {
        return (
          <li
            className="list-group-item d-flex justify-content-between align-items-center"
            key={i}
          >
            {item}
            <span className="remove-selected-item">
              <i
                className="fas fa-times"
                title={`Remove ${item.toUpperCase()}`}
                onClick={() => clickHandler(item)}
              />
            </span>
          </li>
        );
      });
    }
  }

  return <div>{listItem}</div>;
}
export default SelectList;
