import React, { useState } from "react";

import { IoIosRemoveCircleOutline } from "react-icons/io";
import { MdOutlineSelectAll } from "react-icons/md";
import ConfirmModal from "../layout/ConfirmModal";

function SignalForm(props) {
  const { onSubmit, providerList, load } = props;
  const [loading, setLoading] = useState(false),
    [check, setCheck] = useState(false),
    [provider, setProvider] = useState([]),
    [errors, setErrors] = useState("");
  let providers = [];
  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    let prId = provider.map((item) => {
      return parseInt(item.split("-")[0]);
    });

    if (prId === undefined || prId.length === 0) {
      setErrors("Kindly select a Provider.");
    } else {
      console.log(prId);
      onSubmit(["selected", prId]);
      setLoading(load);
    }
  };
  const changeHandler = (e) => {
    setErrors("");
    let selected = e.target.options.selectedIndex,
      dataId = e.target.options[selected].getAttribute("data"),
      display = `${dataId}-${e.target.value}`;
    if (provider.includes(display)) {
      providers = provider.filter((elm) => elm !== display);
      setProvider(providers);
    } else {
      providers.push(display);
      setProvider([...provider, ...providers]);
    }
  };

  const clickHandler = (value) => {
    providers = provider.filter((elm) => elm !== value);
    setProvider(providers);
  };

  let checktext = "Are you sure you want to add all Providers?",
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

  let options = {},
    optArray = [{ value: "", option: "Select New Provider(s)", data: 0 }];

  for (let i = 0; i < providerList.length; i++) {
    options = {
      value: providerList[i].username.toUpperCase(),
      option: providerList[i].username.toUpperCase(),
      data: providerList[i].userid,
    };

    optArray.push(options);
  }

  return (
    <div className="settings-form-signal dash-card ">
      <div className="page-title mb-2 mt-1">
        <h4>Add Provider</h4>
      </div>
      <form className="select-providers-form" onSubmit={submitHandler}>
        <select
          className="form-select form-select-lg mb-3"
          onChange={changeHandler}
          name="provider"
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
        <div className="selectedProviders">
          <ul className="list-group list-group-horizontal mb-3">
            {provider.map((item, i) => {
              return (
                <li
                  className="list-group-item d-flex justify-content-between align-items-center"
                  key={i}
                >
                  {item.split("-")[1]}
                  <span className="remove-selected-item">
                    <span
                      title={`Remove ${item}`}
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
              <button
                type="submit"
                className="btn default-btn btn-lg btn-block"
              >
                Add Selected
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

export default SignalForm;
