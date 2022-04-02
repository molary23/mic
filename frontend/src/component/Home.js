import React from "react";

import { GiArcheryTarget } from "react-icons/gi";

import { HiOutlineUserGroup } from "react-icons/hi";
import { MdOutlineSupportAgent } from "react-icons/md";

function Home(props) {
  return (
    <div className="main-home" id="home" ref={props.homeRef}>
      <div className="main-home-top">
        <div className="container-fluid">
          <div className="row flex-column-reverse flex-md-row">
            <div className="col-md-5 col-12">
              <div className="home-top-text">
                <h1 className="mb-4">Increase Your Profit With Our Signals</h1>
                <p>
                  Trade Forex, Indexes and Cryptocurrency following signals
                  provided by our team expert forex traders.
                </p>
                <a
                  type="button"
                  href="//dashboard.micearnbusiness.org/register"
                  className="btn default-btn"
                >
                  Register
                </a>
              </div>
            </div>
            <div className="col-md-7">
              <div className="home-top-image"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="main-home-intro">
        <div className="container">
          <h1 className="mb-4">Why MIC Earn Business</h1>
          <p>
            With an accuracy of 85% or higher, you can keep your drawdown very
            low and get the maximum profit. All results are verified. Check your
            Dashboard for signal performance updates.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
