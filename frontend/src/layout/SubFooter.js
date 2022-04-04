import React from "react";
import logo from "../asset/images/logo.png";

import {
  AiFillInstagram,
  AiFillTwitterSquare,
  AiFillFacebook,
  AiFillLinkedin,
} from "react-icons/ai";

function SubFooter() {
  return (
    <div className="sub-footer">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="footer-intro">
              <img
                src={logo}
                alt="MIC Earn Business Logo"
                className="nav-logo mb-4"
              />
              <h2>
                Your Trusted Provider of Accurate Trading and Investment Signals
              </h2>
              <p>
                Our goal is to help over 1,000,000 traders with little or no
                prior experience in forex trading to become massively profitable
                in their trading with minimum effort required.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="footer-address">
              <h2>Contact</h2>
              <address>
                25, Dummy street, Victoria Island, Lagos state, Nigeria
              </address>
              <address>
                <a href="tel:+2348011111">+234809846724</a>
              </address>
              <address>
                <a href="tel:+2348011111">+234809846724</a>
              </address>
              <address>
                <a href="mainto:hello@mic.com">hello@mic.com</a>
              </address>
            </div>
          </div>
          <div className="col-md-4">
            <div className="footer-connect">
              <h2>Connect</h2>
              <a href="/" className="facebook-icon-a">
                <AiFillFacebook />
              </a>
              <a href="/" className="twitter-icon-a">
                <AiFillTwitterSquare />
              </a>
              <a href="/" className="linkedin-icon-a">
                <AiFillLinkedin />
              </a>
              <a href="/" className="instagram-icon-a">
                <AiFillInstagram />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubFooter;
