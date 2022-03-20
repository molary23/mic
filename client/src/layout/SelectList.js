import React, { useState } from "react";
import { ImUndo } from "react-icons/im";

function SelectList(props) {
  const { list, onSubmit, load } = props;
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState("");
  const [items, setItems] = useState(list);

  let listItem, displayList;
  const resetHandler = () => {
    setItems(list);
  };

  const clickHandler = (value) => {
    setItems(items.filter((currency) => currency.id !== value));
  };

  if (list === null) {
    listItem = (
      <p>You are currently receiving Signals about all our Currency Pairs</p>
    );
  } else {
    const submitCurrencyHandler = () => {
      let itemsId = items.map((item) => item.id);
      if (items.length === list.length) {
        setErrors("You have not removed any Currency Pair form the list.");
      } else if (itemsId.length <= 0 || itemsId === undefined) {
        setErrors("You can't submit an empty Currency Pair list.");
      } else {
        setErrors("");
        setLoading(true);
        onSubmit(["reset-currency", itemsId]);
        setLoading(load);
      }
    };

    displayList = items.map((item, i) => {
      return (
        <li
          className="list-group-item d-flex justify-content-between align-items-center"
          key={i}
        >
          {`${item.firstcurrency[1].toUpperCase()}/${item.secondcurrency[1].toUpperCase()}`}
          <span className="remove-selected-item">
            <i
              className="fas fa-times"
              title={`Remove ${item.firstcurrency[1].toUpperCase()}/${item.secondcurrency[1].toUpperCase()}`}
              onClick={() => clickHandler(item.id)}
            />
          </span>
        </li>
      );
    });
    listItem = (
      <div className="currency-list">
        <h4 className="mb-3">List of Currencies you are subscribed to</h4>
        <ul className="list-group mb-3">{displayList}</ul>
        {errors && <small className="text-muted mb-2">{errors}</small>}
        <div className="d-grid mt-3">
          <div className="row">
            {items.length > 0 && (
              <div className="col-6">
                <button
                  type="submit"
                  className="btn default-btn btn-lg btn-block"
                  onClick={submitCurrencyHandler}
                >
                  Update List
                  {loading && (
                    <span className="spinner-border spinner-border-sm ms-2"></span>
                  )}
                </button>
              </div>
            )}
            <div className="col-6">
              <button
                type="submit"
                className="btn default-btn btn-lg btn-block"
                onClick={resetHandler}
              >
                Reset List <ImUndo />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <div>{listItem}</div>;
}
export default SelectList;
