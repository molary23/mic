import React, { useState } from "react";

import TextInputField from "../layout/TextInputField";
import TextAreaField from "../layout/TextAreaField";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const changeHandler = (e) => {};

  return (
    <div>
      <div className="main-home-contact"></div>
      <div className="main-home-contact-box">
        <div className="container">
          <div className="page-title mb-3">
            <h1>Contact us</h1>
            <h4>We are only one Buzz away</h4>
          </div>

          <form>
            <div className="row">
              <div className="col">
                <TextInputField
                  id="contact-form-name"
                  label="Full Name"
                  type="text"
                  name="name"
                  value={name}
                  onChange={changeHandler}
                />
              </div>
              <div className="col">
                <TextInputField
                  id="contact-form-email"
                  label="Email Address"
                  type="email"
                  name="email"
                  value={email}
                  onChange={changeHandler}
                />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <TextInputField
                  id="contact-form-phone"
                  label="Phone Number"
                  type="tel"
                  name="phone"
                  value={phone}
                  onChange={changeHandler}
                />
              </div>
              <div className="col">
                <TextInputField
                  id="contact-form-subject"
                  label="Subject"
                  type="text"
                  name="subject"
                  value={subject}
                  onChange={changeHandler}
                />
              </div>
            </div>
            <TextAreaField
              id="contact-form-message"
              label="Message"
              name="message"
              value={message}
              onChange={changeHandler}
            />
            <button type="submit" className="btn btn-primary btn-block btn-lg">
              Send Message
              <span className="spinner-border spinner-border-sm ms-2"></span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
