import React, { useState } from "react";
import TextInputField from "../layout/TextInputField";
import Select from "../layout/Select";
import Signal from "../layout/Signal";

import { checkEmptyInput } from "../util/LoadFunction";

function AddModal(props) {
  const { modal, sender, purpose, onSubmit, modalsignaldetails, error } = props;
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

  const submitNewHandler = (e) => {
    e.preventDefault();

    const signal = checkEmptyInput({
      inputs,
      setErrors,
      setLoading,
      pair: "addpair",
      option: "addsignaloption",
      status: "addsignalstatus",
      takeprofit: "addtakeprofit",
      stoploss: "addstoploss",
      startrange: "addstartrange",
      endrange: "addendrange",
      pip: "addpip",
    });

    if (signal !== false) {
      onSubmit(["new", signal]);
    }
  };

  const submitEditHandler = (e) => {
    inputs.editpair = inputs.editpair ?? modalsignaldetails.CurrencyId;
    inputs.editsignaloption =
      inputs.editsignaloption ??
      modalsignaldetails.signaloption.toLowerCase() === "sell"
        ? "s"
        : "b";
    inputs.editsignalstatus =
      inputs.editsignalstatus ??
      modalsignaldetails.status.toLowerCase() === "filled"
        ? "f"
        : "c";
    inputs.edittakeprofit =
      inputs.edittakeprofit ?? modalsignaldetails.takeprofit.toString();
    inputs.editstoploss =
      inputs.editstoploss ?? modalsignaldetails.stoploss.toString();
    inputs.editstartrange =
      inputs.editstartrange ?? modalsignaldetails.range.split("-")[0].trim();
    inputs.editendrange =
      inputs.editendrange ?? modalsignaldetails.range.split("-")[1].trim();
    inputs.editpip = inputs.editpip ?? modalsignaldetails.pip.toString();
    e.preventDefault();
    const signal = checkEmptyInput({
      inputs,
      setErrors,
      setLoading,
      pair: "editpair",
      option: "editsignaloption",
      status: "editsignalstatus",
      takeprofit: "edittakeprofit",
      stoploss: "editstoploss",
      startrange: "editstartrange",
      endrange: "editendrange",
      pip: "editpip",
    });

    if (signal !== false) {
      onSubmit(["edit", signal, modalsignaldetails.signalid]);
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
    if (purpose === "add-new") {
      title = "Add New Signal";
      text = (
        <div className="add-new-signal">
          <form className="add-new-signal-form" onSubmit={submitNewHandler}>
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
              {error.add && <small className="text-muted">{error.add}</small>}
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
    } else if (purpose === "edit") {
      title = "Edit Signal";
      text = (
        <div className="edit-new-signal">
          <form className="edit-new-signal-form" onSubmit={submitEditHandler}>
            <Select
              options={optArray}
              onChange={changeHandler}
              name="editpair"
              value={inputs.editpair || modalsignaldetails.CurrencyId}
              error={errors.editpair}
            />
            <Select
              options={signalOpt}
              onChange={changeHandler}
              name="editsignaloption"
              value={
                inputs.editsignaloption ||
                modalsignaldetails.signaloption.toLowerCase() === "sell"
                  ? "s"
                  : "b"
              }
              error={errors.editsignaloption}
            />
            <Select
              options={statusOpt}
              onChange={changeHandler}
              name="editsignalstatus"
              value={
                inputs.editsignalstatus ||
                modalsignaldetails.status.toLowerCase() === "filled"
                  ? "f"
                  : "c"
              }
              error={errors.editsignalstatus}
            />
            <TextInputField
              id="edit-new-takeprofit"
              placeholder="Take Profit "
              label="Take Profit *Separate multiple Take Profits with Comma (,)*"
              type="text"
              name="edittakeprofit"
              value={
                inputs.edittakeprofit ||
                modalsignaldetails.takeprofit.toString()
              }
              onChange={changeHandler}
              error={errors.edittakeprofit}
            />
            <TextInputField
              id="edit-new-takeprofit"
              placeholder="Stop Loss"
              label="Stop Loss *Separate multiple Stop Loss with Comma (,)*"
              type="text"
              name="editstoploss"
              value={
                inputs.editstoploss || modalsignaldetails.stoploss.toString()
              }
              onChange={changeHandler}
              error={errors.editstoploss}
            />
            <TextInputField
              id="edit-new-takeprofit"
              placeholder="Start Range"
              label="Start Range"
              type="text"
              name="editstartrange"
              value={
                inputs.editstartrange ||
                modalsignaldetails.range.split("-")[0].trim()
              }
              onChange={changeHandler}
              error={errors.editstartrange}
            />
            <TextInputField
              id="edit-new-takeprofit"
              placeholder="End Range"
              label="End Range"
              type="text"
              name="editendrange"
              value={
                inputs.editendrange ||
                modalsignaldetails.range.split("-")[1].trim()
              }
              onChange={changeHandler}
              error={errors.editendrange}
            />
            <TextInputField
              id="edit-new-takeprofit"
              placeholder="Profit/Loss, Pip"
              label="Profit/Loss, Pip"
              type="text"
              name="editpip"
              value={inputs.editpip || modalsignaldetails.pip.toString()}
              onChange={changeHandler}
              error={errors.editpip}
            />
            <div className="d-grid">
              {error.update && (
                <small className="text-muted">{error.update}</small>
              )}
              <button
                type="submit"
                className="btn default-btn btn-lg btn-block"
              >
                Edit Signal
                {loading && (
                  <span className="spinner-border spinner-border-sm ms-2"></span>
                )}
              </button>
            </div>
          </form>
        </div>
      );
    } else if (purpose === "view") {
      title = "View Signal";
      text = <Signal signal={modalsignaldetails} sender={"provider"} />;
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
