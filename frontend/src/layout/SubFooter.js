import React from "react";
import logo from "../asset/images/logo.png";

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
              <h2>MIC Earn Business</h2>
              <p>
                On the other hand, we denounce with righteous indignation and
                dislike men who are so beguiled and demoralized by the charms of
                pleasure of the moment, so blinded by desire, that they cannot
                foresee the pain
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
              <a href="/">
                <i className="fab fa-facebook-square fa-2x social-icon" />
              </a>
              <a href="/">
                <i className="fab fa-twitter-square fa-2x  social-icon" />
              </a>
              <a href="/">
                <i className="fab fa-linkedin fa-2x  social-icon" />
              </a>
              <a href="/">
                <i className="fab fa-instagram fa-2x  social-icon" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubFooter;
