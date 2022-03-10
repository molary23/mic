import React, { useState } from "react";
import PropTypes from "prop-types";

function CurrencyForm(props) {
  const { onSubmit, currencyList } = props;
  const [loading, setLoading] = useState(false);
  const [currency, setCurrency] = useState([]);

  let currencies = [];

  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    let curId = currency.map((item) => {
      return item.split("-")[0];
    });
    onSubmit(curId);
  };

  const changeHandler = (e) => {
    let selected = e.target.options.selectedIndex,
      dataId = e.target.options[selected].getAttribute("data"),
      display = `${dataId}-${e.target.value}`;
    if (currency.includes(display)) {
      currencies = currency.filter((elm) => elm !== display);
      setCurrency(currencies);
    } else {
      currencies.push(display);
      setCurrency([...currency, ...currencies]);
    }
  };

  const clickHandler = (value) => {
    currencies = currency.filter((elm) => elm !== value);
    setCurrency(currencies);
  };

  let options = {},
    optArray = [{ value: "", option: "Select New Currency(ies)", data: 0 }];

  for (let i = 0; i < currencyList.length; i++) {
    options = {
      value: `${JSON.parse(
        currencyList[i].firstcurrency.split(", ")
      )[1].toUpperCase()}/${JSON.parse(
        currencyList[i].secondcurrency.split(", ")
      )[1].toUpperCase()}`,
      option: `${JSON.parse(
        currencyList[i].firstcurrency.split(", ")
      )[1].toUpperCase()}/${JSON.parse(
        currencyList[i].secondcurrency.split(", ")
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
                    <i
                      className="fas fa-times"
                      title={`Remove ${item}`}
                      onClick={() => clickHandler(item)}
                    />
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="d-grid">
          <button type="submit" className="btn default-btn btn-lg btn-block">
            Add Currency
            {loading && (
              <span className="spinner-border spinner-border-sm ms-2"></span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

CurrencyForm.propTypes = {};

export default CurrencyForm;
