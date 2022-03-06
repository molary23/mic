import React, { useState } from "react";
import TextInputField from "../layout/TextInputField";
import TextPasswordField from "./TextPasswordField";
import Select from "../layout/Select";
import Signal from "../layout/Signal";
import Flag from "react-flagpack";

import { countrycodes } from "../util/countrycodes";

import { checkEmptyInput } from "../util/LoadFunction";

function AddModal(props) {
  const { modal, sender, purpose, onSubmit, modalsignaldetails, error } = props;
  const [open, setOpen] = useState(modal);
  const [inputs, setInputs] = useState({});
  const [loading, setLoading] = useState(false);
  const [icon, setIcon] = useState({});
  const [pass, setPass] = useState({});

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

  const checkPassHandler = (e) => {};

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

  const submitCurrency = (e) => {
    e.preventDefault();
    if (
      !Object.keys(inputs).includes("addfirstcurrencyname") ||
      inputs.addfirstcurrencyname === ""
    ) {
      setErrors({
        addfirstcurrencyname: "First Currency Name Field can't be empty",
      });
    } else if (
      !Object.keys(inputs).includes("addfirstcurrencycode") ||
      inputs.addfirstcurrencycode === ""
    ) {
      setErrors({
        addfirstcurrencycode: "First Currency Code Field can't be empty",
      });
    } else if (
      !Object.keys(inputs).includes("addsecondcurrencyname") ||
      inputs.addsecondcurrencyname === ""
    ) {
      setErrors({
        addsecondcurrencyname: "First Currency Name Field can't be empty",
      });
    } else if (
      !Object.keys(inputs).includes("addsecondcurrencycode") ||
      inputs.addsecondcurrencycode === ""
    ) {
      setErrors({
        addsecondcurrencycode: "Second Currency Code Field can't be empty",
      });
    } else {
      const currency = {
        firstcurrencypair: JSON.stringify([
          inputs.addfirstcurrencycode,
          inputs.addfirstcurrencyname,
        ]),
        secondcurrencypair: JSON.stringify([
          inputs.addsecondcurrencycode,
          inputs.addsecondcurrencyname,
        ]),
      };
      onSubmit(["add", currency]);
    }
  };

  const submitAdmin = (e) => {
    e.preventDefault();
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
  } else if (sender === "admin-signals") {
    title = "View Signal";
    text = <Signal signal={modalsignaldetails} sender={"admin"} />;
  } else if (sender === "admin-currencies") {
    title = "Add Currency";
    text = (
      <form className="add-currency-form" onSubmit={submitCurrency}>
        <TextInputField
          id="add-new-firstcurrency-name"
          placeholder="First Currency Name"
          label="First Currency Name"
          type="text"
          name="addfirstcurrencyname"
          value={inputs.addfirstcurrencyname || ""}
          onChange={changeHandler}
          error={errors.addfirstcurrencyname}
        />
        <TextInputField
          id="add-new-firstcurrency-code"
          placeholder="First Currency Code "
          label="First Currency Code"
          type="text"
          name="addfirstcurrencycode"
          value={inputs.addfirstcurrencycode || ""}
          onChange={changeHandler}
          error={errors.addfirstcurrencycode}
        />
        {inputs.addfirstcurrencycode &&
        inputs.addfirstcurrencycode.length > 1 &&
        countrycodes.includes(inputs.addfirstcurrencycode.toUpperCase()) ? (
          <small>
            <Flag code={inputs.addfirstcurrencycode.toUpperCase()} size="M" />
          </small>
        ) : null}
        <TextInputField
          id="add-new-secondcurrency-name"
          placeholder="Second Currency Name "
          label="Second Currency Name"
          type="text"
          name="addsecondcurrencyname"
          value={inputs.addsecondcurrencyname || ""}
          onChange={changeHandler}
          error={errors.addsecondcurrencyname}
        />
        <TextInputField
          id="add-new-secondcurrency-code"
          placeholder="Second Currency Code "
          label="Second Currency Code"
          type="text"
          name="addsecondcurrencycode"
          value={inputs.addsecondcurrencycode || ""}
          onChange={changeHandler}
          error={errors.addsecondcurrencycode}
        />
        {inputs.addsecondcurrencycode &&
        inputs.addsecondcurrencycode.length > 1 &&
        countrycodes.includes(inputs.addsecondcurrencycode.toUpperCase()) ? (
          <small>
            <Flag code={inputs.addsecondcurrencycode.toUpperCase()} size="M" />
          </small>
        ) : null}

        <div className="d-grid">
          {error.currency && (
            <small className="text-muted">{error.currency}</small>
          )}
          <button type="submit" className="btn default-btn btn-lg btn-block">
            Add Currency
            {loading && (
              <span className="spinner-border spinner-border-sm ms-2"></span>
            )}
          </button>
        </div>
      </form>
    );
  } else if (sender === "admin-admins") {
    title = "Add Admin";
    text = (
      <form className="add-admin-form" onSubmit={submitAdmin}>
        <TextPasswordField
          id="register-form-email"
          label="Email Address"
          icon={`${icon.email ? "fas fa-circle-notch fa-spin" : ""}`}
          type="email"
          name="email"
          value={inputs.email}
          onChange={this.changeHandler}
          error={error.email}
          onKeyUp={this.keyHandler}
        />

        <TextPasswordField
          id="register-form-referral"
          label="Username"
          icon={`${icon.referral ? "fas fa-circle-notch fa-spin" : ""}`}
          type="text"
          name="username"
          value={inputs.username || ""}
          onChange={this.changeHandler}
          error={error.username}
          onKeyUp={this.keyHandler}
        />

        <TextInputField
          id="add-new-admin-phone"
          label="Phone Number"
          type="tel"
          name="addadminphone"
          value={inputs.addadminphone || ""}
          onChange={changeHandler}
          error={errors.addadminphone}
        />

        <TextPasswordField
          id="register-form-password"
          placeholder="Password"
          label="Password"
          icon={`far ${pass.pass1 ? "fa-eye-slash" : "fa-eye"}`}
          type={pass.pass1 ? "password" : "text"}
          name="password"
          value={inputs.password || ""}
          onChange={this.changeHandler}
          onClick={checkPassHandler(1)}
          error={error.password}
        />
        <TextPasswordField
          id="register-form-password2"
          placeholder="Confirm Password"
          label="Confirm Password"
          icon={`far ${pass.pass2 ? "fa-eye-slash" : "fa-eye"}`}
          type={pass.pass2 ? "password" : "text"}
          name="password2"
          value={inputs.password2 || ""}
          onChange={this.changeHandler}
          onClick={checkPassHandler(2)}
          error={error.password2}
        />

        <div className="d-grid">
          {error.currency && (
            <small className="text-muted">{error.currency}</small>
          )}
          <button type="submit" className="btn default-btn btn-lg btn-block">
            Add Currency
            {loading && (
              <span className="spinner-border spinner-border-sm ms-2"></span>
            )}
          </button>
        </div>
      </form>
    );
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
