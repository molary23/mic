import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

import { clearErrors } from "../action/authAction";

import { BsEyeSlash, BsEye } from "react-icons/bs";

import TextInputField from "../layout/TextInputField";
import TextPasswordField from "./TextPasswordField";
import Select from "../layout/Select";
import Signal from "../layout/Signal";
import Flag from "react-flagpack";
import TextAreaField from "../layout/TextAreaField";

import { countrycodes } from "../util/countrycodes";

import { checkHandler } from "../util/LoadFunction";
import isEmail from "validator/lib/isEmail";
import isEmpty from "../validation/emptyChecker";

function AddModal(props) {
  const {
    modal,
    sender,
    purpose,
    onSubmit,
    error,
    modalAnnDetails,
    modalsignaldetails,
    walletList,
    isLoading,
    info,
  } = props;

  const dispatch = useDispatch();

  let sentDetails = {};
  if (sender === "admin-announcements" && purpose === "edit") {
    sentDetails = modalAnnDetails;
  }

  if (sender === "admin-user") {
    sentDetails = info;
  }

  const [open, setOpen] = useState(modal);
  const [inputs, setInputs] = useState({});
  const [loading, setLoading] = useState(false);
  const [icon, setIcon] = useState({});
  const [pass1, setPass1] = useState(true);
  const [pass2, setPass2] = useState(true);
  const [errors, setErrors] = useState({});

  const [anns, setAnns] = useState({
    editanntitle: sentDetails.title,
    editannlink: sentDetails.link,
    editannstartdate: sentDetails.startdate,
    editannenddate: sentDetails.enddate,
    editannsummary: sentDetails.summary,
  });
  const [old, setOld] = useState({
    email: sentDetails.email,
    id: sentDetails.id,
  });

  let pattern = new RegExp("^[a-zA-Z0-9._-]+$");

  const signalOpt = [
    { value: "", option: "Select Signal Option" },
    { value: "b", option: "Buy" },
    { value: "s", option: "Sell" },
  ];

  const closeModal = () => {
    if (error !== undefined) {
      // console.log(error);
      if (Object.keys(error).length > 0) {
        dispatch(clearErrors());
      }
    }

    setOpen(false);
    props.onClick(false);
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setInputs((values) => ({ ...values, [name]: value }));
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
          JSON.parse(currencies[i].firstcurrency)[1].toUpperCase() +
          "/" +
          JSON.parse(currencies[i].secondcurrency)[1].toUpperCase()
        }`,
      };
      optArray.push(optObj);
    }
    optArray.unshift(defaultOpt);
    if (purpose === "add-new") {
      // Submit Add Signal
      const submitNewHandler = (e) => {
        e.preventDefault();
        if (
          !Object.keys(inputs).includes("addpair") ||
          isEmpty(inputs.addpair)
        ) {
          setErrors({
            addpair: "Currency Pair Field can't be empty",
          });
        } else if (
          !Object.keys(inputs).includes("addsignaloption") ||
          isEmpty(inputs.addsignaloption)
        ) {
          setErrors({
            addsignaloption: "Signal Option Field can't be empty",
          });
        } else if (
          !Object.keys(inputs).includes("addtakeprofit") ||
          isEmpty(inputs.addtakeprofit)
        ) {
          setErrors({
            addtakeprofit: "Take Profit Field can't be empty",
          });
        } else if (
          !Object.keys(inputs).includes("addstoploss") ||
          isEmpty(inputs.addstoploss)
        ) {
          setErrors({
            addstoploss: "Stop Loss Field can't be empty",
          });
        } else if (
          !Object.keys(inputs).includes("addstartrange") ||
          isEmpty(inputs.addstartrange)
        ) {
          setErrors({
            addstartrange: "Start Range Field can't be empty",
          });
        } else if (
          !Object.keys(inputs).includes("addendrange") ||
          isEmpty(inputs.addendrange)
        ) {
          setErrors({
            addendrange: "End Range Field can't be empty",
          });
        } else if (
          !Object.keys(inputs).includes("addpip") ||
          isEmpty(inputs.addpip)
        ) {
          setErrors({
            addpip: "Pip Field can't be empty",
          });
        } else {
          setLoading(true);
          let takeprofit = inputs.addtakeprofit.split(","),
            stoploss = inputs.addstoploss.split(",");

          const signal = {
            pair: parseInt(inputs.addpair),
            signaloption: inputs.addsignaloption,
            takeprofit: JSON.stringify(takeprofit),
            stoploss: JSON.stringify(stoploss),
            startrange: inputs.addstartrange,
            endrange: inputs.addendrange,
            pip: inputs.addpip,
          };

          setErrors({});
          onSubmit(["new", signal]);
        }
      };
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
      const statusOpt = [
        { value: "", option: "Select Signal Status" },
        { value: "c", option: "Cancelled" },
        { value: "f", option: "Failed" },
        { value: "s", option: "Successful" },
      ];
      // Submit Edit Signal
      const submitEditHandler = (e) => {
        e.preventDefault();
        if (
          !Object.keys(inputs).includes("signalstatus") ||
          isEmpty(inputs.signalstatus)
        ) {
          setErrors({
            signalstatus: "You have to select Signal Status",
          });
        } else {
          setLoading(true);
          const signal = {
            status: inputs.signalstatus,
          };
          setErrors({});
          onSubmit(["edit", signal, modalsignaldetails.signalid]);
        }
      };

      title = "Edit Signal";
      text = (
        <div className="edit-signal">
          <form className="edit-signal-form" onSubmit={submitEditHandler}>
            <Select
              options={statusOpt}
              onChange={changeHandler}
              name="signalstatus"
              value={inputs.signalstatus || ""}
              error={errors.signalstatus}
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
    // Submit Currency
    const submitCurrency = (e) => {
      e.preventDefault();
      if (
        !Object.keys(inputs).includes("addfirstcurrencyname") ||
        isEmpty(inputs.addfirstcurrencyname)
      ) {
        setErrors({
          addfirstcurrencyname: "First Currency Name Field can't be empty",
        });
      } else if (inputs.addfirstcurrencyname.length > 12) {
        setErrors({
          addfirstcurrencyname:
            "Currency Name can't be more than 12 characters",
        });
      } else if (
        !Object.keys(inputs).includes("addfirstcurrencycode") ||
        isEmpty(inputs.addfirstcurrencycode)
      ) {
        setErrors({
          addfirstcurrencycode: "First Currency Code Field can't be empty",
        });
      } else if (
        !Object.keys(inputs).includes("addsecondcurrencyname") ||
        isEmpty(inputs.addsecondcurrencyname)
      ) {
        setErrors({
          addsecondcurrencyname: "Second Currency Name Field can't be empty",
        });
      } else if (inputs.addsecondcurrencyname.length > 12) {
        setErrors({
          addsecondcurrencyname:
            "Currency Name can't be more than 12 characters",
        });
      } else if (
        !Object.keys(inputs).includes("addsecondcurrencycode") ||
        isEmpty(inputs.addsecondcurrencycode)
      ) {
        setErrors({
          addsecondcurrencycode: "Second Currency Code Field can't be empty",
        });
      } else if (inputs.addfirstcurrencyname === inputs.addsecondcurrencyname) {
        setErrors({
          addsecondcurrencyname:
            "Both First and Second Currency Name can't be the same",
        });
      } else if (inputs.addfirstcurrencycode === inputs.addsecondcurrencycode) {
        setErrors({
          addsecondcurrencycode:
            "Both First and Second Currency Code can't be the same",
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
    // Submit Admin
    const submitAdmin = (e) => {
      e.preventDefault();
      let tester = pattern.test(inputs.addadminusername);
      if (
        !Object.keys(inputs).includes("addadminemail") ||
        isEmpty(inputs.addadminemail)
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
        isEmpty(inputs.addadminusername)
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
        isEmpty(inputs.addadminphone)
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
        isEmpty(inputs.addadminpassword)
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
        isEmpty(inputs.addadminpassword2)
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
    let adm = sender.split("-")[1].replace(/s/g, "");
    title = `Add ${adm}`;
    text = (
      <form className="add-admin-form" onSubmit={submitAdmin}>
        <TextPasswordField
          id="add-admin-form-email"
          placeholder="Email Address"
          icon={
            icon.addadminemail ? (
              <span className="spinner-border spinner-border-sm"></span>
            ) : (
              ""
            )
          }
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
          icon={
            icon.addadminusername ? (
              <span className="spinner-border spinner-border-sm"></span>
            ) : (
              ""
            )
          }
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
          icon={pass1 ? <BsEye /> : <BsEyeSlash />}
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
          icon={pass2 ? <BsEye /> : <BsEyeSlash />}
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
      const submitNewAnnhandler = (e) => {
        e.preventDefault();
        if (
          !Object.keys(inputs).includes("addanntitle") ||
          isEmpty(inputs.addanntitle)
        ) {
          setErrors({
            addanntitle: "Announcement Title Field can't be empty",
          });
        } else if (inputs.addanntitle.length > 50) {
          setErrors({
            addanntitle: "Announcement Title can't be more than 50 characters",
          });
        } else if (inputs.addannlink.length > 100) {
          setErrors({
            addannlink: "Announcement Title can't be more than 30 characters",
          });
        } else if (
          !Object.keys(inputs).includes("addannstartdate") ||
          isEmpty(inputs.addannstartdate)
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
          isEmpty(inputs.addannenddate)
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
          isEmpty(inputs.addannsummary)
        ) {
          setErrors({
            addannsummary: "Announcement Summary Field can't be empty",
          });
        } else if (inputs.addannsummary.length > 255) {
          setErrors({
            addannsummary:
              "Announcement Summary can't be more than 255 characters",
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
            type="text"
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
      const submitEditAnnhandler = (e) => {
        e.preventDefault();
        if (isEmpty(anns.editanntitle)) {
          setErrors({
            editanntitle: "Announcement Title Field can't be empty",
          });
        } else if (anns.editanntitle.length > 50) {
          setErrors({
            editanntitle: "Announcement Title can't be more than 50 characters",
          });
        } else if (anns.editannlink.length > 100) {
          setErrors({
            editannlink: "Announcement Title can't be more than 30 characters",
          });
        } else if (isEmpty(anns.editannstartdate)) {
          setErrors({
            editannstartdate: "Announcement Start Date Field can't be empty",
          });
        } else if (anns.editannstartdate.length > 10) {
          setErrors({
            editannstartdate:
              "Announcement Start Date can't be more than 10 characters",
          });
        } else if (isEmpty(anns.editannenddate)) {
          setErrors({
            editannenddate: "Announcement End Date can't be empty",
          });
        } else if (anns.editannenddate.length > 10) {
          setErrors({
            editannstartdate:
              "Announcement End Date can't be more than 10 characters",
          });
        } else if (isEmpty(anns.editannsummary)) {
          setErrors({
            editannsummary: "Announcement Summary Field can't be empty",
          });
        } else if (anns.editannsummary.length > 255) {
          setErrors({
            editannsummary:
              "Announcement Summary can't be more than 255 characters",
          });
        } else {
          setErrors({});
          const ann = {
            title: anns.editanntitle.toLowerCase(),
            link: anns.editannlink.toLowerCase(),
            summary: anns.editannsummary.toLowerCase(),
            startdate: anns.editannstartdate,
            enddate: anns.editannenddate,
          };
          onSubmit(["edit", ann, modalAnnDetails.id]);
        }
      };

      const changeEditHandler = (e) => {
        setAnns({ ...anns, [e.target.name]: e.target.value });
      };

      title = "Edit Announcements";
      text = (
        <form className="edit-ann-form" onSubmit={submitEditAnnhandler}>
          <TextInputField
            id="edit-ann-title"
            placeholder="Announcement Title"
            type="text"
            name="editanntitle"
            value={anns.editanntitle}
            onChange={changeEditHandler}
            error={errors.editanntitle}
          />
          <TextInputField
            id="edit-ann-link"
            placeholder="Announcement link"
            type="url"
            name="editannlink"
            value={anns.editannlink}
            onChange={changeEditHandler}
            error={errors.editannlink}
          />
          <TextInputField
            id="edit-ann-startdate"
            placeholder="Announcement Start Date"
            type="date"
            name="editannstartdate"
            value={anns.editannstartdate}
            onChange={changeEditHandler}
            error={errors.editannstartdate}
          />
          <TextInputField
            id="edit-ann-enddate"
            placeholder="Announcement End Date"
            type="date"
            name="editannenddate"
            value={anns.editannenddate}
            onChange={changeEditHandler}
            error={errors.editenddate}
          />
          <TextAreaField
            id="edit-ann-summary"
            placeholder="Announcement Summary"
            type="text"
            name="editannsummary"
            value={anns.editannsummary}
            onChange={changeEditHandler}
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
      let optObj = {},
        defaultOpt = { value: "", option: "Select Wallet" },
        optArray = [];
      for (let i = 0; i < walletList.length; i++) {
        optObj = {
          value: walletList[i].id,
          option: walletList[i].wallet,
        };
        optArray.push(optObj);
      }
      optArray.unshift(defaultOpt);

      title = "Add/Modify Account";

      const submitAccountHandler = (e) => {
        e.preventDefault();
        if (!Object.keys(inputs).includes("wallet") || isEmpty(inputs.wallet)) {
          setErrors({
            wallet: "Wallet Field can't be empty",
          });
        } else if (
          !Object.keys(inputs).includes("accountnumber") ||
          isEmpty(inputs.accountnumber)
        ) {
          setErrors({
            accountnumber: "Account Number Field can't be empty",
          });
        } else if (inputs.accountnumber.length > 50) {
          setErrors({
            accountnumber: "Account Number can't be more than 50 characters",
          });
        } else {
          setErrors({});
          setLoading(true);
          const account = {
            walletid: parseInt(inputs.wallet),
            accountnumber: inputs.accountnumber.toLowerCase(),
          };
          onSubmit(account);
        }
      };
      text = (
        <form className="account-form" onSubmit={submitAccountHandler}>
          <Select
            options={optArray}
            onChange={changeHandler}
            name="wallet"
            value={inputs.wallet || ""}
            error={errors.wallet}
          />

          <TextInputField
            id="account-form-account-number"
            placeholder="Account Number"
            label="Account Number"
            type="text"
            name="accountnumber"
            value={inputs.accountnumber || ""}
            onChange={changeHandler}
            error={errors.accountnumber}
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
  } else if (sender === "admin-wallets") {
    const submitWalletHandler = (e) => {
      e.preventDefault();
      if (
        !Object.keys(inputs).includes("walletname") ||
        inputs.walletname === ""
      ) {
        setErrors({
          walletname: "Wallet Field can't be empty",
        });
      } else if (inputs.walletname.length > 10) {
        setErrors({
          walletname: "Wallet Field can't be more than 10 characters",
        });
      } else {
        setErrors({});
        setLoading(true);
        const wallet = {
          wallet: inputs.walletname.toLowerCase(),
        };
        onSubmit(wallet);
        setLoading(isLoading);
      }
    };
    title = "Add New Wallet";
    text = (
      <form className="account-form" onSubmit={submitWalletHandler}>
        <TextInputField
          id="account-form-account-number"
          placeholder="Wallet Name"
          type="text"
          name="walletname"
          value={inputs.walletname || ""}
          onChange={changeHandler}
          error={errors.walletname || error.wallet}
        />
        <div className="d-grid">
          <button type="submit" className="btn default-btn btn-lg btn-block">
            Add Wallet
            {loading && (
              <span className="spinner-border spinner-border-sm ms-2"></span>
            )}
          </button>
        </div>
      </form>
    );
  } else if (sender === "user-withdrawals") {
    const { accountList, balance } = props;
    let accObj = {},
      optArray = [{ value: "", option: "Select Account Details" }];
    for (let i = 0; i < accountList.length; i++) {
      accObj = {
        value: `${accountList[i].walletid}-${accountList[i].accountnumber}`,
        option: `${accountList[i].wallet.toUpperCase()} - ${accountList[
          i
        ].accountnumber.toUpperCase()}`,
      };
      optArray.push(accObj);
    }

    const submitWithdrawHandler = (e) => {
      e.preventDefault();
      if (!Object.keys(inputs).includes("wallet") || isEmpty(inputs.wallet)) {
        setErrors({
          wallet: "Wallet Field can't be empty",
        });
      } else if (
        !Object.keys(inputs).includes("amount") ||
        isEmpty(inputs.amount)
      ) {
        setErrors({
          amount: "Amount Field can't be empty",
        });
      } else if (inputs.amount > balance) {
        setErrors({
          amount: "Amount can't be more than your balance",
        });
      } else {
        setErrors({});
        setLoading(true);
        const withdrawals = {
          wallet: parseInt(inputs.wallet.split("-")[0]),
          accountnumber: inputs.wallet.split("-")[1],
          amount: parseInt(inputs.amount),
        };
        onSubmit(withdrawals);
        setLoading(isLoading);
      }
    };
    title = "Request for a Payout";
    text = (
      <form className="withdraw-form" onSubmit={submitWithdrawHandler}>
        <Select
          options={optArray}
          onChange={changeHandler}
          name="wallet"
          value={inputs.wallet || ""}
          error={errors.wallet}
        />
        <TextInputField
          id="withdraw-form-amount"
          placeholder="Amount"
          type="text"
          name="amount"
          value={inputs.amount || ""}
          onChange={changeHandler}
          error={errors.amount || error.amount}
        />
        <div className="d-grid">
          <button type="submit" className="btn default-btn btn-lg btn-block">
            Request
            {loading && (
              <span className="spinner-border spinner-border-sm ms-2"></span>
            )}
          </button>
        </div>
      </form>
    );
  } else if (sender === "user-forums" || sender === "admin-forums") {
    const submitForumHandler = (e) => {
      e.preventDefault();
      if (
        !Object.keys(inputs).includes("forumtitle") ||
        isEmpty(inputs.forumtitle)
      ) {
        setErrors({
          forumtitle: "Discussion Title Field can't be empty",
        });
      } else if (inputs.forumtitle.length > 100) {
        setErrors({
          forumtitle: "Discussion Title can't be more than 100 characters",
        });
      } else if (
        !Object.keys(inputs).includes("forumtext") ||
        isEmpty(inputs.forumtext)
      ) {
        setErrors({
          forumtext: "Discussion Content Field can't be empty",
        });
      } else {
        setErrors({});
        setLoading(true);
        const forum = {
          title: inputs.forumtitle.toLowerCase(),
          text: inputs.forumtext.toLowerCase(),
        };
        onSubmit(forum);
        setLoading(isLoading);
      }
    };
    title = "Create a Discussion";
    text = (
      <form className="withdraw-form" onSubmit={submitForumHandler}>
        <TextInputField
          id="create-forum-title"
          placeholder="Discussion Title"
          type="text"
          name="forumtitle"
          value={inputs.forumtitle || ""}
          onChange={changeHandler}
          error={errors.forumtitle || error.forumtitle}
        />
        <TextAreaField
          id="create-forum-text"
          placeholder="Discussion Text"
          type="text"
          name="forumtext"
          value={inputs.forumtext || ""}
          onChange={changeHandler}
          error={errors.forumtext}
        />
        <div className="d-grid">
          <button type="submit" className="btn default-btn btn-lg btn-block">
            Create
            {loading && (
              <span className="spinner-border spinner-border-sm ms-2"></span>
            )}
          </button>
        </div>
      </form>
    );
  } else if (sender === "admin-user") {
    const changeEditHandler = (e) => {
      setOld({ ...old, [e.target.name]: e.target.value });
    };
    const submitNewEmail = (e) => {
      e.preventDefault();
      if (!Object.keys(old).includes("email") || old.email === "") {
        setErrors({
          email: "Email Address Field can't be empty",
        });
      } else if (!isEmail(old.email)) {
        setErrors({
          email: "Only Email Address is allowed",
        });
      } else if (old.email.length > 50) {
        setErrors({
          email: "Email Address can't be more than 50 characters",
        });
      } else if (old.email === info.email) {
        setErrors({
          email: "New Email Address can't be same with the Old Email Address",
        });
      } else {
        setErrors({});
        setLoading(true);
        const email = {
          email: old.email.toLowerCase(),
          id: old.id,
        };
        onSubmit(email);
        setLoading(isLoading);
      }
    };
    title = `Change Email Address`;
    text = (
      <form className="withdraw-form" onSubmit={submitNewEmail}>
        <input type="hidden" value={old.id} readOnly name="id" />
        <TextInputField
          id="change-email"
          placeholder="Email Address"
          type="text"
          name="email"
          value={old.email || ""}
          onChange={changeEditHandler}
          error={errors.email || error.email}
        />
        <div className="d-grid">
          <button type="submit" className="btn default-btn btn-lg btn-block">
            Change Email
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

AddModal.propTypes = {
  modal: PropTypes.bool.isRequired,
  sender: PropTypes.string.isRequired,
  purpose: PropTypes.string,
  onSubmit: PropTypes.func,
  error: PropTypes.any,
  modalAnnDetails: PropTypes.object,
  modalsignaldetails: PropTypes.any,
  walletList: PropTypes.object,
  isLoading: PropTypes.bool,
  info: PropTypes.object,
  onClick: PropTypes.func,
  accountList: PropTypes.object,
  balance: PropTypes.number,
};

export default connect(null, {
  clearErrors,
})(AddModal);
