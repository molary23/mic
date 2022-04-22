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
                <a href="mailto:info@micearnbusiness.org">
                  info@micearnbusiness.org
                </a>
              </address>
            </div>
          </div>
          <div className="col-md-4">
            <div className="footer-connect">
              <h2>Connect</h2>
              <a href="/" className="facebook-icon-a">
                <AiFillFacebook />
              </a>
              <a href="https://twitter.com/MicEarn" className="twitter-icon-a">
                <AiFillTwitterSquare />
              </a>
              <a href="/" className="linkedin-icon-a">
                <AiFillLinkedin />
              </a>
              <a
                href="https://www.instagram.com/micearn/"
                className="instagram-icon-a"
              >
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
