import React, { useState } from "react";
import PropTypes from "prop-types";

import { IoIosRemoveCircleOutline } from "react-icons/io";
import { MdOutlineSelectAll } from "react-icons/md";
import ConfirmModal from "../layout/ConfirmModal";

function CurrencyForm(props) {
  const { onSubmit, currencyList, load } = props,
    [loading, setLoading] = useState(false),
    [check, setCheck] = useState(false),
    [currency, setCurrency] = useState([]),
    [errors, setErrors] = useState("");
  let currencies = [];

  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    let curId = currency.map((item) => {
      return parseInt(item.split("-")[0]);
    });
    onSubmit(curId);

    if (curId === undefined || curId.length === 0) {
      setErrors("Kindly select a Currency Pair.");
    } else {
      onSubmit(["selected", curId]);
      setLoading(load);
    }
  };

  let checktext = "Are you sure you want to add all Currency Pair?",
    checktitle = "Confirm Action";

  const submitAllHandler = (e) => {
    e.preventDefault();
    setCheck(true);
  };

  const confirmHandler = (option) => {
    if (option) {
      setLoading(true);
      onSubmit(["all", []]);
    }
    setCheck(false);
  };

  const changeHandler = (e) => {
    let selected = e.target.options.selectedIndex,
      dataId = e.target.options[selected].getAttribute("data"),
      display = `${dataId}-${e.target.value}`;

    if (dataId !== "") {
      if (currency.includes(display)) {
        currencies = currency.filter((elm) => elm !== display);
        setCurrency(currencies);
      } else {
        currencies.push(display);
        setCurrency([...currency, ...currencies]);
      }
    }
  };

  const clickHandler = (value) => {
    currencies = currency.filter((elm) => elm !== value);
    setCurrency(currencies);
  };

  let options = {},
    optArray = [{ value: "", option: "Select New Currency(ies)", data: "" }];

  for (let i = 0; i < currencyList.length; i++) {
    options = {
      value: `${JSON.parse(
        currencyList[i].firstcurrency
      )[1].toUpperCase()}/${JSON.parse(
        currencyList[i].secondcurrency
      )[1].toUpperCase()}`,
      option: `${JSON.parse(
        currencyList[i].firstcurrency
      )[1].toUpperCase()}/${JSON.parse(
        currencyList[i].secondcurrency
      )[1].toUpperCase()}`,
      data: currencyList[i].id,
    };

    optArray.push(options);
  }

  return (
    <div className="settings-form-signal dash-card ">
      <div className="page-title mb-2 mt-1">
        <h4>Add Currency</h4>
      </div>
      <form className="select-currency-form" onSubmit={submitHandler}>
        <select
          className="form-select form-select-lg mb-3"
          onChange={changeHandler}
          name="currency"
        >
          {optArray.map((item, i) => {
            return (
              <option key={i} value={item.value} data={item.data}>
                {item.option}
              </option>
            );
          })}
          ;
        </select>
        {errors && <small className="text-muted">{errors}</small>}
        <div className="selectedCurrencies">
          <ul className="list-group list-group-horizontal mb-3">
            {currency.map((item, i) => {
              return (
                <li
                  className="list-group-item d-flex justify-content-between align-items-center"
                  key={i}
                >
                  {item.split("-")[1]}
                  <span className="remove-selected-item">
                    <span
                      title={`Remove ${item.split("-")[1]}`}
                      onClick={() => clickHandler(item)}
                    >
                      <IoIosRemoveCircleOutline />
                    </span>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="d-grid">
          <div className="row">
            <div className="col-6">
              {" "}
              <button
                type="submit"
                className="btn default-btn btn-lg btn-block"
                disabled={loading && true}
              >
                Add Currency
                {loading && (
                  <span className="spinner-border spinner-border-sm ms-2"></span>
                )}
              </button>
            </div>
            <div className="col-6">
              <button
                type="submit"
                className="btn default-btn btn-lg btn-block secondbtn"
                onClick={submitAllHandler}
                disabled={loading && true}
              >
                Add All <MdOutlineSelectAll />
                {loading && (
                  <span className="spinner-border spinner-border-sm ms-2"></span>
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
      {check && (
        <ConfirmModal
          {...{ check, checktext, checktitle }}
          onClick={confirmHandler}
        />
      )}
    </div>
  );
}

CurrencyForm.propTypes = {
  onSubmit: PropTypes.func,
  currencyList: PropTypes.array.isRequired,
  load: PropTypes.bool,
};

export default CurrencyForm;
