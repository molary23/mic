import React, { useState } from "react";
import TextInputField from "../layout/TextInputField";
import Select from "../layout/Select";

function AddModal(props) {
  const { modal, sender, purpose, onSubmit } = props;
  const [open, setOpen] = useState(modal);
  const [inputs, setInputs] = useState({});
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const signalOpt = [
      { value: "", option: "Select Signal Option" },
      { value: "b", option: "Buy" },
      { value: "s", option: "Sell" },
    ],
    statusOpt = [
      { value: "", option: "Select Signal Status" },
      { value: "c", option: "Cancelled" },
      { value: "f", option: "Filled" },
    ];
  const closeModal = () => {
    setOpen(false);
    props.onClick(false);
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!Object.keys(inputs).includes("addpair") || inputs.addpair === "") {
      setErrors({
        addpair: "Currency Pair Field can't be empty",
      });
    } else if (
      !Object.keys(inputs).includes("addsignaloption") ||
      inputs.addsignaloption === ""
    ) {
      setErrors({
        addsignaloption: "Signal Option Field can't be empty",
      });
    } else if (
      !Object.keys(inputs).includes("addsignalstatus") ||
      inputs.addsignalstatus === ""
    ) {
      setErrors({
        addsignalstatus: "Signal Status Field can't be empty",
      });
    } else if (
      !Object.keys(inputs).includes("addtakeprofit") ||
      inputs.addtakeprofit === ""
    ) {
      setErrors({
        addtakeprofit: "Take Profit Field can't be empty",
      });
    } else if (
      !Object.keys(inputs).includes("addstoploss") ||
      inputs.addstoploss === ""
    ) {
      setErrors({
        addstoploss: "Stop Loss Field can't be empty",
      });
    } else if (
      !Object.keys(inputs).includes("addstartrange") ||
      inputs.addstartrange === ""
    ) {
      setErrors({
        addstartrange: "Start Range Field can't be empty",
      });
    } else if (
      !Object.keys(inputs).includes("addendrange") ||
      inputs.addendrange === ""
    ) {
      setErrors({
        addendrange: "End Range Field can't be empty",
      });
    } else if (
      !Object.keys(inputs).includes("addpip") ||
      inputs.addpip === ""
    ) {
      setErrors({
        addpip: "Pip Field can't be empty",
      });
    } else {
      setLoading(true);
      let takeprofit = inputs.addtakeprofit.split(",").map((element) => {
        return parseFloat(element.trim());
      });
      let stoploss = inputs.addstoploss.split(",").map((element) => {
        return parseFloat(element.trim());
      });
      const addSignal = {
        currencypair: parseInt(inputs.addpair),
        signaloption: inputs.addsignaloption,
        takeprofit,
        stoploss,
        startrange: parseFloat(inputs.addstartrange),
        endrange: parseFloat(inputs.addendrange),
        pip: parseFloat(inputs.addpip),
      };

      props.onSubmit(addSignal);
    }
  };

  let text, title;
  if (sender === "provider-signals") {
    const currencies = JSON.parse(localStorage.getItem("currencies"));

    let optObj = {},
      defaultOpt = { value: "", option: "Select Currency Pair" },
      optArray = [];
    for (let i = 0; i < currencies.length; i++) {
      optObj = {
        value: currencies[i].id,
        option: `${
          JSON.parse(currencies[i].firstcurrency.split(", "))[1] +
          "/" +
          JSON.parse(currencies[i].secondcurrency.split(", "))[1]
        }`,
      };
      optArray.push(optObj);
    }
    optArray.unshift(defaultOpt);
    if (purpose === "add new") {
      title = "Add New Signal";
      text = (
        <div className="add-new-signal">
          <form className="add-new-signal-form" onSubmit={submitHandler}>
            <Select
              options={optArray}
              onChange={changeHandler}
              name="addpair"
              value={inputs.addpair || ""}
              error={errors.addpair}
            />
            <Select
              options={signalOpt}
              onChange={changeHandler}
              name="addsignaloption"
              value={inputs.addsignaloption || ""}
              error={errors.addsignaloption}
            />
            <Select
              options={statusOpt}
              onChange={changeHandler}
              name="addsignalstatus"
              value={inputs.addsignalstatus || ""}
              error={errors.addsignalstatus}
            />
            <TextInputField
              id="add-new-takeprofit"
              placeholder="Take Profit "
              label="Take Profit *Separate multiple Take Profits with Comma (,)*"
              type="text"
              name="addtakeprofit"
              value={inputs.addtakeprofit || ""}
              onChange={changeHandler}
              error={errors.addtakeprofit}
            />
            <TextInputField
              id="add-new-takeprofit"
              placeholder="Stop Loss"
              label="Stop Loss *Separate multiple Stop Loss with Comma (,)*"
              type="text"
              name="addstoploss"
              value={inputs.addstoploss || ""}
              onChange={changeHandler}
              error={errors.addstoploss}
            />
            <TextInputField
              id="add-new-takeprofit"
              placeholder="Start Range"
              label="Start Range"
              type="text"
              name="addstartrange"
              value={inputs.addstartrange || ""}
              onChange={changeHandler}
              error={errors.addstartrange}
            />
            <TextInputField
              id="add-new-takeprofit"
              placeholder="End Range"
              label="End Range"
              type="text"
              name="addendrange"
              value={inputs.addendrange || ""}
              onChange={changeHandler}
              error={errors.addendrange}
            />
            <TextInputField
              id="add-new-takeprofit"
              placeholder="Profit/Loss, Pip"
              label="Profit/Loss, Pip"
              type="text"
              name="addpip"
              value={inputs.addpip || ""}
              onChange={changeHandler}
              error={errors.addpip}
            />
            <div className="d-grid">
              <button
                type="submit"
                className="btn default-btn btn-lg btn-block"
              >
                Add Signal
                {loading && (
                  <span className="spinner-border spinner-border-sm ms-2"></span>
                )}
              </button>
            </div>
          </form>
        </div>
      );
    }
  }

  return (
    <div>
      <div
        className={`modal fade ${open ? "show d-block" : "d-none"}`}
        id="addModal"
      >
        <div className="modal-dialog modal-md modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">{title}</h4>
              <button
                type="button"
                className="btn-close "
                onClick={() => closeModal()}
              ></button>
            </div>

            <div className="modal-body">{text}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddModal;
