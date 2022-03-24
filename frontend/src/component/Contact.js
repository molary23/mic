import React, { useState } from "react";

import TextInputField from "../layout/TextInputField";
import TextAreaField from "../layout/TextAreaField";

function Contact() {
  const [inputs, setInputs] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const submitHandler = (e) => {
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
      const message = {
        name: inputs.name.toLowerCase(),
        email: inputs.email.toLowerCase(),
        phone: inputs.phone,
        subject: inputs.subject,
        message: inputs.message,
      };

      //submit
      console.log(message);
    }
  };

  return (
    <div>
      <div className="main-home-contact" id="contactus"></div>
      <div className="main-home-contact-box">
        <div className="container">
          <div className="page-title mb-3">
            <h1 className="mb-4">Contact us</h1>
            <h4 className="mb-5">We are only one Buzz away</h4>
          </div>

          <form className="contact-form" onSubmit={submitHandler}>
            <div className="row">
              <div className="col-md-6  col-12">
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
            <button type="submit" className="btn btn-primary btn-block btn-lg">
              Send Message
              {loading && (
                <span className="spinner-border spinner-border-sm ms-2"></span>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
