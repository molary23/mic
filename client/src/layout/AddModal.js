import React, { useState } from "react";
import TextInputField from "../layout/TextInputField";
import TextPasswordField from "./TextPasswordField";
import Select from "../layout/Select";
import Signal from "../layout/Signal";
import Flag from "react-flagpack";
import TextAreaField from "../layout/TextAreaField";

import { countrycodes } from "../util/countrycodes";

import { checkEmptyInput, checkHandler } from "../util/LoadFunction";

function AddModal(props) {
  const {
    modal,
    sender,
    purpose,
    onSubmit,
    modalsignaldetails,
    error,
    modalAnnDetails,
  } = props;

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

  const submitNewAnnhandler = (e) => {
    e.preventDefault();
    if (
      !Object.keys(inputs).includes("addanntitle") ||
      inputs.addanntitle === ""
    ) {
      setErrors({
        addanntitle: "Announcement Title Field can't be empty",
      });
    } else if (inputs.addanntitle.length > 50) {
      setErrors({
        addanntitle: "Announcement Title can't be more than 50 characters",
      });
    } else if (
      !Object.keys(inputs).includes("addannlink") ||
      inputs.addannlink === ""
    ) {
      setErrors({
        addannlink: "Announcement Link can't be empty",
      });
    } else if (inputs.addannlink.length > 100) {
      setErrors({
        addannlink: "Announcement Title can't be more than 30 characters",
      });
    } else if (
      !Object.keys(inputs).includes("addannstartdate") ||
      inputs.addannstartdate === ""
    ) {
      setErrors({
        addannstartdate: "Announcement Start Date Field can't be empty",
      });
    } else if (inputs.addannstartdate.length > 10) {
      setErrors({
        addannstartdate:
          "Announcement Start Date can't be more than 10 characters",
      });
    } else if (
      !Object.keys(inputs).includes("addannenddate") ||
      inputs.addannenddate === ""
    ) {
      setErrors({
        addannenddate: "Announcement End Date can't be empty",
      });
    } else if (inputs.addannenddate.length > 10) {
      setErrors({
        addannstartdate:
          "Announcement End Date can't be more than 10 characters",
      });
    } else if (
      !Object.keys(inputs).includes("addannsummary") ||
      inputs.addannsummary === ""
    ) {
      setErrors({
        addannsummary: "Announcement Summary Field can't be empty",
      });
    } else if (inputs.addannsummary.length > 255) {
      setErrors({
        addannsummary: "Announcement Summary can't be more than 255 characters",
      });
    } else {
      setErrors({});
      const ann = {
        title: inputs.addanntitle.toLowerCase(),
        link: inputs.addannlink.toLowerCase(),
        summary: inputs.addannsummary.toLowerCase(),
        startdate: inputs.addannstartdate,
        enddate: inputs.addannenddate,
      };
      onSubmit(["new", ann]);
    }
  };

  const submitEditAnnhandler = (e) => {
    e.preventDefault();
    inputs.editanntitle =
      inputs.editanntitle ?? modalAnnDetails.title.toString();
    inputs.editannlink = inputs.editannlink ?? modalAnnDetails.link.toString();
    inputs.editannstartdate =
      inputs.editannstartdate ?? modalAnnDetails.startdate;
    inputs.editannenddate = inputs.editannenddate ?? modalAnnDetails.enddate;
    inputs.editannsummary =
      inputs.editannsummary ?? modalAnnDetails.summary.toString();
    if (
      !Object.keys(inputs).includes("editanntitle") ||
      inputs.editanntitle === ""
    ) {
      setErrors({
        editanntitle: "Announcement Title Field can't be empty",
      });
    } else if (inputs.editanntitle.length > 50) {
      setErrors({
        editanntitle: "Announcement Title can't be more than 50 characters",
      });
    } else if (
      !Object.keys(inputs).includes("editannlink") ||
      inputs.editannlink === ""
    ) {
      setErrors({
        editannlink: "Announcement Link can't be empty",
      });
    } else if (inputs.editannlink.length > 100) {
      setErrors({
        editannlink: "Announcement Title can't be more than 30 characters",
      });
    } else if (
      !Object.keys(inputs).includes("editannstartdate") ||
      inputs.editannstartdate === ""
    ) {
      setErrors({
        editannstartdate: "Announcement Start Date Field can't be empty",
      });
    } else if (inputs.editannstartdate.length > 10) {
      setErrors({
        editannstartdate:
          "Announcement Start Date can't be more than 10 characters",
      });
    } else if (
      !Object.keys(inputs).includes("editannenddate") ||
      inputs.editannenddate === ""
    ) {
      setErrors({
        editannenddate: "Announcement End Date can't be empty",
      });
    } else if (inputs.editannenddate.length > 10) {
      setErrors({
        editannstartdate:
          "Announcement End Date can't be more than 10 characters",
      });
    } else if (
      !Object.keys(inputs).includes("editannsummary") ||
      inputs.editannsummary === ""
    ) {
      setErrors({
        editannsummary: "Announcement Summary Field can't be empty",
      });
    } else if (inputs.editannsummary.length > 255) {
      setErrors({
        editannsummary:
          "Announcement Summary can't be more than 255 characters",
      });
    } else {
      setErrors({});
      const ann = {
        title: inputs.editanntitle.toLowerCase(),
        link: inputs.editannlink.toLowerCase(),
        summary: inputs.editannsummary.toLowerCase(),
        startdate: inputs.editannstartdate,
        enddate: inputs.editannenddate,
      };
      onSubmit(["edit", ann, modalAnnDetails.id]);
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
          JSON.parse(currencies[i].firstcurrency.split(", "))[1].toUpperCase() +
          "/" +
          JSON.parse(currencies[i].secondcurrency.split(", "))[1].toUpperCase()
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
              placeholder="Take Profit *Separate multiple Take Profits with Comma (,)*"
              type="text"
              name="addtakeprofit"
              value={inputs.addtakeprofit || ""}
              onChange={changeHandler}
              error={errors.addtakeprofit}
            />
            <TextInputField
              id="add-new-takeprofit"
              placeholder="Stop Loss *Separate multiple Stop Loss with Comma (,)*"
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
        <div className="edit-signal">
          <form className="edit-signal-form" onSubmit={submitEditHandler}>
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
  } else if (sender === "admin-announcements") {
    if (purpose === "add") {
      title = "Add Announcements";
      text = (
        <form className="add-new-ann-form" onSubmit={submitNewAnnhandler}>
          <TextInputField
            id="add-new-ann-title"
            placeholder="Announcement Title"
            type="text"
            name="addanntitle"
            value={inputs.addanntitle || ""}
            onChange={changeHandler}
            error={errors.addanntitle}
          />
          <TextInputField
            id="add-new-ann-link"
            placeholder="Announcement link"
            type="url"
            name="addannlink"
            value={inputs.addannlink || ""}
            onChange={changeHandler}
            error={errors.addannlink}
          />
          <TextInputField
            id="add-new-ann-startdate"
            placeholder="Announcement Start Date"
            type="date"
            name="addannstartdate"
            value={inputs.addannstartdate || ""}
            onChange={changeHandler}
            error={errors.addannstartdate}
          />
          <TextInputField
            id="add-new-ann-enddate"
            placeholder="Announcement End Date"
            type="date"
            name="addannenddate"
            value={inputs.addannenddate || ""}
            onChange={changeHandler}
            error={errors.addannenddate}
          />
          <TextAreaField
            id="add-new-ann-summary"
            placeholder="Announcement Summary"
            type="url"
            name="addannsummary"
            value={inputs.addannsummary || ""}
            onChange={changeHandler}
            error={errors.addannsummary}
          />
          <div className="d-grid">
            {error.admin && <small className="text-muted">{error.admin}</small>}
            <button type="submit" className="btn default-btn btn-lg btn-block">
              Add Announcement
              {loading && (
                <span className="spinner-border spinner-border-sm ms-2"></span>
              )}
            </button>
          </div>
        </form>
      );
    } else {
      title = "Edit Announcements";
      text = (
        <form className="edit-ann-form" onSubmit={submitEditAnnhandler}>
          <TextInputField
            id="edit-ann-title"
            placeholder="Announcement Title"
            type="text"
            name="editanntitle"
            value={inputs.editanntitle || modalAnnDetails.title}
            onChange={changeHandler}
            error={errors.editanntitle}
          />
          <TextInputField
            id="edit-ann-link"
            placeholder="Announcement link"
            type="url"
            name="editannlink"
            value={inputs.editannlink || modalAnnDetails.link}
            onChange={changeHandler}
            error={errors.editannlink}
          />
          <TextInputField
            id="edit-ann-startdate"
            placeholder="Announcement Start Date"
            type="date"
            name="editstartdate"
            value={inputs.editstartdate || modalAnnDetails.startdate}
            onChange={changeHandler}
            error={errors.editstartdate}
          />
          <TextInputField
            id="edit-ann-enddate"
            placeholder="Announcement End Date"
            type="date"
            name="editenddate"
            value={inputs.editannstartdate || modalAnnDetails.startdate}
            onChange={changeHandler}
            error={errors.editannstartdate}
          />
          <TextAreaField
            id="edit-ann-summary"
            placeholder="Announcement Summary"
            type="url"
            name="editannsummary"
            value={inputs.editannsummary || modalAnnDetails.summary}
            onChange={changeHandler}
            error={errors.editannsummary}
          />
          <div className="d-grid">
            {error.admin && <small className="text-muted">{error.admin}</small>}
            <button type="submit" className="btn default-btn btn-lg btn-block">
              Edit Announcement
              {loading && (
                <span className="spinner-border spinner-border-sm ms-2"></span>
              )}
            </button>
          </div>
        </form>
      );
    }
  }

  if (sender === "user-settings") {
    if (purpose === "account") {
      title = "Add/Modify Account";
      const walletOpt = [
        {
          value: "",
          option: "Select Wallet",
        },
      ];
      const submitAccountHandler = (e) => {};
      text = (
        <form className="account-form" onSubmit={submitAccountHandler}>
          <Select
            options={walletOpt}
            onChange={changeHandler}
            name="wallet"
            value={inputs.wallet || ""}
            error={error.wallet}
          />

          <TextInputField
            id="account-form-account-number"
            placeholder="Account Number"
            label="Account Number"
            type="text"
            name="accountnumber"
            value={inputs.accountnumber || ""}
            onChange={changeHandler}
            error={error.accountnumber}
          />
          <div className="d-grid">
            <button type="submit" className="btn default-btn btn-lg btn-block">
              Add Account
              {loading && (
                <span className="spinner-border spinner-border-sm ms-2"></span>
              )}
            </button>
          </div>
        </form>
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
