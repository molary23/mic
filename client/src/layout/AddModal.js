import React, { useState } from "react";
import TextInputField from "../layout/TextInputField";
import TextPasswordField from "./TextPasswordField";
import Select from "../layout/Select";
import Signal from "../layout/Signal";
import Flag from "react-flagpack";

import { countrycodes } from "../util/countrycodes";

import { checkEmptyInput, checkHandler } from "../util/LoadFunction";

function AddModal(props) {
  const { modal, sender, purpose, onSubmit, modalsignaldetails, error } = props;
  const [open, setOpen] = useState(modal);
  const [inputs, setInputs] = useState({});
  const [loading, setLoading] = useState(false);
  const [icon, setIcon] = useState({});
  const [pass1, setPass1] = useState(true);
  const [pass2, setPass2] = useState(true);
  const [errors, setErrors] = useState({});
  let pattern = new RegExp("^[a-zA-Z0-9._-]+$");

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
  // Submit Add Signal
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
      setErrors({});
      onSubmit(["new", signal]);
    }
  };

  // Submit Edit Signal
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
      setErrors({});
      onSubmit(["edit", signal, modalsignaldetails.signalid]);
    }
  };
  // Submit Currency
  const submitCurrency = (e) => {
    e.preventDefault();
    if (
      !Object.keys(inputs).includes("addfirstcurrencyname") ||
      inputs.addfirstcurrencyname === ""
    ) {
      setErrors({
        addfirstcurrencyname: "First Currency Name Field can't be empty",
      });
    } else if (inputs.addfirstcurrencyname.length > 3) {
      setErrors({
        addfirstcurrencyname: "Currency Name can't be more than 3 characters",
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
        addsecondcurrencyname: "Second Currency Name Field can't be empty",
      });
    } else if (inputs.addsecondcurrencyname.length > 3) {
      setErrors({
        addsecondcurrencyname: "Currency Name can't be more than 3 characters",
      });
    } else if (
      !Object.keys(inputs).includes("addsecondcurrencycode") ||
      inputs.addsecondcurrencycode === ""
    ) {
      setErrors({
        addsecondcurrencycode: "Second Currency Code Field can't be empty",
      });
    } else {
      setErrors({});
      const currency = {
        firstcurrencypair: JSON.stringify([
          inputs.addfirstcurrencycode.toLowerCase(),
          inputs.addfirstcurrencyname.toLowerCase(),
        ]),
        secondcurrencypair: JSON.stringify([
          inputs.addsecondcurrencycode.toLowerCase(),
          inputs.addsecondcurrencyname.toLowerCase(),
        ]),
      };
      onSubmit(["add", currency]);
    }
  };

  // Submit Admin
  const submitAdmin = (e) => {
    e.preventDefault();
    let tester = pattern.test(inputs.addadminusername);
    if (
      !Object.keys(inputs).includes("addadminemail") ||
      inputs.addadminemail === ""
    ) {
      setErrors({
        addadminemail: "Email Address Field can't be empty",
      });
    } else if (inputs.addadminemail.length > 50) {
      setErrors({
        addadminemail: "Email Address can't be more than 50 characters",
      });
    } else if (
      !Object.keys(inputs).includes("addadminusername") ||
      inputs.addadminusername === ""
    ) {
      setErrors({
        addadminusername: "Username Field can't be empty",
      });
    } else if (!tester) {
      setErrors({
        addadminusername:
          "Only contain Letters, Numbers and (.-_) characters allowed",
      });
    } else if (inputs.addadminusername.length > 30) {
      setErrors({
        addadminusername: "Username can't be more than 30 characters",
      });
    } else if (
      !Object.keys(inputs).includes("addadminphone") ||
      inputs.addadminphone === ""
    ) {
      setErrors({
        addadminphone: "Phone Number Field can't be empty",
      });
    } else if (isNaN(inputs.addadminphone)) {
      setErrors({
        addadminphone: "Phone Number can only be a Number",
      });
    } else if (inputs.addadminphone.length > 20) {
      setErrors({
        addadminphone: "Phone Number can only be 20 digits",
      });
    } else if (
      !Object.keys(inputs).includes("addadminpassword") ||
      inputs.addadminpassword === ""
    ) {
      setErrors({
        addadminpassword: "Password Field can't be empty",
      });
    } else if (inputs.addadminpassword.length < 8) {
      setErrors({
        addadminpassword: "Password should be at least 8 characters",
      });
    } else if (
      !Object.keys(inputs).includes("addadminpassword2") ||
      inputs.addadminpassword2 === ""
    ) {
      setErrors({
        addadminpassword2: "Confirm Password Field can't be empty",
      });
    } else if (inputs.addadminpassword2.length < 8) {
      setErrors({
        addadminpassword2: "Confirm Password should be at least 8 characters",
      });
    } else if (inputs.addadminpassword !== inputs.addadminpassword2) {
      setErrors({
        addadminpassword2: "Password Mismatched",
      });
    } else {
      setErrors({});
      const admin = {
        email: inputs.addadminemail.toLowerCase(),
        username: inputs.addadminusername.toLowerCase(),
        phone: inputs.addadminphone,
        password: inputs.addadminpassword,
      };
      onSubmit(["add", admin]);
    }
  };

  const keyHandler = (e) => {
    if (
      e.target.name === "addadminusername" ||
      e.target.name === "addadminemail"
    ) {
      checkHandler(e.target.name, e.target.value, setIcon, setErrors);
    }
  };
  const checkPassHandler = (value) => {
    if (value === 1) {
      setPass1(!pass1);
    } else if (value === 2) {
      setPass2(!pass2);
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
  } else if (sender === "admin-admins" || sender === "admin-providers") {
    let adm = sender.split("-")[1].replace(/s/g, "");
    title = `Add ${adm}`;
    text = (
      <form className="add-admin-form" onSubmit={submitAdmin}>
        <TextPasswordField
          id="add-admin-form-email"
          placeholder="Email Address"
          icon={`${icon.addadminemail ? "fas fa-circle-notch fa-spin" : ""}`}
          type="email"
          name="addadminemail"
          value={inputs.addadminemail || ""}
          onChange={changeHandler}
          error={errors.addadminemail || error.email}
          onKeyUp={keyHandler}
        />

        <TextPasswordField
          id="add-admin-form-referral"
          placeholder="Username"
          icon={`${icon.addadminusername ? "fas fa-circle-notch fa-spin" : ""}`}
          type="text"
          name="addadminusername"
          value={inputs.addadminusername || ""}
          onChange={changeHandler}
          error={errors.addadminusername || error.username}
          onKeyUp={keyHandler}
        />

        <TextInputField
          id="add-admin-phone"
          placeholder="Phone Number"
          type="tel"
          name="addadminphone"
          value={inputs.addadminphone || ""}
          onChange={changeHandler}
          error={errors.addadminphone}
        />

        <TextPasswordField
          id="add-admin-form-password"
          placeholder="Password"
          icon={`far ${pass1 ? "fa-eye" : "fa-eye-slash"}`}
          type={pass1 ? "password" : "text"}
          name="addadminpassword"
          value={inputs.addadminpassword || ""}
          onChange={changeHandler}
          onClick={() => checkPassHandler(1)}
          error={errors.addadminpassword}
        />
        <TextPasswordField
          id="add-admin-form-password2"
          placeholder="Confirm Password"
          icon={`far ${pass2 ? "fa-eye" : "fa-eye-slash"}`}
          type={pass2 ? "password" : "text"}
          name="addadminpassword2"
          value={inputs.addadminpassword2 || ""}
          onChange={changeHandler}
          onClick={() => checkPassHandler(2)}
          error={errors.addadminpassword2}
        />

        <div className="d-grid">
          {error.admin && <small className="text-muted">{error.admin}</small>}
          <button type="submit" className="btn default-btn btn-lg btn-block">
            Add {adm}
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
