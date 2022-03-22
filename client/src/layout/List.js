import React, { useState } from "react";
import { RiRefreshLine } from "react-icons/ri";

import { IoIosRemoveCircleOutline } from "react-icons/io";
function List(props) {
  const { list, onSubmit, load } = props;
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState("");
  const [items, setItems] = useState(list);
  let listItem, displayList;
  const clickHandler = (value) => {
    setItems(items.filter((provider) => provider.id !== value));
  };
  const submitProviderHandler = () => {
    let itemsId = items.map((item) => item.id);
    if (items.length === list.length) {
      setErrors("You have not removed any Provider form the list.");
    } else if (itemsId.length <= 0 || itemsId === undefined) {
      setErrors("You can't submit an empty Provider list.");
    } else {
      setErrors("");
      setLoading(true);
      onSubmit(["reset-provider", itemsId]);
      setLoading(load);
    }
  };
  const resetHandler = () => {
    setItems(list);
  };

  if (list === null) {
    listItem = (
      <p>You are currently receiving Signals from all our Providers</p>
    );
  } else {
    displayList = items.map((item, i) => {
      return (
        <li
          className="list-group-item d-flex justify-content-between align-items-center"
          key={i}
        >
          {item.username}
          <span className="remove-selected-item">
            <span
              title={`Remove ${item.username.toUpperCase()}`}
              onClick={() => clickHandler(item.id)}
            >
              <IoIosRemoveCircleOutline />
            </span>
          </span>
        </li>
      );
    });

    listItem = (
      <div className="currency-list">
        <p className="mb-3">List of Signal Providers you are subscribed to</p>
        <ul className="list-group mb-3">{displayList}</ul>
        {errors && <small className="text-muted mb-2">{errors}</small>}
        <div className="d-grid mt-3">
          <div className="row">
            {items.length > 0 && (
              <div className="col-6">
                <button
                  type="submit"
                  className="btn default-btn btn-lg btn-block"
                  onClick={submitProviderHandler}
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
                className="btn reset-btn btn-lg btn-block secondbtn"
                onClick={resetHandler}
              >
                Reset List <RiRefreshLine />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <div>{listItem}</div>;
}

export default List;
