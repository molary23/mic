import React, { useState } from "react";
import axios from "axios";

import TextInputField from "../layout/TextInputField";
import TextAreaField from "../layout/TextAreaField";
import Modal from "../layout/Modal";

function Contact(props) {
  const [inputs, setInputs] = useState({}),
    [errors, setErrors] = useState({}),
    [loading, setLoading] = useState(false),
    [modal, setModal] = useState(false),
    [sender, setSender] = useState(null);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!Object.keys(inputs).includes("name") || inputs.name === "") {
      setErrors({
        name: "We need your name for documentation purposes.",
      });
    } else if (!Object.keys(inputs).includes("email") || inputs.email === "") {
      setErrors({
        email: "We need your email for our response to reach you.",
      });
    } else if (!Object.keys(inputs).includes("phone") || inputs.phone === "") {
      setErrors({
        phone: "We need  your phone number for faster communication.",
      });
    } else if (isNaN(inputs.phone)) {
      setErrors({
        phone: "Phone number can only be numbers.",
      });
    } else if (
      !Object.keys(inputs).includes("subject") ||
      inputs.subject === ""
    ) {
      setErrors({
        subject: "You need to enter a Subject for your message.",
      });
    } else if (
      !Object.keys(inputs).includes("message") ||
      inputs.message === ""
    ) {
      setErrors({
        message: "What is a Message without content?",
      });
    } else {
      setLoading(true);
      setErrors({});
      const message = {
        name: inputs.name.toLowerCase(),
        email: inputs.email.toLowerCase(),
        phone: inputs.phone,
        subject: inputs.subject,
        message: inputs.message,
      };

      try {
        let response = await axios.post(
          "https://micearnbusiness.org/mail/send.php",
          {
            message,
          },
          {}
        );
        if (response.data === 1) {
          setInputs({});
          setLoading(false);
          setSender("success");
          setModal(true);
        }
      } catch (error) {
        setSender("error");
        setModal(true);
      }
    }
  };

  const modalHandler = (close) => {
    setModal(close);
  };

  return (
    <div id="contactus" ref={props.contactRef}>
      <div className="main-home-contact"></div>
      <div className="main-home-contact-box">
        <div className="container-fluid">
          <div className="page-title mb-3">
            <h1 className="mb-4">Contact us</h1>
            <h4 className="mb-5">We are only one Buzz away</h4>
          </div>
          <div className="row">
            <div className="col-md-6 d-none d-md-block">
              <div className="contact-image"></div>
            </div>
            <div className="col-md-6 col-12">
              <div className="contact-form">
                <form className="contact-form" onSubmit={submitHandler}>
                  <div className="row">
                    <div className="col-md-6 col-12">
                      <TextInputField
                        id="contact-form-name"
                        label="Full Name"
                        type="text"
                        name="name"
                        value={inputs.name || ""}
                        onChange={changeHandler}
                        error={errors.name}
                      />
                    </div>
                    <div className="col-md-6  col-12">
                      <TextInputField
                        id="contact-form-email"
                        label="Email Address"
                        type="email"
                        name="email"
                        value={inputs.email || ""}
                        onChange={changeHandler}
                        error={errors.email}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6  col-12">
                      <TextInputField
                        id="contact-form-phone"
                        label="Phone Number"
                        type="tel"
                        name="phone"
                        value={inputs.phone || ""}
                        onChange={changeHandler}
                        error={errors.phone}
                      />
                    </div>
                    <div className="col-md-6 col-12">
                      <TextInputField
                        id="contact-form-subject"
                        label="Subject"
                        type="text"
                        name="subject"
                        value={inputs.subject || ""}
                        onChange={changeHandler}
                        error={errors.subject}
                      />
                    </div>
                  </div>
                  <TextAreaField
                    id="contact-form-message"
                    label="Message"
                    name="message"
                    value={inputs.message || ""}
                    onChange={changeHandler}
                    error={errors.message}
                  />
                  <button
                    type="submit"
                    className="btn default-btn btn-block btn-lg"
                  >
                    Send Message
                    {loading && (
                      <span className="spinner-border spinner-border-sm ms-2"></span>
                    )}
                  </button>
                </form>
              </div>
            </div>
            {modal ? (
              <Modal onClick={modalHandler} modal={modal} sender={sender} />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
